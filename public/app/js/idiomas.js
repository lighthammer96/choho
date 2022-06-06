
var idiomas = new BASE_JS('idiomas', 'idiomas');
var combo_idioma = ""; // declaracion global
var combo_idiomas = ""; // declaracion global

document.addEventListener("DOMContentLoaded", function() {
    idiomas.buscarEnFormulario("idioma_descripcion").solo_letras();
    idiomas.buscarEnFormulario("idioma_codigo").solo_letras();
    

    idiomas.TablaListado({
        tablaID: '#tabla-idiomas',
        url: "/buscar_datos",
    });

    combo_idiomas = idiomas.select({
        name: 'idioma_id',
        url: '/obtener_idiomas',
        placeholder: 'Seleccione Idioma'
    });


    combo_idioma = idiomas.select({
        name: 'idioma',
        url: '/obtener_idiomas',
        placeholder: 'Seleccione Idioma'
    });

    

    // var combo_idioma_padre = idiomas.select({
    //     name: 'idioma|padre',
    //     url: '/obtener_idiomas',
    //     placeholder: 'Seleccione Idioma'
    // });




    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-idioma':
                event.preventDefault();
            
                idiomas.abrirModal();
            break;

            case 'modificar-idioma':
                event.preventDefault();
            
                modificar_idioma();
            break;

            case 'eliminar-idioma':
                event.preventDefault();
                eliminar_idioma();
            break;

            case 'guardar-idioma':
                event.preventDefault();
                guardar_idioma();
            break;

        }

    })


    function modificar_idioma() {
        var datos = idiomas.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        idiomas.get(datos.idioma_id);
    }

    function guardar_idioma() {
        var required = true;
        required = required && idiomas.required("idioma_descripcion");
        if(required) {
            var promise = idiomas.guardar();
            idiomas.CerrarModal();
            // idiomas.datatable.destroy();
            // idiomas.TablaListado({
            //     tablaID: '#tabla-idiomas',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idioma_id]").chosen("destroy");

                combo_idiomas = idiomas.select({
                    name: 'idioma_id',
                    url: '/obtener_idiomas',
                    placeholder: 'Seleccione Idioma',
                    selected: response.id
                });

                combo_idioma = idiomas.select({
                    name: 'idioma',
                    url: '/obtener_idiomas',
                    placeholder: 'Seleccione Idioma',
                    selected: response.id
                });

            })

        }
    }

    function eliminar_idioma() {
        var datos = idiomas.datatable.row('.selected').data();
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
                idiomas.Operacion(datos.idioma_id, "E");
                // idiomas.datatable.destroy();
                // idiomas.TablaListado({
                //     tablaID: '#tabla-idiomas',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "idiomas/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-idiomas').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        idiomas.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_idioma();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_idioma();
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
                
                if($('#modal-idiomas').is(':visible')) {
                    guardar_idioma();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-idioma").addEventListener("click", function(event) {
        event.preventDefault();
        idiomas.CerrarModal();
    })


})

