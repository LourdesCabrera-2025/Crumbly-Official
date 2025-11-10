<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'Pedido';
    protected $primaryKey = 'id_pedido';
    public $timestamps = false;

    protected $fillable = [
        'id_cliente',
        'fecha_pedido',
        'total',
        'id_estado_pedido'
    ];

    protected $casts = [
        'fecha_pedido' => 'datetime',
        'total' => 'decimal:2'
    ];

    // Relations
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente', 'id_cliente');
    }

    public function estadoPedido()
    {
        return $this->belongsTo(EstadoPedido::class, 'id_estado_pedido');
    }

    public function detallesPedido()
    {
        return $this->hasMany(DetallePedido::class, 'id_pedido');
    }

    public function pagos()
    {
        return $this->hasMany(PagoPedido::class, 'id_pedido');
    }

    public function entrega()
    {
        return $this->hasOne(EntregaPedido::class, 'id_pedido');
    }
}