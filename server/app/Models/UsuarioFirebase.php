<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsuarioFirebase extends Model
{
    protected $table = 'Usuario_Firebase';
    protected $primaryKey = 'id_usuario_firebase';
    public $timestamps = false;

    protected $fillable = [
        'uid_firebase',
        'correo',
        'id_tipo_usuario',
    ];
}

