
var curriculum = new BASE_JS('curriculum', 'asociados');
var principal = new BASE_JS('principal', 'principal');
var paises = new BASE_JS('paises', 'paises');


document.addEventListener("DOMContentLoaded", function() {
    curriculum.buscarEnFormulario("nombre").solo_letras();
    curriculum.buscarEnFormulario("lugarnac").solo_letras();
    curriculum.buscarEnFormulario("numdoc").solo_numeros();
    curriculum.buscarEnFormulario("inst").solo_letras();
    curriculum.buscarEnFormulario("nivel").solo_letras();
    curriculum.buscarEnFormulario("prof").solo_letras();
    curriculum.buscarEnFormulario("est").solo_letras();
    curriculum.buscarEnFormulario("car").solo_letras();
    curriculum.buscarEnFormulario("sec").solo_letras();
    curriculum.buscarEnFormulario("insti").solo_letras();


    $("input[name=fechanac]").inputmask();

    jQuery( "input[name=fechanac]" ).datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        endDate: "now()",

    });

    curriculum.select({
        name: 'perini',
        url: '/obtener_periodos_ini',
    }).then(function() {
        
    }) 

    curriculum.select({
        name: 'perfin',
        url: '/obtener_periodos_fin',
    }).then(function() {
        
    }) 

    principal.select({
        name: 'tipodoc',
        url: '/obtener_tipos_documento',
        placeholder: seleccione,
    }).then(function() {
        
    })


    paises.select({
        name: 'pais',
        url: '/obtener_todos_paises',
        placeholder: seleccione,
    }).then(function() {
       
    })


    principal.select({
        name: 'parentesco',
        url: '/obtener_parentesco',
        placeholder: seleccione,
    }).then(function() {
        
    })
   
    curriculum.TablaListado({
        tablaID: '#tabla-asociados',
        url: "/buscar_datos",
        curriculum: 1,
    });



 

    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
    

            case 'ingresar-datos':
                event.preventDefault();
            
                ingresar_datos();
            break;

    
            case 'guardar-curriculum':
                event.preventDefault();
                guardar_curriculum();
            break;

        }

    })


    function ingresar_datos() {
        $(".nav-tabs").find("li").removeClass("active");
        $("a[href='#datos-familiares']").parent("li").addClass("active");
        $(".tab-pane").removeClass("active");
        $("#datos-familiares").addClass("active");


        var datos = curriculum.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            
            return false;
        } 

        curriculum.ajax({
            url: '/get_asociados',
            datos: { id: datos.idmiembro }
        }).then(function(response) {
            document.getElementById("idmiembro").value = response[0].idmiembro;
            curriculum.abrirModal();
            //console.log(response);

            document.getElementById("detalle-parentesco").getElementsByTagName("tbody")[0].innerHTML = "";
            curriculum.ajax({
                url: '/obtener_parentesco_miembro',
                datos: { idmiembro: response[0].idmiembro }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-parentesco").getElementsByTagName("tbody")[0].appendChild(html_detalle_parentesco(response[i]));
                    }
                }
                //console.log(response);
            })


            document.getElementById("detalle-educacion").getElementsByTagName("tbody")[0].innerHTML = "";
            curriculum.ajax({
                url: '/obtener_educacion_miembro',
                datos: { idmiembro: response[0].idmiembro }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-educacion").getElementsByTagName("tbody")[0].appendChild(html_detalle_educacion(response[i]));
                    }
                }
                //console.log(response);
            })


            document.getElementById("detalle-laboral").getElementsByTagName("tbody")[0].innerHTML = "";
            curriculum.ajax({
                url: '/obtener_laboral_miembro',
                datos: { idmiembro: response[0].idmiembro }
            }).then(function(response) {
                if(response.length > 0) {
                    for(let i = 0; i < response.length; i++){
                        document.getElementById("detalle-laboral").getElementsByTagName("tbody")[0].appendChild(html_detalle_laboral(response[i]));
                    }
                }
                //console.log(response);
            })
        })
    }

    function guardar_curriculum() {
        var required = true;
        // required = required && curriculum.required("perfil_descripcion");

        // var detalle_parentesco = document.getElementById("detalle-parentesco").getElementsByTagName("tbody")[0].getElementsByTagName("tr");

        // var detalle_educacion = document.getElementById("detalle-educacion").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        // var detalle_laboral = document.getElementById("detalle-laboral").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    
        // if(detalle_parentesco.length <= 0 || detalle_educacion.length <= 0 || detalle_laboral.length <= 0 ) {
        //     BASE_JS.sweet({
        //         text: elemento_detalle
        //     });

        //     return false;
        // }
        if(required) {
            var promise = curriculum.guardar();
            curriculum.CerrarModal();
            // curriculum.datatable.destroy();
            // curriculum.TablaListado({
            //     tablaID: '#tabla-curriculum',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
               
            })

        }
    }



    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "curriculum/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-curriculum').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        curriculum.abrirModal();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 'F2':
                        modificar_perfil();
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
                
                if($('#modal-curriculum').is(':visible')) {
                    guardar_perfil();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    document.getElementById("cancelar-curriculum").addEventListener("click", function(event) {
        event.preventDefault();
        curriculum.CerrarModal();
    })



    document.getElementById("agregar-parentesco").addEventListener("click", function(e) {
        e.preventDefault();
    
        required = true;
        required = required && curriculum.required("parentesco");
        required = required && curriculum.required("nombre");
        required = required && curriculum.required("tipodoc");
        required = required && curriculum.required("numdoc");
        required = required && curriculum.required("fechanac");
        required = required && curriculum.required("pais");
        required = required && curriculum.required("lugarnac");


        if(required) {

            var parentesco = document.getElementsByName("parentesco")[0];
            var nombre = document.getElementsByName("nombre")[0];
            var tipodoc = document.getElementsByName("tipodoc")[0];
            var numdoc = document.getElementsByName("numdoc")[0];
            var fechanac = document.getElementsByName("fechanac")[0];
            var pais = document.getElementsByName("pais")[0];
            var lugarnac = document.getElementsByName("lugarnac")[0];

            var objeto = {
                idparentesco: parentesco.value,
                parentesco: parentesco.options[parentesco.selectedIndex].text,
                idtipodoc: tipodoc.value,
                tipodoc: tipodoc.options[tipodoc.selectedIndex].text,
                idpais: pais.value,
                pais: pais.options[pais.selectedIndex].text,
                nombres: nombre.value,
                nrodoc: numdoc.value,
                fechanacimiento: fechanac.value,
                lugarnacimiento: lugarnac.value
               
            }
        
        
            document.getElementById("detalle-parentesco").getElementsByTagName("tbody")[0].appendChild(html_detalle_parentesco(objeto));
   
            curriculum.limpiarDatos("limpiar-parentesco");
        }
    });



    function html_detalle_parentesco(objeto, disabled) {
        var attr = '';
        var html = '';
        if(typeof disabled != "undefined") {
            attr = 'disabled="disabled"';
        }
        var tr = document.createElement("tr");
    

        html += '  <input type="hidden" name="idparentesco[]" value="'+objeto.idparentesco+'" >';
        html += '  <input type="hidden" name="nombres[]" value="'+objeto.nombres+'" >';
        html += '  <input type="hidden" name="idtipodoc[]" value="'+objeto.idtipodoc+'" >';
        html += '  <input type="hidden" name="nrodoc[]" value="'+objeto.nrodoc+'" >';
        html += '  <input type="hidden" name="fechanacimiento[]" value="'+BASE_JS.FormatoFecha(objeto.fechanacimiento, "server")+'" >';
        html += '  <input type="hidden" name="idpais[]" value="'+objeto.idpais+'" >';
        html += '  <input type="hidden" name="lugarnacimiento[]" value="'+objeto.lugarnacimiento+'" >';
     
        html += '  <td>'+objeto.parentesco+'</td>';
        html += '  <td>'+objeto.nombres+'</td>';
        html += '  <td>'+objeto.tipodoc+'</td>';
        html += '  <td>'+objeto.nrodoc+'</td>';
        //html += '  <td>'+objeto.institucion+'</td>';
        html += '  <td>'+BASE_JS.FormatoFecha(objeto.fechanacimiento, "user")+'</td>';
        html += '  <td>'+objeto.pais+'</td>';
        html += '  <td>'+objeto.lugarnacimiento+'</td>';
       
        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-parentesco"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }


    

    document.getElementById("agregar-educacion").addEventListener("click", function(e) {
        e.preventDefault();
    
        required = true;
        required = required && curriculum.required("inst");
        required = required && curriculum.required("nivel");
        required = required && curriculum.required("prof");
        required = required && curriculum.required("est");
        // required = required && curriculum.required("obs");


        if(required) {

            var inst = document.getElementsByName("inst")[0];
            var nivel = document.getElementsByName("nivel")[0];
            var prof = document.getElementsByName("prof")[0];
            var est = document.getElementsByName("est")[0];
            var obs = document.getElementsByName("obs")[0];
          

            var objeto = {
               
                institucion: inst.value,
                nivelestudios: nivel.value,
                profesion: prof.value,
                estado: est.value,
                observacion: obs.value
               
            }
        
        
            document.getElementById("detalle-educacion").getElementsByTagName("tbody")[0].appendChild(html_detalle_educacion(objeto));
   
            curriculum.limpiarDatos("limpiar-educacion");
        }
    });



    function html_detalle_educacion(objeto, disabled) {
        var attr = '';
        var html = '';
        if(typeof disabled != "undefined") {
            attr = 'disabled="disabled"';
        }
        var tr = document.createElement("tr");
    

        html += '  <input type="hidden" name="institucion[]" value="'+objeto.institucion+'" >';
        html += '  <input type="hidden" name="nivelestudios[]" value="'+objeto.nivelestudios+'" >';
        html += '  <input type="hidden" name="profesion[]" value="'+objeto.profesion+'" >';
        html += '  <input type="hidden" name="estado[]" value="'+objeto.estado+'" >';
        html += '  <input type="hidden" name="observacion[]" value="'+objeto.observacion+'" >';
     
        html += '  <td>'+objeto.institucion+'</td>';
        html += '  <td>'+objeto.nivelestudios+'</td>';
        html += '  <td>'+objeto.profesion+'</td>';
        html += '  <td>'+objeto.estado+'</td>';
        html += '  <td>'+objeto.observacion+'</td>';
    
       
        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-educacion"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }


    document.getElementById("agregar-laboral").addEventListener("click", function(e) {
        e.preventDefault();
    
        required = true;
        required = required && curriculum.required("car");
        required = required && curriculum.required("sec");
        required = required && curriculum.required("insti");
        required = required && curriculum.required("perini");
        required = required && curriculum.required("perfin");


        if(required) {

            var car = document.getElementsByName("car")[0];
            var sec = document.getElementsByName("sec")[0];
            var insti = document.getElementsByName("insti")[0];
            var perini = document.getElementsByName("perini")[0];
            var perfin = document.getElementsByName("perfin")[0];
          

            var objeto = {
               
                cargo: car.value,
                sector: sec.value,
                institucionlaboral: insti.value,
                periodoini: perini.value,
                periodofin: perfin.value
               
            }
        
        
            document.getElementById("detalle-laboral").getElementsByTagName("tbody")[0].appendChild(html_detalle_laboral(objeto));
   
            curriculum.limpiarDatos("limpiar-laboral");
        }
    });



    function html_detalle_laboral(objeto, disabled) {
        var attr = '';
        var html = '';
        if(typeof disabled != "undefined") {
            attr = 'disabled="disabled"';
        }
        var tr = document.createElement("tr");
    

        html += '  <input type="hidden" name="cargo[]" value="'+objeto.cargo+'" >';
        html += '  <input type="hidden" name="sector[]" value="'+objeto.sector+'" >';
        html += '  <input type="hidden" name="institucionlaboral[]" value="'+objeto.institucionlaboral+'" >';
        html += '  <input type="hidden" name="periodoini[]" value="'+objeto.periodoini+'" >';
        html += '  <input type="hidden" name="periodofin[]" value="'+objeto.periodofin+'" >';
    
     
        html += '  <td>'+objeto.cargo+'</td>';
        html += '  <td>'+objeto.sector+'</td>';
        html += '  <td>'+objeto.institucionlaboral+'</td>';
        html += '  <td>'+objeto.periodoini+'-'+objeto.periodofin+'</td>';
       
    
       
        html += '  <td><center><button '+attr+' type="button" class="btn btn-danger btn-xs eliminar-laboral"><i class="fa fa-trash-o" aria-hidden="true"></i></button></center></td>';

        tr.innerHTML = html;
        return tr;
    }


    document.addEventListener("click", function(event) {

        // console.log(event.target.classList);
        // console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode);
        if(event.target.classList.value.indexOf("eliminar-parentesco") != -1) {
            event.preventDefault();
            event.srcElement.parentNode.parentNode.parentNode.remove();

        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-parentesco") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
        }


        if(event.target.classList.value.indexOf("eliminar-educacion") != -1) {
            event.preventDefault();
            event.srcElement.parentNode.parentNode.parentNode.remove();

        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-educacion") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
        }


        if(event.target.classList.value.indexOf("eliminar-laboral") != -1) {
            event.preventDefault();
            event.srcElement.parentNode.parentNode.parentNode.remove();

        }

        if(event.srcElement.parentNode.classList.value.indexOf("eliminar-laboral") != -1 && !event.srcElement.parentNode.disabled) {
            event.preventDefault();
            ///console.log(event.srcElement.parentNode);
            event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();
        }

    })

    document.getElementById("calendar-fechanac").addEventListener("click", function(e) {
        e.preventDefault();
        
        if($("#formulario-curriculum").find("input[name=fechanac]").hasClass("focus-datepicker")) {
   
            $("#formulario-curriculum").find("input[name=fechanac]").blur();
            $("#formulario-curriculum").find("input[name=fechanac]").removeClass("focus-datepicker");
        } else {
            
            $("#formulario-curriculum").find("input[name=fechanac]").focus();
            $("#formulario-curriculum").find("input[name=fechanac]").addClass("focus-datepicker");
        }
    });

    $(document).on("change", "#tipodoc", function(e) {
        var tipodoc = $(this).val();

        var numdoc = document.getElementsByName("numdoc")[0];
       
        if(tipodoc == 1) {
            numdoc.setAttribute("maxlength", 8);
            numdoc.setAttribute("minlength", 8);
        }

       
    })
})


function imprimir_curriculum(idmiembro) {
    
    window.open(BaseUrl + "/asociados/imprimir_curriculum/"+idmiembro);
}