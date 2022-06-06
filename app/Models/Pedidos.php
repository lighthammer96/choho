<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pedidos extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $table = "pedidos";


    public function total_pedidos_asesor($codigo_asesor) {
        $sql = "SELECT * FROM pedidos WHERE codigo_asesor = '{$codigo_asesor}' ";
        $pedidos = DB::select($sql);

        return count($pedidos);

    }

    
    public function total_pedidos_cliente($codigo_asesor, $id_cliente) {
        $sql = "SELECT * FROM pedidos WHERE codigo_asesor = '{$codigo_asesor}' AND id_cliente={$id_cliente}";
        $pedidos = DB::select($sql);

        return count($pedidos);

    }

    public function obtener_pedidos_cliente($id_cliente) {
        $sql = "SELECT id_pedido, '' AS 'total_productos', total_pedido, CASE WHEN estado=0 THEN 'pendiente' ELSE 'pagado' END AS estado, fecha_pago FROM pedidos WHERE id_cliente = {$id_cliente}";
        return DB::select($sql);

    }
}
