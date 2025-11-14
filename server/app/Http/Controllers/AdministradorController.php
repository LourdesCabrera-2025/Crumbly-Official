<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Administrador;
use App\Models\Tipo_Usuario;

class AdministradorController extends Controller
{
    public function index()
    {
        $admins = Administrador::all();
        if($admins->isEmpty()) {
            return response()->json([
                'success' => false, 
                'message' => 'No hay administradores registrados'], 404);
        }
        return response()->json([
            'success' => true, 
            'users' => $admins], 200);
    }

    public function show($id)
    {
        $admin = Administrador::find($id);
        if(!$admin) {
            return response()->json([
                'success' => false, 
                'message' => 'Administrador no encontrado'], 404);
        }
        return response()->json([
            'success' => true, 
            'user' => $admin], 200);
    }

    public function store(Request $request)
    {
        $id_check = Administrador::find($request->id_admin);
        //No ingresar si ya existe un administrador con ese id
        if($id_check) {
            return response()->json([
                'success' => false, 'message' => 'Ya existe un administrador con este id'], 400);
        }
        $tipo_usuario = Tipo_Usuario::find($request->id_tipo_usuario);
        //No ingresar si el tipo de usuario no existe
        if(!$tipo_usuario) {
            return response()->json([
                'success' => false, 'message' => 'Tipo de usuario no encontrado'], 404);
        }

        $admin = Administrador::create([
            'id_admin' => $request->id_admin, 
            'nombre' => $request->nombre, 
            'id_tipo_usuario' => $request->id_tipo_usuario
        ]);
        return response()->json([
            'success' => true, 
            'message' => 'Administrador ingresado exitosamente', 
            'data' => $admin], 201);
    }

    public function update(Request $request)
    {
        $admin = Administrador::find($request->id_admin);
        if(!$admin) {
            return response()->json([
                'success' => false, 'message' => 'Administrador no encontrado'], 404);
        }
        $tipo_usuario = Tipo_Usuario::find($request->id_tipo_usuario);
        //No actualizar si el tipo de usuario no existe
        if(!$tipo_usuario) {
            return response()->json([
                'success' => false, 'message' => 'Tipo de usuario no encontrado'], 404);
        }

        $admin = Administrador::update([
            'id_admin' => $request->id_admin, 
            'nombre' => $request->nombre, 
            'id_tipo_usuario' => $request->id_tipo_usuario
        ]);
        return response()->json([
            'success' => true, 
            'message' => 'Administrador actualizado exitosamente', 
            'data' => $admin], 200);
    }

    public function destroy($id)
    {
        $admin = Administrador::find($id);
        if(!$admin) {
            return response()->json([
                'success' => false, 
                'message' => 'Administrador no encontrado'], 404);
        }
        $admin->delete();
        return response()->json([
            'success' => true, 
            'message' => 'Administrador eliminado exitosamente'], 200);
    }
}