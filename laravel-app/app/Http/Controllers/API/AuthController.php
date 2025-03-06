<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * The token service instance.
     *
     * @var TokenService
     */
    protected $tokenService;

    /**
     * Create a new controller instance.
     *
     * @param TokenService $tokenService
     * @return void
     */
    public function __construct(TokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }

    /**
     * Register a new user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'account_type' => 'required|string|in:buyer,seller,both',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign role based on account type
        if ($request->account_type === 'buyer') {
            $user->assignRole('buyer');
        } elseif ($request->account_type === 'seller') {
            $user->assignRole('seller');
        } else {
            // For 'both' account type, assign both roles
            $user->assignRole(['buyer', 'seller']);
        }

        $tokens = $this->tokenService->createTokenWithRefreshToken($user);

        // Get user with roles and permissions
        $userData = $this->getUserWithRolesAndPermissions($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $userData,
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
            'token_type' => $tokens['token_type'],
            'expires_in' => $tokens['expires_in']
        ], 201);
    }

    /**
     * Login user and create token
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $tokens = $this->tokenService->createTokenWithRefreshToken($user);

        // Get user with roles and permissions
        $userData = $this->getUserWithRolesAndPermissions($user);

        return response()->json([
            'message' => 'Login successful',
            'user' => $userData,
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
            'token_type' => $tokens['token_type'],
            'expires_in' => $tokens['expires_in']
        ]);
    }

    /**
     * Refresh token
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'refresh_token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $tokens = $this->tokenService->refreshToken($request->refresh_token);

        if (!$tokens) {
            return response()->json([
                'message' => 'Invalid refresh token'
            ], 401);
        }

        return response()->json([
            'message' => 'Token refreshed successfully',
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
            'token_type' => $tokens['token_type'],
            'expires_in' => $tokens['expires_in']
        ]);
    }

    /**
     * Logout user (revoke token)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $this->tokenService->revokeAllTokens($request->user());

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        $userData = $this->getUserWithRolesAndPermissions($request->user());

        return response()->json([
            'user' => $userData
        ]);
    }

    /**
     * Get user with roles and permissions
     * 
     * @param User $user
     * @return array
     */
    protected function getUserWithRolesAndPermissions(User $user)
    {
        $userData = $user->toArray();
        $userData['roles'] = $user->getRoleNames();
        $userData['permissions'] = $user->getAllPermissions()->pluck('name');
        
        return $userData;
    }
}
