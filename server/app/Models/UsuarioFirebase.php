<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UsuarioFirebase extends Model implements JWTSubject
{
    use HasFactory;

    protected $table = 'usuario_firebase';
    protected $primaryKey = 'id_usuario_firebase';

    protected $casts = [
        'email_verified' => 'bool',
        'id_tipo_usuario' => 'int',
    ];

    protected $fillable = [
        'firebase_uid',
        'display_name',
        'email',
        'photo_url',
        'provider',
        'email_verified',
        'id_tipo_usuario',
        'id_cliente',
    ];

    // Relaciones
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente');
    }

    public function tipo_usuario()
    {
        return $this->belongsTo(TipoUsuario::class, 'id_tipo_usuario');
    }

    // Métodos requeridos por JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}