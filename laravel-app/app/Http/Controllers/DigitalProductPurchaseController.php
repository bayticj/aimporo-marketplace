<?php

namespace App\Http\Controllers;

use App\Models\DigitalProduct;
use App\Models\DigitalProductPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DigitalProductPurchaseController extends Controller
{
    /**
     * Purchase a digital product.
     */
    public function purchase(Request $request, DigitalProduct $digitalProduct)
    {
        // Check if the product is published
        if ($digitalProduct->status !== 'published') {
            return response()->json([
                'success' => false,
                'message' => 'Digital product not available for purchase',
            ], 404);
        }

        // Check if the user already purchased the product
        $existingPurchase = DigitalProductPurchase::where('user_id', auth()->id())
            ->where('digital_product_id', $digitalProduct->id)
            ->where('payment_status', 'completed')
            ->first();

        if ($existingPurchase) {
            return response()->json([
                'success' => false,
                'message' => 'You have already purchased this digital product',
                'data' => $existingPurchase,
            ], 422);
        }

        // TODO: Implement actual payment processing with Xendit
        // For now, we'll simulate a successful payment

        // Create purchase record
        $purchase = DigitalProductPurchase::create([
            'user_id' => auth()->id(),
            'digital_product_id' => $digitalProduct->id,
            'transaction_id' => 'sim_' . uniqid(),
            'amount' => $digitalProduct->price,
            'payment_method' => 'credit_card',
            'payment_status' => 'completed',
            'download_count' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Digital product purchased successfully',
            'data' => $purchase->load('digitalProduct'),
        ], 201);
    }

    /**
     * Download a purchased digital product.
     */
    public function download(DigitalProductPurchase $purchase)
    {
        // Check if the purchase belongs to the authenticated user
        if ($purchase->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Check if the payment is completed
        if ($purchase->payment_status !== 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'Payment not completed',
            ], 422);
        }

        // Check if the download limit has been reached
        if ($purchase->hasReachedDownloadLimit()) {
            return response()->json([
                'success' => false,
                'message' => 'Download limit reached',
            ], 422);
        }

        // Get the digital product
        $digitalProduct = $purchase->digitalProduct;

        // Check if the file exists
        if (!Storage::exists($digitalProduct->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found',
            ], 404);
        }

        // Increment download count
        $purchase->incrementDownloadCount();

        // Return file download response
        return Storage::download(
            $digitalProduct->file_path,
            $digitalProduct->file_name,
            [
                'Content-Type' => $digitalProduct->file_type,
                'Content-Disposition' => 'attachment; filename="' . $digitalProduct->file_name . '"',
            ]
        );
    }

    /**
     * Get the preview of a digital product.
     */
    public function preview(DigitalProduct $digitalProduct)
    {
        // Check if the product is published
        if ($digitalProduct->status !== 'published') {
            return response()->json([
                'success' => false,
                'message' => 'Digital product not available',
            ], 404);
        }

        // Check if the preview exists
        if (!$digitalProduct->preview_path || !Storage::exists($digitalProduct->preview_path)) {
            return response()->json([
                'success' => false,
                'message' => 'Preview not available',
            ], 404);
        }

        // Return preview file
        return Storage::download(
            $digitalProduct->preview_path,
            'preview_' . $digitalProduct->file_name,
            [
                'Content-Type' => Storage::mimeType($digitalProduct->preview_path),
                'Content-Disposition' => 'attachment; filename="preview_' . $digitalProduct->file_name . '"',
            ]
        );
    }

    /**
     * Get the purchases of the authenticated user.
     */
    public function myPurchases()
    {
        $purchases = DigitalProductPurchase::with('digitalProduct')
            ->where('user_id', auth()->id())
            ->where('payment_status', 'completed')
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $purchases,
        ]);
    }

    /**
     * Get the purchase details.
     */
    public function show(DigitalProductPurchase $purchase)
    {
        // Check if the purchase belongs to the authenticated user
        if ($purchase->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $purchase->load('digitalProduct'),
        ]);
    }
} 