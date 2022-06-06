<?php 
namespace App\Http\Controllers;

use App\Models\Asesores;
use App\Models\AsesoresClientes;
use App\Models\Clientes;
use App\Models\DetallePedidos;
use App\Models\Pedidos;
use App\Models\Productos;
use Illuminate\Http\Request;

class ApiController extends Controller
{


    public function __construct() {
     
        $this->clientes = new Clientes();
        $this->asesores = new Asesores();
        $this->productos = new Productos();
        $this->pedidos = new Pedidos();
        $this->detalle_pedidos = new DetallePedidos();
        $this->asesores_clientes = new AsesoresClientes();
       
    }

 

    public function obtener_asesores() {
        $asesores = $this->asesores->obtener_asesores();
        echo json_encode($asesores);
    }


    public function obtener_resultado(Request $request) {
        $data = $request->all();
      

        $asesores = $this->asesores->get_asesores($data["codigo_asesor"]);
       
        foreach ($asesores as $key => $value) {
            // print_R($value); exit;
            $asesores[$key]->clientes_asignados = count($this->asesores_clientes->obtener_clientes($value->codigo_asesor));
            $asesores[$key]->total_pedidos = $this->pedidos->total_pedidos_asesor($value->codigo_asesor);

            
           
            $asesores[$key]->clientes = $this->asesores_clientes->obtener_clientes($value->codigo_asesor);
            foreach ($asesores[$key]->clientes as $kc => $vc) {
                $asesores[$key]->clientes[$kc]->total_pedidos = $this->pedidos->total_pedidos_cliente($value->codigo_asesor, $vc->id_cliente);

                $asesores[$key]->clientes[$kc]->detalle_pedidos = $this->pedidos->obtener_pedidos_cliente($vc->id_cliente);


                foreach ($asesores[$key]->clientes[$kc]->detalle_pedidos as $kd => $vd) {
                    $asesores[$key]->clientes[$kc]->detalle_pedidos[$kd]->total_productos = $this->detalle_pedidos->total_productos($vd->id_pedido);

                    $asesores[$key]->clientes[$kc]->detalle_pedidos[$kd]->productos = $this->detalle_pedidos->obtener_productos($vd->id_pedido);

                }   
            }

           
        
        }

        echo json_encode($asesores);
      
    }
}
?>