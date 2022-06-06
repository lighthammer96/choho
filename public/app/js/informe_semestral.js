var informe_semestral = new BASE_JS('informe_semestral', 'reportes');
var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
var iglesias = new BASE_JS('iglesias', 'iglesias');
var actividad_misionera = new BASE_JS('actividad_misionera', 'actividad_misionera');
var asociados = new BASE_JS('asociados', 'asociados');

document.addEventListener("DOMContentLoaded", function() {

    actividad_misionera.select({
        name: 'anio',
        url: '/obtener_anios',
        placeholder: seleccione
    })

    asociados.select({
        name: 'periodoini',
        url: '/obtener_periodos_ini',
    }).then(function() {
        
    }) 

    asociados.select({
        name: 'periodofin',
        url: '/obtener_periodos_fin',
    }).then(function() {
        
    }) 

   
    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones',
        placeholder: seleccione
    }).then(function() {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", ""]);
        $("#idunion").trigger("change", ["", ""]);
        // $("#idmision").trigger("change", ["", ""]);
        // $("#iddistritomisionero").trigger("change", ["", ""]);
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
                required = required && informe_semestral.required("iddivision");
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
                required = required && informe_semestral.required("pais_id");
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



    // $(document).on('change', '#idunion', function(event, idunion, idmision) {

    //     var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
    //     d_id = (typeof idunion != "undefined" && idunion != null) ? idunion : d_id;
    //     var selected = (typeof idmision != "undefined")  ? idmision : "";
        
    //     if(this.options.length > 0) {

    //         document.getElementById("lugar").value = this.options[this.selectedIndex].text;
           
    //     }

    //     misiones.select({
    //         name: 'idmision',
    //         url: '/obtener_misiones',
    //         placeholder: seleccione,
    //         selected: selected,
    //         datos: { idunion: d_id }
    //     }).then(function() {
        
    //         var condicion = typeof idunion == "undefined";
    //         condicion = condicion && typeof idmision == "undefined";
        
    //         if(condicion) {
    //             var required = true;
    //             required = required && informe_semestral.required("idunion");
    //             if(required) {
    //                 $("#idmision")[0].selectize.focus();
    //             }
    //         } 
        
    //     })
    // });

    // $(document).on('change', '#idmision', function(event, idmision, iddistritomisionero) {

    //     if(this.options.length > 0) {

    //         document.getElementById("lugar").value = this.options[this.selectedIndex].text;
           
    //     }
    // });

    // $(document).on('change', '#iddistritomisionero', function(event, iddistritomisionero, idiglesia) {

    //     var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;     
    //     d_id = (typeof iddistritomisionero != "undefined" && iddistritomisionero != null) ? iddistritomisionero : d_id;
    //     var selected = (typeof idiglesia != "undefined")  ? idiglesia : "";
    
    //     iglesias.select({
    //         name: 'idiglesia',
    //         url: '/obtener_iglesias',
    //         placeholder: seleccione,
    //         selected: selected,
    //         datos: { iddistritomisionero: d_id }
    //     }).then(function() {
        
    //         var condicion = typeof iddistritomisionero == "undefined";
    //         condicion = condicion && typeof idiglesia == "undefined";
        
    //         if(condicion) {
    //             var required = true;
    //             required = required && informe_semestral.required("iddistritomisionero");
    //             if(required) {
    //                 $("#idiglesia")[0].selectize.focus();
    //             }
    //         } 
        
    //     })
    // });


    document.getElementById("ver-reporte").addEventListener("click", function(e) {
        e.preventDefault();
        var pais_id = document.getElementsByName("pais_id")[0].value;
        var array_pais = pais_id.split("|");

        var required = true;
        required = required && informe_semestral.required("iddivision");
        required = required && informe_semestral.required("pais_id");
        // required = required && informe_semestral.required("iddivision");
        if(array_pais[1] == "S") {
            required = required && informe_semestral.required("idunion");
        }
        // required = required && informe_semestral.required("idmision");
        // required = required && informe_semestral.required("iddistritomisionero");
        // required = required && informe_semestral.required("idiglesia");
        required = required && informe_semestral.required("anio");
        required = required && informe_semestral.required("semestre");

        if(required) {
            $("#formulario-informe_semestral").attr("action", BaseUrl + "/reportes/imprimir_informe_semestral");
            $("#formulario-informe_semestral").attr("method", "GET");
            $("#formulario-informe_semestral").attr("target", "informe_semestral");
    
            
            window.open('', 'informe_semestral');
            document.getElementById('formulario-informe_semestral').submit();
        }
    })


})