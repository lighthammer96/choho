<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaPedidos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE TABLE pedidos(
                id_pedido INT NOT NULL AUTO_INCREMENT,
                fecha_pago DATE,
                id_cliente INT,
                codigo_asesor CHAR(4),
                total_pedido DECIMAL(6,2),
                estado INT COMMENT '0 -> PENDIENTE\r\n1 -> PAGADO',
                CONSTRAINT pk_pedidos PRIMARY KEY(id_pedido),
                CONSTRAINT fk_clientes_pedidos FOREIGN KEY(id_cliente) REFERENCES clientes(id_cliente),
                CONSTRAINT fk_asesores_pedidos FOREIGN KEY(codigo_asesor) REFERENCES asesores(codigo_asesor)
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
            DROP TABLE pedidos;
        ');
    }
}
