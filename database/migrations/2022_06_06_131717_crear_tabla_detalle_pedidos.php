<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaDetallePedidos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE TABLE detalle_pedidos(
                id_pedido INT NOT NULL,
                id_producto INT NOT NULL,
                cantidad INT,
                valor_unitario DECIMAL(6,2),
                total DECIMAL(6,2),
                CONSTRAINT pk_detalle_pedidos PRIMARY KEY(id_pedido, id_producto),
                CONSTRAINT fk_pedidos_detalle_pedidos FOREIGN KEY(id_pedido) REFERENCES pedidos(id_pedido),
                CONSTRAINT fk_productos_detalle_pedidos FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
            )
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('
            DROP TABLE detalle_pedidos;
        ');
    }
}
