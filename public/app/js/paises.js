var paises = new BASE_JS('paises', 'paises');

document.addEventListener("DOMContentLoaded", function() {
    paises.buscarEnFormulario("pais_descripcion").solo_letras();
    paises.buscarEnFormulario("telefono").solo_numeros();

    paises.TablaListado({
        tablaID: '#tabla-paises',
        url: "/buscar_datos",
    });

    paises.select({
        name: 'pais_id[]',
        url: '/obtener_paises',
        placeholder: seleccione,
    
    })


    paises.select({
        name: 'pais_id',
        url: '/obtener_paises',
    })

    paises.enter("descripcion", "item", function() {
        var item = document.getElementsByName("item")[0];
        var descripcion = document.getElementsByName("descripcion")[0];
        // console.log(idioma_id.options[idioma_id.selectedIndex].text);
        // console.log(descripciom);
        var objeto = {
            item: item.value,
            descripcion: descripcion.value
        }


        document.getElementById("detalle-jerarquia").getElementsByTagName("tbody")[0].appendChild(html_detalle_jerarquia(objeto));
    
        paises.limpiarDatos("limpiar");
    });


    function html_detalle_jerarquia(objeto, disabled) {
        var attr = '';
        var html = '';
        if(typeof disabled != "undefined") {
            attr = 'disabled="disabled"';
        }
        var tr = document.createElement("tr");

        document.getElementsByName("item")[0].value = parseInt(objeto.item) + 1; 

        html = '  <input type="hidden" name="pj_item[]" value="'+objeto.item+'" >';
        html += '  <input type="hidden" name="pj_descripcion[]" value="'+objeto.descripcion+'" >';
        html += '  <td>'+objeto.item+'</td>';
        html += '  <td>'+objeto.descripcion+'</td>';
        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-traduccion"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }

    document.addEventListener("click", function(event) {
       
        // console.log(event.target.classList);
        // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
        if(event.target.classList.value.indexOf("eliminar-traduccion") != -1) {
            event.preventDefault();
            document.getElementsByName("item")[0].value = parseInt(document.getElementsByName("item")[0].value) - 1; ;
            event.srcElement.parentNode.parentNode.parentNode.remove();
        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-traduccion") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            document.getElementsByName("item")[0].value = parseInt(document.getElementsByName("item")[0].value) - 1; 
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
            
        }

    })


    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-pais':
                event.preventDefault();
            
                paises.abrirModal();
            break;

            case 'modificar-pais':
                event.preventDefault();
            
                modificar_pais();
            break;

            case 'eliminar-pais':
                event.preventDefault();
                eliminar_pais();
            break;

            case 'guardar-pais':
                event.preventDefault();
                guardar_pais();
            break;

        }

    })


    function modificar_pais() {
        var datos = paises.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = paises.get(datos.pais_id);

        promise.then(function(response) {
            paises.ajax({
                url: '/obtener_jerarquia',
                datos: { pais_id: response.pais_id }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementsByName("item")[0].value = response[i].pj_item;
                        document.getElementById("detalle-jerarquia").getElementsByTagName("tbody")[0].appendChild(html_detalle_jerarquia(response[i]));
                    }
                }
                //console.log(response);
            })
        })
    }

    function guardar_pais() {
        var required = true;
        required = required && paises.required("pais_descripcion");
        if(required) {
            var promise = paises.guardar();
            paises.CerrarModal();
            // paises.datatable.destroy();
            // paises.TablaListado({
            //     tablaID: '#tabla-paises',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=pais_id]").chosen("destroy");
                paises.select({
                    name: 'pais_id',
                    url: '/obtener_paises',
                    placeholder: 'Seleccione Pais',
                    selected: response.id
                })

                paises.select({
                    name: 'pais_id[]',
                    url: '/obtener_paises',
                    placeholder: 'Seleccionar Paises',
                
                })
            })

        }
    }

    function eliminar_pais() {
        var datos = paises.datatable.row('.selected').data();
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
                paises.Operacion(datos.pais_id, "E");
                // paises.datatable.destroy();
                // paises.TablaListado({
                //     tablaID: '#tabla-paises',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "paises/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-paises').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        paises.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_pais();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_pais();
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
                
                if($('#modal-paises').is(':visible')) {
                    guardar_pais();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-pais").addEventListener("click", function(event) {
        event.preventDefault();
        paises.CerrarModal();
    })


})