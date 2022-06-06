var principal = new BASE_JS('principal', 'principal');
var paises = new BASE_JS('paises', 'paises');
var provincias = new BASE_JS('provincias', 'provincias');

document.addEventListener("DOMContentLoaded", function() {
    provincias.buscarEnFormulario("descripcion").solo_letras();

    paises.select({
        name: 'pais_id',
        url: '/obtener_paises',
        placeholder: 'Seleccione ...',
    }).then(function() {
        $("#pais_id").trigger("change", ["", ""]);
        $("#iddepartamento").trigger("change", ["", ""]);
       
    })


    $(document).on('change', '#pais_id', function(event, pais_id, iddepartamento) {
        var valor = $(this).val();
     
        if(pais_id != "" && pais_id != null) {
            valor = pais_id;
        } 
      
        principal.select({
            name: 'iddepartamento',
            url: '/obtener_departamentos',
            placeholder: 'Seleccione ...',
            selected: iddepartamento,
            datos: { pais_id: valor }
        })
        // alert(valor);
    })

    provincias.TablaListado({
        tablaID: '#tabla-provincias',
        url: "/buscar_datos",
    });


    provincias.select({
        name: 'idprovincia',
        url: '/obtener_provincias',
        placeholder: seleccione
    }).then(function() {
        
        
    }) 


    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nueva-provincia':
                event.preventDefault();
            
                provincias.abrirModal();
            break;

            case 'modificar-provincia':
                event.preventDefault();
            
                modificar_provincia();
            break;

            case 'eliminar-provincia':
                event.preventDefault();
                eliminar_provincia();
            break;

            case 'guardar-provincia':
                event.preventDefault();
                guardar_provincia();
            break;

        }

    })


    function modificar_provincia() {
        var datos = provincias.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = provincias.get(datos.idprovincia);

        promise.then(function(response) {
            $("#pais_id").trigger("change", [response.pais_id, response.iddepartamento]);
        })
    }

    function guardar_provincia() {
        var required = true;
        // required = required && provincias.required("perfil_descripcion");

        if(required) {
            var promise = provincias.guardar();
            provincias.CerrarModal();
            // provincias.datatable.destroy();
            // provincias.TablaListado({
            //     tablaID: '#tabla-provincias',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idprovincia]").chosen("destroy");
                provincias.select({
                    name: 'idprovincia',
                    url: '/obtener_provincias',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_provincia() {
        var datos = provincias.datatable.row('.selected').data();
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
                provincias.Operacion(datos.idprovincia, "E");
                // provincias.datatable.destroy();
                // provincias.TablaListado({
                //     tablaID: '#tabla-provincias',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "provincias/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-provincias').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        provincias.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_provincia();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_provincia();
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
                
                if($('#modal-provincias').is(':visible')) {
                    guardar_provincia();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-provincia").addEventListener("click", function(event) {
        event.preventDefault();
        provincias.CerrarModal();
    })


    document.addEventListener("click", function(event) {

        // console.log(event.target.classList);
        // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
        if(event.target.classList.value.indexOf("eliminar-traduccion") != -1) {
            event.preventDefault();
            event.srcElement.parentNode.parentNode.parentNode.remove();

        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-traduccion") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
        }

    })


})