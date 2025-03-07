<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\GigController;
use App\Models\Gig;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Test API route
Route::get('/api-test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API test route is working',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Gig search route
Route::get('/api/gigs/search', [GigController::class, 'search']);

// Test search route
Route::get('/test-search', function () {
    $results = Gig::search('logo')->get();
    return response()->json([
        'count' => $results->count(),
        'results' => $results
    ]);
});
