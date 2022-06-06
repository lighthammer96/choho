var departamentos = new BASE_JS('departamentos', 'departamentos');

document.addEventListener("DOMContentLoaded", function() {
    departamentos.buscarEnFormulario("descripcion").solo_letras();
   
    departamentos.TablaListado({
        tablaID: '#tabla-departamentos',
        url: "/buscar_datos",
    });

    departamentos.select({
        name: 'iddepartamento',
        url: '/obtener_departamentos',
        placeholder: 'Seleccione ...'
    }).then(function() {
        
        
    }) 

    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-departamento':
                event.preventDefault();
            
                departamentos.abrirModal();
            break;

            case 'modificar-departamento':
                event.preventDefault();
            
                modificar_departamento();
            break;

            case 'eliminar-departamento':
                event.preventDefault();
                eliminar_departamento();
            break;

            case 'guardar-departamento':
                event.preventDefault();
                guardar_departamento();
            break;

        }

    })


    function modificar_departamento() {
        var datos = departamentos.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = departamentos.get(datos.iddepartamento);

        promise.then(function(response) {
        
        })
    }

    function guardar_departamento() {
        var required = true;
        // required = required && departamentos.required("perfil_descripcion");

    
        if(required) {
            var promise = departamentos.guardar();
            departamentos.CerrarModal();
            // departamentos.datatable.destroy();
            // departamentos.TablaListado({
            //     tablaID: '#tabla-departamentos',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=iddepartamento]").chosen("destroy");
                departamentos.select({
                    name: 'iddepartamento',
                    url: '/obtener_departamentos',
                    placeholder: 'Seleccione ...',
                    selected: response.id
                })
            })

        }
    }

    function eliminar_departamento() {
        var datos = departamentos.datatable.row('.selected').data();
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
                departamentos.Operacion(datos.iddepartamento, "E");
                // departamentos.datatable.destroy();
                // departamentos.TablaListado({
                //     tablaID: '#tabla-departamentos',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "departamentos/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-departamentos').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        departamentos.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_departamento();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_departamento();
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
                
                if($('#modal-departamentos').is(':visible')) {
                    guardar_departamento();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-departamento").addEventListener("click", function(event) {
        event.preventDefault();
        departamentos.CerrarModal();
    })


})