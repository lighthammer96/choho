<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Asesores extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = "asesores";

    public function obtener_asesores() {
        $sql = "SELECT codigo_asesor AS id, nombres AS descripcion FROM asesores";
        return DB::select($sql);
        
    }

    public function get_asesores($codigo_asesor) {
        if(empty($codigo_asesor)) {
            $sql = "SELECT codigo_asesor, nombres AS 'name' FROM asesores";
        } else {
            $sql = "SELECT codigo_asesor, nombres AS 'name'  FROM asesores WHERE codigo_asesor='{$codigo_asesor}'";
        }
        return DB::select($sql);
        
    }
}
