var misiones = new BASE_JS('misiones', 'misiones');

document.addEventListener("DOMContentLoaded", function() {
    misiones.buscarEnFormulario("descripcion").solo_letras();
    misiones.buscarEnFormulario("telefono").solo_numeros();
    misiones.buscarEnFormulario("fax").solo_numeros();

    misiones.TablaListado({
        tablaID: '#tabla-misiones',
        url: "/buscar_datos",
    });

    misiones.select({
        name: 'idmision',
        url: '/obtener_misiones',
        placeholder: 'Seleccione Misión'

    })

    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nueva-mision':
                event.preventDefault();
            
                misiones.abrirModal();
            break;

            case 'modificar-mision':
                event.preventDefault();
            
                modificar_union();
            break;

            case 'eliminar-mision':
                event.preventDefault();
                eliminar_union();
            break;

            case 'guardar-mision':
                event.preventDefault();
                guardar_union();
            break;

        }

    })


    function modificar_union() {
        var datos = misiones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = misiones.get(datos.idmision);

        promise.then(function(response) {
            
        });
    }

    function guardar_union() {
        var required = true;
        required = required && misiones.required("descripcion");
        required = required && misiones.validar_email("email");
        if(required) {
            var promise = misiones.guardar();
            misiones.CerrarModal();
            // misiones.datatable.destroy();
            // misiones.TablaListado({
            //     tablaID: '#tabla-misiones',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idmision]").chosen("destroy");
                misiones.select({
                    name: 'idmision',
                    url: '/obtener_misiones',
                    placeholder: 'Seleccione Misión',
                    selected: response.id
                })
            })

        }
    }

    function eliminar_union() {
        var datos = misiones.datatable.row('.selected').data();
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
                misiones.Operacion(datos.idmision, "E");
                // misiones.datatable.destroy();
                // misiones.TablaListado({
                //     tablaID: '#tabla-misiones',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "misiones/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-misiones').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        misiones.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_union();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_union();
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
                
                if($('#modal-misiones').is(':visible')) {
                    guardar_union();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-mision").addEventListener("click", function(event) {
        event.preventDefault();
        misiones.CerrarModal();
    })


})