<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    use HasFactory;

    protected $table = 'Direccion';
    protected $primaryKey = 'id_direccion';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id_cliente',
        'direccion',
        'ciudad',
        'cp'
    ];

    /**
     * Una direccion pertenece a un cliente
     */
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente', 'id_cliente');
    }
}
