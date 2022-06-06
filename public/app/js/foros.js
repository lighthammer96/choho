var foros = new BASE_JS('foros', 'foros');
var paises = new BASE_JS('paises', 'paises');
var asambleas = new BASE_JS('asambleas', 'asambleas');


document.addEventListener("DOMContentLoaded", function() {
  

    var eventClick = new Event('click');

    // foros.enter("asamblea_descripcion","tipconv_id");
    // foros.enter("tipconv_id","asamblea_anio");
  
    // foros.enter("asamblea_fecha_inicio","asamblea_fecha_fin");
    // foros.enter("asamblea_fecha_fin","estado");
    // foros.enter("estado","detalle");
    // foros.enter("detalle","fecha");
    // foros.enter("fecha","hora");

   

    asambleas.select({
        name: 'asamblea_id',
        url: '/obtener_asambleas',
        placeholder: seleccione
    }).then(function() {
        // asignacion_delegados.enter("idocupacion","observaciones");   
        
    }) 

    foros.TablaListado({
        tablaID: '#tabla-foros',
        url: "/buscar_datos",
    });






    document.getElementById("nuevo-foro").addEventListener("click", function(event) {
        event.preventDefault();
      
        foros.abrirModal();

        
    })

    document.getElementById("modificar-foro").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = foros.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 


        var promise = foros.get(datos.foro_id);

        promise.then(function(response) {
            
           
            
        })
        

    })

    document.getElementById("eliminar-foro").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = foros.datatable.row('.selected').data();
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
                foros.Operacion(datos.foro_id, "E");
            }
        });

        
    })




    document.getElementById("guardar-foros").addEventListener("click", function(event) {
        event.preventDefault();
 

        var required = true;

        required = required && foros.required("asamblea_id");
        required = required && foros.required("foro_descripcion");
        required = required && foros.required("estado");
 
        if(required) {
            var promise = foros.guardar();
            foros.CerrarModal();
            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
           
                socket.emit("foros-activada", response);
            })

        }
    })



    document.addEventListener("keydown", function(event) {
        // console.log(event.target.name);
        // alert(modulo_controlador);
        if(modulo_controlador == "foros/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-foros').is(':visible')) {
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
            
                if($('#modal-foros').is(':visible')) {
                    document.getElementById('guardar-foros').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-foros").addEventListener("click", function(event) {
        event.preventDefault();
        foros.CerrarModal();
    })


})

