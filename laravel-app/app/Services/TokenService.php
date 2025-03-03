<?php

namespace App\Services;

use App\Models\RefreshToken;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Laravel\Sanctum\NewAccessToken;

class TokenService
{
    /**
     * Create a new access token with a refresh token.
     *
     * @param User $user
     * @param string $tokenName
     * @param array $abilities
     * @param int $refreshTokenExpiresInDays
     * @return array
     */
    public function createTokenWithRefreshToken(
        User $user,
        string $tokenName = 'api',
        array $abilities = ['*'],
        int $refreshTokenExpiresInDays = 30
    ): array {
        // Create a new access token
        $accessToken = $user->createToken($tokenName, $abilities);

        // Create a refresh token
        $refreshToken = $this->createRefreshToken($user, $accessToken, $refreshTokenExpiresInDays);

        return [
            'access_token' => $accessToken->plainTextToken,
            'refresh_token' => $refreshToken->token,
            'token_type' => 'Bearer',
            'expires_in' => config('sanctum.expiration') * 60, // Convert minutes to seconds
        ];
    }

    /**
     * Create a new refresh token.
     *
     * @param User $user
     * @param NewAccessToken $accessToken
     * @param int $expiresInDays
     * @return RefreshToken
     */
    protected function createRefreshToken(User $user, NewAccessToken $accessToken, int $expiresInDays): RefreshToken
    {
        // Extract the ID from the access token
        $accessTokenId = explode('|', $accessToken->plainTextToken)[0];

        // Create a new refresh token
        return $user->refreshTokens()->create([
            'token' => Str::random(80),
            'access_token_id' => $accessTokenId,
            'expires_at' => Carbon::now()->addDays($expiresInDays),
        ]);
    }

    /**
     * Refresh an access token using a refresh token.
     *
     * @param string $refreshToken
     * @param string $tokenName
     * @param array $abilities
     * @param int $refreshTokenExpiresInDays
     * @return array|null
     */
    public function refreshToken(
        string $refreshToken,
        string $tokenName = 'api',
        array $abilities = ['*'],
        int $refreshTokenExpiresInDays = 30
    ): ?array {
        // Find the refresh token
        $refreshTokenModel = RefreshToken::where('token', $refreshToken)->first();

        // Check if the token exists and is valid
        if (!$refreshTokenModel || !$refreshTokenModel->isValid()) {
            return null;
        }

        // Revoke the old refresh token
        $refreshTokenModel->update(['revoked' => true]);

        // Revoke the old access token
        $refreshTokenModel->user->tokens()
            ->where('id', $refreshTokenModel->access_token_id)
            ->delete();

        // Create a new token pair
        return $this->createTokenWithRefreshToken(
            $refreshTokenModel->user,
            $tokenName,
            $abilities,
            $refreshTokenExpiresInDays
        );
    }

    /**
     * Revoke all tokens for a user.
     *
     * @param User $user
     * @return void
     */
    public function revokeAllTokens(User $user): void
    {
        // Revoke all access tokens
        $user->tokens()->delete();

        // Revoke all refresh tokens
        $user->refreshTokens()->update(['revoked' => true]);
    }
} 