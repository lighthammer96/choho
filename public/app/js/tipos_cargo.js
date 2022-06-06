var tipos_cargo = new BASE_JS('tipos_cargo', 'tipos_cargo');

document.addEventListener("DOMContentLoaded", function() {
    tipos_cargo.buscarEnFormulario("descripcion").solo_letras();
   
    tipos_cargo.TablaListado({
        tablaID: '#tabla-tipos-cargo',
        url: "/buscar_datos",
    });

    tipos_cargo.select({
        name: 'idtipocargo',
        url: '/obtener_tipos_cargo',
        placeholder: seleccione
      
    })

    // combo_idioma.then(function() {
    //     tipos_cargo.enter("idioma", "descripcion");
    // })

    tipos_cargo.enter("descripcion", "idioma", function() {
        var required = true;
        required = modulos.required("idioma");

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
    
        tipos_cargo.limpiarDatos("limpiar");
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
            case 'nuevo-tipo-cargo':
                event.preventDefault();
            
                tipos_cargo.abrirModal();
            break;

            case 'modificar-tipo-cargo':
                event.preventDefault();
            
                modificar_tipos_cargo();
            break;

            case 'eliminar-tipo-cargo':
                event.preventDefault();
                eliminar_tipos_cargo();
            break;

            case 'guardar-tipo-cargo':
                event.preventDefault();
                guardar_tipos_cargo();
            break;

        }

    })


    function modificar_tipos_cargo() {
        var datos = tipos_cargo.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = tipos_cargo.get(datos.idtipocargo);

        promise.then(function(response) {
            // tipos_cargo.ajax({
            //     url: '/obtener_traducciones',
            //     datos: { idtipocargo: response.idtipocargo }
            // }).then(function(response) {
            //     if(response.length > 0) {
            //         for(let i = 0; i < response.length; i++){
            //             document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].appendChild(html_detalle_traducciones(response[i]));
            //         }
            //     }
            //     //console.log(response);
            // })
        })
    }

    function guardar_tipos_cargo() {
        var required = true;
        // required = required && tipos_cargo.required("perfil_descripcion");

        // var detalle = document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        // if(detalle.length <= 0) {
        //     BASE_JS.sweet({
        //         text: elemento_detalle
        //     });

        //     return false;
        // }
        if(required) {
            var promise = tipos_cargo.guardar();
            tipos_cargo.CerrarModal();
            // tipos_cargo.datatable.destroy();
            // tipos_cargo.TablaListado({
            //     tablaID: '#tabla-tipos-cargo',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idtipocargo]").chosen("destroy");
                tipos_cargo.select({
                    name: 'idtipocargo',
                    url: '/obtener_tipos_cargo',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_tipos_cargo() {
        var datos = tipos_cargo.datatable.row('.selected').data();
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
                tipos_cargo.Operacion(datos.idtipocargo, "E");
                // tipos_cargo.datatable.destroy();
                // tipos_cargo.TablaListado({
                //     tablaID: '#tabla-tipos-cargo',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "tipos_cargo/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-tipos_cargo').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        tipos_cargo.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_tipos_cargo();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_tipos_cargo();
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
                
                if($('#modal-tipos_cargo').is(':visible')) {
                    guardar_tipos_cargo();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-tipo-cargo").addEventListener("click", function(event) {
        event.preventDefault();
        tipos_cargo.CerrarModal();
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