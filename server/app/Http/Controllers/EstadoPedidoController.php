<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EstadoPedido;

class EstadoPedidoController extends Controller
{
    public function index()
    {
        $estados = EstadoPedido::all();
        return response()->json($estados, 200);
    }
    
    public function show($id)
    {
        $estado = EstadoPedido::find($id);
        if (!$estado) {
            return response()->json(['message' => 'Estado de pedido no encontrado'], 404);
        }
        return response()->json($estado, 200);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'nombre_estado' => 'required|string|max:50'
        ]);
        
        $estado = EstadoPedido::create($request->all());
        return response()->json($estado, 201);
    }
    
    public function update(Request $request, $id)
    {
        $estado = EstadoPedido::find($id);
        if (!$estado) {
            return response()->json(['message' => 'Estado de pedido no encontrado'], 404);
        }
        
        $request->validate([
            'nombre_estado' => 'required|string|max:50'
        ]);
        
        $estado->update($request->all());
        return response()->json($estado, 200);
    }
    
    public function destroy($id)
    {
        $estado = EstadoPedido::find($id);
        if (!$estado) {
            return response()->json(['message' => 'Estado de pedido no encontrado'], 404);
        }
        $estado->delete();
        return response()->json(['message' => 'Estado de pedido eliminado correctamente'], 200);
    }
}
