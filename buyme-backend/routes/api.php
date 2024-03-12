<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\RatingsController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('products/bought-by-user', [OrderController::class, 'productsBoughtByUser']);
    Route::get('products/sold-by-user', [ProductController::class, 'productsSoldByUser']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::get('/search', [SearchController::class, 'search']);
    Route::resource('products', ProductController::class);
    Route::get('products/by-user/{userId}', [ProductController::class, 'indexByUser']);
    Route::post('purchase/{product}', [OrderController::class, 'purchase']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/products/ratings', [RatingsController::class, 'store']);
    Route::get('/products/{id}/ratings', [RatingsController::class, 'getRatings']);
});

Route::middleware('auth:sanctum')->get('/user/{userId}', [UserController::class, 'getUserById']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/hello-world', [HelloWorldController::class, 'helloWorld']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', [AuthController::class, 'user']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Other protected routes...
});