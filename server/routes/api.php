<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PagoPedidoController;
use App\Http\Controllers\MetodoPagoController;

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

//Pedidos
Route::apiResource('pedidos', PedidoController::class);
Route::get('pedidos/cliente/{idCliente}', [PedidoController::class, 'getByCliente']);

//Pagos
Route::apiResource('pagos', PagoPedidoController::class);
Route::get('pagos/pedido/{idPedido}', [PagoPedidoController::class, 'getByPedido']);

//Metodos de Pago
Route::apiResource('metodos-pago', MetodoPagoController::class)->only(['index', 'show']);
