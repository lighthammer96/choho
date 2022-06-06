var perfiles = new BASE_JS('perfiles', 'perfiles');

document.addEventListener("DOMContentLoaded", function() {
        
   
    perfiles.TablaListado({
        tablaID: '#tabla-perfiles',
        url: "/buscar_datos",
    });

    combo_idioma.then(function() {
        perfiles.enter("idioma", "descripcion");
    })

    perfiles.enter("descripcion", "idioma", function() {
        var required = true;
        required = perfiles.required("idioma");

        if(!required) {
            return false;
        }

        var idioma_id = document.getElementsByName("idioma")[0];
        var descripcion = document.getElementsByName("descripcion")[0];
        // console.log(idioma_id.options[idioma_id.selectedIndex].text);
        // console.log(descripciom);
        var objeto = {
            idioma_id: idioma_id.value,
            idioma_descripcion: idioma_id.options[idioma_id.selectedIndex].text,
            descripcion: descripcion.value
        }


        document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].appendChild(html_detalle_traducciones(objeto));
    
        perfiles.limpiarDatos("limpiar");
    });


    function html_detalle_traducciones(objeto, disabled) {
        var attr = '';
        var html = '';
        if(typeof disabled != "undefined") {
            attr = 'disabled="disabled"';
        }
        var tr = document.createElement("tr");

        html = '  <input type="hidden" name="idioma_id[]" value="'+objeto.idioma_id+'" >';
        html += '  <input type="hidden" name="pi_descripcion[]" value="'+objeto.descripcion+'" >';
        html += '  <td>'+objeto.idioma_descripcion+'</td>';
        html += '  <td>'+objeto.descripcion+'</td>';
        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-traduccion"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }


    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-perfil':
                event.preventDefault();
            
                perfiles.abrirModal();
            break;

            case 'modificar-perfil':
                event.preventDefault();
            
                modificar_perfil();
            break;

            case 'eliminar-perfil':
                event.preventDefault();
                eliminar_perfil();
            break;

            case 'guardar-perfil':
                event.preventDefault();
                guardar_perfil();
            break;

        }

    })


    function modificar_perfil() {
        var datos = perfiles.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = perfiles.get(datos.perfil_id);

        promise.then(function(response) {
            perfiles.ajax({
                url: '/obtener_traducciones',
                datos: { perfil_id: response.perfil_id }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].appendChild(html_detalle_traducciones(response[i]));
                    }
                }
                //console.log(response);
            })
        })
    }

    function guardar_perfil() {
        var required = true;
        // required = required && perfiles.required("perfil_descripcion");

        var detalle = document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        if(detalle.length <= 0) {
            BASE_JS.sweet({
                text: elemento_detalle
            });

            return false;
        }
        if(required) {
            var promise = perfiles.guardar();
            perfiles.CerrarModal();
            // perfiles.datatable.destroy();
            // perfiles.TablaListado({
            //     tablaID: '#tabla-perfiles',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=perfil_id]").chosen("destroy");
                perfiles.select({
                    name: 'perfil_id',
                    url: '/obtener_perfiles',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_perfil() {
        var datos = perfiles.datatable.row('.selected').data();
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
                perfiles.Operacion(datos.perfil_id, "E");
                // perfiles.datatable.destroy();
                // perfiles.TablaListado({
                //     tablaID: '#tabla-perfiles',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "perfiles/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-perfiles').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        perfiles.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_perfil();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_perfil();
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
                
                if($('#modal-perfiles').is(':visible')) {
                    guardar_perfil();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-perfil").addEventListener("click", function(event) {
        event.preventDefault();
        perfiles.CerrarModal();
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