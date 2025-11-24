<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DetallePedido;
use Illuminate\Http\Request;

class DetalleController extends Controller
{
    public function index()
    {
        $detalles = DetallePedido::with(['pedido', 'producto'])->get();
        return response()->json($detalles);
    }

    public function show($id_detalle)
    {
        $detalle = DetallePedido::with(['pedido', 'producto'])->findOrFail($id_detalle);
        return response()->json($detalle);
    }
}
