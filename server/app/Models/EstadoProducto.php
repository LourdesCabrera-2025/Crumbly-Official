<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoProducto extends Model
{
    use HasFactory;

    protected $table = 'Estado_Producto';
    protected $primaryKey = 'id_estado_producto';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nombre_estado'
    ];

    /**
     * Un estado de producto puede tener muchos productos
     */
    public function productos()
    {
        return $this->hasMany(Producto::class, 'id_estado_producto', 'id_estado_producto');
    }
}
