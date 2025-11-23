<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\EstadoProductoController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\DetallePedidoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PagoPedidoController;
use App\Http\Controllers\MetodoPagoController;

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

// Rutas de Direcciones
Route::get('/direcciones', [DireccionController::class, 'index']);
Route::get('/direcciones/{id}', [DireccionController::class, 'show']);
Route::post('/direcciones', [DireccionController::class, 'store']);
Route::put('/direcciones/{id}', [DireccionController::class, 'update']);
Route::delete('/direcciones/{id}', [DireccionController::class, 'destroy']);

// Rutas de Detalles de Pedido
Route::get('/detalles-pedido', [DetallePedidoController::class, 'index']);
Route::get('/detalles-pedido/{id}', [DetallePedidoController::class, 'show']);
Route::post('/detalles-pedido', [DetallePedidoController::class, 'store']);
Route::put('/detalles-pedido/{id}', [DetallePedidoController::class, 'update']);
Route::delete('/detalles-pedido/{id}', [DetallePedidoController::class, 'destroy']);

// Rutas de Estados de Pedido
Route::get('/estados-pedido', [EstadoPedidoController::class,'index']);
Route::get('/estados-pedido/{id}', [EstadoPedidoController::class,'show']);
Route::post('/estados-pedido', [EstadoPedidoController::class,'store']);
Route::put('/estados-pedido/{id}', [EstadoPedidoController::class,'update']);
Route::delete('/estados-pedido/{id}', [EstadoPedidoController::class,'destroy']);

// Rutas de Clientes
Route::get('/clientes', [ClienteController::class, 'index']);
Route::get('/clientes/{id}', [ClienteController::class, 'show']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);

// Rutas de Entregas de Pedido
Route::get('/entregas-pedido', [EntregaPedidoController::class,'index']);
Route::get('/entregas-pedido/{id}', [EntregaPedidoController::class,'show']);
Route::post('/entregas-pedido', [EntregaPedidoController::class,'store']);
Route::put('/entregas-pedido/{id}', [EntregaPedidoController::class,'update']);
Route::delete('/entregas-pedido/{id}', [EntregaPedidoController::class,'destroy']);

// Rutas de Ofertas
Route::get('/ofertas', [OfertaController::class, 'index']);
Route::get('/ofertas/{id}', [OfertaController::class, 'show']);
Route::post('/ofertas', [OfertaController::class, 'store']);
Route::put('/ofertas/{id}', [OfertaController::class, 'update']);
Route::delete('/ofertas/{id}', [OfertaController::class, 'destroy']);
//Pedidos
Route::apiResource('pedidos', PedidoController::class);
Route::get('pedidos/cliente/{idCliente}', [PedidoController::class, 'getByCliente']);

//Pagos
Route::apiResource('pagos', PagoPedidoController::class);
Route::get('pagos/pedido/{idPedido}', [PagoPedidoController::class, 'getByPedido']);

//Metodos de Pago
Route::apiResource('metodos-pago', MetodoPagoController::class)->only(['index', 'show']);
