<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\EstadoProductoController;

// Rutas de Productos
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

// Rutas de Categorías
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/categorias/{id}', [CategoriaController::class, 'show']);
Route::post('/categorias', [CategoriaController::class, 'store']);
Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy']);

// Rutas de Estados de Producto
Route::get('/estados-producto', [EstadoProductoController::class, 'index']);
Route::get('/estados-producto/{id}', [EstadoProductoController::class, 'show']);
Route::post('/estados-producto', [EstadoProductoController::class, 'store']);
Route::put('/estados-producto/{id}', [EstadoProductoController::class, 'update']);
Route::delete('/estados-producto/{id}', [EstadoProductoController::class, 'destroy']);