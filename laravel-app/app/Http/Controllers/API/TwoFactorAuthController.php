<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PragmaRX\Google2FA\Google2FA;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TwoFactorAuthController extends Controller
{
    /**
     * Enable two-factor authentication for the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function enable(Request $request)
    {
        $user = $request->user();

        // Check if 2FA is already enabled
        if ($user->two_factor_confirmed_at !== null) {
            return response()->json([
                'message' => 'Two-factor authentication is already enabled.'
            ], 400);
        }

        // Generate the secret key
        $google2fa = new Google2FA();
        $secretKey = $google2fa->generateSecretKey();

        // Save the secret key to the user
        $user->two_factor_secret = encrypt($secretKey);
        $user->save();

        // Generate the QR code
        $qrCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $secretKey
        );

        $renderer = new ImageRenderer(
            new RendererStyle(200),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $qrCodeSvg = $writer->writeString($qrCodeUrl);

        // Generate recovery codes
        $recoveryCodes = [];
        for ($i = 0; $i < 8; $i++) {
            $recoveryCodes[] = Str::random(10);
        }
        $user->two_factor_recovery_codes = encrypt(json_encode($recoveryCodes));
        $user->save();

        return response()->json([
            'message' => 'Two-factor authentication has been enabled.',
            'qr_code' => $qrCodeSvg,
            'secret_key' => $secretKey,
            'recovery_codes' => $recoveryCodes
        ]);
    }

    /**
     * Confirm two-factor authentication for the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirm(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = $request->user();

        // Check if 2FA is already confirmed
        if ($user->two_factor_confirmed_at !== null) {
            return response()->json([
                'message' => 'Two-factor authentication is already confirmed.'
            ], 400);
        }

        // Check if the user has a secret key
        if ($user->two_factor_secret === null) {
            return response()->json([
                'message' => 'Two-factor authentication has not been enabled yet.'
            ], 400);
        }

        // Verify the code
        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey(
            decrypt($user->two_factor_secret),
            $request->code
        );

        if (!$valid) {
            return response()->json([
                'message' => 'The provided code is invalid.'
            ], 422);
        }

        // Confirm 2FA
        $user->two_factor_confirmed_at = now();
        $user->save();

        return response()->json([
            'message' => 'Two-factor authentication has been confirmed.'
        ]);
    }

    /**
     * Disable two-factor authentication for the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        // Verify the password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided password is incorrect.'
            ], 422);
        }

        // Disable 2FA
        $user->two_factor_secret = null;
        $user->two_factor_recovery_codes = null;
        $user->two_factor_confirmed_at = null;
        $user->save();

        return response()->json([
            'message' => 'Two-factor authentication has been disabled.'
        ]);
    }

    /**
     * Verify a two-factor authentication code.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = Auth::user();

        // Check if the code is a recovery code
        if (strlen($request->code) > 6) {
            return $this->verifyRecoveryCode($request, $user);
        }

        // Verify the code
        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey(
            decrypt($user->two_factor_secret),
            $request->code
        );

        if (!$valid) {
            return response()->json([
                'message' => 'The provided code is invalid.'
            ], 422);
        }

        return response()->json([
            'message' => 'Two-factor authentication code verified successfully.'
        ]);
    }

    /**
     * Verify a recovery code.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    protected function verifyRecoveryCode(Request $request, $user)
    {
        $recoveryCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);

        if (in_array($request->code, $recoveryCodes)) {
            // Remove the used recovery code
            $recoveryCodes = array_diff($recoveryCodes, [$request->code]);
            $user->two_factor_recovery_codes = encrypt(json_encode($recoveryCodes));
            $user->save();

            return response()->json([
                'message' => 'Recovery code verified successfully.',
                'remaining_recovery_codes' => count($recoveryCodes)
            ]);
        }

        return response()->json([
            'message' => 'The provided recovery code is invalid.'
        ], 422);
    }
}
