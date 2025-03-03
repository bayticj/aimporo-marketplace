<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\GigController;
use App\Http\Controllers\API\V1\OrderController;
use App\Http\Controllers\API\V1\MessageController;
use App\Http\Controllers\API\V1\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes (V1)
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for version 1 of your API.
|
*/

// CORS preflight
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
            'version' => 'v1',
            'timestamp' => now()->toIso8601String(),
            'environment' => app()->environment(),
        ]);
    });

    // Gig routes - public access for viewing
    Route::get('/gigs', [GigController::class, 'index']);
    Route::get('/gigs/{gig}', [GigController::class, 'show']);

    // Public review routes
    Route::get('/reviews/gig/{gigId}', [ReviewController::class, 'getGigReviews']);
    Route::get('/reviews/user/{userId}', [ReviewController::class, 'getUserReviews']);
});

// Authentication routes with stricter rate limiting
Route::middleware('throttle:auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes
Route::middleware(['auth:sanctum', 'throttle:user_actions'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
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
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
}); 