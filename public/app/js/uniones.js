var uniones = new BASE_JS('uniones', 'uniones');

document.addEventListener("DOMContentLoaded", function() {
    uniones.buscarEnFormulario("descripcion").solo_letras();
    uniones.buscarEnFormulario("telefono").solo_numeros();
    uniones.buscarEnFormulario("fax").solo_numeros();

    uniones.TablaListado({
        tablaID: '#tabla-uniones',
        url: "/buscar_datos",
    });

    uniones.select({
        name: 'idunion',
        url: '/obtener_uniones',
        placeholder: 'Seleccione Unión'

    })


    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nueva-union':
                event.preventDefault();
            
                uniones.abrirModal();
            break;

            case 'modificar-union':
                event.preventDefault();
            
                modificar_union();
            break;

            case 'eliminar-union':
                event.preventDefault();
                eliminar_union();
            break;

            case 'guardar-union':
                event.preventDefault();
                guardar_union();
            break;

        }

    })


    function modificar_union() {
        var datos = uniones.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = uniones.get(datos.idunion);

        promise.then(function(response) {
            uniones.ajax({
                url: '/obtener_paises',
                datos: { idunion: datos.idunion }
            }).then(function(response) {
                var array = [];
                for(let i = 0; i < response.length; i++){
                    array.push(response[i].pais_id);
                }
                // console.log(array);
                //$("select[name='modulo_id[]']").val(array).trigger("chosen:updated");
                $("#pais_id")[0].selectize.setValue(array);
                // console.log($("#pais_id")[0].selectize.getValue());
            })
        });
    }

    function guardar_union() {
        var required = true;
        required = required && uniones.required("descripcion");
        if(required) {
            var promise = uniones.guardar();
            uniones.CerrarModal();
            // uniones.datatable.destroy();
            // uniones.TablaListado({
            //     tablaID: '#tabla-uniones',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idunion]").chosen("destroy");
                uniones.select({
                    name: 'idunion',
                    url: '/obtener_uniones',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_union() {
        var datos = uniones.datatable.row('.selected').data();
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
                uniones.Operacion(datos.idunion, "E");
                // uniones.datatable.destroy();
                // uniones.TablaListado({
                //     tablaID: '#tabla-uniones',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "uniones/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-uniones').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        uniones.abrirModal();
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
                
                if($('#modal-uniones').is(':visible')) {
                    guardar_union();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-union").addEventListener("click", function(event) {
        event.preventDefault();
        uniones.CerrarModal();
    })


})