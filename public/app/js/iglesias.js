var iglesias = new BASE_JS('iglesias', 'iglesias');
var principal = new BASE_JS('principal', 'principal');
var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
// console.log(session['iddivision']);
document.addEventListener("DOMContentLoaded", function() {
    iglesias.buscarEnFormulario("descripcion").solo_letras();
    iglesias.buscarEnFormulario("tipoestructura").solo_letras();
    iglesias.buscarEnFormulario("telefono").solo_numeros();
    
    iglesias.TablaListado({
        tablaID: '#tabla-iglesias',
        url: "/buscar_datos",
    });


    principal.select({
        name: 'idcategoriaiglesia',
        url: '/obtener_categorias_iglesia',
        placeholder: seleccione,
    
    })

    // principal.select({
    //     name: 'idtipoconstruccion',
    //     url: '/obtener_tipos_construccion',
    //     placeholder: seleccione,
    
    // })


    // principal.select({
    //     name: 'idtipodocumentacion',
    //     url: '/obtener_tipos_documentacion',
    //     placeholder: seleccione,
    
    // })

    // principal.select({
    //     name: 'idtipoinmueble',
    //     url: '/obtener_tipos_inmueble',
    //     placeholder: seleccione,
    
    // })


    // principal.select({
    //     name: 'idcondicioninmueble',
    //     url: '/obtener_condicion_inmueble',
    //     placeholder: seleccione,
    
    // })

    iglesias.select({
        name: 'idiglesia',
        url: '/obtener_iglesias',
        placeholder: seleccione,
    
    })




    principal.select({
        name: 'iddepartamento',
        url: '/obtener_departamentos',
        placeholder: seleccione
    }).then(function() {
        
        $("#iddepartamento").trigger("change", ["", ""]);
        $("#idprovincia").trigger("change", ["", ""]);
    }) 



    $(document).on('change', '#iddepartamento', function(event, iddepartamento, idprovincia) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
        d_id = (typeof iddepartamento != "undefined" && iddepartamento != null) ? iddepartamento : d_id;
        var selected = (typeof idprovincia != "undefined")  ? idprovincia : "";
    
        principal.select({
            name: 'idprovincia',
            url: '/obtener_provincias',
            placeholder: seleccione,
            selected: selected,
            datos: { iddepartamento: d_id }
        }).then(function() {
        
            var condicion = typeof iddepartamento == "undefined" && iddepartamento != "";
            condicion = condicion && typeof idprovincia == "undefined" && idprovincia != "";
        
            if(condicion) {
                // var required = true;
                // required = required && iglesias.required("iddepartamento");
                // if(required) {
                    $("#idprovincia")[0].selectize.focus();
                // }
            } 
        
        
            
        })

    });


    $(document).on('change', '#idprovincia', function(event, idprovincia, iddistrito) {

        var p_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
        p_id = (typeof idprovincia != "undefined") ? idprovincia : p_id;
        var selected = (typeof iddistrito != "undefined")  ? iddistrito : "";

        
        principal.select({
            name: 'iddistrito',
            url: '/obtener_distritos',
            placeholder: seleccione,
            selected: selected,
            datos: { idprovincia:  p_id }
        }).then(function() {
            iglesias.enter("iddistrito","iddistritomisionero");
            
            var condicion = typeof idprovincia == "undefined" && idprovincia != "";
            condicion = condicion && typeof iddistrito == "undefined" && iddistrito != "";

            if(condicion) {
                // var required = true;
                // required = required && iglesias.required("idprovincia");
                // if(required) {
                    $("#iddistrito")[0].selectize.focus();
                // }
            
            } 
        })


    });

    
    function jerarquia(pais_id) {
      
        $(".jerarquia").hide();
        var jerarquia = document.getElementsByClassName("jerarquia");
        var promise = paises.ajax({
            url: '/obtener_jerarquia',
            datos: { pais_id: pais_id
             }
        }).then(function(response) {
            if(response.length > 0) {
                //  $("#pais_id").trigger("change", [response[0].pais_id]);
                for (let index = 0; index < jerarquia.length; index++) {
                    if(typeof response[index] != "undefined") {
                        // console.log($(jerarquia[index]).find("label")[0]);
                        $(jerarquia[index]).show();
                        // $(jerarquia[index]).find("label").text(jerarquia_traductor[response[index].descripcion]);
                        if(typeof jerarquia_traductor[response[index].descripcion] == "undefined") {
                            $(jerarquia[index]).find("label").text("-.-");
                        } else {

                            $(jerarquia[index]).find("label").text(jerarquia_traductor[response[index].descripcion]);
                        }
                    }
                
                    
                }
            }
            
            //console.log(response);
        })
        return promise;
        
    }


    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones',
        placeholder: seleccione
    }).then(function() {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", "", ""]);
        $("#idunion").trigger("change", ["", ""]);
        $("#idmision").trigger("change", ["", ""]);
        $("#iddistritomisionero").trigger("change", ["", ""]);
        $("#idiglesia").trigger("change", ["", ""]);
        
        
    }) 

    $(document).on('change', '#iddivision', function(event, iddivision, pais_id) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session['iddivision'];     
        d_id = (typeof iddivision != "undefined" && iddivision != null) ? iddivision : d_id;
        var selected = (typeof pais_id != "undefined")  ? pais_id : "";
    
        paises.select({
            name: 'pais_id',
            url: '/obtener_paises_asociados',
            placeholder: seleccione,
            selected: selected,
            datos: { iddivision: d_id }
        }).then(function(response) {
            
            var condicion = typeof iddivision == "undefined" && iddivision != "";
            condicion = condicion && typeof pais_id == "undefined" && pais_id != "";
        
            if(condicion) {
                // var required = true;
                // required = required && iglesias.required("iddivision");
                // if(required) {
                    $("#pais_id")[0].selectize.focus();
                // }
            } 
        
        })
    });



    $(document).on('change', '#pais_id', function(event, pais_id, idunion, iddepartamento) {
        
        // var valor = "1|S"; 
        var valor = session['pais_id'] + "|" + session['posee_union']; 

        if($(this).val() != "" && $(this).val() != null) {
            valor = $(this).val();
        } 

        if(pais_id != "" && pais_id != null) {
            valor = pais_id;
        } 
        var array = valor.toString().split("|");
        //var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;   
    
        var d_id = array[0];
        var posee_union = array[1];
    
        var selected = (typeof idunion != "undefined")  ? idunion : "";
        var selected_iddepartamento = (typeof iddepartamento != "undefined")  ? iddepartamento : "";
        jerarquia(d_id);

        uniones.select({
            name: 'idunion',
            url: '/obtener_uniones_paises',
            placeholder: seleccione,
            selected: selected,
            datos: { pais_id: d_id }
        }).then(function() {
        
            var condicion = typeof pais_id == "undefined" && pais_id != "";
            condicion = condicion && typeof idunion == "undefined" && idunion != "";
            condicion = condicion && typeof iddepartamento == "undefined" && iddepartamento != "";
        
            if(condicion) {
                // var required = true;
                // required = required && iglesias.required("pais_id");
                // if(required) {
                    $("#idunion")[0].selectize.focus();
                // }

                
                // if(session_pais_id != d_id) {
                    
                // }
               
            } 
        
        })
        if(posee_union == "N") {
            $(".union").hide();

            misiones.select({
                name: 'idmision',
                url: '/obtener_misiones',
                placeholder: seleccione,
                datos: { pais_id: d_id }
            })
        } else {
            $(".union").show();
        }


        principal.select({
            name: 'iddepartamento',
            url: '/obtener_departamentos',
            placeholder: seleccione,
            selected: selected_iddepartamento,
            datos: { pais_id: d_id }
        }).then(function() {
            var condicion = typeof pais_id == "undefined" && pais_id != "";
            condicion = condicion && typeof iddepartamento == "undefined" && iddepartamento != "";

            if(condicion) {
                $("#iddepartamento").trigger("change", ["", ""]);
                $("#idprovincia").trigger("change", ["", ""]);  
            }
        }) 
        
    });



    $(document).on('change', '#idunion', function(event, idunion, idmision) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idunion"];     
        d_id = (typeof idunion != "undefined" && idunion != null) ? idunion : d_id;
        var selected = (typeof idmision != "undefined")  ? idmision : "";
    
        misiones.select({
            name: 'idmision',
            url: '/obtener_misiones',
            placeholder: seleccione,
            selected: selected,
            datos: { idunion: d_id }
        }).then(function() {
        
            var condicion = typeof idunion == "undefined" && idunion != "";
            condicion = condicion && typeof idmision == "undefined" && idmision != "";
        
            if(condicion) {
                // var required = true;
                // required = required && iglesias.required("idunion");
                // if(required) {
                    $("#idmision")[0].selectize.focus();
                // }
            } 
        
        })
    });

    $(document).on('change', '#idmision', function(event, idmision, iddistritomisionero) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idmision"];     
        d_id = (typeof idmision != "undefined" && idmision != null) ? idmision : d_id;
        var selected = (typeof iddistritomisionero != "undefined")  ? iddistritomisionero : "";
    
        distritos_misioneros.select({
            name: 'iddistritomisionero',
            url: '/obtener_distritos_misioneros',
            placeholder: seleccione,
            selected: selected,
            datos: { idmision: d_id }
        }).then(function() {
        
            var condicion = typeof idmision == "undefined" && idmision != "";
            condicion = condicion && typeof iddistritomisionero == "undefined" && iddistritomisionero != "";
        
            if(condicion) {
                // var required = true;
                // required = required && iglesias.required("idmision");
                // if(required) {
                    $("#iddistritomisionero")[0].selectize.focus();
                // }
            } 
        
        })
    });




    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nueva-iglesia':
                event.preventDefault();
                jerarquia("");
                iglesias.abrirModal();
            break;

            case 'modificar-iglesia':
                event.preventDefault();
            
                modificar_iglesia();
            break;

            case 'eliminar-iglesia':
                event.preventDefault();
                eliminar_iglesia();
            break;

            case 'guardar-iglesia':
                event.preventDefault();
                guardar_iglesia();
            break;

        }

    })

    function crear_botones_iglesia(activos, inactivos, idiglesia) {
        var botones = "";
        botones += '<button id="activos" cont="'+activos+'" idiglesia="'+idiglesia+'" type="button" class="btn btn-default btn-sm" id="dar-baja">'+img_activos+'[ Ver Asociados Activos ('+activos+') ]</button>';
    
        botones += '<button id="inactivos" cont="'+inactivos+'" idiglesia="'+idiglesia+'" type="button" class="btn btn-default btn-sm" id="dar-alta">'+img_inactivos+'[ Ver Asociados Inactivos ('+inactivos+') ]</button>';

    
        document.getElementById("botones_iglesia").innerHTML = botones;
    }


    function modificar_iglesia() {
        var datos = iglesias.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = iglesias.get(datos.idiglesia);
        promise.then(function(response) {
            if(response.pais_id != null ) {
                var array_pais = response.pais_id.split("|");
                jerarquia(array_pais[0]);
            }
           
            // principal.select({
            //     name: 'iddepartamento',
            //     url: '/obtener_departamentos',
            //     placeholder: seleccione,
            //     selected: response.iddepartamento,
            //     datos: { pais_id: array_pais[0] }
            // }).then(function() {
                
            //     $("#iddepartamento").trigger("change", [response.iddepartamento, response.idprovincia]);
            //     $("#idprovincia").trigger("change", [response.idprovincia, response.iddistrito]);
            // }) 

            if(response.posee_union == "N") {
                $(".union").hide();
            } else {
                $(".union").show();
            }

            $("#iddivision").trigger("change", [response.iddivision, response.pais_id]);
            $("#pais_id").trigger("change", [response.pais_id, response.idunion, response.iddepartamento]);
            $("#idunion").trigger("change", [response.idunion, response.idmision]);
            $("#idmision").trigger("change", [response.idmision, response.iddistritomisionero]);
            $("#iddistritomisionero").trigger("change", [response.iddistritomisionero, response.idiglesia]);


            $("#iddepartamento").trigger("change", [response.iddepartamento, response.idprovincia]);
            $("#idprovincia").trigger("change", [response.idprovincia, response.iddistrito]);

            crear_botones_iglesia(response.activos, response.inactivos, response.idiglesia);
        })
    }

    function guardar_iglesia() {

        var pais_id = document.getElementsByName("pais_id")[0].value;
        var array_pais = pais_id.split("|");
      
        var required = true;
        required = required && iglesias.required("iddivision");
        required = required && iglesias.required("pais_id");
        // required = required && iglesias.required("iddivision");
        if(array_pais[1] == "S") {
            required = required && iglesias.required("idunion");
        }
        required = required && iglesias.required("idmision");
        required = required && iglesias.required("iddistritomisionero");
        // required = required && iglesias.required("idiglesia");
        required = required && iglesias.required("descripcion");
        required = required && iglesias.required("iddepartamento");
        // alert(array_pais[1]);
        if(required) {
            var promise = iglesias.guardar();
            iglesias.CerrarModal();
            // iglesias.datatable.destroy();
            // iglesias.TablaListado({
            //     tablaID: '#tabla-iglesias',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idiglesia]").chosen("destroy");
                iglesias.select({
                    name: 'idiglesia',
                    url: '/obtener_iglesias',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_iglesia() {
        var datos = iglesias.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 
        BASE_JS.sweet({
            confirm: true,
            text: eliminar_registro,
            callbackConfirm: function() {
                iglesias.Operacion(datos.idiglesia, "E");
                // iglesias.datatable.destroy();
                // iglesias.TablaListado({
                //     tablaID: '#tabla-iglesias',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "iglesias/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-iglesias').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        jerarquia("");
                        iglesias.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_iglesia();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_iglesia();
                        event.preventDefault();
                        event.stopPropagation();
                    
                        break;
                }          

            } else {
                //NO HACER NADA EN CASO DE LAS TECLAS F4 ES QUE USUALMENTE ES PARA CERRAR EL NAVEGADOR Y EL F5 QUE ES PARA RECARGAR
                if(event.code == "F4" || event.code == "F5") {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
                    
            if(event.code == "F3") {
                //PARA LOS BUSCADORES DE LOS DATATABLES
                var inputs = document.getElementsByTagName("input");
                for (let index = 0; index < inputs.length; index++) {
                    // console.log(inputs[index].getAttribute("type"));
                    if(inputs[index].getAttribute("type") == "search") {
                        inputs[index].focus();
                        
                    }
                    //console.log(botones[index].getAttribute("tecla_rapida"));
                }
                event.preventDefault();
                event.stopPropagation();
                
            }

            if(event.code == "F9") {
                
                if($('#modal-iglesias').is(':visible')) {
                    guardar_iglesia();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-iglesia").addEventListener("click", function(event) {
        event.preventDefault();
        iglesias.CerrarModal();
    })


    $(document).on("click", "#activos", function(e) {
        e.preventDefault();
        var idiglesia = $(this).attr("idiglesia");
        var cont = $(this).attr("cont");
        if(cont <= 0) {
            BASE_JS.sweet({
                text: no_hay_datos
            });
            return false;
        }
        
        window.open(BaseUrl + "/iglesias/ver_activos/"+idiglesia);
    })

    $(document).on("click", "#inactivos", function(e) {
        e.preventDefault();
        var idiglesia = $(this).attr("idiglesia");
        var cont = $(this).attr("cont");
        if(cont <= 0) {
            BASE_JS.sweet({
                text: no_hay_datos
            });
            return false;
        }
        window.open(BaseUrl + "/iglesias/ver_inactivos/"+idiglesia);
    })


})