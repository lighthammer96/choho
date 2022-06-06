var comentarios = new BASE_JS('comentarios', 'comentarios');
var foros = new BASE_JS('foros', 'foros');



document.addEventListener("DOMContentLoaded", function() {
  

    var eventClick = new Event('click');

    // comentarios.enter("asamblea_descripcion","tipconv_id");
    // comentarios.enter("tipconv_id","asamblea_anio");
  
    // comentarios.enter("asamblea_fecha_inicio","asamblea_fecha_fin");
    // comentarios.enter("asamblea_fecha_fin","estado");
    // comentarios.enter("estado","detalle");
    // comentarios.enter("detalle","fecha");
    // comentarios.enter("fecha","hora");

   

    foros.select({
        name: 'foro_id',
        url: '/obtener_foros',
        placeholder: seleccione
    }).then(function() {
        // asignacion_delegados.enter("idocupacion","observaciones");   
        
    }) 

    comentarios.TablaListado({
        tablaID: '#tabla-comentarios',
        url: "/buscar_datos",
    });






    document.getElementById("nuevo-comentario").addEventListener("click", function(event) {
        event.preventDefault();
      
        comentarios.abrirModal();

        
    })

    document.getElementById("modificar-comentario").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = comentarios.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 


        var promise = comentarios.get(datos.comentario_id);

        promise.then(function(response) {
            
           
            
        })
        

    })

    document.getElementById("eliminar-comentario").addEventListener("click", function(event) {
        event.preventDefault();
      
        var datos = comentarios.datatable.row('.selected').data();
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
                comentarios.Operacion(datos.comentario_id, "E");
            }
        });

        
    })




    document.getElementById("guardar-comentarios").addEventListener("click", function(event) {
        event.preventDefault();
 

        var required = true;

        required = required && comentarios.required("foro_id");
        required = required && comentarios.required("comentario_descripcion");
        required = required && comentarios.required("estado");
 
        if(required) {
            var promise = comentarios.guardar();
            comentarios.CerrarModal();
            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
           
                // socket.emit("comentarios-activada", response);
            })

        }
    })



    document.addEventListener("keydown", function(event) {
        // console.log(event.target.name);
        // alert(modulo_controlador);
        if(modulo_controlador == "comentarios/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-comentarios').is(':visible')) {
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
            
                if($('#modal-comentarios').is(':visible')) {
                    document.getElementById('guardar-comentarios').dispatchEvent(eventClick);
                }
                
            
                event.preventDefault();
                event.stopPropagation();
            }
          
            
        
            
        
        
        
        }
    
        
    })

    document.getElementById("cancelar-comentarios").addEventListener("click", function(event) {
        event.preventDefault();
        comentarios.CerrarModal();
    })


})

