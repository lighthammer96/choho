var propuestas_temas = new BASE_JS('propuestas_temas', 'propuestas');
var votaciones = new BASE_JS('votaciones', 'propuestas');

var asambleas = new BASE_JS('asambleas', 'asambleas');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var principal = new BASE_JS('principal', 'principal');
var asociados = new BASE_JS('asociados', 'asociados');
var eventClick = new Event('click');


document.addEventListener("DOMContentLoaded", function() {
    
   

    asociados.TablaListado({
        tablaID: '#tabla-asociados',
        url: "/buscar_datos",
    });


    votaciones.select({
        name: 'fv_id',
        url: '/obtener_formas_votacion',
        placeholder: seleccione,
        datos: { fv_tipo: 'propuestas_temas'}
    })


    var format = "";
    if(idioma_codigo == "es") {
        format = "dd/mm/yyyy";
      
        $("input[name=pt_fecha_reunion_cpag], input[name=pt_fecha_reunion_uya], input[name=fecha-inicio], input[name=fecha-fin]").attr("data-inputmask", "'alias': '"+format+"'");
    } else {
        format = "yyyy-mm-dd";
  
        $("input[name=pt_fecha_reunion_cpag], input[name=pt_fecha_reunion_uya], input[name=fecha-inicio], input[name=fecha-fin]").attr("data-inputmask", "'alias': '"+format+"'");
        
    }
    var eventClick = new Event('click');

    propuestas_temas.enter("propuesta-tema_descripcion","tipconv_id");
    propuestas_temas.enter("tipconv_id","propuesta-tema_anio");
  
    propuestas_temas.enter("propuesta-tema_fecha_inicio","propuesta-tema_fecha_fin");
    propuestas_temas.enter("propuesta-tema_fecha_fin","estado");
    propuestas_temas.enter("estado","detalle");
    propuestas_temas.enter("detalle","fecha");
    propuestas_temas.enter("fecha","hora");

 




    $("input[name=pt_fecha_reunion_cpag], input[name=pt_fecha_reunion_uya], input[name=fecha-inicio], input[name=fecha-fin]").inputmask();

  
 
    jQuery( "input[name=pt_fecha_reunion_cpag], input[name=pt_fecha_reunion_uya], input[name=fecha-inicio], input[name=fecha-fin]").datepicker({
        format: format,
        language: "es",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        // endDate: "now()",

    });

    $(function() {
        $('input[type="radio"], input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    })





    
    // asambleas.select({
    //     name: 'asamblea_id',
    //     url: '/obtener_asambleas',
    //     placeholder: seleccione
    // })

    propuestas_temas.select({
        name: 'cp_id',
        url: '/obtener_categorias_propuestas',
        placeholder: seleccione
    })

    

    propuestas_temas.TablaListado({
        tablaID: '#tabla-propuestas-temas',
        url: "/buscar_datos",
    });


    paises.select({
        name: 'pais_id',
        url: '/obtener_paises_propuestas',
        placeholder: seleccione
    }).then(function() {
        $("#pais_id").trigger("change", ["", "", ""]);
        $("#idunion").trigger("change", ["", ""]);
        $("#idmision").trigger("change", ["", ""]);
        
        
        
    }) 


    paises.select({
        name: 'pais_id_filtro',
        url: '/obtener_paises_propuestas',
        placeholder: seleccione
    }).then(function() {
        // $("#pais_id").trigger("change", ["", "", ""]);
        // $("#idunion").trigger("change", ["", ""]);
        // $("#idmision").trigger("change", ["", ""]);
        
        
        
    }) 

    
    $(document).on('change', '#pais_id', function(event, pais_id, idunion, idmision) {
        // alert(pais_id);
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
    
        var selected_mision = (typeof idmision != "undefined")  ? idmision : "";

        uniones.select({
            name: 'idunion',
            url: '/obtener_uniones_paises_propuestas',
            placeholder: seleccione,
            selected: selected,
            datos: { pais_id: d_id }
        }).then(function() {
        
            var condicion = typeof pais_id == "undefined" && pais_id != "";
            condicion = condicion && typeof idunion == "undefined" && idunion != "";
     
        
            if(condicion) {
                // var required = true;
                // required = required && asociados.required("pais_id");
                // if(required) {
                    // $("#idunion")[0].selectize.focus();
                    $("#idunion").focus();
                // }

             
                
            } 
        
        })
        if(posee_union == "N") {
            $(".union").hide();

            misiones.select({
                name: 'idmision',
                url: '/obtener_misiones_propuestas',
                placeholder: seleccione,
                selected: selected_mision,
                datos: { pais_id: d_id }
            })
        } else {
            $(".union").show();
        }

        
       
       
       
        
    });



    $(document).on('change', '#idunion', function(event, idunion, idmision) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idunion"];     
        d_id = (typeof idunion != "undefined" && idunion != null) ? idunion : d_id;
        var selected = (typeof idmision != "undefined")  ? idmision : "";
         
        if(typeof this.options[this.selectedIndex] != "undefined" && this.options[this.selectedIndex].getAttribute("atributo1") != "null" && typeof idunion == "undefined" ) {
            document.getElementsByName("pt_email")[0].value = this.options[this.selectedIndex].getAttribute("atributo1");
        }
        // alert(typeof idunion);
        if(typeof this.options != "undefined" && typeof this.options[this.selectedIndex] != "undefined" && this.options.length > 0 && typeof idunion == "undefined") {

            document.getElementById("lugar").value = this.options[this.selectedIndex].text;
            document.getElementById("idlugar").value = this.value;
            document.getElementById("tabla").value = "iglesias.union";
        }
        // console.log(this.options[this.selectedIndex].getAttribute("atributo1"))
        // alert(selected);
        misiones.select({
            name: 'idmision',
            url: '/obtener_misiones_propuestas',
            placeholder: seleccione,
            selected: selected,
            datos: { idunion: d_id }
        }).then(function() {
        
            var condicion = typeof idunion == "undefined" && idunion != "";
            condicion = condicion && typeof idmision == "undefined" && idmision != "";
        
            if(condicion) {
                // var required = true;
                // required = required && asociados.required("idunion");
                // if(required) {
                    $("#idmision").focus();
                    // $("#idmision")[0].selectize.focus();
                // }
            } 
        
        })
    });

    $(document).on('change', '#idmision', function(event, idmision, iddistritomisionero) {
        // alert(typeof this.options[this.selectedIndex]);
        // console.log(this.options[this.selectedIndex].getAttribute("atributo1"));
        // console.log(typeof idmision);
        if(typeof this.options != "undefined" && typeof this.options[this.selectedIndex] != "undefined" && this.options.length > 0 && typeof idmision == "undefined") {

            document.getElementById("lugar").value = this.options[this.selectedIndex].text;
            document.getElementById("idlugar").value = this.value;
            document.getElementById("tabla").value = "iglesias.mision";
        }

        if(typeof this.options[this.selectedIndex] != "undefined" && this.options[this.selectedIndex].getAttribute("atributo1") != "null" && typeof idmision == "undefined") {
            document.getElementsByName("pt_email")[0].value = this.options[this.selectedIndex].getAttribute("atributo1");
        }
    });


    function cambiar_row_1(tipo) {

        var html = '';
        if(tipo == "origen") {
            html += '<div class="col-md-2">';
            html += '   <label class="control-label">'+correlativo+'</label>';
            html += '   <input type="text" class="form-control input-sm entrada" name="pt_correlativo" placeholder="" readonly="readonly"/>';
            html += '</div>';
            html += '<div class="col-md-7">';
            html += '   <label class="control-label">'+convocatoria+'</label>';
            html += '   <select class="entrada form-control input-sm select" name="asamblea_id" id="asamblea_id">';
                            
            html += '   </select>';
            html += '</div>';
            html += '<div class="col-md-3" style="">';
            html += '   <label class="control-label">'+idioma+'</label>';
            html += '   <select class="entrada form-control input-sm select" name="tpt_idioma" id="tpt_idioma" default-value="es">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
        }


        if(tipo == "traduccion") {
            html += '<div class="col-md-2">';
            html += '   <label class="control-label">'+correlativo+'</label>';
            html += '   <input type="text" class="form-control input-sm entrada" name="pt_correlativo" placeholder="" readonly="readonly"/>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '   <label class="control-label">'+convocatoria+'</label>';
            html += '   <select class="entrada form-control input-sm select" name="asamblea_id" id="asamblea_id">';
                            
            html += '   </select>';
            html += '</div>';
            html += '<div class="col-md-2" style="">';
            html += '   <label class="control-label">'+de_traducir+'</label>';
            html += '   <select class="form-control input-sm select" name="tpt_idioma_origen" id="tpt_idioma_origen" default-value="es">';
            html += '       <option value="es" >'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
            
            html += '<div class="col-md-2" style="">';
            html += '   <label class="control-label">'+a+':</label>';
            html += '   <select class="entrada form-control input-sm select" name="tpt_idioma_traduccion" id="tpt_idioma_traduccion" default-value="en">';
            html += '       <option value="es">'+espaniol+'</option>';
            html += '       <option value="en">'+ingles+'</option>';
            html += '       <option value="fr">'+frances+'</option>';

            html += '   </select>';
            html += '</div>';
        }
        // alert(tipo);
        // alert(html);

        document.getElementsByClassName("cambiar-row-1")[0].innerHTML = html;

        $(document).on("change", "#tpt_idioma_origen", function(e) {
            // alert(this.value);
            var idioma = $(this).val();
            var pt_id = document.getElementsByName("pt_id")[0].value;
            var promise = propuestas_temas.get(pt_id+'|'+idioma);


        })

        if(tipo == "origen") {

            document.getElementById("tpt_idioma").addEventListener("change", function(e) {
                if(typeof $("input[name=tpt_titulo]").attr("disabled") != "undefined") {
                    
                    var idioma = this.value;
                    var pt_id = document.getElementsByName("pt_id")[0].value;
                    var promise = propuestas_temas.ver(pt_id+'|'+idioma);
        
                    promise.then(function(response) {
                        $("#tpt_idioma").removeAttr("disabled");
                    })
                }
            })
        }
      

        $(document).on("change", "#tpt_idioma_traduccion", function(e) {
            // alert(this.value);
            var idioma = $(this).val();
            var pt_id = document.getElementsByName("pt_id")[0].value;

              
            var promise =  propuestas_temas.ajax({
                url: '/get_propuestas_temas',
                datos: { id: pt_id+'|'+idioma }
            })

            
            promise.then(function(response) {
                if(response.length > 0) {
                    $("input[name=tpt_titulo_traduccion]").val(response[0].tpt_titulo);
                    $("textarea[name=tpt_detalle_otros_asuntos_traduccion]").val(response[0].tpt_detalle_otros_asuntos);
                    $("textarea[name=tpt_propuesta_traduccion]").val(response[0].tpt_propuesta);
                    $("textarea[name=tpt_ventas_desventajas_traduccion]").val(response[0].tpt_ventas_desventajas);
                    $("textarea[name=tpt_descripcion_documentos_apoyo_traduccion]").val(response[0].tpt_descripcion_documentos_apoyo);
                    $("textarea[name=tpt_comentarios_traduccion]").val(response[0].tpt_comentarios);
                    $("textarea[name=tpt_justificacion_propuesta_traduccion]").val(response[0].tpt_justificacion_propuesta);
                }
            })


        })
      
    
    }
    

    function activar_entradas() {
        $(".traduccion").hide();
        $(".entrada").removeAttr("readonly");
        $(".select").removeAttr("disabled");
        // $(".traduccion").find("input").att("readonly", "readonly");
        // $(".traduccion").find("textarea").att("readonly", "readonly");
        // $("#pt_estado").removeAttr("disabled");
        // $("#pt_estado").removeAttr("readonly");
        $("#tpt_idioma_origen").attr("readonly", "readonly");
        $("#tpt_idioma_origen").attr("disabled", "disabled");
        $("#tpt_idioma_traduccion").attr("readonly", "readonly");
        $("#tpt_idioma_traduccion").attr("disabled", "disabled");
        $("input[name=pt_correlativo]").attr("readonly", "readonly");
    }

    function desactivar_entradas() {
        $(".traduccion").show();
        $(".entrada").attr("readonly", "readonly");
        $(".select").attr("disabled", "disabled");
        $(".traduccion").find("input").removeAttr("readonly");
        $(".traduccion").find("textarea").removeAttr("readonly");
        $("#pt_estado").removeAttr("disabled");
        $("#pt_estado").removeAttr("readonly");
        $("#tpt_idioma_origen").removeAttr("readonly");
        $("#tpt_idioma_origen").removeAttr("disabled");
        $("#tpt_idioma_traduccion").removeAttr("readonly");
        $("#tpt_idioma_traduccion").removeAttr("disabled");
        
        // console.log($(".traduccion").find("select"));
        // $(".traduccion").find("select").prop("disabled", false);

       
    }

    document.getElementById("nueva-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();
        $("#someter-votacion").hide();
        $("#imprimir").hide();
        cambiar_row_1("origen");
        asambleas.select({
            name: 'asamblea_id',
            url: '/obtener_asambleas',
            placeholder: seleccione,
        })

        $("#pt_id_origen").removeAttr("disabled");
        propuestas_temas.select({
            name: 'pt_id_origen[]',
            url: '/obtener_propuestas_temas_origen',
            placeholder: seleccione,
        
        })

        
        $(".nav-tabs").find("li").removeClass("active");
        $("a[href='#datos-generales']").parent("li").addClass("active");
        $(".tab-pane").removeClass("active");
        $("#datos-generales").addClass("active");


        propuestas_temas.abrirModal();

        propuestas_temas.ajax({
            url: '/obtener_correlativo',
            datos: { }
        }).then(function(response) {
        //    console.table(response);
           if(typeof response[0].correlativo != "undefined") {
               document.getElementsByName("pt_correlativo")[0].value = response[0].correlativo;
           }

           activar_entradas();
        })

        
    })

    document.getElementById("modificar-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = propuestas_temas.datatable.row('.selected').data();
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


      
        $(".nav-tabs").find("li").removeClass("active");
        $("a[href='#datos-generales']").parent("li").addClass("active");
        $(".tab-pane").removeClass("active");
        $("#datos-generales").addClass("active");

        $("#someter-votacion").hide();
       
        cambiar_row_1("origen");
        var idioma = $("#tpt_idioma").val();
        var promise = propuestas_temas.get(datos.pt_id+'|'+idioma);

        promise.then(function(response) {
            var valor = response.asamblea_id.toString().split("|");
            var tipconv_id = valor[0];
            var asamblea_id = valor[1];
            // console.log(response.pt_digitar);
            
           

            asambleas.select({
                name: 'asamblea_id',
                url: '/obtener_asambleas',
                placeholder: seleccione,
                selected: response.asamblea_id
            })


            if(tipconv_id == 1) {
                $(".mision").show();
                $(".union").show();
            }

            if(tipconv_id == 2) {
                $(".mision").hide();
                $(".union").show();

            }

            if(tipconv_id == 3) {
                $(".mision").show();
                $(".union").show();
            }
            var pais = response.pais_id.toString().split("|");
            // console.log(pais);
            $("#pais_id").trigger("change", [response.pais_id, response.idunion, response.idmision]);
            // alert(pais[1]);
            if(pais[1] != "N") {
                $("#idunion").trigger("change", [response.idunion, response.idmision]);
                $("#idmision").trigger("change", [response.idmision, ""]);
            }


            $("#pt_id_origen").removeAttr("disabled");

            propuestas_temas.select({
                name: 'pt_id_origen[]',
                url: '/obtener_propuestas_temas_origen',
                placeholder: seleccione,
                datos: { pt_id: datos.pt_id }
            
            })

            propuestas_temas.ajax({
                url: '/obtener_propuestas_origen',
                datos: { pt_id: datos.pt_id }
            }).then(function(response) {
                var array = [];
                for(let i = 0; i < response.length; i++){
                    array.push(response[i].pt_id_origen);
                }
                //$("select[name='modulo_id[]']").val(array).trigger("chosen:updated");
                if(array.length > 0) {

                    $("#pt_id_origen")[0].selectize.setValue(array);
                }
            })
            if(response.tabla == "iglesias.union") {
                $("#idmision").val("");
            }
            activar_entradas();

            if(response.pt_digitar == "S") {
               
                $(".no-digitar").hide();
                $(".digitar").show();

            } else {
                $(".digitar").hide();
                $(".no-digitar").show();
            }

            
        })
        

    })



    document.getElementById("votacion-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = propuestas_temas.datatable.row('.selected').data();
        // console.log(datos);
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
        $("#pt_id_origen").attr("disabled", "disabled");
        propuestas_temas.select({
            name: 'pt_id_origen[]',
            url: '/obtener_propuestas_temas_origen',
            placeholder: seleccione,
            datos: { pt_id: datos.pt_id }
        
        })

        $("#someter-votacion").show();
        $("#checkbox-someter-votacion").show();
        $("#imprimir").hide();
        $("#ver-resultados").show();

        cambiar_row_1("origen");
 
        var idioma = $("#tpt_idioma").val();
        var promise = propuestas_temas.ver(datos.pt_id+'|'+idioma);

        promise.then(function(response) {
            if(response.resolucion_id != null) {
                // alert("disabled");
                $('#pt_someter_votacion').iCheck('disable');
            } else {
                $('#pt_someter_votacion').iCheck('enable');
            }

            if(response.pt_someter_votacion == "S") {
                $("#ver-votacion-activa").show();
            } else {
                $("#ver-votacion-activa").hide();
            }

            var valor = response.asamblea_id.toString().split("|");
            var tipconv_id = valor[0];
            var asamblea_id = valor[1];

            asambleas.select({
                name: 'asamblea_id',
                url: '/obtener_asambleas',
                placeholder: seleccione,
                selected: response.asamblea_id
            })


            if(tipconv_id == 1) {
                $(".mision").show();
                $(".union").show();
            }

            if(tipconv_id == 2) {
                $(".mision").hide();
                $(".union").show();

            }

            if(tipconv_id == 3) {
                $(".mision").show();
                $(".union").show();
            }

            var pais = response.pais_id.toString().split("|");
            // console.log(pais);
            $("#pais_id").trigger("change", [response.pais_id, response.idunion, response.idmision]);
            // alert(pais[1]);
            if(pais[1] != "N") {
                $("#idunion").trigger("change", [response.idunion, response.idmision]);
                $("#idmision").trigger("change", [response.idmision, ""]);
            }

            // $("#pt_someter_votacion").removeAttr("disabled");

            // console.log(votaciones.buscarEnFormulario("votacion_id"));
            votaciones.buscarEnFormulario("votacion_id").value = response.votacion_id;
            votaciones.buscarEnFormulario("convocatoria").setAttribute("default-value", response.asamblea_descripcion);
            votaciones.buscarEnFormulario("propuesta").setAttribute("default-value", response.tpt_titulo);
            votaciones.buscarEnFormulario("asamblea_id").setAttribute("default-value", asamblea_id);
            votaciones.buscarEnFormulario("tabla").setAttribute("default-value", "asambleas.propuestas_temas");
            votaciones.buscarEnFormulario("propuesta_id").setAttribute("default-value", datos.pt_id);


            propuestas_temas.ajax({
                url: '/obtener_propuestas_origen',
                datos: { pt_id: datos.pt_id }
            }).then(function(response) {
                var array = [];
                for(let i = 0; i < response.length; i++){
                    array.push(response[i].pt_id_origen);
                }
                //$("select[name='modulo_id[]']").val(array).trigger("chosen:updated");
                if(array.length > 0) {

                    $("#pt_id_origen")[0].selectize.setValue(array);
                }
            })

            if(response.tabla == "iglesias.union") {
                $("#idmision").val("");
            }

            $(".traduccion").hide();
            $("#tpt_idioma").removeAttr("disabled");

            $("#imprimir").removeAttr("disabled");
            $("#ver-resultados").removeAttr("disabled");
            $("#ver-votacion-activa").removeAttr("disabled");
            // $("input[name=votacion_id]").val(response.votacion_id);

        
                // $("input[name=convocatoria]").attr("default-value", response.asamblea_descripcion);
                // $("input[name=propuesta]").attr("default-value", response.tpt_titulo);
        })
        

    })


    document.getElementById("ver-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = propuestas_temas.datatable.row('.selected').data();
        // console.log(datos);
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
        $("#pt_id_origen").attr("disabled", "disabled");
        propuestas_temas.select({
            name: 'pt_id_origen[]',
            url: '/obtener_propuestas_temas_origen',
            placeholder: seleccione,
            datos: { pt_id: datos.pt_id }
        
        })

        $("#someter-votacion").show();
        $("#checkbox-someter-votacion").hide();
        $("#ver-resultados").hide();
        $("#imprimir").show();

        cambiar_row_1("origen");
   
        var idioma = $("#tpt_idioma").val();
        var promise = propuestas_temas.ver(datos.pt_id+'|'+idioma);

        promise.then(function(response) {
            

            var valor = response.asamblea_id.toString().split("|");
            var tipconv_id = valor[0];
            var asamblea_id = valor[1];

            asambleas.select({
                name: 'asamblea_id',
                url: '/obtener_asambleas',
                placeholder: seleccione,
                selected: response.asamblea_id
            })


            if(tipconv_id == 1) {
                $(".mision").show();
                $(".union").show();
            }

            if(tipconv_id == 2) {
                $(".mision").hide();
                $(".union").show();

            }

            if(tipconv_id == 3) {
                $(".mision").show();
                $(".union").show();
            }

            var pais = response.pais_id.toString().split("|");
            // console.log(pais);
            $("#pais_id").trigger("change", [response.pais_id, response.idunion, response.idmision]);
            // alert(pais[1]);
            if(pais[1] != "N") {
                $("#idunion").trigger("change", [response.idunion, response.idmision]);
                $("#idmision").trigger("change", [response.idmision, ""]);
            }

            // $("#pt_someter_votacion").removeAttr("disabled");

            // console.log(votaciones.buscarEnFormulario("votacion_id"));
            votaciones.buscarEnFormulario("votacion_id").value = response.votacion_id;
            votaciones.buscarEnFormulario("convocatoria").setAttribute("default-value", response.asamblea_descripcion);
            votaciones.buscarEnFormulario("propuesta").setAttribute("default-value", response.tpt_titulo);
            votaciones.buscarEnFormulario("asamblea_id").setAttribute("default-value", asamblea_id);
            votaciones.buscarEnFormulario("tabla").setAttribute("default-value", "asambleas.propuestas_temas");
            votaciones.buscarEnFormulario("propuesta_id").setAttribute("default-value", datos.pt_id);


            propuestas_temas.ajax({
                url: '/obtener_propuestas_origen',
                datos: { pt_id: datos.pt_id }
            }).then(function(response) {
                var array = [];
                for(let i = 0; i < response.length; i++){
                    array.push(response[i].pt_id_origen);
                }
                //$("select[name='modulo_id[]']").val(array).trigger("chosen:updated");
                if(array.length > 0) {

                    $("#pt_id_origen")[0].selectize.setValue(array);
                }
            })

            if(response.tabla == "iglesias.union") {
                $("#idmision").val("");
            }

            $(".traduccion").hide();
            $("#tpt_idioma").removeAttr("disabled");

            $("#imprimir").removeAttr("disabled");
            $("#ver-resultados").removeAttr("disabled");
            // $("input[name=votacion_id]").val(response.votacion_id);

        
                // $("input[name=convocatoria]").attr("default-value", response.asamblea_descripcion);
                // $("input[name=propuesta]").attr("default-value", response.tpt_titulo);
        })
        

    })


    document.getElementById("eliminar-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = propuestas_temas.datatable.row('.selected').data();
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
                propuestas_temas.Operacion(datos.pt_id, "E");
            }
        });

        
    })

   

    document.getElementById("traducir-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = propuestas_temas.datatable.row('.selected').data();
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


       
        // propuestas_temas.abrirModal();

        // $(".origen").hide();
        // $(".traducir").show();
        $("#someter-votacion").hide();
        $("#imprimir").hide();
        cambiar_row_1("traduccion");
        var idioma = $("#tpt_idioma_origen").val();
        var promise = propuestas_temas.get(datos.pt_id+'|'+idioma);


        promise.then(function(response) {
            var valor = response.asamblea_id.toString().split("|");
            var tipconv_id = valor[0];
            var asamblea_id = valor[1];


            asambleas.select({
                name: 'asamblea_id',
                url: '/obtener_asambleas',
                placeholder: seleccione,
                selected: response.asamblea_id
            })

            if(tipconv_id == 1) {
                $(".mision").show();
                $(".union").show();
            }

            if(tipconv_id == 2) {
                $(".mision").hide();
                $(".union").show();

            }

            if(tipconv_id == 3) {
                $(".mision").show();
                $(".union").show();
            }

            var pais = response.pais_id.toString().split("|");
            // console.log(pais);
            $("#pais_id").trigger("change", [response.pais_id, response.idunion, response.idmision]);
            // alert(pais[1]);
            if(pais[1] != "N") {
                $("#idunion").trigger("change", [response.idunion, response.idmision]);
                $("#idmision").trigger("change", [response.idmision, ""]);
            }


            $("#pt_id_origen").attr("disabled", "disabled");
            propuestas_temas.select({
                name: 'pt_id_origen[]',
                url: '/obtener_propuestas_temas_origen',
                placeholder: seleccione,
                datos: { pt_id: datos.pt_id }
            
            })

            propuestas_temas.ajax({
                url: '/obtener_propuestas_origen',
                datos: { pt_id: datos.pt_id }
            }).then(function(response) {
                var array = [];
                for(let i = 0; i < response.length; i++){
                    array.push(response[i].pt_id_origen);
                }
                //$("select[name='modulo_id[]']").val(array).trigger("chosen:updated");
                if(array.length > 0) {

                    $("#pt_id_origen")[0].selectize.setValue(array);
                }
            })

            if(response.tabla == "iglesias.union") {
                $("#idmision").val("");
            }

            
            desactivar_entradas();
            
            idioma = 'en';          
            var promise =  propuestas_temas.ajax({
                url: '/get_propuestas_temas',
                datos: { id: datos.pt_id+'|'+idioma }
            })

            
            promise.then(function(response) {
                if(response.length > 0) {
                    $("input[name=tpt_titulo_traduccion]").val(response[0].tpt_titulo);
                    $("textarea[name=tpt_detalle_otros_asuntos_traduccion]").val(response[0].tpt_detalle_otros_asuntos);
                    $("textarea[name=tpt_propuesta_traduccion]").val(response[0].tpt_propuesta);
                    $("textarea[name=tpt_ventas_desventajas_traduccion]").val(response[0].tpt_ventas_desventajas);
                    $("textarea[name=tpt_descripcion_documentos_apoyo_traduccion]").val(response[0].tpt_descripcion_documentos_apoyo);
                    $("textarea[name=tpt_comentarios_traduccion]").val(response[0].tpt_comentarios);
                    $("textarea[name=tpt_justificacion_propuesta_traduccion]").val(response[0].tpt_justificacion_propuesta);
                }
            })
            
        })



        
        
    })




    document.getElementById("guardar-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();
 

        var required = true;
        var propuesta = true;
        var pt_id = document.getElementsByName("pt_id")[0].value;

        if(pt_id == "") {
            required = required && propuestas_temas.required("asamblea_id");
           
            required = required && propuestas_temas.required("tpt_titulo");
   
            required = required && propuestas_temas.required("tpt_idioma");
  
            propuesta = propuesta && propuestas_temas.required("cp_id");
            propuesta = propuesta && propuestas_temas.required("tpt_propuesta");
    
            required = required && propuestas_temas.required("estado");
       
        }

     

   
        // alert(propuesta);
        
        if(required) {
            if(!propuesta) {
                $(".nav-tabs").find("li").removeClass("active");
                $("a[href='#tpropuesta']").parent("li").addClass("active");
                $(".tab-pane").removeClass("active");
                $("#tpropuesta").addClass("active");
                return false;
            }
            var promise = propuestas_temas.guardar();
            propuestas_temas.CerrarModal();
            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }

           
                propuestas_temas.ajax({
                    url: '/obtener_correlativo',
                    datos: { }
                }).then(function(response) {
                //    console.table(response);
                if(typeof response[0].correlativo != "undefined") {
                    document.getElementsByName("pt_correlativo")[0].value = response[0].correlativo;
                }
                })
            })

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
                if(response.pt_someter_votacion == "S") {
                    $("#ver-votacion-activa").show();
                } else {    
                    $("#ver-votacion-activa").hide();
                }
                // alert("hola");
                // if(response.datos[0].estado == "A") {

                //     socket.emit("votacion-activada", response.formas_votacion);
                // }
            })

        }
    })


   



    document.addEventListener("keydown", function(event) {
        // console.log(event.target.name);
        // alert(modulo_controlador);
        if(modulo_controlador == "propuestas_temas/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-propuestas_temas').is(':visible')) {
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
            
                if($('#modal-propuestas_temas').is(':visible')) {
                    document.getElementById('guardar-propuesta-tema').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();
        propuestas_temas.CerrarModal();
    })


    document.getElementById("cancelar-votaciones").addEventListener("click", function(event) {
        event.preventDefault();
        votaciones.CerrarModal();
    })

 

    
    // document.addEventListener("click", function(event) {

    //     // console.log(event.target.classList);
    //     // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
    //     if(event.target.classList.value.indexOf("eliminar-agenda") != -1) {
    //         event.preventDefault();
    //         event.srcElement.parentNode.parentNode.parentNode.remove();

    //     }

    //     if(event.srcElement.parentNode.classList.value.indexOf("eliminar-agenda") != -1 && !event.srcElement.parentNode.disabled) {
    //         event.preventDefault();
    //         ///console.log(event.srcElement.parentNode);
    //         event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
    //     }


      
    // })


    


    document.getElementById("calendar-pt_fecha_reunion_uya").addEventListener("click", function(e) {
        e.preventDefault();
        if($("input[name=pt_fecha_reunion_uya]").hasClass("focus-datepicker")) {
   
            $("input[name=pt_fecha_reunion_uya]").blur();
            $("input[name=pt_fecha_reunion_uya]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=pt_fecha_reunion_uya]").focus();
            $("input[name=pt_fecha_reunion_uya]").addClass("focus-datepicker");
        }
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




    document.getElementById("calendar-pt_fecha_reunion_cpag").addEventListener("click", function(e) {
        e.preventDefault();
        
        if($("input[name=pt_fecha_reunion_cpag]").hasClass("focus-datepicker")) {
   
            $("input[name=pt_fecha_reunion_cpag]").blur();
            $("input[name=pt_fecha_reunion_cpag]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=pt_fecha_reunion_cpag]").focus();
            $("input[name=pt_fecha_reunion_cpag]").addClass("focus-datepicker");
        }
       
    });

   

    document.getElementById("asamblea_id").addEventListener("click", function(e) {
        e.preventDefault();
        var valor = this.value.toString().split("|");
        var tipconv_id = valor[0];
        var asamblea_id = valor[1];



        if(tipconv_id == 1) {
            $(".mision").show();
            $(".union").show();
        }

        if(tipconv_id == 2) {
            $(".mision").hide();
            $(".union").show();

        }

        if(tipconv_id == 3) {
            $(".mision").show();
            $(".union").show();
        }

    })

    document.getElementById("buscar_asociado").addEventListener("click", function(event) {
        event.preventDefault();
        $("#modal-lista-asociados").modal("show");
    })


    function cargar_datos_asociado(datos) {
        propuestas_temas.limpiarDatos("datos-asociado");
        //console.log(datos);
        propuestas_temas.asignarDatos({
            pt_dirigido_por_uya: datos.idmiembro,
            asociado: datos.nombres
            
        });
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
  
    $("#pt_someter_votacion").on('ifClicked', function(event){
        var votacion_id = document.getElementsByName("votacion_id")[0].value;
       

        $("#fv_id").parent("div").removeClass("has-error");
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
                    // console.log(elementos[i]);
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

            // alert("ola");
            votaciones.buscarEnFormulario("estado").value = 'I';
            votaciones.buscarEnFormulario("propuesta_id").value = propuestas_temas.buscarEnFormulario("pt_id").value;
            votaciones.buscarEnFormulario("tabla").value = "asambleas.propuestas_temas";
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

//     $('input[name=votacion_hora_apertura], input[name=votacion_hora_cierre]').inputmask("hh:mm", {
//         placeholder: "HH:MM", 
//         insertMode: false, 
//         showMaskOnHover: false,
//         hourFormat: 12
//       }
//    );
    

   $(document).on("click", "#imprimir", function(e) {
        e.preventDefault();

        var pt_id = document.getElementsByName("pt_id")[0].value;
        window.open(BaseUrl + "/propuestas/imprimir_propuesta_tema/"+pt_id);
    })

  
    $(document).on('change', '#pt_id_origen', function(event) {
        var pt_id_origen = $(this).val();   

        if(pt_id_origen == "") {
            return false;
        }
        var tpt_idioma = $("#tpt_idioma").val();
        
        propuestas_temas.ajax({
            url: '/obtener_descripciones_propuestas_origen',
            datos: { pt_id_origen: pt_id_origen, tpt_idioma: tpt_idioma}
        }).then(function(response) {
        //    console.table(response);
            if(response.length > 0 ) {
                var tpt_titulo = "";
                var tpt_detalle_otros_asuntos = "";
                var tpt_propuesta = "";
                var tpt_ventas_desventajas = "";
                var tpt_descripcion_documentos_apoyo = "";
                var tpt_comentarios = "";
                var tpt_idioma = "";
                var tpt_justificacion_propuesta = "";
                for (let index = 0; index < response.length; index++) {
                    tpt_titulo += response[index].tpt_titulo+", ";
                    tpt_detalle_otros_asuntos += response[index].tpt_detalle_otros_asuntos+"\n";
                    tpt_propuesta += response[index].tpt_propuesta+"\n";
                    tpt_ventas_desventajas += response[index].tpt_ventas_desventajas+"\n";
                    tpt_descripcion_documentos_apoyo += response[index].tpt_descripcion_documentos_apoyo+"\n";
                    tpt_comentarios += response[index].tpt_comentarios+"\n";
                    tpt_idioma += response[index].tpt_idioma+"\n";
                    tpt_justificacion_propuesta += response[index].tpt_justificacion_propuesta+"\n";
                }


                $("input[name=tpt_titulo]").val(tpt_titulo);
                $("textarea[name=tpt_detalle_otros_asuntos]").val(tpt_detalle_otros_asuntos);
                $("textarea[name=tpt_propuesta]").val(tpt_propuesta);
                $("textarea[name=tpt_ventas_desventajas]").val(tpt_ventas_desventajas);
                $("textarea[name=tpt_descripcion_documentos_apoyo]").val(tpt_descripcion_documentos_apoyo);
                $("textarea[name=tpt_comentarios]").val(tpt_comentarios);
                $("textarea[name=tpt_justificacion_propuesta]").val(tpt_justificacion_propuesta);
                
            }
           
       
        })

        // alert(pt_id_origen);
    })

    $(document).on('change', '#tpt_idioma', function(event) {
        if(typeof $("input[name=tpt_titulo]").attr("disabled") == "undefined") {
            $("#pt_id_origen").trigger("change");
        }
    })


    document.getElementById("ver-resultados").addEventListener("click", function(event) {
        event.preventDefault();
    
        var pt_id = document.getElementsByName("pt_id")[0].value;
        propuestas_temas.ajax({
            url: '/obtener_resultados',
            datos: { tabla: 'asambleas.propuestas_temas', propuesta_id: pt_id }
        }).then(function(response) {
            if(response.length > 0) {
                var html = '';
                // if(response[0].fv_id == 6) {
                    for(let i = 0; i < response.length; i++){

                        // var checked = (response[i].resultado_ganador == "S") ? 'checked="checked"' : "";
                        html += '<tr>';
                        html += '   <td>'+response[i].resultado_descripcion+'</td>';
                        html += '   <td >'+response[i].resultado_votos+'</td>';
                        if(response[i].resolucion_id == null) {
                            html += '   <td><input resultado_votos="'+response[i].resultado_votos+'" resultado_id="'+response[i].resultado_id+'" cont="'+i+'" type="number" autofocus="autofocus" class="form-control input-sm" name="mano_alzada[]" value="'+response[i].resultado_mano_alzada+'"/></td>';
                        } else {
                            html += '   <td>'+response[i].resultado_mano_alzada+'</td>';
                        }
                        html += '   <td class="total">'+response[i].resultado_total+'</td>';
                        // html += '   <td ><center><input resultado_id="'+response[i].resultado_id+'" type="checkbox" '+checked+' name="ganador[]"/></center></td>';
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


    
    document.getElementById("listado-propuesta-tema").addEventListener("click", function(event) {
        event.preventDefault();
      
        window.open(BaseUrl + "/propuestas/imprimir_propuestas_temas/");
    })


    document.getElementById("filtrar").addEventListener("click", function(event) {
        event.preventDefault();
        if(typeof propuestas_temas.datatable.length != "undefined") {
            propuestas_temas.datatable.destroy();
        }

        var fecha_inicio = document.getElementsByName("fecha-inicio")[0].value;
        var fecha_fin = document.getElementsByName("fecha-fin")[0].value;
        var pais_id = document.getElementsByName("pais_id_filtro")[0].value;
       
        propuestas_temas.TablaListado({
            tablaID: '#tabla-propuestas-temas',
            url: "/buscar_datos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            pais_id: pais_id
        });
    })

    $("#pt_digitar").on('ifClicked', function(event){

        if(!$(this).parent(".icheckbox_minimal-blue").hasClass("checked")) {
            // alert("check");
            $(".no-digitar").hide();
            $(".digitar").show();
        } else {
            $(".digitar").hide();
            $(".no-digitar").show();
        }
    })


})

