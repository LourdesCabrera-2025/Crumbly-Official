<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EstadoPedido;
use Illuminate\Http\Request;

class EstadoPedidoController extends Controller
{

    public function index()
    {
        return response()->json(
            EstadoPedido::all()
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_estado' => 'require|string|max:50'
        ]);
        $estado_pedido = EstadoPedido::create($validated);
        return response()->json($estado_pedido, 201);
    }


    public function show($id_estado_pedido)
    {
        $estado_pedido = EstadoPedido::findOrFile($id_estado_pedido);
        return response()->json($estado_pedido);
    }

    public function searchByName($nombre_estado) 
    {
        $estado_pedido = EstadoPedido::where('nombre_estado' , 'LIKE', "%$nombre_estado%")
        ->get();
        return response()->json($estado_pedido);
    }


    public function update(Request $request, $id_estado_pedido)
    {
        $estado_pedido = EstadoPedido::findOrFail($id_estado_pedido);
        $validated = $request->validate([
            'nombre_estado'=> 'sometimes|require|max:50'
        ]);
        $estado_pedido->update($validated);

        return response()->json($estado_pedido);
    }


    public function destroy($id_estado_pedido)
    {
        $estado_pedido = EstadoPedido::findOrFail($id_estado_pedido);
        $estado_pedido->delete();
        return response()->json(['message' => 'Nivel de Estado eliminado correctamente']);
    }
}
