<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{


    public function index()
    {
        $productos = Producto::with(['categoria', 'estadoProducto', 'admin', 'tallas', 'ofertas'])->get();
        return response()->json($productos);
    }

    public function show($id_producto)
    {
        $producto = Producto::with(['categoria', 'estadoProducto', 'admin', 'tallas', 'ofertas'])
                            ->findOrFail($id_producto);
        return response()->json($producto);
    }

}
