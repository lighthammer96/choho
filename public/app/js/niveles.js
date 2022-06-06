var niveles = new BASE_JS('niveles', 'niveles');

document.addEventListener("DOMContentLoaded", function() {
        
    niveles.buscarEnFormulario("descripcion").solo_letras();

    niveles.TablaListado({
        tablaID: '#tabla-niveles',
        url: "/buscar_datos",
    });

    niveles.select({
        name: 'idnivel',
        url: '/obtener_niveles',
        placeholder: seleccione
      
    })

    // combo_idioma.then(function() {
    //     niveles.enter("idioma", "descripcion");
    // })

    // niveles.enter("descripcion", "idioma", function() {
    //     var required = true;
    //     required = modulos.required("idioma");

    //     if(!required) {
    //         return false;
    //     }

    //     var idioma_id = document.getElementsByName("idioma")[0];
    //     var descripcion = document.getElementsByName("descripcion")[0];
    //     // console.log(idioma_id.options[idioma_id.selectedIndex].text);
    //     // console.log(descripciom);
    //     var objeto = {
    //         idioma_id: idioma_id.value,
    //         idioma_descripcion: idioma_id.options[idioma_id.selectedIndex].text,
    //         descripcion: descripcion.value
    //     }


    //     document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].appendChild(html_detalle_traducciones(objeto));
    
    //     niveles.limpiarDatos("limpiar");
    // });


    // function html_detalle_traducciones(objeto, disabled) {
    //     var attr = '';
    //     var html = '';
    //     if(typeof disabled != "undefined") {
    //         attr = 'disabled="disabled"';
    //     }
    //     var tr = document.createElement("tr");

    //     html = '  <input type="hidden" name="idioma_id[]" value="'+objeto.idioma_id+'" >';
    //     html += '  <input type="hidden" name="pi_descripcion[]" value="'+objeto.descripcion+'" >';
    //     html += '  <td>'+objeto.idioma_descripcion+'</td>';
    //     html += '  <td>'+objeto.descripcion+'</td>';
    //     html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-traduccion"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

    //     tr.innerHTML = html;
    //     return tr;
    // }


    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-nivel':
                event.preventDefault();
            
                niveles.abrirModal();
            break;

            case 'modificar-nivel':
                event.preventDefault();
            
                modificar_nivel();
            break;

            case 'eliminar-nivel':
                event.preventDefault();
                eliminar_nivel();
            break;

            case 'guardar-nivel':
                event.preventDefault();
                guardar_nivel();
            break;

        }

    })


    function modificar_nivel() {
        var datos = niveles.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = niveles.get(datos.idnivel);

        promise.then(function(response) {
            // niveles.ajax({
            //     url: '/obtener_traducciones',
            //     datos: { idnivel: response.idnivel }
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

    function guardar_nivel() {
        var required = true;
        required = required && niveles.required("idtipocargo");

        // var detalle = document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        // if(detalle.length <= 0) {
        //     BASE_JS.sweet({
        //         text: elemento_detalle
        //     });

        //     return false;
        // }
        if(required) {
            var promise = niveles.guardar();
            niveles.CerrarModal();
            // niveles.datatable.destroy();
            // niveles.TablaListado({
            //     tablaID: '#tabla-niveles',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idnivel]").chosen("destroy");
                niveles.select({
                    name: 'idnivel',
                    url: '/obtener_niveles',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_nivel() {
        var datos = niveles.datatable.row('.selected').data();
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
                niveles.Operacion(datos.idnivel, "E");
                // niveles.datatable.destroy();
                // niveles.TablaListado({
                //     tablaID: '#tabla-niveles',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "niveles/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-niveles').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        niveles.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_nivel();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_nivel();
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
                
                if($('#modal-niveles').is(':visible')) {
                    guardar_nivel();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-nivel").addEventListener("click", function(event) {
        event.preventDefault();
        niveles.CerrarModal();
    })


    // document.addEventListener("click", function(event) {

    //     // console.log(event.target.classList);
    //     // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
    //     if(event.target.classList.value.indexOf("eliminar-traduccion") != -1) {
    //         event.preventDefault();
    //         event.srcElement.parentNode.parentNode.parentNode.remove();

    //     }

    //     if(event.srcElement.parentNode.classList.value.indexOf("eliminar-traduccion") != -1 && !event.srcElement.parentNode.disabled) {
    //         event.preventDefault();
    //         ///console.log(event.srcElement.parentNode);
    //         event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
    //     }

    // })

})