<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    use HasFactory;
    
    protected $table = 'Valoracion';
    protected $primaryKey = 'id_valoración';
    public $timestamps = false;

    protected $fillable = [
        'id_cliente', 'id_producto', 'puntuacion', 'comentario', 'fecha'
    ];

    protected $casts = [
        'fecha' => 'datetime'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente', 'id_cliente')
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto', 'id_producto')
    }
}
