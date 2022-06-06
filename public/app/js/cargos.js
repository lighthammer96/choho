var cargos = new BASE_JS('cargos', 'cargos');
var niveles = new BASE_JS('niveles', 'niveles');
var tipos_cargo = new BASE_JS('tipos_cargo', 'tipos_cargo');

document.addEventListener("DOMContentLoaded", function() {
    
    cargos.buscarEnFormulario("descripcion").solo_letras();
   
    cargos.TablaListado({
        tablaID: '#tabla-cargos',
        url: "/buscar_datos",
    });

    niveles.select({
        name: 'idnivel',
        url: '/obtener_niveles',
        placeholder: seleccione
      
    })

    tipos_cargo.select({
        name: 'idtipocargo',
        url: '/obtener_tipos_cargo',
        placeholder: seleccione
    }).then(function() {
        $("#idtipocargo").trigger("change", ["", ""]);
        // $("#idnivel").trigger("change", ["", ""]);
        //$("#idcargo").trigger("change", ["", ""]);
    
    }) 



    $(document).on('change', '#idtipocargo', function(event, idtipocargo, idcargo) {
        var valor = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : "1"; 
        // var array = valor.toString().split("|");

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
        d_id = (typeof idtipocargo != "undefined" && idtipocargo != null) ? idtipocargo : d_id;

        // var d_id = array[0];
        // var posee_nivel = array[1];
        var selected = (typeof idcargo != "undefined")  ? idcargo : "";
        


        niveles.select({
            name: 'idnivel',
            url: '/obtener_niveles',
            placeholder: seleccione,
            selected: selected,
            datos: { idtipocargo: d_id }
        }).then(function() {

            
        })

        // if(posee_nivel == "N") {
        //     $(".nivel").hide();

            
        // } else {
        //     $(".nivel").show();
        // }

    });

    // combo_idioma.then(function() {
    //     cargos.enter("idioma", "descripcion");
    // })

    // cargos.enter("descripcion", "idioma", function() {
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
    
    //     cargos.limpiarDatos("limpiar");
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
            case 'nuevo-cargo':
                event.preventDefault();
            
                cargos.abrirModal();
            break;

            case 'modificar-cargo':
                event.preventDefault();
            
                modificar_cargo();
            break;

            case 'eliminar-cargo':
                event.preventDefault();
                eliminar_cargo();
            break;

            case 'guardar-cargo':
                event.preventDefault();
                guardar_cargo();
            break;

        }

    })


    function modificar_cargo() {
        var datos = cargos.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        var promise = cargos.get(datos.idcargo);

        promise.then(function(response) {
            // if(response.posee_nivel == "N") {
            //     $(".nivel").hide();
            // } else {
            //     $(".nivel").show();
            // }

            // cargos.ajax({
            //     url: '/obtener_traducciones',
            //     datos: { idcargo: response.idcargo }
            // }).then(function(response) {
            //     if(response.length > 0) {
            //         for(let i = 0; i < response.length; i++){
            //             document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].appendChild(html_detalle_traducciones(response[i]));
            //         }
            //     }
            //     //console.log(response);
            // })
            $("#idtipocargo").trigger("change", [response.idtipocargo, response.idnivel]);
            // $("#idnivel").trigger("change", [response.idnivel, response.idcargo]);
        })
    }

    function guardar_cargo() {
        var required = true;
        // required = required && cargos.required("perfil_descripcion");

        // var detalle = document.getElementById("detalle-traducciones").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        // if(detalle.length <= 0) {
        //     BASE_JS.sweet({
        //         text: elemento_detalle
        //     });

        //     return false;
        // }
        if(required) {
            var promise = cargos.guardar();
            cargos.CerrarModal();
            // cargos.datatable.destroy();
            // cargos.TablaListado({
            //     tablaID: '#tabla-cargos',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
                if(typeof response.status == "undefined" || response.status.indexOf("e") != -1) {
                    return false;
                }
                // $("select[name=idcargo]").chosen("destroy");
                cargos.select({
                    name: 'idcargo',
                    url: '/obtener_cargos',
                    placeholder: seleccione,
                    selected: response.id
                })
            })

        }
    }

    function eliminar_cargo() {
        var datos = cargos.datatable.row('.selected').data();
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
                cargos.Operacion(datos.idcargo, "E");
                // cargos.datatable.destroy();
                // cargos.TablaListado({
                //     tablaID: '#tabla-cargos',
                //     url: "/buscar_datos",
                // });
            }
        });
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "cargos/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-cargos').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        cargos.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_cargo();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    // case 'F4':
                    // 	VerPrecio();
                    // 	event.preventDefault();
                    // 	event.stopPropagation();
                    
                    //     break;
                    case 'F7':
                        eliminar_cargo();
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
                
                if($('#modal-cargos').is(':visible')) {
                    guardar_cargo();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-cargo").addEventListener("click", function(event) {
        event.preventDefault();
        cargos.CerrarModal();
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