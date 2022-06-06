var pastores = new BASE_JS('pastores', 'pastores');
var principal = new BASE_JS('principal', 'principal');

document.addEventListener("DOMContentLoaded", function() {
    pastores.buscarEnFormulario("nombrecompleto").solo_letras();
    pastores.buscarEnFormulario("nrodoc").solo_numeros();
    
    pastores.TablaListado({
        tablaID: '#tabla-pastores',
        url: "/buscar_datos",
    });

    principal.select({
        name: 'idtipodoc',
        url: '/obtener_tipos_documento',
        placeholder: seleccione,
    }).then(function() {
        pastores.enter("idtipodoc","nrodoc");
    })

    pastores.select({
        name: 'idcargo',
        url: '/obtener_cargos',
        placeholder: seleccione,
    }).then(function() {
    })

    $(function() {
        $('input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    })



    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-pastor':
                event.preventDefault();
            
                pastores.abrirModal();
            break;

            case 'modificar-pastor':
                event.preventDefault();
            
                modificar_pastor();
            break;

            case 'eliminar-pastor':
                event.preventDefault();
                eliminar_pastor();
            break;

            case 'guardar-pastor':
                event.preventDefault();
                guardar_pastor();
            break;

        }

    })


    function modificar_pastor() {
        var datos = pastores.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = pastores.get(datos.idotrospastores);

        promise.then(function(response) {
        
        })
    }

    function guardar_pastor() {
        var required = true;
        // required = required && pastores.required("perfil_descripcion");

    
        if(required) {
            var promise = pastores.guardar();
            pastores.CerrarModal();
            // pastores.datatable.destroy();
            // pastores.TablaListado({
            //     tablaID: '#tabla-pastores',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
            
            })

        }
    }

    function eliminar_pastor() {
        var datos = pastores.datatable.row('.selected').data();
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
                pastores.Operacion(datos.idotrospastores, "E");
                // pastores.datatable.destroy();
                // pastores.TablaListado({
                //     tablaID: '#tabla-pastores',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "pastores/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-pastores').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        pastores.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_pastor();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_pastor();
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
                
                if($('#modal-pastores').is(':visible')) {
                    guardar_pastor();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-pastor").addEventListener("click", function(event) {
        event.preventDefault();
        pastores.CerrarModal();
    })



    $("input[name='vigente']").on('ifChanged', function(event){

        $(this).val("0");
        $("input[name='vigente']").on('ifChecked', function(event){
            $(this).val("1");
        });

    });


})