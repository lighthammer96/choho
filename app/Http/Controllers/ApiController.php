<?php 
namespace App\Http\Controllers;

use App\Models\Asesores;
use App\Models\Clientes;
use App\Models\Pedidos;
use App\Models\Productos;

class ApiController extends Controller
{


    public function __construct() {
        parent:: __construct();
        $this->clientes = new Clientes();
        $this->asesores = new Asesores();
        $this->productos = new Productos();
        $this->pedidos = new Pedidos();
        $this->detalle_pedidos = new DetallePedidos();
       
    }
}
?>