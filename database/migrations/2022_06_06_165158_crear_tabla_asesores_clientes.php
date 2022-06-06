<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaAsesoresClientes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE TABLE asesores_clientes(
                codigo_asesor CHAR(4) NOT NULL,
                id_cliente INT NOT NULL,
                CONSTRAINT pk_asesores_clientes PRIMARY KEY(codigo_asesor, id_cliente),
                CONSTRAINT fk_asesores_asesores_clientes FOREIGN KEY(codigo_asesor) REFERENCES asesores(codigo_asesor),
                CONSTRAINT fk_clientes_asesores_clientes FOREIGN KEY(id_cliente) REFERENCES clientes(id_cliente)
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
            DROP TABLE asesores_clientes;
        ');
    }
}
