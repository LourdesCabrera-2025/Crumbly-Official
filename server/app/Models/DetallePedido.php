<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    use HasFactory;

    protected $table = 'Detalle_Pedido';
    protected $primaryKey = 'id_detalle';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id_pedido',
        'id_producto',
        'cantidad',
        'subtotal'  // Se calcula automáticamente en el controlador
    ];

    /**
     * Un detalle de pedido pertenece a un pedido
     */
    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido', 'id_pedido');
    }

    /**
     * Un detalle de pedido pertenece a un producto
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto', 'id_producto');
    }
}
