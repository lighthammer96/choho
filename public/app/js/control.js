var control = new BASE_JS('control', 'traslados');

document.addEventListener("DOMContentLoaded", function() {
        
   
    control.TablaListado({
        tablaID: '#tabla-control-traslados',
        url: "/buscar_datos_control",
    });

  

    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
   
        switch (id) {
  

            case 'finalizar-traslado':
                event.preventDefault();
            
                finalizar_traslado();
            break;



            case 'guardar-control':
                event.preventDefault();
                guardar_control();
            break;

        }

    })


    function finalizar_traslado() {
        var datos = control.datatable.row('.selected').data();
        //console.log(datos);
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        if(datos.estado != "PENDIENTE") {
            BASE_JS.sweet({
                text: finaliza_traslado
            });
            
            return false;
        } 

        var promise = control.get(datos.idcontrol);

        promise.then(function(response) {
            
        })
    }

    function guardar_control() {
        var estado = document.getElementsByName("estado")[0].value;
        var idmiembro = document.getElementsByName("idmiembro")[0].value;
        var idcontrol = document.getElementsByName("idcontrol")[0].value;
        var required = true;
        required = required && control.required("estado");

        if(required) {
            var promise = control.guardar();
            control.CerrarModal();
            // control.datatable.destroy();
            // control.TablaListado({
            //     tablaID: '#tabla-control',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                
                // alert(estado);
                if(estado == "0") {
                    window.open(BaseUrl + "/traslados/imprimir_respuesta_carta_iglesia/"+idmiembro+"/"+idcontrol);
                }

            })

        }
    }





    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "control/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-control').is(':visible')) {
            
                switch (event.code) {
                    // case 'F1':
                    //     control.abrirModal();
                    //     event.preventDefault();
                    //     event.stopPropagation();
                    //     break;
                    case 'F2':
                        finalizar_traslado();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    // case 'F7':
                    //     eliminar_control();
                    //     event.preventDefault();
                    //     event.stopPropagation();
                    
                    //     break;
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
                
                if($('#modal-control').is(':visible')) {
                    guardar_control();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-control").addEventListener("click", function(event) {
        event.preventDefault();
        control.CerrarModal();
    })




})


// function imprimir_respuesta_carta_iglesia(idmiembro) {
    
// }



function imprimir_carta_iglesia(idmiembro, idcontrol) {
    window.open(BaseUrl + "/traslados/imprimir_carta_iglesia/"+idmiembro+ "/"+idcontrol);
}