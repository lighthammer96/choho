var resoluciones = new BASE_JS('resoluciones', 'resoluciones');
var propuestas_temas = new BASE_JS('propuestas_temas', 'propuestas');
var propuestas_elecciones = new BASE_JS('propuestas_elecciones', 'propuestas');
var propuestas = new BASE_JS('propuestas', 'propuestas');

document.addEventListener("DOMContentLoaded", function() {
  

  
    var eventClick = new Event('click');

    resoluciones.enter("resolucion_descripcion","tipconv_id");
    resoluciones.enter("tipconv_id","resolucion_anio");
  
    resoluciones.enter("resolucion_fecha_inicio","resolucion_fecha_fin");
    resoluciones.enter("resolucion_fecha_fin","estado");
    resoluciones.enter("estado","detalle");
    resoluciones.enter("detalle","fecha");
    resoluciones.enter("fecha","hora");


    resoluciones.TablaListado({
        tablaID: '#tabla-resoluciones',
        url: "/buscar_datos",
    });


    
    function activar_entradas() {
        $(".traduccion").hide();
        $(".entrada").removeAttr("readonly");
        $(".select").removeAttr("disabled");
        // $(".traduccion").find("input").att("readonly", "readonly");
        // $(".traduccion").find("textarea").att("readonly", "readonly");
        // $("#pt_estado").removeAttr("disabled");
        // $("#pt_estado").removeAttr("readonly");
        $("#tr_idioma_origen").attr("readonly", "readonly");
        $("#tr_idioma_origen").attr("disabled", "disabled");
        $("#tr_idioma_traduccion").attr("readonly", "readonly");
        $("#tr_idioma_traduccion").attr("disabled", "disabled");
        $("input[name=resolucion_anio_correlativo]").attr("readonly", "readonly");
        $("input[name=tr_titulo_propuesta]").attr("readonly", "readonly");

      
    }

    function desactivar_entradas() {
        $(".traduccion").show();
        $(".entrada").attr("readonly", "readonly");
        $(".select").attr("disabled", "disabled");
        $(".traduccion").find("input").removeAttr("readonly");
        $(".traduccion").find("textarea").removeAttr("readonly");
        // $("#estado").removeAttr("disabled");
        // $("#estado").removeAttr("readonly");
        $("#tr_idioma_origen").removeAttr("readonly");
        $("#tr_idioma_origen").removeAttr("disabled");
        $("#tr_idioma_traduccion").removeAttr("readonly");
        $("#tr_idioma_traduccion").removeAttr("disabled");
        
        $("input[name=resolucion_anio_correlativo]").attr("readonly", "readonly");
        $("input[name=tr_titulo_propuesta]").attr("readonly", "readonly");
        $("#resolucion_estado").removeAttr("disabled");
        $("#resolucion_estado").removeAttr("readonly");
        // console.log($(".traduccion").find("select"));
        // $(".traduccion").find("select").prop("disabled", false);

       
    }


     function cambiar_row_1(tipo) {

        var html = '';
        if(tipo == "origen") {
      
            // html += '<div class="col-md-3  col-md-offset-6">';
            // html += '   <label class="control-label">'+estado+'</label>';
            // html += '   <select name="estado" id="estado" class="form-control input-sm entrada select" default-value="A">';
            // html += '       <option value="A">'+estado_activo+'</option>';
            // html += '       <option value="I">'+estado_inactivo+'</option>';
            // html += '   </select>';
            // html += '</div>';
            html += '<div class="col-md-3 col-md-offset-9" style="">';
            html += '   <label class="control-label">'+idioma+'</label>';
            html += '   <select class="entrada form-control input-sm select" name="tr_idioma" id="tr_idioma" default-value="es">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
        }


        if(tipo == "traduccion") {
            // html += '<div class="col-md-3  col-md-offset-3>';
            // html += '   <label class="control-label">'+estado+'</label>';
            // html += '   <select name="estado" id="estado" class="form-control input-sm entrada select" default-value="A">';
            // html += '       <option value="A">'+estado_activo+'</option>';
            // html += '       <option value="I">'+estado_inactivo+'</option>';
            // html += '   </select>';
            // html += '</div>';
            html += '<div class="col-md-3 col-md-offset-6" style="">';
            html += '   <label class="control-label">'+de_traducir+'</label>';
            html += '   <select class="form-control input-sm select" name="tr_idioma_origen" id="tr_idioma_origen" default-value="es">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
            html += '<div class="col-md-3" style="">';
            html += '   <label class="control-label">'+a+'</label>';
            html += '   <select class="entrada form-control input-sm select" name="tr_idioma_traduccion" id="tr_idioma_traduccion" default-value="en">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
        }
        // alert(tipo);
        // alert(html);

        document.getElementsByClassName("cambiar-row-1")[0].innerHTML = html;

        $(document).on("change", "#tr_idioma_origen", function(e) {
            // alert(this.value);
            var idioma = $(this).val();
            var resolucion_id = document.getElementsByName("resolucion_id")[0].value;
            var promise = resoluciones.get(resolucion_id+'|'+idioma);
            promise.then(function(response) {
                obtener_descripcion_propuestas(response.propuesta_id, idioma, response.tabla);
            })

        })
        $(document).on("change", "#tr_idioma_traduccion", function(e) {
            // alert(this.value);
            var idioma = $(this).val();
            var resolucion_id = document.getElementsByName("resolucion_id")[0].value;

              
            var promise =  resoluciones.ajax({
                url: '/get_resoluciones',
                datos: { id: resolucion_id+'|'+idioma }
            })

            
            promise.then(function(response) {
                // alert(response.length);
                if(response.length > 0) {
                    // alert(response[0].tr_descripcion);
                    $("textarea[name=tr_descripcion_traduccion]").val(response[0].tr_descripcion);
                    
                }
            })


        })
      
    
    }



    document.getElementById("nueva-resolucion").addEventListener("click", function(event) {
        event.preventDefault();
        cambiar_row_1("origen");
        resoluciones.abrirModal();
        $("#imprimir").hide();
        $("#buscar_propuesta").css("visibility", "visible");
        activar_entradas();
        
    })

    document.getElementById("modificar-resolucion").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = resoluciones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 

        if(datos.estado_resolucion == 2) {
            BASE_JS.sweet({
                text: registro_enviado_traduccion
            });
            return false;
        } 

        
        if(datos.estado_resolucion == 3) {
            BASE_JS.sweet({
                text: registro_traduccion_terminado
            });
            return false;
        } 


        cambiar_row_1("origen");
        var idioma = $("#tr_idioma").val();
        var promise = resoluciones.get(datos.resolucion_id+'|'+idioma);

        promise.then(function(response) {
            activar_entradas();
            if(response.tabla == "asambleas.propuestas_elecciones") {
                cargar_datos_propuestas_elecciones(response);
            }

            if(response.tabla == "asambleas.propuestas_temas") {
                cargar_datos_propuestas_temas(response);

            }
            $("#imprimir").hide();
            $("#buscar_propuesta").css("visibility", "hidden");
        })
        

    })


    document.getElementById("traducir-resolucion").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = resoluciones.datatable.row('.selected').data();
        // console.table(datos);
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 

        if(datos.estado_resolucion == 1) {
            BASE_JS.sweet({
                text: registro_estado_enviado_traduccion
            });
            return false;
        } 

        if(datos.estado_resolucion == 3) {
            BASE_JS.sweet({
                text: registro_traduccion_terminado
            });
            return false;
        } 

    

        cambiar_row_1("traduccion");
        var idioma = $("#tr_idioma_origen").val();
        var promise = resoluciones.get(datos.resolucion_id+'|'+idioma);

        promise.then(function(response) {
            desactivar_entradas();

            if(response.tabla == "asambleas.propuestas_elecciones") {
                cargar_datos_propuestas_elecciones(response);
            }

            if(response.tabla == "asambleas.propuestas_temas") {
                cargar_datos_propuestas_temas(response);

            }
            $("#imprimir").hide();
            $("#buscar_propuesta").css("visibility", "hidden");
        });

        var idioma = 'en';
        

          
        var promise =  resoluciones.ajax({
            url: '/get_resoluciones',
            datos: { id: datos.resolucion_id+'|'+idioma }
        })

        
        promise.then(function(response) {
            // alert(response.length);
            if(response.length > 0) {
                // alert(response[0].tr_descripcion);
                $("textarea[name=tr_descripcion_traduccion]").val(response[0].tr_descripcion);
                
            }
        })

    })

    document.getElementById("eliminar-resolucion").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = resoluciones.datatable.row('.selected').data();
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
                resoluciones.Operacion(datos.resolucion_id, "E");
            }
        });

        
    })




    document.getElementById("guardar-resolucion").addEventListener("click", function(event) {
        event.preventDefault();
 
        var resolucion_id = document.getElementsByName("resolucion_id")[0].value;
        var propuesta_id = document.getElementsByName("propuesta_id")[0].value;

        var required = true;
        if(resolucion_id == "") {

            required = required && resoluciones.required("tabla");
            required = required && resoluciones.required("tr_idioma");
            required = required && resoluciones.required("resolucion_anio_correlativo");
            if(propuesta_id == "") {
                required = required && resoluciones.required("tr_titulo_propuesta");
            }
            required = required && resoluciones.required("tr_descripcion");
            required = required && resoluciones.required("estado");
       
        }

        var detalle = document.getElementById("detalle-resultados").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        if(detalle.length <= 0) {
            BASE_JS.sweet({
                text: no_guardar_resolucion_sin_resultados
            });
           return false;
        } 
        if(required) {
            BASE_JS.sweet({
                confirm: true,
                text: guardar_resolucion,
                callbackConfirm: function() {
                    var promise = resoluciones.guardar();
                    resoluciones.CerrarModal();
                    promise.then(function(response) {
                        if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                            return false;
                        }

                
                        
                    })
                }
            });
            

        }
    })


    document.getElementById("ver-resolucion").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = resoluciones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 

    


        cambiar_row_1("origen");
        var idioma = $("#tr_idioma").val();
        var promise = resoluciones.ver(datos.resolucion_id+'|'+idioma);

        promise.then(function(response) {
           
            if(response.tabla == "asambleas.propuestas_elecciones") {
                cargar_datos_propuestas_elecciones(response);
            }

            if(response.tabla == "asambleas.propuestas_temas") {
                cargar_datos_propuestas_temas(response);

            }
            $("#imprimir").show();
            $("#tr_idioma").removeAttr("disabled");
            $("#imprimir").removeAttr("disabled");
            $("#buscar_propuesta").css("visibility", "hidden");

        })
        

    })




    document.addEventListener("keydown", function(event) {
        // console.log(event.target.name);
        // alert(modulo_controlador);
        if(modulo_controlador == "resoluciones/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-resoluciones').is(':visible')) {
                var botones = document.getElementsByTagName("button");
                for (let index = 0; index < botones.length; index++) {
                    if(botones[index].getAttribute("tecla_rapida") != null) {
                        if(botones[index].getAttribute("tecla_rapida") == event.code) {
                            document.getElementById(botones[index].getAttribute("id")).dispatchEvent(eventClick);
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                    //console.log(botones[index].getAttribute("tecla_rapida"));
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
            
                if($('#modal-resoluciones').is(':visible')) {
                    document.getElementById('guardar-resolucion').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-resolucion").addEventListener("click", function(event) {
        event.preventDefault();
        resoluciones.CerrarModal();
    })

 

    
    document.addEventListener("click", function(event) {

        // console.log(event.target.classList);
        // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
        if(event.target.classList.value.indexOf("eliminar-agenda") != -1) {
            event.preventDefault();
            event.srcElement.parentNode.parentNode.parentNode.remove();

        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-agenda") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
        }


      
    })


   
    function cargar_resultados(propuesta_id, tabla) {
      
        propuestas_elecciones.ajax({
            url: '/obtener_resultados',
            datos: { tabla: tabla, propuesta_id: propuesta_id }
        }).then(function(response) {
            if(response.length > 0) {
                
                var html = '';
                var resultado_ids = [];
                // if(response[0].fv_id == 6) {
                    for(let i = 0; i < response.length; i++){

                        
                        html += '<tr>';
                        html += '   <td>'+response[i].resultado_descripcion+'</td>';
                        html += '   <td >'+response[i].resultado_votos+'</td>';
                        
                        if(document.getElementsByName("resolucion_id")[0].value == "") {
                            html += '   <td><input resultado_votos="'+response[i].resultado_votos+'" resultado_id="'+response[i].resultado_id+'" cont="'+i+'" type="number" autofocus="autofocus" class="form-control input-sm" name="mano_alzada[]" value="'+response[i].resultado_mano_alzada+'"/></td>';
                        } else {
                            html += '   <td>'+response[i].resultado_mano_alzada+'</td>';
                        }
                       
                        html += '   <td class="total">'+response[i].resultado_total+'</td>';
                        if(tabla == 'asambleas.propuestas_elecciones') {
                            if(response[i].resultado_ganador == "S") {

                                html += '   <td ><center><button type="button" class="btn btn-success btn-xs"><i class="fa fa-check"></i></button></center></td>';
                               
                            } else {

                                html += '   <td ><center><button type="button" class="btn btn-danger btn-xs"><i class="fa fa-close"></i></button></center></td>';
                            }
                            $(".ganador").show();
                        } else {
                            $(".ganador").hide();
                        }
                       
                        html += '</tr>';
                        resultado_ids.push(response[i].resultado_id);
                    }   
                    // console.log(resultado_ids);

                    document.getElementsByName("resultado_ids")[0].value = resultado_ids.join(",");
                // }

               
                
                document.getElementById("detalle-resultados").getElementsByTagName("tbody")[0].innerHTML = html;
                $("#detalle-resultados").show();
            } else {
                BASE_JS.sweet({
                    text: no_hay_resultados
                });
            }
        })
    }
    document.getElementById("buscar_propuesta").addEventListener("click", function(event) {
        event.preventDefault();
        
        var tabla = $("#tabla").val();
        var required = true;
        var idioma_codigo = $("#tr_idioma").val();
        required = required && resoluciones.required("tabla");
        if(required) {
            if(tabla == "asambleas.propuestas_temas") {
                if(typeof propuestas_temas.datatable.length != "undefined") {
                    propuestas_temas.datatable.destroy();
                }
                propuestas_temas.TablaListado({
                    tablaID: '#tabla-propuestas-temas',
                    url: "/buscar_datos",
                    con_votacion: 'S',
                    idioma_codigo: idioma_codigo
                });

               
                $("#modal-propuestas-temas").modal("show");
            }

            if(tabla == "asambleas.propuestas_elecciones") {
                if(typeof propuestas_elecciones.datatable.length != "undefined") {
                    propuestas_elecciones.datatable.destroy();
                }
                propuestas_elecciones.TablaListado({
                    tablaID: '#tabla-propuestas-elecciones',
                    url: "/buscar_datos_elecciones",
                    con_votacion: 'S',
                    idioma_codigo: idioma_codigo
                });


                $("#modal-propuestas-elecciones").modal("show");
            }
        }
    })


    function cargar_datos_propuestas_temas(datos) {
        
        resoluciones.limpiarDatos("datos-propuesta");
        // console.log(datos);
        resoluciones.asignarDatos(datos);

        cargar_resultados(datos.propuesta_id, 'asambleas.propuestas_temas');
        $("#modal-propuestas-temas").modal("hide");
        

    }
    

    $("#tabla-propuestas-temas").on('key.dt', function(e, datatable, key, cell, originalEvent){
        if(key === 13){
            var datos = propuestas_temas.datatable.row(cell.index().row).data();

            cargar_datos_propuestas_temas({propuesta_id: datos.pt_id, tr_titulo_propuesta:  datos.tpt_titulo, resolucion_anio_correlativo: datos.anio+'-'+datos.pt_correlativo, tr_propuesta: datos.tpt_propuesta});
        }
    });

    $('#tabla-propuestas-temas').on('dblclick', 'tr', function () {
        var datos = propuestas_temas.datatable.row( this ).data();
        cargar_datos_propuestas_temas({propuesta_id: datos.pt_id, tr_titulo_propuesta:  datos.tpt_titulo, resolucion_anio_correlativo: datos.anio+'-'+datos.pt_correlativo, tr_propuesta: datos.tpt_propuesta});
    });



    
    function cargar_datos_propuestas_elecciones(datos) {
        
        resoluciones.limpiarDatos("datos-propuesta");
        // console.log(datos);
        resoluciones.asignarDatos(datos);

        cargar_resultados(datos.propuesta_id, 'asambleas.propuestas_elecciones');
        $("#modal-propuestas-elecciones").modal("hide");


    }
    

    $("#tabla-propuestas-elecciones").on('key.dt', function(e, datatable, key, cell, originalEvent){
        if(key === 13){
            var datos = propuestas_elecciones.datatable.row(cell.index().row).data();
            cargar_datos_propuestas_elecciones({propuesta_id: datos.pe_id, tr_titulo_propuesta: datos.tpe_descripcion, resolucion_anio_correlativo: datos.anio+'-'+datos.pe_correlativo, tr_propuesta: datos.tpe_detalle_propuesta});
        }
    });

    $('#tabla-propuestas-elecciones').on('dblclick', 'tr', function () {
        var datos = propuestas_elecciones.datatable.row( this ).data();
        cargar_datos_propuestas_elecciones({propuesta_id: datos.pe_id, tr_titulo_propuesta: datos.tpe_descripcion, resolucion_anio_correlativo: datos.anio+'-'+datos.pe_correlativo, tr_propuesta: datos.tpe_detalle_propuesta});
    });

    document.getElementById("tabla").addEventListener("change", function(e) {
        resoluciones.limpiarDatos("datos-propuesta");
    })


    function obtener_descripcion_propuestas(propuesta_id, tr_idioma, tabla) {
        propuestas.ajax({
            url: '/obtener_descripcion_propuestas',
            datos: { propuesta_id: propuesta_id, tr_idioma: tr_idioma, tabla: tabla }
        }).then(function(response) {
        //    console.table(response);
            if(response.length > 0 ) {
               
                $("input[name=tr_titulo_propuesta]").val(response[0].tr_titulo_propuesta);
                $("input[name=tr_propuesta]").val(response[0].tr_propuesta);
               
                
            }
           
       
        })
    }

    $(document).on('change', '#tr_idioma', function(event) {
        var resolucion_id = document.getElementsByName("resolucion_id")[0].value;
        if(resolucion_id == "") {
            var propuesta_id = document.getElementsByName("propuesta_id")[0].value;
            var tabla = document.getElementsByName("tabla")[0].value;
            if(propuesta_id == "") {
                return false;
            }
            var tr_idioma = $("#tr_idioma").val();
            obtener_descripcion_propuestas(propuesta_id, tr_idioma, tabla);
        } else {
            var idioma = $(this).val();
        
            var promise = resoluciones.get(resolucion_id+'|'+idioma);
            promise.then(function(response) {
                obtener_descripcion_propuestas(response.propuesta_id, idioma, response.tabla);
            })
        }
      

        
       

        // alert(pt_id_origen);
    })


    $(document).on("click", "#imprimir", function(e) {
        e.preventDefault();

        var resolucion_id = document.getElementsByName("resolucion_id")[0].value;
        var tr_idioma = (document.getElementsByName("tr_idioma").length > 0 ) ? document.getElementsByName("tr_idioma")[0].value : document.getElementsByName("tr_idioma_origen")[0].value;
      
        window.open(BaseUrl + "/resoluciones/imprimir_resolucion/"+resolucion_id+"|"+tr_idioma);
    })

    var format = "";
    if(idioma_codigo == "es") {
        format = "dd/mm/yyyy";
      
        $("input[name=fecha-inicio], input[name=fecha-fin]").attr("data-inputmask", "'alias': '"+format+"'");
    } else {
        format = "yyyy-mm-dd";
  
        $("input[name=fecha-inicio], input[name=fecha-fin]").attr("data-inputmask", "'alias': '"+format+"'");
        
    }


    $("input[name=fecha-inicio], input[name=fecha-fin]").inputmask();
    jQuery("input[name=fecha-inicio], input[name=fecha-fin]").datepicker({
        format: format,
        language: "es",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        // endDate: "now()",

    });

    document.getElementById("calendar-fecha-inicio").addEventListener("click", function(e) {
        e.preventDefault();
        if($("input[name=fecha-inicio]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha-inicio]").blur();
            $("input[name=fecha-inicio]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha-inicio]").focus();
            $("input[name=fecha-inicio]").addClass("focus-datepicker");
        }
    });

    document.getElementById("calendar-fecha-fin").addEventListener("click", function(e) {
        e.preventDefault();
        if($("input[name=fecha-fin]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha-fin]").blur();
            $("input[name=fecha-fin]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha-fin]").focus();
            $("input[name=fecha-fin]").addClass("focus-datepicker");
        }
    });


    
    document.getElementById("filtrar").addEventListener("click", function(event) {
        event.preventDefault();
        if(typeof resoluciones.datatable.length != "undefined") {
            resoluciones.datatable.destroy();
        }

        var fecha_inicio = document.getElementsByName("fecha-inicio")[0].value;
        var fecha_fin = document.getElementsByName("fecha-fin")[0].value;
       
       
        resoluciones.TablaListado({
            tablaID: '#tabla-resoluciones',
            url: "/buscar_datos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            
        });
    })

})

