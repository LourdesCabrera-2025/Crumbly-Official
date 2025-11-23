<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoPedido extends Model
{
    use HasFactory;
    
    protected $table = 'Estado_Pedido';
    protected $primaryKey = 'id_estado_pedido';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'nombre_estado'
    ];
    
    /**
    * Un estado de pedido puede tener muchos pedidos
    */
    
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'id_estado_pedido',
        'id_estado_pedido');
    }
}
