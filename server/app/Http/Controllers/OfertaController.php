<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Oferta;
use App\Models\Producto;

class OfertaController extends Controller
{
    public function index()
    {
        $ofertas = Oferta::all();
        return response()->json($ofertas, 200);
    }
    
    public function show($id)
    {
        $oferta = Oferta::find($id);
        if (!$oferta) {
            return response()->json(['message' => 'Oferta no encontrada'], 404);
        }
        return response()->json($oferta, 200);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'id_producto' => 'required|string|max:20|exists:Producto,id_producto',
            'descuento' => 'required|numeric|min:0|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio'
        ]);
        $oferta = Oferta::create($request->all());
        return response()->json($oferta, 201);
    }
    
    public function update(Request $request, $id)
    {
        $oferta = Oferta::find($id);
        if (!$oferta) {
            return response()->json(['message' => 'Oferta no encontrada'], 404);
        }
        $request->validate([
            'id_producto' => 'required|string|max:20|exists:Producto,id_producto',
            'descuento' => 'required|numeric|min:0|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio'
        ]);

        $oferta->update($request->all());
        return response()->json($oferta, 200);
    }
    
    public function destroy($id)
    {
        $oferta = Oferta::find($id);
        if (!$oferta) {
            return response()->json(['message' => 'Oferta no encontrada'], 404);
        }
        
        $oferta->delete();
        return response()->json(['message' => 'Oferta eliminada correctamente'], 200);
    }
}