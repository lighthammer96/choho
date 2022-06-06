var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
var iglesias = new BASE_JS('iglesias', 'iglesias');


var traslados = new BASE_JS('traslados', 'traslados');
var traslados_temp = new BASE_JS('traslados_temp', 'traslados');
var traslados_mi = new BASE_JS('traslados_mi', 'traslados');

// var eventChange = new Event('change');
var eventClick = new Event('click');

document.addEventListener("DOMContentLoaded", function() {
    // BASE_JS.notificacion({title: "hols", type: 'default', msg:  "hola"});

   


    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones',
        placeholder: seleccione
    }).then(function() {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", ""]);
        $("#idunion").trigger("change", ["", ""]);
        $("#idmision").trigger("change", ["", ""]);
        $("#iddistritomisionero").trigger("change", ["", ""]);
        $("#idiglesia").trigger("change", ["", ""]);
        
        
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
                required = required && traslados_temp.required("iddivision");
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
                required = required && traslados_temp.required("pais_id");
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
                required = required && traslados_temp.required("idunion");
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
                required = required && traslados_temp.required("idmision");
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
                required = required && traslados_temp.required("iddistritomisionero");
                if(required) {
                    $("#idiglesia")[0].selectize.focus();
                }
            } 
        
        })
    });



    /*********************
     * JERARQUIA DESTINO *
     *********************/
     $(document).on('change', '#iddivisiondestino', function(event, iddivisiondestino, pais_iddestino) {
    
        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddivision"];     
        d_id = (typeof iddivisiondestino != "undefined" && iddivisiondestino != null) ? iddivisiondestino : d_id;
        var selected = (typeof pais_iddestino != "undefined")  ? pais_iddestino : "";
    
        paises.select({
            name: 'pais_iddestino',
            url: '/obtener_paises_asociados_todos',
            placeholder: seleccione,
            selected: selected,
            datos: { iddivision: d_id }
        }).then(function(response) {
            
            var condicion = typeof iddivisiondestino == "undefined";
            condicion = condicion && typeof pais_iddestino == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && traslados_temp.required("iddivisiondestino");
                if(required) {
                    $("#pais_iddestino")[0].selectize.focus();
                }
            } 
        
        })
    });



    $(document).on('change', '#pais_iddestino', function(event, pais_iddestino, iduniondestino) {
        var valor = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session['pais_id'] + "|" + session['posee_union']; 
        var array = valor.toString().split("|");
        //var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;   
    
        var d_id = array[0];
        var posee_union = array[1];
    
        var selected = (typeof iduniondestino != "undefined")  ? iduniondestino : "";
        uniones.select({
            name: 'iduniondestino',
            url: '/obtener_uniones_paises_todos',
            placeholder: seleccione,
            selected: selected,
            datos: { pais_id: d_id }
        }).then(function() {
        
            var condicion = typeof pais_iddestino == "undefined";
            condicion = condicion && typeof iduniondestino == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && traslados_temp.required("pais_iddestino");
                if(required) {
                    $("#iduniondestino")[0].selectize.focus();
                }
            } 
        
        })
        if(posee_union == "N") {
            $(".union-destino").hide();

            misiones.select({
                name: 'idmisiondestino',
                url: '/obtener_misiones_todos',
                placeholder: seleccione,
                datos: { pais_id: d_id }
            })
        } else {
            $(".union-destino").show();
        }
        
    });



    $(document).on('change', '#iduniondestino', function(event, iduniondestino, idmisiondestino) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idunion"];     
        d_id = (typeof iduniondestino != "undefined" && iduniondestino != null) ? iduniondestino : d_id;
        var selected = (typeof idmisiondestino != "undefined")  ? idmisiondestino : "";
    
        misiones.select({
            name: 'idmisiondestino',
            url: '/obtener_misiones_todos',
            placeholder: seleccione,
            selected: selected,
            datos: { idunion: d_id }
        }).then(function() {
        
            var condicion = typeof iduniondestino == "undefined";
            condicion = condicion && typeof idmisiondestino == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && traslados_temp.required("iduniondestino");
                if(required) {
                    $("#idmisiondestino")[0].selectize.focus();
                }
            } 
        
        })
    });

    $(document).on('change', '#idmisiondestino', function(event, idmisiondestino, iddistritomisionerodestino) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idmision"];     
        d_id = (typeof idmisiondestino != "undefined" && idmisiondestino != null) ? idmisiondestino : d_id;
        var selected = (typeof iddistritomisionerodestino != "undefined")  ? iddistritomisionerodestino : "";
    
        distritos_misioneros.select({
            name: 'iddistritomisionerodestino',
            url: '/obtener_distritos_misioneros_todos',
            placeholder: seleccione,
            selected: selected,
            datos: { idmision: d_id }
        }).then(function() {
        
            var condicion = typeof idmisiondestino == "undefined";
            condicion = condicion && typeof iddistritomisionerodestino == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && traslados_temp.required("idmisiondestino");
                if(required) {
                    $("#iddistritomisionerodestino")[0].selectize.focus();
                }
            } 
        
        })
    });

    $(document).on('change', '#iddistritomisionerodestino', function(event, iddistritomisionerodestino, idiglesiadestino) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddistritomisionero"];     
        d_id = (typeof iddistritomisionerodestino != "undefined" && iddistritomisionerodestino != null) ? iddistritomisionerodestino : d_id;
        var selected = (typeof idiglesiadestino != "undefined")  ? idiglesiadestino : "";
    
        iglesias.select({
            name: 'idiglesiadestino',
            url: '/obtener_iglesias',
            placeholder: seleccione,
            selected: selected,
            datos: { iddistritomisionero: d_id }
        }).then(function() {
        
            var condicion = typeof iddistritomisionerodestino == "undefined";
            condicion = condicion && typeof idiglesiadestino == "undefined";
        
            if(condicion) {
                var required = true;
                required = required && traslados_temp.required("iddistritomisionerodestino");
                if(required) {
                    $("#idiglesiadestino")[0].selectize.focus();
                }
            } 
        
        })
    });
    

    function html_destino(id) {
        document.getElementById("destino-iglesia").innerHTML = "";
        document.getElementById("destino-masivo-individual").innerHTML = "";
        var html = "";
        html += '<fieldset>';
        html += '   <legend>Iglesia de Destino</legend>';
        html += '   <div class="col-md-12">';
        html += '       <label class="control-label">División</label>';
        html += '       <select  class="entrada selectizejs" name="iddivisiondestino" id="iddivisiondestino">';
        html += '       </select>';
        html += '   </div>';
        html += '   <div class="col-md-12">';
        html += '       <label class="control-label">País</label>';
        html += '       <select  class="entrada selectizejs" name="pais_iddestino" id="pais_iddestino">';
        html += '       </select>';
        html += '   </div>';
        html += '   <div class="col-md-12 union-destino">';
        html += '       <label class="control-label">Unión</label>';
        html += '       <select  class="entrada selectizejs" name="iduniondestino" id="iduniondestino">';
        html += '       </select>';
        html += '   </div>';
        html += '   <div class="col-md-12">';
        html += '       <label class="control-label">Asociación/Misión</label>';
        html += '       <select  class="entrada selectizejs" name="idmisiondestino" id="idmisiondestino">';
        html += '       </select>';
        html += '   </div>';
        html += '   <div class="col-md-12">';
        html += '       <label class="control-label">Distrito Misionero</label>';
        html += '       <select  class="entrada selectizejs" name="iddistritomisionerodestino" id="iddistritomisionerodestino">';
        html += '       </select>';
        html += '   </div>';
        html += '   <div class="col-md-12">';
        html += '       <label class="control-label">Iglesia</label>';
        html += '       <select  class="entrada selectizejs" name="idiglesiadestino" id="idiglesiadestino">';
        html += '       </select>';
        html += '   </div>';
        // html += '   <div class="col-md-12 individual" style="display: none;" >';
        // html += '       <label class="control-label">Carta de Traslado</label>';

        // html += '       <input type="file" class="form-control input-sm entrada" name="carta" id="carta">';
        // html += '   </div>';
        html += '</fieldset>';


        document.getElementById(id).innerHTML = html;
        
        divisiones.select({
            name: 'iddivisiondestino',
            url: '/obtener_divisiones_todos',
            placeholder: seleccione
        }).then(function() {
    
            $("#iddivisiondestino").trigger("change", ["", ""]);
            $("#pais_iddestino").trigger("change", ["", ""]);
            $("#iduniondestino").trigger("change", ["", ""]);
            $("#idmisiondestino").trigger("change", ["", ""]);
            $("#iddistritomisionerodestino").trigger("change", ["", ""]);
            $("#idiglesiadestino").trigger("change", ["", ""]);
            
            
        }) 
    
        
    }
    
    html_destino("destino-iglesia");
    


    document.getElementById("ver-lista").addEventListener("click", function(e) {
        e.preventDefault();

        var idiglesia = document.getElementsByName("idiglesia")[0].value;
        var idiglesiadestino = document.getElementsByName("idiglesiadestino")[0].value;

        var pais_id = document.getElementsByName("pais_id")[0].value;
        var array_pais = pais_id.split("|");

        var pais_iddestino = document.getElementsByName("pais_iddestino")[0].value;
        var array_pais_destino = pais_iddestino.split("|");

        required = true;

        required = required && traslados_temp.required("iddivision");
        required = required && traslados_temp.required("pais_id");
        // required = required && traslados_temp.required("iddivision");
        if(array_pais[1] == "S") {
            required = required && traslados_temp.required("idunion");
        }
        required = required && traslados_temp.required("idmision");
        required = required && traslados_temp.required("iddistritomisionero");
        required = required && traslados_temp.required("idiglesia");


        required = required && traslados_temp.required("iddivisiondestino");
        required = required && traslados_temp.required("pais_iddestino");
        // required = required && traslados_temp.required("iddivision");
        if(array_pais_destino[1] == "S") {
            required = required && traslados_temp.required("iduniondestino");
        }
        required = required && traslados_temp.required("idmisiondestino");
        required = required && traslados_temp.required("iddistritomisionerodestino");
        required = required && traslados_temp.required("idiglesiadestino");
        

        

        if(required) {

            if(idiglesia == idiglesiadestino) {
                BASE_JS.sweet({
                    text: iglesia_origen_destino
                })
    
                return
            }
        
            var promise = traslados_temp.guardar();
            promise.then(function(response) {
                document.getElementById("trasladar").setAttribute("tipo_traslado", response.tipo_traslado);
                if(typeof response.status != "undefined" && response.status == "ee") {
                    // BASE_JS.notificacion(response);
                    return false;
                }

                $("input[name=tipo_traslado][value=1]").trigger("click");
                // document.getElementById("tipo_traslado").dispatchEvent(eventClick);
               
            })
        }
    
    });

   

    document.getElementById("trasladar").addEventListener("click", function(e) {
        e.preventDefault();
        var tipo_traslado = this.getAttribute("tipo_traslado");
        if(tipo_traslado == "1") {
            traslados.ajax({
                url: '/trasladar',
                datos: { tipo_traslado: tipo_traslado }
            }).then(function(response) {
                //console.log(response);
                if(typeof response.status != "undefined" && response.status == "m") {
                    BASE_JS.notificacion({
                        msg: traslado_correctamente,
                        type: 'success'
                    })
                }
    
                // $("#listado-traslados").hide();
                // $(".iglesia").show();
                // $(".combo-tipo-traslado").show();

                traslados_temp.datatable.clear();
                traslados_temp.datatable.ajax.reload();
                traslados_temp.datatable.draw();

                document.getElementById("volver").dispatchEvent(eventClick);

            })  
        }

        if(tipo_traslado == "2") {
            if(traslados_temp.datatable.rows()[0].length <= 1) {
                BASE_JS.sweet({
                    text: agregar_mas_un_asociado
                });

                return false;
            }
            traslados_mi.abrirModal();
        }

        // if(tipo_traslado == "3") {
        //     // if(traslados_temp.datatable.rows()[0].length > 1) {
        //     //     BASE_JS.sweet({
        //     //         text: 'Solo Debe agregar un solo asociado!'
        //     //     });

        //     //     return false;
        //     // }
        //     traslados_mi.abrirModal();
        // }
            
        
    })


    document.getElementById("volver").addEventListener("click", function(e) {
        e.preventDefault();
        // $("#listado-traslados").hide();
        // $(".iglesia").show();
        // $(".combo-tipo-traslado").show();
        // $(".masivo_individual").hide();
        // // $(".individual").hide();
        // $("#tipo_traslado").val("1");
        // html_destino("destino-iglesia");


        $("#tabla-temporal").hide();
        $("#tabla-asociados").hide();
        $(".volver").hide();
        $(".trasladar").hide();
        $("#carta-traslado").hide();
        $("#combo-tipo-traslado").show();
        $("#combos-origen-destino").show();
        $("#ver-lista").show();
        
        $("input[name=tipo_traslado]").removeAttr("checked");
        $("input[name=tipo_traslado][value=1]").prop("checked", true);
        html_destino("destino-iglesia");
    })
    

    //document.getElementsByName("tipo_traslado").addEventListener("click", function(e) {
    $(document).on("click", "input[name=tipo_traslado]", function() {
        // e.preventDefault();
        // $("#tipos_traslado").is(":checked").val();

        var tipo_traslado = $(this).val();
        $("input[name=tipo_traslado]").removeAttr("checked");
        $("input[name=tipo_traslado][value="+tipo_traslado+"]").attr("checked", "checked");
        // console.log($(this));    
        if(tipo_traslado == "1") {
            $("#combo-tipo-traslado").hide();
            $("#combos-origen-destino").hide();
            $("#ver-lista").hide();
            $("#carta-traslado").hide();
            $("#tabla-temporal").show();
            $("#tabla-asociados").hide();
            $(".volver").show();
            $(".trasladar").show();
            // html_destino("destino-iglesia");
            document.getElementById("trasladar").setAttribute("tipo_traslado", tipo_traslado);
        }

        if(tipo_traslado == "2") {
            $("#combo-tipo-traslado").hide();
            $("#combos-origen-destino").hide();
            $("#carta-traslado").hide();
            $("#ver-lista").hide();
            $("#tabla-temporal").show();
            $("#tabla-asociados").show();
            $(".volver").show();
            $(".trasladar").show();
            
            html_destino("destino-masivo-individual");
            document.getElementById("tipo_traslado_mi").value = tipo_traslado;
            document.getElementById("trasladar").setAttribute("tipo_traslado", tipo_traslado);

            
        }

        if(tipo_traslado == "3") {
            $("#combo-tipo-traslado").hide();
            $("#combos-origen-destino").hide();
            $("#ver-lista").hide();
            $(".trasladar").hide();
           
            $("#tabla-temporal").hide();
            $("#tabla-asociados").show();
            $(".volver").show();
            $("#carta-traslado").show();
            html_destino("destino-masivo-individual");
            document.getElementById("tipo_traslado_mi").value = tipo_traslado;
        }


        if(typeof traslados_temp.datatable.length != "undefined") {
            traslados_temp.datatable.destroy();
        }

        traslados_temp.TablaListado({
            tablaID: '#tabla-traslados',
            url: "/buscar_datos",
            tipo_traslado: tipo_traslado
        });

        if(typeof traslados.datatable.length != "undefined") {
            traslados.datatable.destroy();
        }

        traslados.TablaListado({
            tablaID: '#tabla-asociados-traslados',
            url: "/buscar_datos_asociados_traslados",
            tipo_traslado: tipo_traslado
        });


       
    })

    document.getElementById("guardar-traslados-mi").addEventListener("click", function(event) {
        event.preventDefault();

        var  idiglesia_origen = document.getElementById("idiglesia_origen").value;
        var  idiglesiadestino = document.getElementById("idiglesiadestino").value;

        // var tipo_traslado = document.getElementsByName("tipo_traslado")[0].value;
   
        var tipo_traslado = $("input[name=tipo_traslado]:checked").val();
        var pais_iddestino = document.getElementsByName("pais_iddestino")[0].value;
        var array_pais_destino = pais_iddestino.split("|");

        required = true;
    
        required = required && traslados_mi.required("iddivisiondestino");
        required = required && traslados_mi.required("pais_iddestino");
        // required = required && traslados_mi.required("iddivision");
        if(array_pais_destino[1] == "S") {
            required = required && traslados_mi.required("iduniondestino");
        }
        required = required && traslados_mi.required("idmisiondestino");
        required = required && traslados_mi.required("iddistritomisionerodestino");
        required = required && traslados_mi.required("idiglesiadestino");
        // alert(required);
        // if(tipo_traslado == "3") {
        //     required = required && traslados_mi.required("carta");
        // }
        // alert(tipo_traslado);
        if(idiglesia_origen == idiglesiadestino) {
            BASE_JS.sweet({
                text: no_trasladar_iglesia_origen
            });
            return false;
        }

        if(required) {
            var promise = traslados_mi.guardar();
            traslados_mi.CerrarModal();
            promise.then(function(response) {
                //console.log(response);
                if(typeof response.status != "undefined" && response.status == "t") {
                    // alert("hola");
                    BASE_JS.notificacion({
                        msg: traslado_correctamente,
                        type: 'success'
                    })
                }

                if(typeof response.status != "undefined" && response.status == "tp") {
                    BASE_JS.notificacion({
                        msg: traslado_proceso,
                        type: 'success'
                    })
                }

                if(typeof traslados.datatable.length != "undefined") {
                    traslados.datatable.destroy();
                }
                traslados.TablaListado({
                    tablaID: '#tabla-asociados-traslados',
                    url: "/buscar_datos_asociados_traslados",
                    tipo_traslado: tipo_traslado
                });

                if(typeof traslados_temp.datatable.length != "undefined") {
                    traslados_temp.datatable.destroy();
                }

                traslados_temp.TablaListado({
                    tablaID: '#tabla-traslados',
                    url: "/buscar_datos",
                    tipo_traslado: response.tipo_acceso
                });

               
                
                if(response.tipo_traslado_mi == 3) {
                    BASE_JS.sweet({
                        confirm: true,
                        text: imprimir_carta_iglesia,
                        callbackConfirm: function() {
                            window.open(BaseUrl + "/traslados/imprimir_carta_iglesia/"+response.idmiembro+"/"+response.idcontrol);
                            document.getElementById("volver").dispatchEvent(eventClick);
                        }
                    }); 
                }
               
            }) 
        }
    })

    document.getElementById("cancelar-traslados-mi").addEventListener("click", function(event) {
        event.preventDefault();
        traslados_mi.CerrarModal();
    })


    // document.getElementById("carta-traslado").addEventListener("click", function(event) {
    //     event.preventDefault();
    //     // alert("hola carta");
    //     var idmiembro = document.getElementsByName("idmiembro")[0].value;
    //     window.open(BaseUrl + "/traslados/imprimir_carta_iglesia/"+idmiembro+"/0");
    // });

})


function eliminar_temp_traslado(idtemptraslados, idmiembro) {
    var promise = traslados_temp.Operacion(idtemptraslados, "E");
    promise.then(function() {
        $("button[agregar="+idmiembro+"]").removeClass("btn-success");
        $("button[agregar="+idmiembro+"]").addClass("btn-primary");
        $("button[agregar="+idmiembro+"]").find("i").removeClass("fa-check-circle").addClass("fa-plus");
        $("button[agregar="+idmiembro+"]").attr("onclick", "agregar_temp_traslado("+idmiembro+")");
    })
   
}

function agregar_temp_traslado(idmiembro) {
   

    var tipo_traslado = $("input[name=tipo_traslado]:checked").val();

    // if(tipo_traslado == "3" && traslados_temp.datatable.rows()[0].length >= 1) {
    //     BASE_JS.sweet({
    //         text: 'Solo Debe agregar un solo asociado!'
    //     });

    //     return false;
    // }

    traslados.ajax({
        url: '/agregar_traslado',
        datos: { idmiembro: idmiembro, tipo_traslado: tipo_traslado }
    }).then(function(response) {
       
        if(typeof response.status != "undefined" && response.status == "ei") {
            BASE_JS.notificacion(response);
        }

        if(typeof traslados_temp.datatable.length != "undefined") {
            traslados_temp.datatable.destroy();
        }
        // alert(response.tipo_traslado);
        traslados_temp.TablaListado({
            tablaID: '#tabla-traslados',
            url: "/buscar_datos",
            tipo_traslado: tipo_traslado
        });

        if(tipo_traslado == 2) {
            $("button[agregar="+idmiembro+"]").removeClass("btn-primary");
            $("button[agregar="+idmiembro+"]").addClass("btn-success");
            $("button[agregar="+idmiembro+"]").find("i").removeClass("fa-plus").addClass("fa-check-circle");
            $("button[agregar="+idmiembro+"]").removeAttr("onclick");
        }

      
        
    })  
}

function trasladar(idmiembro, idiglesia) {
   
    document.getElementById("idmiembro").value = idmiembro;
    document.getElementById("idiglesia_origen").value = idiglesia;
    agregar_temp_traslado(idmiembro);
    traslados_mi.abrirModal();
    
}