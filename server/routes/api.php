<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuariosFirebase;
use App\Models\UsuarioFirebase;
use App\Http\Controllers\TipoUsuarios;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\EstadoProductoController;

// Ruta para el logueo con google

Route::post('/login-google', [AuthController::class, 'loginWithGoogle']);


// Rutas para la busqueda y eliminación de los usuarios firebase

Route::prefix('firebase-users')->group(function () {
    Route::get('/', [UsuariosFirebase::class, 'index']);
    Route::get('/show/{id}', [UsuariosFirebase::class, 'show']);
    Route::get('/search/{display_name}', [UsuariosFirebase::class, 'searchByDisplayName']);
    Route::delete('/delete/{id}', [UsuariosFirebase::class, 'destroy']);
});

// Rutas para busqueda  de tipos de usuario (SCRUD Completo)
Route::prefix('tipo-usuarios')->group(function () {
    Route::get('/', [TipoUsuarios::class, 'index']);
    Route::post('/', [TipoUsuarios::class, 'store']);
    Route::get('/show/{id}', [TipoUsuarios::class, 'show']);
    Route::put('/update/{id}', [TipoUsuarios::class, 'update']);
    Route::delete('/delete/{id}', [TipoUsuarios::class, 'destroy']);
});

// Rutas para busqueda de categorias (SCRUD Completo)

Route::prefix('categorias')->group(function () {
    Route::get('/', [CategoriaController::class, 'index']);
    Route::post('/',[CategoriaController::class, 'store']);
    Route::get('/show/{id}', [CategoriaController::class, 'show']);
    Route::get('/search/{nombre_categoria}', [CategoriaController::class, 'searchByName']);
    Route::put('/update/{id}', [CategoriaController::class, 'update']);
    Route::delete('/delete/{id}', [CategoriaController::class, 'delete']);
});


// Rutas para busqueda de estado producto (SCRUD Completo)

Route::prefix('estado-producto')->group(function () {
    Route::get('/', [EstadoProductoController::class, 'index']);
    Route::post('/',[EstadoProductoController::class, 'store']);
    Route::get('/show/{id}', [EstadoProductoController::class, 'show']);
    Route::get('/search/{nombre_categoria}', [EstadoProductoController::class, 'searchByName']);
    Route::put('/update/{id}', [EstadoProductoController::class, 'update']);
    Route::delete('/delete/{id}', [EstadoProductoController::class, 'delete']);
});



// Ruta para busqueda de estados de los pedidos (SCRUD Completo)


// Ruta para busqueda de los departamentos 


// Ruta para los Metodos de pago 


// Ruta para los Usuarios locales 