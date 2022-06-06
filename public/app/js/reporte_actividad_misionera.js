var reporte = new BASE_JS('reporte', 'actividad_misionera');
var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
var iglesias = new BASE_JS('iglesias', 'iglesias');


document.addEventListener("DOMContentLoaded", function() {
    

    reporte.select({
        name: 'idtrimestre',
        url: '/obtener_trimestres',
        // selected: 0
        placeholder: seleccione,
        // selected
    })
    
    reporte.select({
        name: 'anio',
        url: '/obtener_anios',
        placeholder: seleccione
    })
    
   
    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones',
        placeholder: seleccione,
        // selected: 0
    }).then(function() {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", ""]);
        $("#idunion").trigger("change", ["", ""]);
        $("#idmision").trigger("change", ["", ""]);
        $("#iddistritomisionero").trigger("change", ["", ""]);
        // $("#idiglesia").trigger("change", ["", ""]);
        
        
    }) 

    $(document).on('change', '#iddivision', function(event, iddivision, pais_id) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddivision"];     
        d_id = (typeof iddivision != "undefined" && iddivision != null) ? iddivision : d_id;
        var selected = (typeof pais_id != "undefined")  ? pais_id : "";
    
        paises.select({
            name: 'pais_id',
            url: '/obtener_paises_asociados',
            placeholder: seleccione,
            selected: selected,
            datos: { iddivision: d_id }
        }).then(function(response) {
            
            var condicion = typeof iddivision == "undefined";
            condicion = condicion && typeof pais_id == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && reporte.required("iddivision");
                if(required) {
                    $("#pais_id")[0].selectize.focus();
                }
            } 
        
        })
    });



    $(document).on('change', '#pais_id', function(event, pais_id, idunion) {
        var valor = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session['pais_id'] + "|" + session['posee_union']; 
        var array = valor.toString().split("|");
        //var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;   
    
        var d_id = array[0];
        var posee_union = array[1];
    
        var selected = (typeof idunion != "undefined")  ? idunion : "";
        uniones.select({
            name: 'idunion',
            url: '/obtener_uniones_paises',
            placeholder: seleccione,
            selected: selected,
            datos: { pais_id: d_id }
        }).then(function() {
        
            var condicion = typeof pais_id == "undefined";
            condicion = condicion && typeof idunion == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && reporte.required("pais_id");
                if(required) {
                    $("#idunion")[0].selectize.focus();
                }
            } 
        
        })
        if(posee_union == "N") {
            $(".union").hide();

            misiones.select({
                name: 'idmision',
                url: '/obtener_misiones',
                placeholder: seleccione,
                datos: { pais_id: d_id }
            })
        } else {
            $(".union").show();
        }
        
    });



    $(document).on('change', '#idunion', function(event, idunion, idmision) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idunion"];     
        d_id = (typeof idunion != "undefined" && idunion != null) ? idunion : d_id;
        var selected = (typeof idmision != "undefined")  ? idmision : "";
    
        misiones.select({
            name: 'idmision',
            url: '/obtener_misiones',
            placeholder: seleccione,
            selected: selected,
            datos: { idunion: d_id }
        }).then(function() {
        
            var condicion = typeof idunion == "undefined";
            condicion = condicion && typeof idmision == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && reporte.required("idunion");
                if(required) {
                    $("#idmision")[0].selectize.focus();
                }
            } 
        
        })
    });

    $(document).on('change', '#idmision', function(event, idmision, iddistritomisionero) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idmision"];     
        d_id = (typeof idmision != "undefined" && idmision != null) ? idmision : d_id;
        var selected = (typeof iddistritomisionero != "undefined")  ? iddistritomisionero : "";
    
        distritos_misioneros.select({
            name: 'iddistritomisionero',
            url: '/obtener_distritos_misioneros',
            placeholder: seleccione,
            selected: selected,
            datos: { idmision: d_id }
        }).then(function() {
        
            var condicion = typeof idmision == "undefined";
            condicion = condicion && typeof iddistritomisionero == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && reporte.required("idmision");
                if(required) {
                    $("#iddistritomisionero")[0].selectize.focus();
                }
            } 
        
        })
    });

    $(document).on('change', '#iddistritomisionero', function(event, iddistritomisionero, idiglesia) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddistritomisionero"];     
        d_id = (typeof iddistritomisionero != "undefined" && iddistritomisionero != null) ? iddistritomisionero : d_id;
        var selected = (typeof idiglesia != "undefined")  ? idiglesia : "";
    
        iglesias.select({
            name: 'idiglesia',
            url: '/obtener_iglesias',
            placeholder: seleccione,
            selected: selected,
            datos: { iddistritomisionero: d_id }
        }).then(function() {
        
            var condicion = typeof iddistritomisionero == "undefined";
            condicion = condicion && typeof idiglesia == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && reporte.required("iddistritomisionero");
                if(required) {
                    $("#idiglesia")[0].selectize.focus();
                }
            } 
        
        })
    });


    document.addEventListener("click", function(event) {
        var id = event.srcElement.id;
        if(id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-perfil':
                event.preventDefault();
            
                reporte.abrirModal();
            break;

            case 'modificar-perfil':
                event.preventDefault();
            
                //modificar_perfil();
            break;

            case 'eliminar-perfil':
                event.preventDefault();
                //eliminar_perfil();
            break;

            case 'guardar-perfil':
                event.preventDefault();
                //guardar_perfil();
            break;

        }

    })


    document.addEventListener("keydown", function(event) {
            // alert(modulo_controlador);
        if(modulo_controlador == "reporte/index") {
            //ESTOS EVENTOS SE ACTIVAN SUS TECLAS RAPIDAS CUANDO EL MODAL DEL FORMULARIO ESTE CERRADO
            if(!$('#modal-reporte').is(':visible')) {
            
                switch (event.code) {
                    case 'F1':
                        reporte.abrirModal();
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
                
                if($('#modal-reporte').is(':visible')) {
                    guardar_perfil();
                }
                event.preventDefault();
                event.stopPropagation();
            }
            
        
        
        
        }
        // alert("ola");
        
    })

    $(document).on("change", "#idtrimestre, #anio, #idiglesia", function() {
        // document.getElementById("ver").addEventListener("click", function(event) {
        // event.preventDefault();
        var anio = $("#anio").val();
        var idtrimestre = $("#idtrimestre").val();
        var idiglesia = $("#idiglesia").val();
        var iddivision = $("#iddivision").val();
        var idmision = $("#idmision").val();
        var idunion = $("#idunion").val();
        var iddistritomisionero = $("#iddistritomisionero").val();

        var pais_id = document.getElementsByName("pais_id")[0].value;
        var array_pais = pais_id.split("|");

        var required = true;

        required = required && reporte.required("iddivision");
        required = required && reporte.required("pais_id");
        // required = required && reporte.required("iddivision");
        if(array_pais[1] == "S") {
            required = required && reporte.required("idunion");
        }
        required = required && reporte.required("idmision");
        required = required && reporte.required("iddistritomisionero");
        required = required && reporte.required("idiglesia");
        required = required && reporte.required("anio");

        required = required && reporte.required("idtrimestre");
        if(required) {
            reporte.ajax({
                url: '/obtener_actividades',
                datos: { anio: anio, idiglesia: idiglesia, idtrimestre: idtrimestre, iddivision: iddivision, pais_id: pais_id, idunion: idunion, idmision: idmision, iddistritomisionero: iddistritomisionero }
            }).then(function(response) {
                // console.log(response);

                var html = "";
                var semanal = "<tr></tr><th>"+descripcion_t+"</th><th>"+valor_t+"</th></tr>";
                var actmasiva = "<tr></tr><th>"+descripcion_t+"</th><th>"+valor_t+"</th></tr>";
                var actmasiva2 = "<tr></tr><th>"+descripcion_t+"</th><th>"+cantidad_t+"</th><th>"+asistentes_t+"</th><th>"+interesados_t+"</th></tr>";
                var materialestudiado = "<tr></tr><th>"+descripcion_t+"</th><th>"+valor_t+"</th></tr>";
                var dexterna = "<tr></tr><th>"+descripcion_t+"</th><th>"+valor_t+"</th></tr>";
                var dinterna = "<tr></tr><th>"+descripcion_t+"</th><th>"+valor_t+"</th></tr>";
                var actjuveniles = "<tr></tr><th>"+descripcion_t+"</th><th>"+valor_t+"</th></tr>";
                // var cont = 1;
                var texto_planes = '';
                var texto_informe_espiritual = '';
                if(response.length > 0) {
                    for (let index = 0; index < response.length; index++) {
                        var valor = parseInt(response[index].valor);
                        var cantidad = parseInt(response[index].cantidad);
                        var asistentes = parseInt(response[index].asistentes);
                        var interesados = parseInt(response[index].interesados);
                        if(response[index].idactividadmisionera == 39) {
                            // alert(texto_planes);
                            texto_planes += response[index].planes+"\n";
                            texto_informe_espiritual += response[index].informe_espiritual+"\n";
                        }
                        if(isNaN(valor)) {
                            valor = 0;
                        }
                        if(isNaN(cantidad)) {
                            cantidad = 0;
                        }
                        if(isNaN(interesados)) {
                            interesados = 0;
                        }

                        if(isNaN(asistentes)) {
                            asistentes = 0;
                        }

                        if(response[index].tipo == "semanal") {
                            semanal += '<tr class="fila">';
                            semanal += '    <td>'+response[index].descripcion+'</td>';
                            semanal += '    <td class="celda" align="center" style="width: 60px !important;">'+valor+'</td>';
                            semanal += '</tr>';
                        }

                        if(response[index].tipo == "dexterna") {
                            dexterna += '<tr class="fila">';
                            dexterna += '    <td>'+response[index].descripcion+'</td>';
                            dexterna += '    <td class="celda" style="width: 60px !important;">'+valor+'</td>';
                            dexterna += '</tr>';
                        }

                        if(response[index].tipo == "actjuveniles") {
                            actjuveniles += '<tr class="fila">';
                            actjuveniles += '    <td>'+response[index].descripcion+'</td>';
                            actjuveniles += '    <td class="celda" style="width: 60px !important;">'+valor+'</td>';
                            actjuveniles += '</tr>';
                        }


                        if(response[index].tipo == "dinterna") {
                            dinterna += '<tr class="fila">';
                            dinterna += '    <td>'+response[index].descripcion+'</td>';
                            dinterna += '    <td class="celda" style="width: 60px !important;">'+valor+'</td>';
                            dinterna += '</tr>';
                        }

                        if(response[index].tipo == "actmasiva") {
                            actmasiva += '<tr class="fila">';
                            actmasiva += '    <td>'+response[index].descripcion+'</td>';
                            actmasiva += '    <td class="celda" align="center" style="width: 60px !important;">'+valor+'</td>';
                            actmasiva += '</tr>';
                        }

                        if(response[index].tipo == "actmasiva2") {
                            actmasiva2 += '<tr class="fila">';
                            actmasiva2 += '    <td>'+response[index].descripcion+'</td>';
                            actmasiva2 += '    <td class="celda" align="center" style="width: 60px !important;">'+cantidad+'</td>';
                            // cont++;  
                            actmasiva2 += '    <td class="celda" align="center" style="width: 60px !important;">'+asistentes+'</td>';
                            // cont++;  
                            actmasiva2 += '    <td class="celda" align="center" style="width: 60px !important;">'+interesados+'</td>';
                            actmasiva2 += '</tr>';
                        }

                        if(response[index].tipo == "materialestudiado") {
                            materialestudiado += '<tr class="fila">';
                            materialestudiado += '    <td>'+response[index].descripcion+'</td>';
                            materialestudiado += '    <td class="celda" align="center" style="width: 60px !important;">'+valor+'</td>';
                            materialestudiado += '</tr>';
                        }
                        // cont++;
                    }

                    html += '<div class="col-md-5">';
                    html += '   <fieldset>';
                    html += '       <legend><strong>'+actividadmisionera+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+semanal+'</tbody></table>';
                    html += '   </fieldset>';

                    html += '   <fieldset>';
                    html += '       <legend><strong>'+distribucion_externa+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+dexterna+'</tbody></table>';
                    html += '   </fieldset>';

                    html += '   <fieldset>';
                    html += '       <legend><strong>'+distribucion_interna+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+dinterna+'</tbody></table>';
                    html += '   </fieldset>';
                    html += '</div>';

                    html += '<div class="col-md-7">';
                    html += '   <fieldset>';
                    html += '       <legend><strong>'+actividades_masivas+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+actmasiva+'</tbody></table>';
                    html += '   </fieldset>';
                    html += '   <fieldset>';
                    html += '       <legend><strong>'+eventos_masivos+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+actmasiva2+'</tbody></table>';
                    html += '   </fieldset>';
                    html += '   <fieldset>';
                    html += '       <legend><strong>'+material_estudiado+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+materialestudiado+'</tbody></table>';
                    html += '   </fieldset>';

                    html += '   <fieldset>';
                    html += '       <legend><strong>'+actividades_juveniles+'</strong></legend>';
                    html += '       <table style="margin-bottom: 0px !important;" class="table table-bordered" width="100%" bgcolor="#999999" border="0" align="center" cellpadding="3" cellspacing="1"><tbody>'+actjuveniles+'</tbody></table>';
                    html += '   </fieldset>';
                    html += '</div>';
                    html += '<div class="col-md-12">';
                    html += '    <label class="control-label">'+informe_espiritual+'</label>'
                    html += '   <textarea readonly="readonly" class="form-control input-sm" id="informe_espiritual" name="informe_espiritual"  cols="30" rows="5">'+texto_informe_espiritual+'</textarea>';
                    html += '</div>';
                    html += '<div class="col-md-12" >';
                    html += '    <label class="control-label">'+planes+'</label>'
                    html += '   <textarea readonly="readonly" class="form-control input-sm" id="planes" name="planes"  cols="30" rows="5">'+texto_planes+'</textarea>';
                    html += '</div>';

                    document.getElementById("actividades").innerHTML = html;
                    $(".boton-reporte").show();

                  
                }
                
            })  
            
        }
    })

    function generar_reporte(route) {
        var pais_id = document.getElementsByName("pais_id")[0].value;
        var array_pais = pais_id.split("|");

        var required = true;

        required = required && reporte.required("iddivision");
        required = required && reporte.required("pais_id");
        // required = required && reporte.required("iddivision");
        if(array_pais[1] == "S") {
            required = required && reporte.required("idunion");
        }
        required = required && reporte.required("idmision");
        required = required && reporte.required("iddistritomisionero");
        required = required && reporte.required("idiglesia");
        required = required && reporte.required("anio");
        required = required && reporte.required("idtrimestre");
        if(required) {

            var formulario = document.createElement("form");
            formulario.setAttribute("method", "GET");
            formulario.setAttribute("action", BaseUrl + route);
            formulario.setAttribute("target", "imprimir_actividades_misioneras");

            // document.getElementById("formulario-reporte").forEach(function(item) {
            //     console.log(item);
            // })


            // parametros.datos.forEach(function(item) {
            //     var campo = document.createElement("input");
            //     campo.setAttribute("type", "hidden");
            //     campo.setAttribute("name", Object.keys(item)[0]);
            //     campo.setAttribute("value", item[Object.keys(item)[0]]);
            //     formulario.appendChild(campo);
            // });

            // var pais = $("#pais_id").val().toString().split("|");

            var campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "iddivision");
            campo.setAttribute("value", $("#iddivision").val());
            formulario.appendChild(campo);

            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "pais_id");
            campo.setAttribute("value", array_pais[0]);
            formulario.appendChild(campo);


            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "idunion");
            campo.setAttribute("value", $("#idunion").val());
            formulario.appendChild(campo);


            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "idmision");
            campo.setAttribute("value", $("#idmision").val());
            formulario.appendChild(campo);


            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "iddistritomisionero");
            campo.setAttribute("value", $("#iddistritomisionero").val());
            formulario.appendChild(campo);


            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "idiglesia");
            campo.setAttribute("value", $("#idiglesia").val());
            formulario.appendChild(campo);

            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "anio");
            campo.setAttribute("value", $("#anio").val());
            formulario.appendChild(campo);

            campo = document.createElement("input");
            campo.setAttribute("type", "hidden");
            campo.setAttribute("name", "idtrimestre");
            campo.setAttribute("value", $("#idtrimestre").val());
            formulario.appendChild(campo);

            document.body.appendChild(formulario);
            window.open('', "imprimir_actividades_misioneras");
            formulario.submit();

            // $("#formulario-reporte").attr("action", BaseUrl + "/actividad_misionera/imprimir_actividades_misioneras");
            // $("#formulario-reporte").attr("method", "GET");
            // $("#formulario-reporte").attr("target", "imprimir_actividades_misioneras");
    
            
            // window.open('', 'imprimir_actividades_misioneras');
            // document.getElementById('formulario-reporte').submit();
        }
    }

    document.getElementById("ver-reporte").addEventListener("click", function(e) {
        e.preventDefault();
        generar_reporte("/actividad_misionera/imprimir_actividades_misioneras");
 
        
    })

    document.getElementById("exportar_excel").addEventListener("click", function(e) {
        e.preventDefault();
        generar_reporte("/actividad_misionera/exportar_excel_actividades_misioneras");
    })
  


})