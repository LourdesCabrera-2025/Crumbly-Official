<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EntregaPedido;
use App\Models\Pedido;
use App\Models\Direccion;

class EntregaPedidoController extends Controller
{
    public function index()
    {
        $entregas = EntregaPedido::all();
        return response()->json($entregas, 200);
    }
    
    public function show($id)
    {
        $entrega = EntregaPedido::find($id);
        if (!$entrega) {
            return response()->json(['message' => 'Entrega de pedido no encontrada'], 404);
        }
        return response()->json($entrega, 200);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'id_pedido' => 'required|integer|exists:Pedido,id_pedido',
            'id_direccion' =>'required|integer|exists:Direccion,id_direccion',
            'fecha_entrega' => 'required|date'
        ]);

        $entrega = EntregaPedido::create($request->all());
        return response()->json($entrega, 201);
    }
    
    public function update(Request $request, $id)
    {
        $entrega = EntregaPedido::find($id);
        if (!$entrega) {
            return response()->json(['message' => 'Entrega de pedido no encontrada'], 404);
        }
        
        $request->validate([
            'id_pedido' => 'required|integer|exists:Pedido,id_pedido',
            'id_direccion' => 'required|integer|exists:Direccion,id_direccion',
            'fecha_entrega' => 'required|date'
        ]);
        
        $entrega->update($request->all());
        return response()->json($entrega, 200);
    }
    
    public function destroy($id)
    {
        $entrega = EntregaPedido::find($id);
        if (!$entrega) {
            return response()->json(['message' => 'Entrega de pedido no encontrada'], 404);
        }
        
        $entrega->delete();
        return response()->json(['message' => 'Entrega de pedido eliminada correctamente'], 200);
    }
}