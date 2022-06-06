var general_asociados = new BASE_JS("general_asociados", "reportes");
var asociados = new BASE_JS("asociados", "asociados");
var principal = new BASE_JS("principal", "principal");
var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
var iglesias = new BASE_JS('iglesias', 'iglesias');


document.addEventListener("DOMContentLoaded", function() {
    // $(function() {
        $('input[type="radio"], input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    // })
    // $('input').on('ifClicked', function (ev) { $(ev.target).click() })
    // $('input[name=todos]').on('ifClicked', function(event){
    //     alert("hola ");
    //     // alert($(this).is(":checked"));    
    // });

    // $('#todos').on('ifChecked', function () {   alert("hola "); })
    
    var format = "";
    if(idioma_codigo == "es") {
        format = "dd/mm/yyyy";
      
        $("input[name=fechaini], input[name=fechafin]").attr("data-inputmask", "'alias': '"+format+"'");
    } else {
        format = "yyyy-mm-dd";
      
        $("input[name=fechaini], input[name=fechafin]").attr("data-inputmask", "'alias': '"+format+"'");
        
    }
    
    $("input[name=fechaini], input[name=fechafin]").inputmask();

    jQuery( "input[name=fechaini], input[name=fechafin]" ).datepicker({
        format: format,
        language: "es",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        endDate: "now()",

    });


    principal.select({
        name: 'idcondicioneclesiastica',
        url: '/obtener_condicion_eclesiastica',
        placeholder: seleccione
    }).then(function() {
        // asociados.enter("idocupacion","observaciones");
        
    }) 

    asociados.select({
        name: 'idestadocivil',
        url: '/obtener_estado_civil',
        placeholder: seleccione
    }).then(function() {
        //asociados.enter("idestadocivil","idgradoinstruccion");
        
    }) 



    asociados.select({
        name: 'idocupacion',
        url: '/obtener_profesiones_todos',
        placeholder: seleccione
    }).then(function() {
        //asociados.enter("idocupacion","observaciones");
        
    }) 

    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones',
        placeholder: seleccione
    }).then(function() {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", "", ""]);
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
            
            var condicion = typeof iddivision == "undefined" && iddivision != "";
            condicion = condicion && typeof pais_id == "undefined" && pais_id != "";
        
            if(condicion) {
                // var required = true;
                // required = required && asociados.required("iddivision");
                // if(required) {
                    $("#pais_id")[0].selectize.focus();
                // }
            } 
        
        })

       
    });



    $(document).on('change', '#pais_id', function(event, pais_id, idunion, iddepartamentodomicilio) {
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
        
            var condicion = typeof pais_id == "undefined" && pais_id != "";
            condicion = condicion && typeof idunion == "undefined" && idunion != "";
            condicion = condicion && typeof iddepartamentodomicilio == "undefined" && iddepartamentodomicilio != "";
        
            if(condicion) {
                // var required = true;
                // required = required && asociados.required("pais_id");
                // if(required) {
                    $("#idunion")[0].selectize.focus();
                // }

             
                
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
        
            var condicion = typeof idunion == "undefined" && idunion != "";
            condicion = condicion && typeof idmision == "undefined" && idmision != "";
        
            if(condicion) {
                // var required = true;
                // required = required && asociados.required("idunion");
                // if(required) {
                    $("#idmision")[0].selectize.focus();
                // }
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
        
            var condicion = typeof idmision == "undefined" && idmision != "";
            condicion = condicion && typeof iddistritomisionero == "undefined" && iddistritomisionero != "";
        
            if(condicion) {
                // var required = true;
                // required = required && asociados.required("idmision");
                // if(required) {
                    $("#iddistritomisionero")[0].selectize.focus();
                // }
            } 
        
        })
    });

    $(document).on('change', '#iddistritomisionero', function(event, iddistritomisionero, idiglesia) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddistritomisionero"];     
        d_id = (typeof iddistritomisionero != "undefined" && iddistritomisionero != null) ? iddistritomisionero : d_id;
        // var selected = (typeof idiglesia != "undefined")  ? idiglesia : "";
    
        // iglesias.select({
        //     name: 'idiglesia',
        //     url: '/obtener_iglesias',
        //     placeholder: seleccione,
        //     selected: selected,
        //     datos: { iddistritomisionero: d_id }
        // }).then(function() {
        
        //     var condicion = typeof iddistritomisionero == "undefined" && iddistritomisionero != "";
        //     condicion = condicion && typeof idiglesia == "undefined" && idiglesia != "";
        
        //     if(condicion) {
        //         // var required = true;
        //         // required = required && asociados.required("iddistritomisionero");
        //         // if(required) {
        //             $("#idiglesia")[0].selectize.focus();
        //         // }
        //     } 
        
        // })
        $("#check_iglesias").hide();
        general_asociados.ajax({
            url: '/obtener_iglesias',
            datos: { iddistritomisionero: d_id }
        }).then(function(response) {
            var html = '';
            for (let index = 0; index < response.length; index++) {
                html += '<div class="col-md-3" style="">';
                html += '   <input class="minimal entrada" type="checkbox" name="iglesias[]" value="'+response[index].id+'">&nbsp;&nbsp;';
                html += '   <label class="control-label">'+response[index].descripcion+'</label>';
                html += '</div>';
                
            }
            document.getElementById("iglesias").innerHTML = html;
            $('input[type="radio"], input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass   : 'iradio_minimal-blue'
            })
            if(response.length > 1) {
                $("#check_todos").show();
            } else {
                $("#check_todos").hide();
            }
            if(response.length > 0) {

                $("#check_iglesias").show();
            }

        }) 
    });


    document.getElementById("imprimir_vertical").addEventListener("click", function(e) {
        e.preventDefault();

        var campos = $("input[name='campos[]']");
        var cont = 0;

        for (let index = 0; index < campos.length; index++) {
           
            if($(campos[index]).parent(".icheckbox_minimal-blue").hasClass("checked")) {
                cont ++;
            }   
        }
        
        if(cont == 0) {
            BASE_JS.sweet({
                text: seleccionar_campo_mostrar
            });
            return false;
        }

        if(cont > 15) {
            BASE_JS.sweet({
                text: excede_campos
            });
            return false;
        }

        

        $("#formulario-general_asociados").attr("action", BaseUrl + "/reportes/imprimir_general_asociados");
        $("#formulario-general_asociados").attr("method", "GET");
        $("#formulario-general_asociados").attr("target", "imprimir_vertical");
        $("#formato").val("portrait");
 
        window.open('', 'imprimir_vertical');
        document.getElementById('formulario-general_asociados').submit();
    })


    document.getElementById("imprimir_horizontal").addEventListener("click", function(e) {
        e.preventDefault();

        var campos = $("input[name='campos[]']");
        var cont = 0;

        for (let index = 0; index < campos.length; index++) {
           
            if($(campos[index]).parent(".icheckbox_minimal-blue").hasClass("checked")) {
                cont ++;
            }   
        }
        
        if(cont == 0) {
            BASE_JS.sweet({
                text: seleccionar_campo_mostrar
            });
            return false;
        }

  
        

        $("#formulario-general_asociados").attr("action", BaseUrl + "/reportes/imprimir_general_asociados");
        $("#formulario-general_asociados").attr("method", "GET");
        $("#formulario-general_asociados").attr("target", "imprimir_horizontal");
        $("#formato").val("landscape");
        
        window.open('', 'imprimir_horizontal');
        document.getElementById('formulario-general_asociados').submit();
    })


    document.getElementById("imprimir_fichas").addEventListener("click", function(e) {
        e.preventDefault();


        $("#formulario-general_asociados").attr("action", BaseUrl + "/reportes/imprimir_fichas_asociados");
        $("#formulario-general_asociados").attr("method", "GET");
        $("#formulario-general_asociados").attr("target", "imprimir_fichas");
   
        
        window.open('', 'imprimir_fichas');
        document.getElementById('formulario-general_asociados').submit();
    })


    document.getElementById("exportar_excel").addEventListener("click", function(e) {
        e.preventDefault();
        var campos = $("input[name='campos[]']");
        var cont = 0;

        for (let index = 0; index < campos.length; index++) {
           
            if($(campos[index]).parent(".icheckbox_minimal-blue").hasClass("checked")) {
                cont ++;
            }   
        }
        
        if(cont == 0) {
            BASE_JS.sweet({
                text: seleccionar_campo_mostrar
            });
            return false;
        }

        $("#formulario-general_asociados").attr("action", BaseUrl + "/reportes/exportar_excel_general_asociados");
        $("#formulario-general_asociados").attr("method", "GET");
        $("#formulario-general_asociados").attr("target", "exportar_excel");
   
        
        window.open('', 'exportar_excel');
        document.getElementById('formulario-general_asociados').submit();
    })

    document.getElementById("calendar-fechaini").addEventListener("click", function(e) {
        e.preventDefault();
        $("input[name=fechaini]").focus();
    });


    document.getElementById("calendar-fechafin").addEventListener("click", function(e) {
        e.preventDefault();
        $("input[name=fechafin]").focus();
    });

   
})