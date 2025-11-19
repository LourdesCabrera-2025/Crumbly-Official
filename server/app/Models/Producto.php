<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'Producto';
    protected $primaryKey = 'id_producto';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'nombre', 'descripcion', 'precio', 'stock',
        'id_categoria', 'id_admin', 'id_estado_producto', 'imagen_producto'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria:: class, 'id_categoria', 'id_categoria');
    }

    public function estado() 
    {
        return $this->belongsTo(EstadoProducto::class, 'id_estado_producto', 'id_estado_producto');
    }

    public function administrador()
    {
        return $this->belongsTo(Administrador::class, 'id_admin', 'id_admin');
    }

    public function Ofertas()
    {
        return $this->hasMany(Oferta::class, 'id_producto', 'id_producto');
    }
}
