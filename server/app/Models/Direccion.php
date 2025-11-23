<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Direccion
 * 
 * @property int $id_direccion
 * @property string|null $id_cliente
 * @property string $direccion
 * @property string $telefono
 * @property int|null $id_departamento
 * @property string|null $cp
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Cliente|null $cliente
 * @property Departamento|null $departamento
 * @property Collection|EntregaPedido[] $entrega_pedidos
 *
 * @package App\Models
 */
class Direccion extends Model
{
	protected $table = 'direccion';
	protected $primaryKey = 'id_direccion';

	protected $casts = [
		'id_departamento' => 'int'
	];

	protected $fillable = [
		'id_cliente',
		'direccion',
		'telefono',
		'id_departamento',
		'cp'
	];

	public function cliente()
	{
		return $this->belongsTo(Cliente::class, 'id_cliente');
	}

	public function departamento()
	{
		return $this->belongsTo(Departamento::class, 'id_departamento');
	}

	public function entrega_pedidos()
	{
		return $this->hasMany(EntregaPedido::class, 'id_direccion');
	}
}
