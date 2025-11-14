<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\ValoracionController;

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

//Rutas para Administrador
Route::get('/administradores', [AdministradorController::class, 'index']);
Route::get('/administradores/{id}', [AdministradorController::class, 'show']);
Route::post('/administradores', [AdministradorController::class, 'store']);
Route::put('/administradores/{id}', [AdministradorController::class, 'update']);
Route::delete('/administradores/{id}', [AdministradorController::class, 'destroy']);

//Rutas para Valoracion
Route::get('/valoraciones', [ValoracionController::class, 'index']);
Route::get('/valoraciones/{id}', [ValoracionController::class, 'show']);
Route::post('/valoraciones', [ValoracionController::class, 'store']);
Route::put('/valoraciones/{id}', [ValoracionController::class, 'update']);
Route::delete('/valoraciones/{id}', [ValoracionController::class, 'destroy']);
