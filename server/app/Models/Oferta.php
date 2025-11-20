<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oferta extends Model
{
    use HasFactory;
    
    protected $table = 'Oferta';
    protected $primaryKey = 'id_oferta';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = [
        'id_producto',
        'descuento',
        'fecha_inicio',
        'fecha_fin'
    ];
    
    /**
    * Una oferta pertenece a un producto
    */
    
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto',
        'id_producto');
    }
}
