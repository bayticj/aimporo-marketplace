<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\GigController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\PasswordResetController;
use App\Http\Controllers\API\DisputeController;
use App\Http\Controllers\DigitalProductController;
use App\Http\Controllers\DigitalProductCategoryController;
use App\Http\Controllers\DigitalProductPurchaseController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\RedemptionController;
use App\Http\Controllers\SoftwareProductController;
use App\Http\Controllers\SoftwarePlanController;
use App\Http\Controllers\SoftwarePurchaseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// API Version 1 Routes
Route::prefix('v1')->group(function () {
    require base_path('routes/api/v1.php');
});

// Default API version (currently v1)
Route::any('{any}', function (Request $request) {
    return redirect('/api/v1/' . $request->path());
})->where('any', '.*');

// Global CORS preflight for non-versioned routes
Route::options('/{any}', function() {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
})->where('any', '.*');

// Public routes with rate limiting
Route::middleware('throttle:public')->group(function () {
    // Test endpoint for API connection
    Route::get('/test', function () {
        return response()->json([
            'status' => 'success',
            'message' => 'API connection successful',
            'timestamp' => now()->toIso8601String(),
            'environment' => app()->environment(),
        ]);
    });

    // Health check endpoint
    Route::get('/health', [App\Http\Controllers\API\HealthCheckController::class, 'check']);

    // Gig routes - public access for viewing
    Route::get('/gigs', [GigController::class, 'index']);
    Route::get('/gigs/search', [GigController::class, 'search']);
    Route::get('/gigs/{gig}', [GigController::class, 'show']);

    // Public review routes
    Route::get('/reviews/gig/{gigId}', [ReviewController::class, 'getGigReviews']);
    Route::get('/reviews/user/{userId}', [ReviewController::class, 'getUserReviews']);
});

// Authentication routes with stricter rate limiting
Route::middleware('throttle:auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    
    // Password reset routes
    Route::post('/password/email', [PasswordResetController::class, 'sendResetLinkEmail']);
    Route::post('/password/reset', [PasswordResetController::class, 'reset']);
});

// Protected routes
Route::middleware(['auth:sanctum', 'throttle:user_actions'])->group(function () {
    // User profile
    Route::get('/user', [AuthController::class, 'user']);
    
    // Two-factor authentication
    Route::prefix('2fa')->group(function () {
        Route::post('/enable', [App\Http\Controllers\API\TwoFactorAuthController::class, 'enable']);
        Route::post('/confirm', [App\Http\Controllers\API\TwoFactorAuthController::class, 'confirm']);
        Route::post('/disable', [App\Http\Controllers\API\TwoFactorAuthController::class, 'disable']);
        Route::post('/verify', [App\Http\Controllers\API\TwoFactorAuthController::class, 'verify']);
    });
    
    // Role management (admin only)
    Route::middleware(['role:admin'])->prefix('roles')->group(function () {
        Route::get('/', [App\Http\Controllers\API\RoleController::class, 'index']);
        Route::post('/', [App\Http\Controllers\API\RoleController::class, 'store']);
        Route::get('/{id}', [App\Http\Controllers\API\RoleController::class, 'show']);
        Route::put('/{id}', [App\Http\Controllers\API\RoleController::class, 'update']);
        Route::delete('/{id}', [App\Http\Controllers\API\RoleController::class, 'destroy']);
        Route::get('/permissions', [App\Http\Controllers\API\RoleController::class, 'permissions']);
        Route::post('/assign', [App\Http\Controllers\API\RoleController::class, 'assignRole']);
        Route::post('/remove', [App\Http\Controllers\API\RoleController::class, 'removeRole']);
    });
    
    // Gig management
    Route::post('/gigs', [GigController::class, 'store']);
    Route::put('/gigs/{gig}', [GigController::class, 'update']);
    Route::delete('/gigs/{gig}', [GigController::class, 'destroy']);
    
    // Order management
    Route::resource('/orders', OrderController::class);
    
    // Message system
    Route::get('/messages/conversations', [MessageController::class, 'getConversations']);
    Route::get('/messages/unread-count', [MessageController::class, 'getUnreadCount']);
    Route::get('/messages/order/{orderId}', [MessageController::class, 'getOrderMessages']);
    Route::post('/messages/order/{orderId}', [MessageController::class, 'sendMessage']);
    Route::put('/messages/{messageId}/read', [MessageController::class, 'markAsRead']);
    
    // Review system
    Route::post('/reviews/order/{orderId}', [ReviewController::class, 'createReview']);
    Route::put('/reviews/{reviewId}', [ReviewController::class, 'updateReview']);
    Route::delete('/reviews/{reviewId}', [ReviewController::class, 'deleteReview']);
    
    // Dispute system
    Route::get('/disputes', [DisputeController::class, 'index']);
    Route::post('/disputes', [DisputeController::class, 'store']);
    Route::get('/disputes/{id}', [DisputeController::class, 'show']);
    Route::post('/disputes/{id}/comments', [DisputeController::class, 'addComment']);
    Route::post('/disputes/{id}/evidence', [DisputeController::class, 'addEvidence']);
    Route::post('/disputes/{id}/escalate', [DisputeController::class, 'escalate']);
    
    // Admin-only dispute routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/disputes', [DisputeController::class, 'adminIndex']);
        Route::put('/admin/disputes/{id}/status', [DisputeController::class, 'updateStatus']);
        Route::get('/admin/disputes/statistics', [DisputeController::class, 'statistics']);
    });
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Digital Product Routes
Route::prefix('digital-products')->group(function () {
    // Public routes
    Route::get('/', [DigitalProductController::class, 'index']);
    Route::get('/{digitalProduct}', [DigitalProductController::class, 'show']);
    Route::get('/{digitalProduct}/preview', [DigitalProductPurchaseController::class, 'preview']);
    
    // Categories
    Route::get('/categories', [DigitalProductCategoryController::class, 'index']);
    Route::get('/categories/{category}', [DigitalProductCategoryController::class, 'show']);
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Digital Product Management
        Route::post('/', [DigitalProductController::class, 'store']);
        Route::put('/{digitalProduct}', [DigitalProductController::class, 'update']);
        Route::delete('/{digitalProduct}', [DigitalProductController::class, 'destroy']);
        Route::patch('/{digitalProduct}/publish', [DigitalProductController::class, 'publish']);
        Route::patch('/{digitalProduct}/archive', [DigitalProductController::class, 'archive']);
        Route::get('/my/products', [DigitalProductController::class, 'myDigitalProducts']);
        
        // Category Management (Admin only)
        Route::post('/categories', [DigitalProductCategoryController::class, 'store']);
        Route::put('/categories/{category}', [DigitalProductCategoryController::class, 'update']);
        Route::delete('/categories/{category}', [DigitalProductCategoryController::class, 'destroy']);
        
        // Purchase and Download
        Route::post('/{digitalProduct}/purchase', [DigitalProductPurchaseController::class, 'purchase']);
        Route::get('/purchases', [DigitalProductPurchaseController::class, 'myPurchases']);
        Route::get('/purchases/{purchase}', [DigitalProductPurchaseController::class, 'show']);
        Route::get('/purchases/{purchase}/download', [DigitalProductPurchaseController::class, 'download']);
    });
});

// Software License System Routes
Route::prefix('software')->group(function () {
    // Public routes
    Route::post('redemption/verify', [RedemptionController::class, 'verify']);
    Route::post('redemption/mark-as-redeemed', [RedemptionController::class, 'markAsRedeemed']);
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Partner routes
        Route::apiResource('partners', PartnerController::class);
        
        // Software Product routes
        Route::apiResource('products', SoftwareProductController::class);
        
        // Software Plan routes
        Route::apiResource('plans', SoftwarePlanController::class);
        
        // Software Purchase routes
        Route::apiResource('purchases', SoftwarePurchaseController::class);
        
        // Account Provisioning
        Route::post('provision', [RedemptionController::class, 'provisionAccount']);
    });
}); 