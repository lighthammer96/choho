var asambleas = new BASE_JS('asambleas', 'asambleas');
var paises = new BASE_JS('paises', 'paises');



document.addEventListener("DOMContentLoaded", function() {
  

    paises.select({
        name: 'idpais',
        url: '/obtener_todos_paises',
        placeholder: seleccione,
    }).then(function() {
        // asociados.enter("pais_id_nacimiento","ciudadnacextranjero");
    })

    var format = "";
    if(idioma_codigo == "es") {
        format = "dd/mm/yyyy";
      
        $("input[name=asamblea_fecha_inicio], input[name=asamblea_fecha_fin], input[name=fecha]").attr("data-inputmask", "'alias': '"+format+"'");
    } else {
        format = "yyyy-mm-dd";
  
        $("input[name=asamblea_fecha_inicio], input[name=asamblea_fecha_fin], input[name=fecha]").attr("data-inputmask", "'alias': '"+format+"'");
        
    }
    var eventClick = new Event('click');

    asambleas.enter("asamblea_descripcion","tipconv_id");
    asambleas.enter("tipconv_id","asamblea_anio");
  
    asambleas.enter("asamblea_fecha_inicio","asamblea_fecha_fin");
    asambleas.enter("asamblea_fecha_fin","estado");
    asambleas.enter("estado","detalle");
    asambleas.enter("detalle","fecha");
    asambleas.enter("fecha","hora");

    asambleas.enter("hora", "detalle", function() {
        var required = true;
        required = asambleas.required("detalle");
        required = asambleas.required("fecha");

        if(!required) {
            return false;
        }

        var detalle = document.getElementsByName("detalle")[0];
        var fecha = document.getElementsByName("fecha")[0];
        var hora = document.getElementsByName("hora")[0];

        var objeto = {
            agenda_descripcion: detalle.value,
            agenda_fecha: fecha.value,
            agenda_hora: hora.value
        }


        document.getElementById("detalle-agenda").getElementsByTagName("tbody")[0].appendChild(html_detalle_agenda(objeto));
    
        asambleas.limpiarDatos("limpiar");
    });

    function html_detalle_agenda(objeto, disabled) {
        var attr = '';
        var html = '';
        if(typeof disabled != "undefined") {
            attr = 'disabled="disabled"';
        }
        var tr = document.createElement("tr");

        html = '  <input type="hidden" name="agenda_descripcion[]" value="'+objeto.agenda_descripcion+'" >';
        html += '  <input type="hidden" name="agenda_fecha[]" value="'+objeto.agenda_fecha+'" >';
        html += '  <input type="hidden" name="agenda_hora[]" value="'+objeto.agenda_hora+'" >';
        html += '  <td>'+objeto.agenda_descripcion+'</td>';
        html += '  <td>'+objeto.agenda_fecha+'</td>';
        html += '  <td>'+objeto.agenda_hora+'</td>';
        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-agenda"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }




    $("input[name=asamblea_fecha_inicio], input[name=asamblea_fecha_fin], input[name=fecha]").inputmask();

    $('input[name=hora]').inputmask("hh:mm", {
        placeholder: "HH:MM", 
        insertMode: false, 
        showMaskOnHover: false,
        hourFormat: 12
      }
   );
 
    jQuery( "input[name=asamblea_fecha_inicio], input[name=asamblea_fecha_fin], input[name=fecha]").datepicker({
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




    asambleas.select({
        name: 'asamblea_anio',
        url: '/obtener_anios',
        placeholder: seleccione
    }).then(function() {
        asambleas.enter("asamblea_anio","asamblea_fecha_inicio");
    })

    asambleas.select({
        name: 'tipconv_id',
        url: '/obtener_tipo_convocatoria',
        placeholder: seleccione
    })

    

    asambleas.TablaListado({
        tablaID: '#tabla-asambleas',
        url: "/buscar_datos",
    });






    document.getElementById("nueva-asamblea").addEventListener("click", function(event) {
        event.preventDefault();
      
        asambleas.abrirModal();

        
    })

    document.getElementById("modificar-asamblea").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = asambleas.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 


        var promise = asambleas.get(datos.asamblea_id);

        promise.then(function(response) {
            
            document.getElementById("detalle-agenda").getElementsByTagName("tbody")[0].innerHTML = "";
            asambleas.ajax({
                url: '/obtener_detalle_agenda',
                datos: { asamblea_id: response.asamblea_id }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-agenda").getElementsByTagName("tbody")[0].appendChild(html_detalle_agenda(response[i]));
                    }
                }
                //console.log(response);
            })
            
        })
        

    })

    document.getElementById("eliminar-asamblea").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = asambleas.datatable.row('.selected').data();
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
                asambleas.Operacion(datos.asamblea_id, "E");
            }
        });

        
    })




    document.getElementById("guardar-asamblea").addEventListener("click", function(event) {
        event.preventDefault();
 

        var required = true;

        required = required && asambleas.required("asamblea_descripcion");
        required = required && asambleas.required("tipconv_id");
        required = required && asambleas.required("asamblea_anio");
        required = required && asambleas.required("asamblea_fecha_inicio");
        required = required && asambleas.required("asamblea_fecha_fin");
        required = required && asambleas.required("estado");
       
       

   
        if(required) {
            var promise = asambleas.guardar();
            asambleas.CerrarModal();
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
        if(modulo_controlador == "asambleas/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-asambleas').is(':visible')) {
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
            
                if($('#modal-asambleas').is(':visible')) {
                    document.getElementById('guardar-asamblea').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-asamblea").addEventListener("click", function(event) {
        event.preventDefault();
        asambleas.CerrarModal();
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


    


    document.getElementById("calendar-asamblea_fecha_inicio").addEventListener("click", function(e) {
        e.preventDefault();
        if($("input[name=asamblea_fecha_inicio]").hasClass("focus-datepicker")) {
   
            $("input[name=asamblea_fecha_inicio]").blur();
            $("input[name=asamblea_fecha_inicio]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=asamblea_fecha_inicio]").focus();
            $("input[name=asamblea_fecha_inicio]").addClass("focus-datepicker");
        }
    });


    document.getElementById("calendar-asamblea_fecha_fin").addEventListener("click", function(e) {
        e.preventDefault();
        
        if($("input[name=asamblea_fecha_fin]").hasClass("focus-datepicker")) {
   
            $("input[name=asamblea_fecha_fin]").blur();
            $("input[name=asamblea_fecha_fin]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=asamblea_fecha_fin]").focus();
            $("input[name=asamblea_fecha_fin]").addClass("focus-datepicker");
        }
       
    });

    document.getElementById("calendar-fecha").addEventListener("click", function(e) {
        e.preventDefault();
        
        if($("input[name=fecha]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha]").blur();
            $("input[name=fecha]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha]").focus();
            $("input[name=fecha]").addClass("focus-datepicker");
        }
       
    });


    document.getElementById("time-hora").addEventListener("click", function(e) {
        e.preventDefault();
        
        if($("input[name=hora]").hasClass("focus-time")) {
   
            $("input[name=hora]").blur();
            $("input[name=hora]").removeClass("focus-time");
        } else {
            
            $("input[name=hora]").focus();
            $("input[name=hora]").addClass("focus-time");
        }
       
    }); 

    $(document).on("change", "#asamblea_fecha_inicio", function(e) {
        var asamblea_fecha_inicio = $("#asamblea_fecha_inicio").val();
        var asamblea_fecha_fin = $("#asamblea_fecha_fin").val();
        // alert(asamblea_fecha_inicio+ " " +asamblea_fecha_fin);
        if(asamblea_fecha_fin < asamblea_fecha_inicio) {
            // alert(asamblea_fecha_inicio);
          
            $("#asamblea_fecha_fin").val(asamblea_fecha_inicio);
          
        } 
    })  
    
    $(document).on("change", "#asamblea_fecha_fin", function(e) {
        var asamblea_fecha_inicio = $("#asamblea_fecha_inicio").val();
        var asamblea_fecha_fin = $("#asamblea_fecha_fin").val();
        // alert(asamblea_fecha_inicio+ " " +asamblea_fecha_fin);
        if(asamblea_fecha_fin < asamblea_fecha_inicio) {
            // alert(asamblea_fecha_inicio);
            $("#asamblea_fecha_inicio").val(asamblea_fecha_fin);
          
        } 
    })  

    
    // document.getElementById("asamblea_fecha_fin").addEventListener("click", function(e) {
    //     e.preventDefault();
        
    //     var asamblea_fecha_fin = this.value; 
        
       
    // });

    
    

})

