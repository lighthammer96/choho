var propuestas_elecciones = new BASE_JS('propuestas_elecciones', 'propuestas');
var propuestas_elecciones_origen = new BASE_JS('propuestas_elecciones_origen', 'propuestas');
var votaciones = new BASE_JS('votaciones', 'propuestas');
var asociados = new BASE_JS('asociados', 'asociados');
var asambleas = new BASE_JS('asambleas', 'asambleas');
var eventClick = new Event('click');
var eventChange = new Event('change');

document.addEventListener("DOMContentLoaded", function() {
  

    asambleas.select({
        name: 'asamblea_id',
        url: '/obtener_asambleas',
        placeholder: seleccione,
    })

    votaciones.select({
        name: 'fv_id',
        url: '/obtener_formas_votacion',
        placeholder: seleccione,
        datos: { fv_tipo: 'propuestas_elecciones'}
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


    propuestas_elecciones.enter("asamblea_descripcion","tipconv_id");
    propuestas_elecciones.enter("tipconv_id","asamblea_anio");
  
    propuestas_elecciones.enter("asamblea_fecha_inicio","asamblea_fecha_fin");
    propuestas_elecciones.enter("asamblea_fecha_fin","estado");
    propuestas_elecciones.enter("estado","detalle");
    propuestas_elecciones.enter("detalle","fecha");
    propuestas_elecciones.enter("fecha","hora");

    propuestas_elecciones.enter("propuesta", "propuesta", function() {
        var required = true;
        required = propuestas_elecciones.required("propuesta");
     

        if(!required) {
            return false;
        }

        var propuesta = document.getElementsByName("propuesta")[0];
        var idioma = document.getElementsByName("tpe_idioma")[0];
    
        var objeto = {
            dp_descripcion: propuesta.value,
            dp_idioma: idioma.value,
           
        }


        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(objeto));
    
        propuestas_elecciones.limpiarDatos("limpiar");
    });

    function html_detalle_propuesta(objeto, disabled) {
        var attr = '';
        var html = '';
        // if(typeof disabled != "undefined") {
        //     attr = 'disabled="disabled"';
        // }
        //alert(document.getElementsByName("tpe_descripcion")[0].readOnly);
        if(document.getElementsByName("tpe_descripcion")[0].readOnly || document.getElementsByName("tpe_descripcion")[0].disabled ) {
            attr = 'disabled="disabled"';
        }

        var tr = document.createElement("tr");

        var idmiembro = "";
        if(typeof objeto.idmiembro != "undefined") {
            idmiembro = objeto.idmiembro;
        }
      

        $("#tipo").attr("disabled", "disabled");

        if(!document.getElementsByName("tpe_descripcion")[0].readOnly && !document.getElementsByName("tpe_descripcion")[0].disabled) {

           
            html += '  <input type="hidden" name="dp_idioma[]" value="'+objeto.dp_idioma+'" >';
            html += '  <input type="hidden" name="idmiembro[]" value="'+idmiembro+'" >';
          
        }
        // alert(html);

        if((document.getElementsByName("tpe_descripcion")[0].readOnly || document.getElementsByName("tpe_descripcion")[0].disabled) && (document.getElementsByName("tpe_descripcion_traduccion")[0].readOnly || document.getElementsByName("tpe_descripcion_traduccion")[0].disabled) || document.getElementById("tipo").value != "I") {

            
            html += '  <td>'+objeto.dp_descripcion+'</td>';
            

        } 
       

        if(document.getElementById("tipo").value == "I" && ((!document.getElementsByName("tpe_descripcion")[0].readOnly  && !document.getElementsByName("tpe_descripcion")[0].disabled) || (!document.getElementsByName("tpe_descripcion_traduccion")[0].readOnly  && !document.getElementsByName("tpe_descripcion_traduccion")[0].disabled))) {
        
            html += '  <td><input class="form-control input-sm" type="text" name="dp_descripcion[]" value="'+objeto.dp_descripcion+'" ></td>';
        } else {
            if(!document.getElementsByName("tpe_descripcion")[0].readOnly && !document.getElementsByName("tpe_descripcion")[0].disabled) {
                html += '  <input type="hidden" name="dp_descripcion[]" value="'+objeto.dp_descripcion+'" >';
            }
        }


        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-propuesta"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }



    // propuestas_elecciones.enter("propuesta_traduccion", "propuesta_traduccion", function() {
    //     var required = true;
    //     required = propuestas_elecciones.required("propuesta_traduccion");
     

    //     if(!required) {
    //         return false;
    //     }

    //     var propuesta = document.getElementsByName("propuesta_traduccion")[0];
    //     var idioma = document.getElementsByName("tpe_idioma_traduccion")[0];
    
    //     var objeto = {
    //         dp_descripcion: propuesta.value,
    //         dp_idioma: idioma.value,
           
    //     }


    //     document.getElementById("detalle-propuesta-traduccion").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta_traduccion(objeto));
    
    //     propuestas_elecciones.limpiarDatos("limpiar");
    // });

    // function html_detalle_propuesta_traduccion(objeto, disabled) {
    //     var attr = '';
    //     var html = '';
    //     // if(typeof disabled != "undefined") {
    //     //     attr = 'disabled="disabled"';
    //     // }
    //     //alert(document.getElementsByName("tpe_descripcion")[0].readOnly);
    //     // if(document.getElementsByName("tpe_descripcion")[0].readOnly) {
    //     //     attr = 'disabled="disabled"';
    //     // }

    //     var tr = document.createElement("tr");

        
      
    //     html = '  <input type="hidden" name="dp_descripcion[]" value="'+objeto.dp_descripcion+'" >';
    //     html += '  <input type="hidden" name="dp_idioma[]" value="'+objeto.dp_idioma+'" >';
        
        
    //     html += '  <td>'+objeto.dp_descripcion+'</td>';

    //     html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-propuesta"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

    //     tr.innerHTML = html;
    //     return tr;
    // }



 
    $(function() {
        $('input[type="radio"], input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    })



    propuestas_elecciones.TablaListado({
        tablaID: '#tabla-propuestas-elecciones',
        url: "/buscar_datos_elecciones",
    });



    function activar_entradas() {
        $(".traduccion").hide();
        // $(".sin-traduccion").show();
        // $(".con-traduccion").hide();
        $(".entrada").removeAttr("readonly");
        $(".select").removeAttr("disabled");
        // $(".traduccion").find("input").att("readonly", "readonly");
        // $(".traduccion").find("textarea").att("readonly", "readonly");
        // $("#pt_estado").removeAttr("disabled");
        // $("#pt_estado").removeAttr("readonly");
        $("#tpe_idioma_origen").attr("readonly", "readonly");
        $("#tpe_idioma_origen").attr("disabled", "disabled");
        $("#tpe_idioma_traduccion").attr("readonly", "readonly");
        $("#tpe_idioma_traduccion").attr("disabled", "disabled");
        $("input[name=asociado]").attr("readonly", "readonly");
        $("input[name=propuesta_descripcion]").attr("readonly", "readonly");
        var pe_tipo = $("#pe_tipo").val();

        if(pe_tipo == "I") {
            $(".asociados").hide();
            $(".lista-propuestas").hide();
            $(".propuestas").show();
        }

        if(pe_tipo == "A") {
            $(".propuestas").hide();
            $(".lista-propuestas").hide();
            $(".asociados").show();
        }

        if(pe_tipo == "P") {
            $(".propuestas").hide();
            $(".asociados").hide();
            $(".lista-propuestas").show();
        }
    }

    function desactivar_entradas() {
        $(".traduccion").show();
        // $(".con-traduccion").show();
        // $(".sin-traduccion").hide();

        $(".entrada").attr("readonly", "readonly");
        $(".select").attr("disabled", "disabled");
        $(".traduccion").find("input").removeAttr("readonly");
        $(".traduccion").find("textarea").removeAttr("readonly");
        $("#pe_estado").removeAttr("disabled");
        $("#pe_estado").removeAttr("readonly");
        $("#tpe_idioma_origen").removeAttr("readonly");
        $("#tpe_idioma_origen").removeAttr("disabled");
        $("#tpe_idioma_traduccion").removeAttr("readonly");
        $("#tpe_idioma_traduccion").removeAttr("disabled");
        var pe_tipo = $("#pe_tipo").val();
        if(pe_tipo == "A") {
            $("input[name=propuesta_traduccion]").parent(".traduccion").hide();
            // $("#detalle-propuesta-traduccion").parent(".traduccion").parent(".con-traduccion").hide();
        }
        
        // console.log($(".traduccion").find("select"));
        // $(".traduccion").find("select").prop("disabled", false);       
    }

    function cambiar_row_1(tipo) {
       
        var html = '';
        if(tipo == "origen") {
            html += '<div class="col-md-6">';
            html += '   <label class="control-label">'+descripcion+'</label>';
            html += '   <input type="text" class="form-control input-sm entrada" name="tpe_descripcion" placeholder="" />';
            html += '</div>';
        

            html += '<div class="col-md-3" style="">';
            html += '   <label class="control-label">'+idioma+'</label>';
            html += '   <select class="entrada form-control input-sm select" name="tpe_idioma" id="tpe_idioma" default-value="es">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
        }


        if(tipo == "traduccion") {
            html += '<div class="col-md-6">';
            html += '   <label class="control-label">'+descripcion+'</label>';
            html += '   <input type="text" class="form-control input-sm entrada" name="tpe_descripcion" placeholder="" />';
            html += '</div>';
        

            html += '<div class="col-md-3" style="">';
            html += '   <label class="control-label">'+idioma+'</label>';
            html += '   <select class="form-control input-sm select" name="tpe_idioma_origen" id="tpe_idioma_origen" default-value="es">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
            
            html += '<div class="col-md-3" style="">';
            html += '   <label class="control-label">'+a+':</label>';
            html += '   <select class="entrada form-control input-sm select" name="tpe_idioma_traduccion" id="tpe_idioma_traduccion" default-value="en">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
        }
        // alert(tipo);
        // alert(html);

        document.getElementsByClassName("cambiar-row-1")[0].innerHTML = html;

        $(document).on("change", "#tpe_idioma_origen", function(e) {
            // alert(this.value);
            var idioma = $(this).val();
            var pe_id = document.getElementsByName("pe_id")[0].value;
            var promise = propuestas_elecciones.get(pe_id+'|'+idioma);
            promise.then(function(response) {
                // document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].innerHTML = "";
                // propuestas_elecciones.ajax({
                //     url: '/obtener_detalle_propuesta',
                //     datos: { pe_id: response.pe_id, idioma: idioma }
                // }).then(function(response) {
                //     if(response.length > 0) {
                //         for(let i = 0; i < response.length; i++){
                //             document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(response[i]));
                //         }
                //     }

                // })
            })

        })
        // alert(tipo);
        if(tipo == "origen") {
            document.getElementById("tpe_idioma").addEventListener("change", function(e) {
                if(typeof $("input[name=tpe_descripcion]").attr("disabled") != "undefined") {
                    var idioma = this.value
                    var pe_id = document.getElementsByName("pe_id")[0].value;
                    var promise = propuestas_elecciones.ver(pe_id+'|'+idioma);
                    promise.then(function(response) {   
                       
                        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].innerHTML = "";
                        propuestas_elecciones.ajax({
                            url: '/obtener_detalle_propuesta',
                            datos: { pe_id: response.pe_id, idioma: idioma }
                        }).then(function(response) {
                            if(response.length > 0) {
                                for(let i = 0; i < response.length; i++){
                                    document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(response[i]));
                                }
                            }
                            $("#tpe_idioma").removeAttr("disabled");
                        })
                    })
                   
                }
            })
        }   


        $(document).on("change", "#tpe_idioma_traduccion", function(e) {
            // alert(this.value);
            var idioma = $(this).val();
            var pe_id = document.getElementsByName("pe_id")[0].value;
            
            var promise =  propuestas_elecciones.ajax({
                url: '/get_propuestas_elecciones',
                datos: { id: pe_id+'|'+idioma }
            })

            promise.then(function(response) {
                // console.log(response);
                if(response.length > 0) {
                    $("input[name=tpe_descripcion_traduccion]").val(response[0].tpe_descripcion);
                    $("textarea[name=tpe_detalle_propuesta_traduccion]").val(response[0].tpe_detalle_propuesta);
                }
            
                // document.getElementById("detalle-propuesta-traduccion").getElementsByTagName("tbody")[0].innerHTML = "";
                // propuestas_elecciones.ajax({
                //     url: '/obtener_detalle_propuesta',
                //     datos: { pe_id: response[0].pe_id, idioma: idioma }
                // }).then(function(response) {
                //     desactivar_entradas();
                //     if(response.length > 0) {
                //         for(let i = 0; i < response.length; i++){
                //             document.getElementById("detalle-propuesta-traduccion").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta_traduccion(response[i]));
                //         }
                //     }
                //     //console.log(response);
                // })
                
            })

        })
      
    
    }

    document.getElementById("nueva-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
        $("#someter-votacion").hide();
        cambiar_row_1("origen");
        propuestas_elecciones.abrirModal();
        activar_entradas();
        document.getElementById("tipo").dispatchEvent(eventChange);

        
    })

    document.getElementById("modificar-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = propuestas_elecciones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 

        if(datos.estado_propuesta == 2) {
            BASE_JS.sweet({
                text: registro_enviado_traduccion
            });
            return false;
        } 

        
        if(datos.estado_propuesta == 3) {
            BASE_JS.sweet({
                text: registro_traduccion_terminado
            });
            return false;
        } 

        $("#someter-votacion").hide();
        cambiar_row_1("origen");
        var idioma = $("#tpe_idioma").val();
         
        var promise = propuestas_elecciones.get(datos.pe_id+'|'+idioma);

        promise.then(function(response) {
            $("#tipo").val(response.pe_tipo);
            document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].innerHTML = "";
            propuestas_elecciones.ajax({
                url: '/obtener_detalle_propuesta',
                datos: { pe_id: response.pe_id, idioma: idioma }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(response[i]));
                    }
                }
                activar_entradas();
                
               
                $("#tipo").attr("disabled", "disabled");
                
                //console.log(response);
            })
            
        })
        

    })

    document.getElementById("eliminar-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = propuestas_elecciones.datatable.row('.selected').data();
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
                propuestas_elecciones.Operacion(datos.pe_id, "E");
            }
        });

        
    })


    
    document.getElementById("traducir-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = propuestas_elecciones.datatable.row('.selected').data();
        // console.table(datos);
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 
        // console.log(typeof datos.estado_propuesta);
        if(datos.estado_propuesta == 1) {
            BASE_JS.sweet({
                text: registro_estado_enviado_traduccion
            });
            return false;
        } 

        if(datos.estado_propuesta == 3) {
            BASE_JS.sweet({
                text: registro_traduccion_terminado
            });
            return false;
        } 


        // propuestas_elecciones.abrirModal();

        // $(".origen").hide();
        // $(".traducir").show();
       

        $("#someter-votacion").hide();
        cambiar_row_1("traduccion");
        var idioma = $("#tpe_idioma_origen").val();
       
        var promise = propuestas_elecciones.get(datos.pe_id+'|'+idioma);

        promise.then(function(response) {
            $("#tipo").val(response.pe_tipo);
          
            document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].innerHTML = "";
            propuestas_elecciones.ajax({
                url: '/obtener_detalle_propuesta',
                datos: { pe_id: response.pe_id, idioma: 'es' }
            }).then(function(response) {
                desactivar_entradas();
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(response[i]));
                    }
                }
                $("#tipo").attr("disabled", "disabled");

                //console.log(response);
            })


            idioma = 'en';
            //  alert(idioma_traduccion);
        
            var promise =  propuestas_elecciones.ajax({
                url: '/get_propuestas_elecciones',
                datos: { id: datos.pe_id+'|'+idioma }
            })

            promise.then(function(response) {
                // console.log($("input[name=tpe_descripcion_traduccion]"));
                if(response.length > 0) {
                    // alert(response[0].tpe_descripcion);
                    $("input[name=tpe_descripcion_traduccion]").val(response[0].tpe_descripcion);
                    $("textarea[name=tpe_detalle_propuesta_traduccion]").val(response[0].tpe_detalle_propuesta);
                }
            
                
            })
            
            
        })




        
        
    })



    document.getElementById("votacion-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = propuestas_elecciones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 

        
        if(datos.state == 'I') {
            BASE_JS.sweet({
                text: propuesta_inactiva
            });
            return false;
        } 

        if(datos.estado_propuesta == 1) {
            BASE_JS.sweet({
                text: registro_estado_terminado
            });
            return false;
        } 

        $("#someter-votacion").show();
        cambiar_row_1("origen");
        var idioma = $("#tpe_idioma").val();
         
        var promise = propuestas_elecciones.ver(datos.pe_id+'|'+idioma);

        promise.then(function(response) {
            // alert(typeof response.resolucion_id);
            // console.log();
            if(response.resolucion_id != null) {
                // alert("disabled");
                $('#pe_someter_votacion').iCheck('disable');
            } else {
                $('#pe_someter_votacion').iCheck('enable'); 
            }

            if(response.pe_someter_votacion == "S") {
                $("#ver-votacion-activa").show();
            } else {
                $("#ver-votacion-activa").hide();
            }


            document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].innerHTML = "";
            propuestas_elecciones.ajax({
                url: '/obtener_detalle_propuesta',
                datos: { pe_id: response.pe_id, idioma: idioma }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(response[i]));
                    }
                }


            })

            // $("#pe_someter_votacion").removeAttr("disabled");

            // console.log(votaciones.buscarEnFormulario("votacion_id"));
            votaciones.buscarEnFormulario("votacion_id").value = response.votacion_id;
            // votaciones.buscarEnFormulario("convocatoria").setAttribute("default-value", response.asamblea_descripcion);
            votaciones.buscarEnFormulario("propuesta").setAttribute("default-value", response.tpe_descripcion);
           
            votaciones.buscarEnFormulario("asamblea_id").setAttribute("default-value", response.asamblea_id);
            votaciones.buscarEnFormulario("asamblea_id").value = response.asamblea_id;
            votaciones.buscarEnFormulario("tabla").setAttribute("default-value", "asambleas.propuestas_elecciones");
            votaciones.buscarEnFormulario("propuesta_id").setAttribute("default-value", datos.pe_id);
            
            $(".traduccion").hide();
            $("#tpe_idioma").removeAttr("disabled");
            $("#tipo").val(response.pe_tipo);
            $("#tipo").attr("disabled", "disabled");
            $("#ver-resultados").removeAttr("disabled");
            $("#ver-votacion-activa").removeAttr("disabled");
        
            // $(".propuestas").hide();
            // $(".asociados").hide();
            
        })
        

    })



    
    document.getElementById("ver-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = propuestas_elecciones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 

        
        // if(datos.state == 'I') {
        //     BASE_JS.sweet({
        //         text: propuesta_inactiva
        //     });
        //     return false;
        // } 

        // if(datos.estado_propuesta == 1) {
        //     BASE_JS.sweet({
        //         text: registro_estado_terminado
        //     });
        //     return false;
        // } 

        $("#someter-votacion").hide();
        cambiar_row_1("origen");
        var idioma = $("#tpe_idioma").val();
         
        var promise = propuestas_elecciones.ver(datos.pe_id+'|'+idioma);

        promise.then(function(response) {
            
            document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].innerHTML = "";
            propuestas_elecciones.ajax({
                url: '/obtener_detalle_propuesta',
                datos: { pe_id: response.pe_id, idioma: idioma }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(response[i]));
                    }
                }


            })

            // console.log(votaciones.buscarEnFormulario("votacion_id"));
            votaciones.buscarEnFormulario("votacion_id").value = response.votacion_id;
            // votaciones.buscarEnFormulario("convocatoria").setAttribute("default-value", response.asamblea_descripcion);
            votaciones.buscarEnFormulario("propuesta").setAttribute("default-value", response.tpe_descripcion);
           
            votaciones.buscarEnFormulario("asamblea_id").setAttribute("default-value", response.asamblea_id);
            votaciones.buscarEnFormulario("asamblea_id").value = response.asamblea_id;
            votaciones.buscarEnFormulario("tabla").setAttribute("default-value", "asambleas.propuestas_elecciones");
            votaciones.buscarEnFormulario("propuesta_id").setAttribute("default-value", datos.pe_id);
            
            $(".traduccion").hide();
            $("#tpe_idioma").removeAttr("disabled");
            $("#tipo").val(response.pe_tipo);
            $("#tipo").attr("disabled", "disabled");
            $("#ver-resultados").removeAttr("disabled");
        
            // $(".propuestas").hide();
            // $(".asociados").hide();
            
        })
        

    })

    document.getElementById("guardar-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
 
        var required = true;
        var pe_id = document.getElementsByName("pe_id")[0].value;

        if(pe_id == "") {
            required = required && propuestas_elecciones.required("asamblea_id");
            required = required && propuestas_elecciones.required("tpe_descripcion");
            required = required && propuestas_elecciones.required("tpe_idioma");
         
            required = required && propuestas_elecciones.required("estado");
        }

        if(required) {
            var promise = propuestas_elecciones.guardar();
            propuestas_elecciones.CerrarModal();
            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }

            })

        }
    })



    document.addEventListener("keydown", function(event) {
        // console.log(event.target.name);
        // alert(modulo_controlador);
        if(modulo_controlador == "propuestas_elecciones/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-propuestas_elecciones').is(':visible')) {
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
            
                if($('#modal-propuestas_elecciones').is(':visible')) {
                    document.getElementById('guardar-propuesta-eleccion').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
        propuestas_elecciones.CerrarModal();
    })
    
    document.getElementById("cancelar-votaciones").addEventListener("click", function(event) {
        event.preventDefault();
        votaciones.CerrarModal();
    })
 

    
    document.addEventListener("click", function(event) {
        // console.log(event.target.classList);
        // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
        if(event.target.classList.value.indexOf("eliminar-propuesta") != -1) {
            event.preventDefault();
            event.srcElement.parentNode.parentNode.parentNode.remove();

        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-propuesta") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
        }

        var detalle = document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        if(detalle.length <= 0) {
            $("#tipo").removeAttr("disabled");
        } else {
            
        }
      
    })


    document.getElementById("guardar-votaciones").addEventListener("click", function(event) {
        event.preventDefault();

        var required = true;
        var votacion_id = document.getElementsByName("votacion_id")[0].value;

        if(votacion_id == "") {
            required = required && votaciones.required("fv_id");
    
            // required = required && votaciones.required("votacion_hora_apertura");
            // required = required && votaciones.required("votacion_hora_cierre");
        }

        // alert(required);
        if(required) {
            var promise = votaciones.guardar();
            // votaciones.CerrarModal();
            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                $("input[name=votacion_id]").val(response.id);
                $("#fv_id").val(response.datos[0].fv_id);
                // $("input[name=votacion_hora_apertura]").val(response.datos[0].votacion_hora_apertura);
                // $("input[name=votacion_hora_cierre]").val(response.datos[0].votacion_hora_cierre);
                $("input[name=estado]").val(response.datos[0].estado);
                $("#abrir-votacion").show();
                $("#cerrar-votacion").hide();
                $("#guardar-votaciones").hide();
                if($('#modal-votaciones').is(':visible')) {
                    $("#propuesta").attr("readonly", "readonly");
                    $("#fv_id").attr("disabled", "disabled");
                }
                if(response.pe_someter_votacion == "S") {
                    $("#ver-votacion-activa").show();
                } else {    
                    $("#ver-votacion-activa").hide();
                }

               
                // if(response.datos[0].estado == "A") {

                //     socket.emit("votacion-activada", response.formas_votacion);
                // }
            })

        }
    })

    document.getElementById("ver-votacion-activa").addEventListener("click", function(event) {
        event.preventDefault();
        var votacion_id = document.getElementsByName("votacion_id")[0].value;
        var promise =  votaciones.ver(votacion_id);
        promise.then(function(response) {
            if(response.votacion_status == "A") {
                $("#cerrar-votacion").show();
                $("#abrir-votacion").hide();
            } else {
                $("#cerrar-votacion").hide();
                $("#abrir-votacion").show();
            }
          
           
            $("#cerrar-votacion").removeAttr("disabled");
            $("#abrir-votacion").removeAttr("disabled");
        })
    })

    document.getElementById("abrir-votacion").addEventListener("click", function(event) {
        event.preventDefault();
        var votacion_id = document.getElementsByName("votacion_id")[0].value;
        votaciones.ajax({
            url: '/abrir_votacion',
            datos: { votacion_id: votacion_id }
        }).then(function(response) {
            if(response.status == "m") {
                BASE_JS.notificacion({
                    msg: votacion_abierta,
                    type: 'success'
                });
                $("#abrir-votacion").hide();
                $("#cerrar-votacion").show();

                socket.emit("votacion-activada", response.formas_votacion);
            } else {
                if(response.length <= 0) {
                    BASE_JS.sweet({
                        text: votacion_fuera_de_fecha
                    });
                } else {
                    BASE_JS.notificacion({
                        msg: response.msg,
                        type: 'warning'
                    });
                }
                
            }
            
            // console.log(response);
        })
        
    })

    document.getElementById("cerrar-votacion").addEventListener("click", function(event) {
        event.preventDefault();
        var votacion_id = document.getElementsByName("votacion_id")[0].value;
        votaciones.ajax({
            url: '/cerrar_votacion',
            datos: { votacion_id: votacion_id }
        }).then(function(response) {
           
            if(response.status == "m") {
                BASE_JS.notificacion({
                    msg: votacion_abierta,
                    type: 'success'
                });
                $("#abrir-votacion").show();
                $("#cerrar-votacion").hide();

                socket.emit("votacion-activada", response.formas_votacion);
            } else {
                BASE_JS.notificacion({
                    msg: response.msg,
                    type: 'warning'
                });
            }
        })
    })

    
    $("#pe_someter_votacion").on('ifClicked', function(event){
       
        $("#fv_id").parent("div").removeClass("has-error");
        var votacion_id = document.getElementsByName("votacion_id")[0].value;
        // alert(votaciones.buscarEnFormulario("asamblea_id").value);
        if(!$(this).parent(".icheckbox_minimal-blue").hasClass("checked")) {
            // $("#modal-votaciones").modal("show");
           
            var promise =  votaciones.get(votacion_id);

            promise.then(function() {
               
               
                votaciones.buscarEnFormulario("estado").value = 'A';

                if(votacion_id != "") {
                    document.getElementById("guardar-votaciones").dispatchEvent(eventClick);
                }

                var elementos = document.getElementById(votaciones.formularioID).getElementsByClassName("entrada");
                for (let i = 0; i < elementos.length; i++) {
                    elementos[i].readOnly = false;
                    elementos[i].removeAttribute("readonly");
                }
                $("#propuesta").attr("readonly", "readonly");
                $("#fv_id").parent("div").removeClass("has-error");
        
                $("#abrir-votacion").hide();
                $("#cerrar-votacion").hide();
                
               
            })
            // votaciones.abrirModal();
            // $("input[name=posee_seguro]").val("S");
            
        } else {
            var elementos = document.getElementById(votaciones.formularioID).getElementsByClassName("entrada");
            for (let i = 0; i < elementos.length; i++) {
                elementos[i].readOnly = false;
                elementos[i].disabled = false;
                elementos[i].removeAttribute("readonly");
                elementos[i].removeAttribute("disabled");
            }

            

            votaciones.buscarEnFormulario("estado").value = 'I';
            votaciones.buscarEnFormulario("propuesta_id").value = propuestas_elecciones.buscarEnFormulario("pe_id").value;
            votaciones.buscarEnFormulario("tabla").value = "asambleas.propuestas_elecciones";
            document.getElementById("guardar-votaciones").dispatchEvent(eventClick);
            $("#ver-votacion-activa").hide();
            // $("input[name=posee_seguro]").val("N");
        }
    });

    document.getElementById("cerrar-votaciones").addEventListener("click", function(event) {
        event.preventDefault();
        // $("#modal-votaciones").modal("hide");

        votaciones.CerrarModal();
    })


    // document.getElementById("time-votacion_hora_apertura").addEventListener("click", function(e) {
    //     e.preventDefault();
        
    //     if($("input[name=votacion_hora_apertura]").hasClass("focus-time")) {
   
    //         $("input[name=votacion_hora_apertura]").blur();
    //         $("input[name=votacion_hora_apertura]").removeClass("focus-time");
    //     } else {
            
    //         $("input[name=votacion_hora_apertura]").focus();
    //         $("input[name=votacion_hora_apertura]").addClass("focus-time");
    //     }
       
    // }); 


    // document.getElementById("time-votacion_hora_cierre").addEventListener("click", function(e) {
    //     e.preventDefault();
        
    //     if($("input[name=votacion_hora_cierre]").hasClass("focus-time")) {
   
    //         $("input[name=votacion_hora_cierre]").blur();
    //         $("input[name=votacion_hora_cierre]").removeClass("focus-time");
    //     } else {
            
    //         $("input[name=votacion_hora_cierre]").focus();
    //         $("input[name=votacion_hora_cierre]").addClass("focus-time");
    //     }
       
    // }); 
    
    // $('input[name=votacion_hora_apertura], input[name=votacion_hora_cierre]').inputmask("hh:mm", {
    //         placeholder: "HH:MM", 
    //         insertMode: false, 
    //         showMaskOnHover: false,
    //         hourFormat: 12
    //     }
    // );

    document.getElementById("tipo").addEventListener("change", function(e) {
        e.preventDefault();
        // alert(this.value);
        $("#pe_tipo").val(this.value);
        if(this.value == "I") {
            $(".asociados").hide();
            $(".lista-propuestas").hide();
            $(".propuestas").show();
        }

        if(this.value == "A") {
            $(".propuestas").hide();
            $(".lista-propuestas").hide();
            $(".asociados").show();
        }

        if(this.value == "P") {
            $(".propuestas").hide();
            $(".asociados").hide();
            $(".lista-propuestas").show();
        }

    }); 

    asociados.TablaListado({
        tablaID: '#tabla-asociados',
        url: "/buscar_datos",
    });


    document.getElementById("buscar_asociado").addEventListener("click", function(event) {
        event.preventDefault();
        $("#modal-lista-asociados").modal("show");
    })


    function cargar_datos_asociado(datos) {
        // usuarios.limpiarDatos("datos-asociado");
        // //console.log(datos);
        // usuarios.asignarDatos({
        //     idmiembro: datos.idmiembro,
        //     asociado: datos.nombres
            
        // });

        // console.log(datos);
        propuestas_elecciones.limpiarDatos("limpiar");
        var idioma = document.getElementsByName("tpe_idioma")[0];
        var objeto = {
            dp_descripcion: datos.nombres,
            dp_idioma: idioma.value,
            idmiembro: datos.idmiembro
           
        }


        document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta(objeto));
    

        $("#modal-lista-asociados").modal("hide");


    }

    $("#tabla-asociados").on('key.dt', function(e, datatable, key, cell, originalEvent){
        if(key === 13){
            var datos = asociados.datatable.row(cell.index().row).data();
            cargar_datos_asociado(datos);
        }
    });

    $('#tabla-asociados').on('dblclick', 'tr', function () {
        var datos = asociados.datatable.row( this ).data();
        cargar_datos_asociado(datos);
    });


    document.getElementById("ver-resultados").addEventListener("click", function(event) {
        event.preventDefault();
    
        var pe_id = document.getElementsByName("pe_id")[0].value;
        propuestas_elecciones.ajax({
            url: '/obtener_resultados',
            datos: { tabla: 'asambleas.propuestas_elecciones', propuesta_id: pe_id }
        }).then(function(response) {
            if(response.length > 0) {
                var html = '';
                // if(response[0].fv_id == 6) {
                    for(let i = 0; i < response.length; i++){

                        var checked = (response[i].resultado_ganador == "S") ? 'checked="checked"' : "";
                        html += '<tr>';
                        html += '   <td>'+response[i].resultado_descripcion+'</td>';
                        html += '   <td >'+response[i].resultado_votos+'</td>';
                        if(response[i].resolucion_id == null) {

                            html += '   <td><input resultado_votos="'+response[i].resultado_votos+'" resultado_id="'+response[i].resultado_id+'" cont="'+i+'" type="number" autofocus="autofocus" class="form-control input-sm" name="mano_alzada[]" value="'+response[i].resultado_mano_alzada+'"/></td>';
                        } else {
                            html += '   <td>'+response[i].resultado_mano_alzada+'</td>';
                        }
                        html += '   <td class="total">'+response[i].resultado_total+'</td>';
                        if(response[i].resolucion_id == null) {
                            html += '   <td ><center><input resultado_id="'+response[i].resultado_id+'" type="checkbox" '+checked+' name="ganador[]"/></center></td>';
                        } else {
                            if(response[i].resultado_ganador == "S") {

                                html += '   <td ><center><button type="button" class="btn btn-success btn-xs"><i class="fa fa-check"></i></button></center></td>';
                               
                            } else {

                                html += '   <td ><center><button type="button" class="btn btn-danger btn-xs"><i class="fa fa-close"></i></button></center></td>';
                            }
                        }
                        html += '</tr>';
                    }
                // }

               
                
                document.getElementById("detalle-resultados").getElementsByTagName("tbody")[0].innerHTML = html;
                $("#modal-resultados").modal("show");
            } else {
                BASE_JS.sweet({
                    text: no_hay_resultados
                });
            }
        })

       
    })

    document.getElementById("cerrar-resultados").addEventListener("click", function(event) {
        event.preventDefault();
      
        $("#modal-resultados").modal("hide");
    })


    $(document).on("keydown", "input[name='mano_alzada[]']", function(e) {
        // console.log(e);

        var cont = parseInt($(this).attr("cont"));
        if($(this).val() != "" && (e.keyCode == 13 || e.keyCode == 9)) {
            $("input[cont="+(cont+1)+"]").focus();
            $("input[cont="+(cont+1)+"]").select();
        }
    })

    $(document).on("change", "input[name='mano_alzada[]']", function() {
        // console.log($(this).parent("td").siblings(".total")[0]);
        var td_total = $(this).parent("td").siblings(".total");
        var resultado_mano_alzada = parseInt($(this).val());
        var resultado_id = parseInt($(this).attr("resultado_id"));
        var resultado_votos = parseInt($(this).attr("resultado_votos"));
        var total = resultado_votos + resultado_mano_alzada
        votaciones.ajax({
            url: '/guardar_resultados',
            datos: { resultado_id: resultado_id, resultado_mano_alzada: resultado_mano_alzada, resultado_total: total }
        }).then(function(response) {
           
            td_total.text(total);;
        })
    })

    $(document).on("change", "input[name='ganador[]']", function() {
        // console.log($(this).is(":checked"));
        var resultado_ganador = ($(this).is(":checked")) ? 'S' : 'N';
        var resultado_id = parseInt($(this).attr("resultado_id"));
        votaciones.ajax({
            url: '/guardar_ganador',
            datos: { resultado_ganador: resultado_ganador, resultado_id: resultado_id }
        }).then(function(response) {
           
           
        })
    })
    

    document.getElementById("buscar-propuesta").addEventListener("click", function(event) {
        event.preventDefault();
        
       
        var required = true;
        var idioma_codigo = $("#tpe_idioma").val();
        // required = required && resoluciones.required("tabla");
        if(required) {
        
            if(typeof propuestas_elecciones_origen.datatable.length != "undefined") {
                propuestas_elecciones_origen.datatable.destroy();
            }
            propuestas_elecciones_origen.TablaListado({
                tablaID: '#tabla-propuestas-elecciones-origen',
                url: "/buscar_datos_elecciones_origen",
                con_resolucion: 'S',
                idioma_codigo: idioma_codigo
            });


            $("#modal-propuestas-elecciones").modal("show");
            
        }
    })


    function cargar_datos_resultados_propuesta_origen(datos) {
        

        // console.log(datos);
        propuestas_elecciones.limpiarDatos("limpiar");
        document.getElementsByName("pe_id_origen")[0].value = datos.pe_id;
        var idioma = document.getElementsByName("tpe_idioma")[0];
        propuestas_elecciones.ajax({
            url: '/obtener_ganadores',
            datos: { resolucion_id: datos.resolucion_id }
        }).then(function(response) {
            if(response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    document.getElementById("detalle-propuesta").getElementsByTagName("tbody")[0].appendChild(html_detalle_propuesta({
                        dp_descripcion: response[index].resultado_descripcion,
                        dp_idioma: idioma.value,
                        idmiembro: response[index].idmiembro,
                    }));
                    
                }
            }
        })
    
      

        $("#modal-propuestas-elecciones").modal("hide");


    }

    $("#tabla-propuestas-elecciones-origen").on('key.dt', function(e, datatable, key, cell, originalEvent){
        if(key === 13){
            var datos = propuestas_elecciones_origen.datatable.row(cell.index().row).data();
            cargar_datos_resultados_propuesta_origen(datos);
        }
    });

    $('#tabla-propuestas-elecciones-origen').on('dblclick', 'tr', function () {
        var datos = propuestas_elecciones_origen.datatable.row( this ).data();
        cargar_datos_resultados_propuesta_origen(datos);
    });

     
    document.getElementById("listado-propuesta-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
      
        window.open(BaseUrl + "/propuestas/imprimir_propuestas_elecciones/");
    })

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
        if(typeof propuestas_elecciones.datatable.length != "undefined") {
            propuestas_elecciones.datatable.destroy();
        }

        var fecha_inicio = document.getElementsByName("fecha-inicio")[0].value;
        var fecha_fin = document.getElementsByName("fecha-fin")[0].value;
       
       
        propuestas_elecciones.TablaListado({
            tablaID: '#tabla-propuestas-elecciones',
            url: "/buscar_datos_elecciones",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            
        });
    })


})

