<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Producto
 * 
 * @property string $id_producto
 * @property string $nombre
 * @property string|null $descripcion
 * @property float $precio
 * @property int|null $id_categoria
 * @property string|null $id_admin
 * @property int|null $id_estado_producto
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Categoria|null $categorium
 * @property EstadoProducto|null $estado_producto
 * @property Administrador|null $administrador
 * @property Collection|DetallePedido[] $detalle_pedidos
 * @property Collection|Ofertum[] $oferta
 * @property Collection|ProductoTalla[] $producto_tallas
 * @property Collection|Valoracion[] $valoracions
 *
 * @package App\Models
 */
class Producto extends Model
{
	protected $table = 'producto';
	protected $primaryKey = 'id_producto';
	public $incrementing = false;

	protected $casts = [
		'precio' => 'float',
		'id_categoria' => 'int',
		'id_estado_producto' => 'int'
	];

	protected $fillable = [
		'nombre',
		'descripcion',
		'precio',
		'id_categoria',
		'id_admin',
		'id_estado_producto'
	];

	public function categorium()
	{
		return $this->belongsTo(Categoria::class, 'id_categoria');
	}

	public function estado_producto()
	{
		return $this->belongsTo(EstadoProducto::class, 'id_estado_producto');
	}

	public function administrador()
	{
		return $this->belongsTo(Administrador::class, 'id_admin');
	}

	public function detalle_pedidos()
	{
		return $this->hasMany(DetallePedido::class, 'id_producto');
	}

	public function oferta()
	{
		return $this->hasMany(Ofertas::class, 'id_producto');
	}

	public function producto_tallas()
	{
		return $this->hasMany(ProductoTalla::class, 'id_producto');
	}

	public function valoracions()
	{
		return $this->hasMany(Valoracion::class, 'id_producto');
	}
}
