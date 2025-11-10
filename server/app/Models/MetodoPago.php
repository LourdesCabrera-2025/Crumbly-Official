<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetodoPago extends Model
{
    use HasFactory;

    protected $table = 'Metodo_Pago';
    protected $primaryKey = 'id_metodo';
    public $timestamps = false;

    protected $fillable = [
        'nombre'
    ];

    // Relations
    public function pagos()
    {
        return $this->hasMany(PagoPedido::class, 'id_metodo');
    }
}