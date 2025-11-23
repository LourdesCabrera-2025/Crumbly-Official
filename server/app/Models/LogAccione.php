<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LogAccione
 * 
 * @property int $id_log
 * @property string|null $id_admin
 * @property string|null $accion
 * @property Carbon|null $fecha
 * 
 * @property Administrador|null $administrador
 *
 * @package App\Models
 */
class LogAccione extends Model
{
	protected $table = 'log_acciones';
	protected $primaryKey = 'id_log';
	public $timestamps = false;

	protected $casts = [
		'fecha' => 'datetime'
	];

	protected $fillable = [
		'id_admin',
		'accion',
		'fecha'
	];

	public function administrador()
	{
		return $this->belongsTo(Administrador::class, 'id_admin');
	}
}
