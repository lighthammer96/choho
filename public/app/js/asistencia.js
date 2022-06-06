var asistencia = new BASE_JS('asistencia', 'asistencia');
var paises = new BASE_JS('paises', 'paises');
var asambleas = new BASE_JS('asambleas', 'asambleas');


document.addEventListener("DOMContentLoaded", function() {
  

    var eventClick = new Event('click');

    // asistencia.enter("asamblea_descripcion","tipconv_id");
    // asistencia.enter("tipconv_id","asamblea_anio");
  
    // asistencia.enter("asamblea_fecha_inicio","asamblea_fecha_fin");
    // asistencia.enter("asamblea_fecha_fin","estado");
    // asistencia.enter("estado","detalle");
    // asistencia.enter("detalle","fecha");
    // asistencia.enter("fecha","hora");

   

    asambleas.select({
        name: 'asamblea_id',
        url: '/obtener_asambleas',
        placeholder: seleccione
    }).then(function() {
        // asignacion_delegados.enter("idocupacion","observaciones");   
        
    }) 

    asistencia.TablaListado({
        tablaID: '#tabla-asistencia',
        url: "/buscar_datos",
    });






    document.getElementById("nueva-asistencia").addEventListener("click", function(event) {
        event.preventDefault();
      
        asistencia.abrirModal();

        
    })

    document.getElementById("modificar-asistencia").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = asistencia.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 


        var promise = asistencia.get(datos.asistencia_id);

        promise.then(function(response) {
            
           
            
        })
        

    })

    document.getElementById("eliminar-asistencia").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = asistencia.datatable.row('.selected').data();
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
                asistencia.Operacion(datos.asistencia_id, "E");
            }
        });

        
    })




    document.getElementById("guardar-asistencia").addEventListener("click", function(event) {
        event.preventDefault();
 

        var required = true;

        required = required && asistencia.required("asamblea_id");
        required = required && asistencia.required("estado");
 
        if(required) {
            var promise = asistencia.guardar();
            asistencia.CerrarModal();
            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }

           
                socket.emit("asistencia-activada", response);
            })

        }
    })



    document.addEventListener("keydown", function(event) {
        // console.log(event.target.name);
        // alert(modulo_controlador);
        if(modulo_controlador == "asistencia/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-asistencia').is(':visible')) {
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
            
                if($('#modal-asistencia').is(':visible')) {
                    document.getElementById('guardar-asistencia').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-asistencia").addEventListener("click", function(event) {
        event.preventDefault();
        asistencia.CerrarModal();
    })


})

