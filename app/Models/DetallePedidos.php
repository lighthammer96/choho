<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DetallePedidos extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $table = "detalle_pedidos";


    public function total_productos($id_pedido) {
        $sql = "SELECT id_producto, COUNT(*) FROM detalle_pedidos WHERE id_pedido = {$id_pedido} GROUP BY id_producto";
        $productos = DB::select($sql);
        return count($productos);
    }


    public function obtener_productos($id_pedido) {
        $sql = "SELECT * FROM productos AS p
        INNER JOIN detalle_pedidos AS dp ON(dp.id_producto=p.id_producto)
        WHERE dp.id_pedido = {$id_pedido}";
        return DB::select($sql);

    }
}
