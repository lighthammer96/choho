<?php

namespace Database\Seeders;

use App\Models\Asesores;
use App\Models\AsesoresClientes;
use App\Models\Clientes;
use App\Models\DetallePedidos;
use App\Models\Pedidos;
use App\Models\Productos;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // registramos clientes de prueba
        $cliente = new Clientes();
        $cliente->id_cliente = 1;
        $cliente->nombres = "Claudia Peñaherrera Mora";
        $cliente->save();

        $cliente = new Clientes();
        $cliente->id_cliente = 2;
        $cliente->nombres = "Roxana Isabel Delgado Perez";
        $cliente->save();

        $cliente = new Clientes();
        $cliente->id_cliente = 3;
        $cliente->nombres = "Anabelen Naomi Reategui";
        $cliente->save();

        $cliente = new Clientes();
        $cliente->id_cliente = 4;
        $cliente->nombres = "David Zamora Panduro";
        $cliente->save();

        $cliente = new Clientes();
        $cliente->id_cliente = 5;
        $cliente->nombres = "Robert Bryan Berru Pinedo";
        $cliente->save();

         // registramos asesores de prueba
        $asesor = new Asesores();
        $asesor->codigo_asesor = "C001";
        $asesor->nombres = "Diego Alexander Rodiguez";
        $asesor->save();

        $asesor = new Asesores();
        $asesor->codigo_asesor = "C002";
        $asesor->nombres = "Manuel Salazar";
        $asesor->save();

        $asesor = new Asesores();
        $asesor->codigo_asesor = "C003";
        $asesor->nombres = "Erick Inche";
        $asesor->save();

        // asiganos clientes a los asesores de prueba
        $asesores_clientes = new AsesoresClientes();
        $asesores_clientes->codigo_asesor = "C001";
        $asesores_clientes->id_cliente = 2;
        $asesores_clientes->save();

        $asesores_clientes = new AsesoresClientes();
        $asesores_clientes->codigo_asesor = "C003";
        $asesores_clientes->id_cliente = 3;
        $asesores_clientes->save();

    
        $asesores_clientes = new AsesoresClientes();
        $asesores_clientes->codigo_asesor = "C002";
        $asesores_clientes->id_cliente = 4;
        $asesores_clientes->save();

        
        $asesores_clientes = new AsesoresClientes();
        $asesores_clientes->codigo_asesor = "C001";
        $asesores_clientes->id_cliente = 1;
        $asesores_clientes->save();

        $asesores_clientes = new AsesoresClientes();
        $asesores_clientes->codigo_asesor = "C001";
        $asesores_clientes->id_cliente = 5;
        $asesores_clientes->save();

        // registramos productos de prueba
        $producto = new Productos();
        $producto->id_producto = 1;
        $producto->tipo = "cadenas";
        $producto->save();

        $producto = new Productos();
        $producto->id_producto = 2;
        $producto->tipo = "baterias";
        $producto->save();

        $producto = new Productos();
        $producto->id_producto = 3;
        $producto->tipo = "llantas";
        $producto->save();


        // registramos pedidos de prueba
        $pedido = new Pedidos();
        $pedido->id_pedido = 1;
        $pedido->fecha_pago = "2022-06-01";
        $pedido->id_cliente = 2;
        $pedido->codigo_asesor = "C001";
        $pedido->total_pedido = 30.00;
        $pedido->estado = 0;
        $pedido->save();

        $pedido = new Pedidos();
        $pedido->id_pedido = 2;
        $pedido->fecha_pago = "2022-06-02";
        $pedido->id_cliente = 3;
        $pedido->codigo_asesor = "C003";
        $pedido->total_pedido = 60.00;
        $pedido->estado = 1;
        $pedido->save();

        $pedido = new Pedidos();
        $pedido->id_pedido = 3;
        $pedido->fecha_pago = "2022-06-05";
        $pedido->id_cliente = 4;
        $pedido->codigo_asesor = "C002";
        $pedido->total_pedido = 160.00;
        $pedido->estado = 1;
        $pedido->save();


        // registramos el detalle de los pedidos
        $detalle_pedido = new DetallePedidos();
        $detalle_pedido->id_pedido = 1;
        $detalle_pedido->id_producto = 1;
        $detalle_pedido->cantidad = 1;
        $detalle_pedido->valor_unitario = 10.00;
        $detalle_pedido->total = 10.00;
        $detalle_pedido->save();

        $detalle_pedido = new DetallePedidos();
        $detalle_pedido->id_pedido = 1;
        $detalle_pedido->id_producto = 2;
        $detalle_pedido->cantidad = 1;
        $detalle_pedido->valor_unitario = 20.00;
        $detalle_pedido->total = 20.00;
        $detalle_pedido->save();


        $detalle_pedido = new DetallePedidos();
        $detalle_pedido->id_pedido = 2;
        $detalle_pedido->id_producto = 3;
        $detalle_pedido->cantidad = 2;
        $detalle_pedido->valor_unitario = 30.00;
        $detalle_pedido->total = 60.00;
        $detalle_pedido->save();


        $detalle_pedido = new DetallePedidos();
        $detalle_pedido->id_pedido = 3;
        $detalle_pedido->id_producto = 2;
        $detalle_pedido->cantidad = 2;
        $detalle_pedido->valor_unitario = 40.00;
        $detalle_pedido->total = 80.00;
        $detalle_pedido->save();

        $detalle_pedido = new DetallePedidos();
        $detalle_pedido->id_pedido = 3;
        $detalle_pedido->id_producto = 1;
        $detalle_pedido->cantidad = 8;
        $detalle_pedido->valor_unitario = 10.00;
        $detalle_pedido->total = 80.00;
        $detalle_pedido->save();
       

    }
}
