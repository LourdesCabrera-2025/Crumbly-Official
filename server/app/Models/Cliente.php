<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table = 'Cliente';
    protected $primaryKey = 'id_cliente';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = ['nombre',
    'correo',
    'ciudad',
    'cp'
    ];

    /**
    *Un cliente puede tener muchas direcciones
    **/ 
    
    public function direcciones()
    {
        return $this->hasMany(Direccion::class, 'id_cliente','id_cliente');
    }
    
    /**
    * Un cliente puede tener muchos pedidos
    */
    
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'id_cliente','id_cliente');
    }
    
    /**
    * Un cliente puede tener muchas valoraciones
    */
    
    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class, 'id_cliente','id_cliente');
    }
}
