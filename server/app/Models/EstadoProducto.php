<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EstadoProducto
 * 
 * @property int $id_estado_producto
 * @property string $nombre_estado
 * 
 * @property Collection|Producto[] $productos
 *
 * @package App\Models
 */
class EstadoProducto extends Model
{
	protected $table = 'estado_producto';
	protected $primaryKey = 'id_estado_producto';
	public $timestamps = false;

	protected $fillable = [
		'nombre_estado'
	];

	public function productos()
	{
		return $this->hasMany(Producto::class, 'id_estado_producto');
	}
}
