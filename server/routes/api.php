<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuariosFirebase;
use App\Models\UsuarioFirebase;
use App\Http\Controllers\TipoUsuarios;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\EstadoPedidoController;
use App\Http\Controllers\EstadoProductoController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\AuthControllerLocal;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UsuariosLocalController;

// Ruta para el logueo con google

Route::post('/login-google', [AuthController::class, 'loginWithGoogle']);



// Rutas para la busqueda y eliminación de los usuarios firebase

Route::prefix('firebase-users')->group(function () {
    Route::get('/', [UsuariosFirebase::class, 'index']);

    Route::get('/{id_usuario_firebase}', [UsuariosFirebase::class, 'show']);

    Route::get('/search/{display_name}', [UsuariosFirebase::class, 'searchByDisplayName']);

    Route::delete('/{id_usuario_firebase}', [UsuariosFirebase::class, 'destroy']);
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

Route::prefix('categoria')->group(function () {
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
    Route::get('/search/{nombre_estado}', [EstadoProductoController::class, 'searchByName']);
    Route::put('/update/{id}', [EstadoProductoController::class, 'update']);
    Route::delete('/delete/{id}', [EstadoProductoController::class, 'delete']);
});



// Ruta para busqueda de estados de los pedidos (SCRUD Completo)

Route::prefix('estado-pedido')->group(function () {
    Route::get('/', [EstadoPedidoController::class, 'index']);
    Route::post('/',[EstadoPedidoController::class, 'store']);
    Route::get('/show/{id}', [EstadoPedidoController::class, 'show']);
    Route::get('/search/{nombre_estado}', [EstadoPedidoController::class, 'searchByName']);
    Route::put('/update/{id}', [EstadoPedidoController::class, 'update']);
    Route::delete('/delete/{id}', [EstadoPedidoController::class, 'delete']);
});


// Ruta para busqueda de los departamentos 

Route::prefix('departamentos')->group(function () {
    Route::get('/', [DepartamentoController::class, 'index']);
    Route::post('/',[DepartamentoController::class, 'store']);
    Route::get('/show/{id}', [DepartamentoController::class, 'show']);
    Route::get('/search/{nombre_departamento}', [DepartamentoController::class, 'searchByName']);
    Route::put('/update/{id}', [DepartamentoController::class, 'update']);
    Route::delete('/delete/{id}', [DepartamentoController::class, 'delete']);
});


// Ruta para los Metodos de pago 




// Ruta para los administradores



Route::prefix('clientes')->group(function () {
 
    Route::get('/', [ClienteController::class, 'index']);

    Route::get('/{id_cliente}', [ClienteController::class, 'show']);

    Route::put('/{id_cliente}', [ClienteController::class, 'update']);

    Route::delete('/account/delete', [ClienteController::class, 'destroyAccount']);
});


// Ruta de Registro
Route::post('/register', [UsuariosLocalController::class, 'store']);

// --- RUTA DE VERIFICACIÓN BASADA EN TOKEN ---
// Simplemente se usa el token para buscar al usuario.
Route::get('/email/verify/{token}', 
    [UsuariosLocalController::class, 'verify'])
    ->name('verification.verify.token');

// Ruta para reenviar el correo
Route::post('/email/resend', [UsuariosLocalController::class, 'resendVerification']);
Route::post('/private/login', [AuthControllerLocal::class, 'login']);


// --- RUTAS PROTEGIDAS (REQUIEREN TOKEN DE SANCTUM) ---

Route::middleware('auth:sanctum')->group(function () {



    
    // 1. Obtener información del usuario autenticado actualmente
    Route::get('/user', [AuthControllerLocal::class, 'user']);

    // 2. Cierre de Sesión (Logout)
    Route::post('/logout', [AuthControllerLocal::class, 'logout']);

    // 3. CRUD de Usuarios Locales (Protegido, solo para administradores o uso interno)
    Route::prefix('usuario-local')->group(function () {
        
        Route::get('/', [UsuariosLocalController::class, 'index']);
        Route::get('/{id}', [UsuariosLocalController::class, 'show']);
        Route::put('/{id}', [UsuariosLocalController::class, 'update']);
        Route::delete('/{id}', [UsuariosLocalController::class, 'destroy']);
    });
});


Route::prefix('producto')->group(function () {
    Route::get('/', [ProductoController::class, 'index']);
    Route::get('/{id_producto}', [ProductoController::class, 'show']);
});