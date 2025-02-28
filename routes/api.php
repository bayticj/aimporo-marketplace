<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GigController;
use App\Http\Controllers\Api\OrderController;

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

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Gig public routes
Route::get('/gigs', [GigController::class, 'index']);
Route::get('/gigs/{gig}', [GigController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Gig protected routes
    Route::post('/gigs', [GigController::class, 'store']);
    Route::put('/gigs/{gig}', [GigController::class, 'update']);
    Route::delete('/gigs/{gig}', [GigController::class, 'destroy']);
    
    // Order routes
    Route::apiResource('orders', OrderController::class);
}); 