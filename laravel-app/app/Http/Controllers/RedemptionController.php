<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\SoftwarePurchase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RedemptionController extends Controller
{
    /**
     * Verify a redemption code.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'redemption_code' => 'required|string',
            'partner_api_key' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'valid' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Verify partner API key
        $partner = Partner::where('api_key', $request->partner_api_key)->first();
        if (!$partner) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid partner API key',
            ], 401);
        }

        // Find purchase by redemption code
        $purchase = SoftwarePurchase::where('redemption_code', $request->redemption_code)
            ->whereHas('product', function ($query) use ($partner) {
                $query->where('partner_id', $partner->id);
            })
            ->with(['user', 'plan', 'product'])
            ->first();

        if (!$purchase) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid redemption code',
            ], 404);
        }

        if ($purchase->status === 'redeemed') {
            return response()->json([
                'valid' => false,
                'message' => 'Redemption code has already been used',
            ], 400);
        }

        if ($purchase->status === 'expired' || $purchase->hasExpired()) {
            return response()->json([
                'valid' => false,
                'message' => 'Redemption code has expired',
            ], 400);
        }

        // Return purchase details
        return response()->json([
            'valid' => true,
            'purchase_id' => $purchase->id,
            'user' => [
                'name' => $purchase->user->name,
                'email' => $purchase->user->email,
            ],
            'plan' => [
                'name' => $purchase->plan->name,
                'features' => $purchase->plan->features,
                'duration' => $purchase->plan->getFormattedDurationAttribute(),
            ],
            'product' => [
                'name' => $purchase->product->name,
            ],
        ]);
    }

    /**
     * Mark a purchase as redeemed.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRedeemed(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'redemption_code' => 'required|string',
            'partner_api_key' => 'required|string',
            'external_account_id' => 'nullable|string',
            'external_username' => 'nullable|string',
            'external_password' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Verify partner API key
        $partner = Partner::where('api_key', $request->partner_api_key)->first();
        if (!$partner) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid partner API key',
            ], 401);
        }

        // Find purchase by redemption code
        $purchase = SoftwarePurchase::where('redemption_code', $request->redemption_code)
            ->whereHas('product', function ($query) use ($partner) {
                $query->where('partner_id', $partner->id);
            })
            ->first();

        if (!$purchase) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid redemption code',
            ], 404);
        }

        if ($purchase->status === 'redeemed') {
            return response()->json([
                'success' => false,
                'message' => 'Redemption code has already been used',
            ], 400);
        }

        if ($purchase->status === 'expired' || $purchase->hasExpired()) {
            return response()->json([
                'success' => false,
                'message' => 'Redemption code has expired',
            ], 400);
        }

        // Mark purchase as redeemed
        $purchase->markAsRedeemed(
            $request->external_account_id,
            $request->external_username,
            $request->external_password
        );

        return response()->json([
            'success' => true,
            'message' => 'Purchase marked as redeemed successfully',
        ]);
    }

    /**
     * Provision an account via API.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function provisionAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:software_products,id',
            'plan_id' => 'required|exists:software_plans,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::find($request->user_id);
        $product = \App\Models\SoftwareProduct::with('partner')->find($request->product_id);
        $plan = \App\Models\SoftwarePlan::find($request->plan_id);

        if (!$product->partner || $product->partner->integration_type !== 'api') {
            return response()->json([
                'success' => false,
                'message' => 'Product does not support API provisioning',
            ], 400);
        }

        // Create purchase record
        $purchase = SoftwarePurchase::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'plan_id' => $plan->id,
            'status' => 'pending',
            'purchased_at' => now(),
        ]);

        // Set expiration date
        $purchase->setExpirationDate();

        try {
            // Call partner API to provision account
            $response = Http::post($product->partner->api_endpoint, [
                'user_name' => $user->name,
                'user_email' => $user->email,
                'plan_name' => $plan->name,
                'plan_features' => $plan->features,
                'purchase_id' => $purchase->id,
                'api_key' => $product->partner->api_key,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                // Update purchase with external account details
                $purchase->markAsRedeemed(
                    $data['account']['external_id'] ?? null,
                    $data['account']['username'] ?? null,
                    $data['account']['password'] ?? null
                );

                return response()->json([
                    'success' => true,
                    'message' => 'Account provisioned successfully',
                    'purchase_id' => $purchase->id,
                    'account' => [
                        'external_id' => $data['account']['external_id'] ?? null,
                        'username' => $data['account']['username'] ?? null,
                        'password' => $data['account']['password'] ?? null,
                    ],
                ]);
            } else {
                // Mark purchase as failed
                $purchase->update(['status' => 'failed']);

                return response()->json([
                    'success' => false,
                    'message' => 'Failed to provision account: ' . ($response->json()['message'] ?? 'Unknown error'),
                ], 500);
            }
        } catch (\Exception $e) {
            // Log the error
            Log::error('Account provisioning failed: ' . $e->getMessage(), [
                'purchase_id' => $purchase->id,
                'user_id' => $user->id,
                'product_id' => $product->id,
                'plan_id' => $plan->id,
            ]);

            // Mark purchase as failed
            $purchase->update(['status' => 'failed']);

            return response()->json([
                'success' => false,
                'message' => 'Failed to provision account: ' . $e->getMessage(),
            ], 500);
        }
    }
}
