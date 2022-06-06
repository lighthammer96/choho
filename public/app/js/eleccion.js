var eleccion = new BASE_JS('eleccion', 'eleccion');
var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
var iglesias = new BASE_JS('iglesias', 'iglesias');
var asociados = new BASE_JS('asociados', 'asociados');

document.addEventListener("DOMContentLoaded", function() {
    eleccion.buscarEnFormulario("feligresiaanterior").solo_numeros();
    eleccion.buscarEnFormulario("delegados").solo_numeros();
    eleccion.buscarEnFormulario("feligresiaactual").solo_numeros();


    $(function() {
        $('input[type="radio"], input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    })
    
    asociados.select({
        name: 'periodoini',
        url: '/obtener_periodos_ini',
    }).then(function() {
        
    }) 

    asociados.select({
        name: 'periodofin',
        url: '/obtener_periodos_fin',
    }).then(function() {
        
    }) 
    
    var format = "";
    if(idioma_codigo == "es") {
        format = "dd/mm/yyyy";
        // document.getElementsByName("fechaingresoiglesia")[0].setAttribute("default-value", BASE_JS.ObtenerFechaActual("user"));
        $("input[name=fecha], input[name=fechaanterior]").attr("data-inputmask", "'alias': '"+format+"'");
    } else {
        format = "yyyy-mm-dd";
        // document.getElementsByName("fechaingresoiglesia")[0].setAttribute("default-value", BASE_JS.ObtenerFechaActual("server"));
        $("input[name=fecha], input[name=fechaanterior]").attr("data-inputmask", "'alias': '"+format+"'");
        
    }

    $("input[name=fecha], input[name=fechaanterior]").inputmask();

 
    jQuery( "input[name=fecha], input[name=fechaanterior]" ).datepicker({
        format: format,
        language: "es",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        endDate: "now()",

    });

   
    eleccion.TablaListado({
        tablaID: '#tabla-eleccion',
        url: "/buscar_datos",
    });


    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones',
        placeholder: seleccione
    }).then(function() {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", "", ""]);
        $("#idunion").trigger("change", ["", ""]);
        $("#idmision").trigger("change", ["", ""]);
        // $("#iddistritomisionero").trigger("change", ["", ""]);
        // $("#idiglesia").trigger("change", ["", ""]);
        
        
    }) 

    $(document).on('change', '#iddivision', function(event, iddivision, pais_id) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
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



    $(document).on('change', '#pais_id', function(event, pais_id, idunion) {
        
        var valor = "1|S"; 

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
        //var selected_iddepartamento = (typeof iddepartamento != "undefined")  ? iddepartamento : "";
        // jerarquia(d_id);

        uniones.select({
            name: 'idunion',
            url: '/obtener_uniones_paises',
            placeholder: seleccione,
            selected: selected,
            datos: { pais_id: d_id }
        }).then(function() {
        
            var condicion = typeof pais_id == "undefined" && pais_id != "";
            condicion = condicion && typeof idunion == "undefined" && idunion != "";
            // condicion = condicion && typeof iddepartamento == "undefined" && iddepartamento != "";
        
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


        // principal.select({
        //     name: 'iddepartamento',
        //     url: '/obtener_departamentos',
        //     placeholder: seleccione,
        //     selected: selected_iddepartamento,
        //     datos: { pais_id: d_id }
        // }).then(function() {
        //     var condicion = typeof pais_id == "undefined" && pais_id != "";
        //     condicion = condicion && typeof iddepartamento == "undefined" && iddepartamento != "";

        //     if(condicion) {
        //         $("#iddepartamento").trigger("change", ["", ""]);
        //         $("#idprovincia").trigger("change", ["", ""]);  
        //     }
        // }) 
        
    });



    $(document).on('change', '#idunion', function(event, idunion, idmision) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
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

    // $(document).on('change', '#idmision', function(event, idmision, iddistritomisionero) {

    //     var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
    //     d_id = (typeof idmision != "undefined" && idmision != null) ? idmision : d_id;
    //     var selected = (typeof iddistritomisionero != "undefined")  ? iddistritomisionero : "";
    
    //     distritos_misioneros.select({
    //         name: 'iddistritomisionero',
    //         url: '/obtener_distritos_misioneros',
    //         placeholder: seleccione,
    //         selected: selected,
    //         datos: { idmision: d_id }
    //     }).then(function() {
        
    //         var condicion = typeof idmision == "undefined" && idmision != "";
    //         condicion = condicion && typeof iddistritomisionero == "undefined" && iddistritomisionero != "";
        
    //         if(condicion) {
    //             // var required = true;
    //             // required = required && iglesias.required("idmision");
    //             // if(required) {
    //                 $("#iddistritomisionero")[0].selectize.focus();
    //             // }
    //         } 
        
    //     })
    // });

    // $(document).on('change', '#iddistritomisionero', function(event, iddistritomisionero, idiglesia) {

    //     var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
    //     d_id = (typeof iddistritomisionero != "undefined" && iddistritomisionero != null) ? iddistritomisionero : d_id;
    //     var selected = (typeof idiglesia != "undefined")  ? idiglesia : "";
    
    //     iglesias.select({
    //         name: 'idiglesia',
    //         url: '/obtener_iglesias',
    //         placeholder: seleccione,
    //         selected: selected,
    //         datos: { iddistritomisionero: d_id }
    //     }).then(function() {
        
    //         var condicion = typeof iddistritomisionero == "undefined" && iddistritomisionero != "";
    //         condicion = condicion && typeof idiglesia == "undefined" && idiglesia != "";
        
    //         if(condicion) {
    //             // var required = true;
    //             // required = required && asociados.required("iddistritomisionero");
    //             // if(required) {
    //                 $("#idiglesia")[0].selectize.focus();
    //             // }
    //         } 
        
    //     })
    // });



    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nueva-eleccion':
                event.preventDefault();
            
                eleccion.abrirModal();
            break;

            case 'modificar-eleccion':
                event.preventDefault();
            
                modificar_eleccion();
            break;

            case 'eliminar-eleccion':
                event.preventDefault();
                eliminar_eleccion();
            break;

            case 'guardar-eleccion':
                event.preventDefault();
                guardar_eleccion();
            break;

        }

    })


    function modificar_eleccion() {
        var datos = eleccion.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = eleccion.get(datos.ideleccion);

        promise.then(function(response) {
            // eleccion.ajax({
            //     url: '/obtener_traducciones',
            //     datos: { ideleccion: response.ideleccion }
            // }).then(function(response) {
            //     if(response.length > 0) {
            //         for(let i = 0; i < response.length; i++){
            //             document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].appendChild(html_detalle_traducciones(response[i]));
            //         }
            //     }
            //     //console.log(response);
            // })

            if(response.posee_union == "N") {
                $(".union").hide();
            } else {
                $(".union").show();
            }

            $("#iddivision").trigger("change", [response.iddivision, response.pais_id]);
            $("#pais_id").trigger("change", [response.pais_id, response.idunion]);
            $("#idunion").trigger("change", [response.idunion, response.idmision]);
            $("#idmision").trigger("change", [response.idmision, response.iddistritomisionero]);
            
        })
    }

    function guardar_eleccion() {
        var pais_id = document.getElementsByName("pais_id")[0].value;
        var array_pais = pais_id.split("|");
        var required = true;
        // required = required && eleccion.required("perfil_descripcion");

        required = required && eleccion.required("iddivision");
        required = required && eleccion.required("pais_id");
        // required = required && eleccion.required("iddivision");
        if(array_pais[1] == "S") {
            required = required && eleccion.required("idunion");
        }
        required = required && eleccion.required("idmision");
        // required = required && eleccion.required("iddistritomisionero");
        // required = required && eleccion.required("idiglesia");
        required = required && eleccion.required("periodoini");
        required = required && eleccion.required("periodofin");
        required = required && eleccion.required("fechaanterior");
        required = required && eleccion.required("feligresiaanterior");
        required = required && eleccion.required("fecha");
        required = required && eleccion.required("supervisor");
        required = required && eleccion.required("delegados");
        required = required && eleccion.required("feligresiaactual");
        required = required && eleccion.required("tiporeunion");
        if(required) {
            var promise = eleccion.guardar();
            eleccion.CerrarModal();
            // eleccion.datatable.destroy();
            // eleccion.TablaListado({
            //     tablaID: '#tabla-eleccion',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
           
                // if(response.posee_union == "N") {
                //     $(".union").hide();
                // } else {
                //     $(".union").show();
                // }

                // $("#iddivision").trigger("change", [response.iddivision, response.pais_id]);
                // $("#pais_id").trigger("change", [response.pais_id, response.idunion, response.iddepartamento]);
                // $("#idunion").trigger("change", [response.idunion, response.idmision]);
                // $("#idmision").trigger("change", [response.idmision, response.iddistritomisionero]);
                // $("#iddistritomisionero").trigger("change", [response.iddistritomisionero, response.idiglesia]);
    
            })

        }
    }

    function eliminar_eleccion() {
        var datos = eleccion.datatable.row('.selected').data();
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
                eleccion.Operacion(datos.ideleccion, "E");
                // eleccion.datatable.destroy();
                // eleccion.TablaListado({
                //     tablaID: '#tabla-eleccion',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "eleccion/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-eleccion').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        eleccion.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_eleccion();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_eleccion();
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
                
                if($('#modal-eleccion').is(':visible')) {
                    guardar_eleccion();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-eleccion").addEventListener("click", function(event) {
        event.preventDefault();
        eleccion.CerrarModal();
    })

    document.getElementById("calendar-fecha").addEventListener("click", function(e) {
        e.preventDefault();
        $("input[name=fecha]").focus();
    });

    document.getElementById("calendar-fechaanterior").addEventListener("click", function(e) {
        e.preventDefault();
        $("input[name=fechaanterior]").focus();
    });

 

})