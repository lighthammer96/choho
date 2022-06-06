<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AsesoresClientes extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = "asesores_clientes";


    public function obtener_clientes($codigo_asesor) {

        $sql = "SELECT c.id_cliente, '' AS total_pedidos, c.nombres AS 'name' FROM clientes AS c
        INNER JOIN asesores_clientes AS ac ON(c.id_cliente=ac.id_cliente)
        WHERE ac.codigo_asesor='{$codigo_asesor}'";

        return DB::select($sql);

    }
}
