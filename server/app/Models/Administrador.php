<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    use HasFactory;
    
    protected $table = 'Administrador';
    protected $primaryKey = 'id_admin';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'nombre', 'id_tipo_usuario'
    ];

    public function tipoUsuario()
    {
        return $this->belongsTo(TipoUsuario::class, 'id_tipo_usuario', 'id_tipo_usuario')
    }

    public function productos()
    {
        return $this->hasMany(Producto::class, 'id_admin', 'id_admin')
    }

    public function logs()
    {
        return $this->hasMany(LogAcciones::class, 'id_admin', 'id_admin')
    }
}
