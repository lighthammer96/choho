var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');

document.addEventListener("DOMContentLoaded", function() {
    // distritos_misioneros.buscarEnFormulario("descripcion").solo_letras();
    
    distritos_misioneros.TablaListado({
        tablaID: '#tabla-distritos-misioneros',
        url: "/buscar_datos",
    });


    distritos_misioneros.select({
        name: 'iddistritomisionero',
        url: '/obtener_distritos_misioneros',
        placeholder: seleccione
    })

    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-distrito-misionero':
                event.preventDefault();
            
                distritos_misioneros.abrirModal();
            break;

            case 'modificar-distrito-misionero':
                event.preventDefault();
            
                modificar_distrito_misionero();
            break;

            case 'eliminar-distrito-misionero':
                event.preventDefault();
                eliminar_distrito_misionero();
            break;

            case 'guardar-distrito-misionero':
                event.preventDefault();
                guardar_distrito_misionero();
            break;

        }

    })


    function modificar_distrito_misionero() {
        var datos = distritos_misioneros.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = distritos_misioneros.get(datos.iddistritomisionero);

        promise.then(function(response) {
            
        });
    }

    function guardar_distrito_misionero() {
        var required = true;
        required = required && distritos_misioneros.required("descripcion");
        if(required) {
            var promise = distritos_misioneros.guardar();
            distritos_misioneros.CerrarModal();
            // distritos_misioneros.datatable.destroy();
            // distritos_misioneros.TablaListado({
            //     tablaID: '#tabla-distritos-misioneros',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=iddistritomisionero]").chosen("destroy");
                distritos_misioneros.select({
                    name: 'iddistritomisionero',
                    url: '/obtener_distritos_misioneros',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_distrito_misionero() {
        var datos = distritos_misioneros.datatable.row('.selected').data();
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
                distritos_misioneros.Operacion(datos.iddistritomisionero, "E");
                // distritos_misioneros.datatable.destroy();
                // distritos_misioneros.TablaListado({
                //     tablaID: '#tabla-distritos-misioneros',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "distritos_misioneros/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-distritos_misioneros').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        distritos_misioneros.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_distrito_misionero();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_distrito_misionero();
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
                
                if($('#modal-distritos_misioneros').is(':visible')) {
                    guardar_distrito_misionero();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-distrito-misionero").addEventListener("click", function(event) {
        event.preventDefault();
        distritos_misioneros.CerrarModal();
    })


})