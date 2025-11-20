<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EntregaPedido extends Model
{
    use HasFactory;
    
    protected $table = 'Entrega_Pedido';
    protected $primaryKey = 'id_entrega';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'id_pedido',
        'id_direccion',
        'fecha_entrega'
    ];
    
    /**
    * Una entrega pertenece a un pedido
    */
    
    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido',
        'id_pedido');
    }
    
    /**
    * Una entrega tiene una dirección de entrega
    */
    
    public function direccion()
    {
        return $this->belongsTo(Direccion::class, 'id_direccion',
        'id_direccion');
    }
}
