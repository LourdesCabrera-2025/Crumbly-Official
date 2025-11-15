<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\FirebaseAuthController;

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::post('/firebase/login', [FirebaseAuthController::class, 'login']); // Login desde frontend
Route::middleware(['auth:sanctum', 'firebase.user'])->group(function () { // Rutas protegidas (firebase)
    //Agregar rutas ...
});