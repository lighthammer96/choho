var grafico_feligresia = new BASE_JS('grafico_feligresia', 'reportes');
var divisiones = new BASE_JS('divisiones', 'divisiones');
var paises = new BASE_JS('paises', 'paises');
var uniones = new BASE_JS('uniones', 'uniones');
var misiones = new BASE_JS('misiones', 'misiones');
var distritos_misioneros = new BASE_JS('distritos_misioneros', 'distritos_misioneros');
var iglesias = new BASE_JS('iglesias', 'iglesias');


document.addEventListener("DOMContentLoaded", function () {




    divisiones.select({
        name: 'iddivision',
        url: '/obtener_divisiones_all',
        placeholder: seleccione,
        // selected: 0
    }).then(function () {

        $("#iddivision").trigger("change", ["", ""]);
        $("#pais_id").trigger("change", ["", ""]);
        $("#idunion").trigger("change", ["", ""]);
        $("#idmision").trigger("change", ["", ""]);
        $("#iddistritomisionero").trigger("change", ["", ""]);
        $("#idiglesia").trigger("change", ["", ""]);


    })

    $(document).on('change', '#iddivision', function (event, iddivision, pais_id) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddivision"];
        d_id = (typeof iddivision != "undefined" && iddivision != null) ? iddivision : d_id;
        var selected = (typeof pais_id != "undefined") ? pais_id : "";

        paises.select({
            name: 'pais_id',
            url: '/obtener_paises_asociados_all',
            placeholder: seleccione,
            selected: selected,
            datos: { iddivision: d_id }
        }).then(function (response) {

            var condicion = typeof iddivision == "undefined";
            condicion = condicion && typeof pais_id == "undefined";

            if (condicion) {
                var required = true;
                required = required && grafico_feligresia.required("iddivision");
                if (required) {
                    $("#pais_id")[0].selectize.focus();
                }
            }

        })
    });



    $(document).on('change', '#pais_id', function (event, pais_id, idunion) {
        var valor = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session['pais_id'] + "|" + session['posee_union']; 
        var array = valor.toString().split("|");
        //var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : 1;   

        var d_id = array[0];
        var posee_union = array[1];

        var selected = (typeof idunion != "undefined") ? idunion : "";
        uniones.select({
            name: 'idunion',
            url: '/obtener_uniones_paises_all',
            placeholder: seleccione,
            selected: selected,
            datos: { pais_id: d_id }
        }).then(function () {

            var condicion = typeof pais_id == "undefined";
            condicion = condicion && typeof idunion == "undefined";

            if (condicion) {
                var required = true;
                required = required && grafico_feligresia.required("pais_id");
                if (required) {
                    $("#idunion")[0].selectize.focus();
                }
            }

        })
        if (posee_union == "N") {
            $(".union").hide();

            misiones.select({
                name: 'idmision',
                url: '/obtener_misiones_all',
                placeholder: seleccione,
                datos: { pais_id: d_id }
            })
        } else {
            $(".union").show();
        }

    });



    $(document).on('change', '#idunion', function (event, idunion, idmision) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idunion"];
        d_id = (typeof idunion != "undefined" && idunion != null) ? idunion : d_id;
        var selected = (typeof idmision != "undefined") ? idmision : "";

        misiones.select({
            name: 'idmision',
            url: '/obtener_misiones_all',
            placeholder: seleccione,
            selected: selected,
            datos: { idunion: d_id }
        }).then(function () {

            var condicion = typeof idunion == "undefined";
            condicion = condicion && typeof idmision == "undefined";

            if (condicion) {
                var required = true;
                required = required && grafico_feligresia.required("idunion");
                if (required) {
                    $("#idmision")[0].selectize.focus();
                }
            }

        })
    });

    $(document).on('change', '#idmision', function (event, idmision, iddistritomisionero) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["idmision"];
        d_id = (typeof idmision != "undefined" && idmision != null) ? idmision : d_id;
        var selected = (typeof iddistritomisionero != "undefined") ? iddistritomisionero : "";

        distritos_misioneros.select({
            name: 'iddistritomisionero',
            url: '/obtener_distritos_misioneros_all',
            placeholder: seleccione,
            selected: selected,
            datos: { idmision: d_id }
        }).then(function () {

            var condicion = typeof idmision == "undefined";
            condicion = condicion && typeof iddistritomisionero == "undefined";

            if (condicion) {
                var required = true;
                required = required && grafico_feligresia.required("idmision");
                if (required) {
                    $("#iddistritomisionero")[0].selectize.focus();
                }
            }

        })
    });

    $(document).on('change', '#iddistritomisionero', function (event, iddistritomisionero, idiglesia) {

        var d_id = ($(this).val() != "" && $(this).val() != null) ? $(this).val() : session["iddistritomisionero"];
        d_id = (typeof iddistritomisionero != "undefined" && iddistritomisionero != null) ? iddistritomisionero : d_id;
        var selected = (typeof idiglesia != "undefined") ? idiglesia : "";

        iglesias.select({
            name: 'idiglesia',
            url: '/obtener_iglesias_all',
            placeholder: seleccione,
            selected: selected,
            datos: { iddistritomisionero: d_id }
        }).then(function () {

            var condicion = typeof iddistritomisionero == "undefined";
            condicion = condicion && typeof idiglesia == "undefined";

            if (condicion) {
                var required = true;
                required = required && grafico_feligresia.required("iddistritomisionero");
                if (required) {
                    $("#idiglesia")[0].selectize.focus();
                }
            }

        })
    });


    document.addEventListener("click", function (event) {
        var id = event.srcElement.id;
        if (id == "" && !event.srcElement.parentNode.disabled) {
            id = event.srcElement.parentNode.id;
        }
        //console.log(event.srcElement);
        switch (id) {
            case 'nuevo-perfil':
                event.preventDefault();

                grafico_feligresia.abrirModal();
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


    document.getElementById("ver-reporte").addEventListener("click", function(e) {
        e.preventDefault();
        // Create the chart
        var iddivision = document.getElementById("iddivision").value
        var pais_id = document.getElementById("pais_id").value
        var idunion = document.getElementById("idunion").value
        var idmision = document.getElementById("idmision").value
        var iddistritomisionero = document.getElementById("iddistritomisionero").value
        var idiglesia = document.getElementById("idiglesia").value
        grafico_feligresia.ajax({
            url: '/obtener_feligresia',
            datos: { 
                iddivision: iddivision,
                pais_id: pais_id,
                idunion: idunion,
                idmision: idmision,
                iddistritomisionero: iddistritomisionero,
                idiglesia: idiglesia
            }
        }).then(function(response) {
            if(response.length <= 0) {
                BASE_JS.sweet({
                    text: no_hay_datos
                });
                return false;
            }
            // console.log(response);
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: titulo_grafico_feligresia
                },
                // subtitle: {
                //     text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
                // },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: porcentaje
                    }
    
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },
    
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
    
                series: [
                    {
                        name: "",
                        colorByPoint: true,
                        data: response
                        // data: [
                        //     {
                        //         name: "Chrome",
                        //         y: 62.74,
                        //         drilldown: "Chrome"
                        //     },
                        //     {
                        //         name: "Firefox",
                        //         y: 10.57,
                        //         drilldown: "Firefox"
                        //     },
                        //     {
                        //         name: "Internet Explorer",
                        //         y: 7.23,
                        //         drilldown: "Internet Explorer"
                        //     },
                        //     {
                        //         name: "Safari",
                        //         y: 5.58,
                        //         drilldown: "Safari"
                        //     },
                        //     {
                        //         name: "Edge",
                        //         y: 4.02,
                        //         drilldown: "Edge"
                        //     },
                        //     {
                        //         name: "Opera",
                        //         y: 1.92,
                        //         drilldown: "Opera"
                        //     },
                        //     {
                        //         name: "Other",
                        //         y: 7.62,
                        //         drilldown: null
                        //     }
                        // ]
                    }
                ],
                // drilldown: {
                //     series: [
                //         {
                //             name: "Chrome",
                //             id: "Chrome",
                //             data: [
                //                 [
                //                     "v65.0",
                //                     0.1
                //                 ],
                //                 [
                //                     "v64.0",
                //                     1.3
                //                 ],
                //                 [
                //                     "v63.0",
                //                     53.02
                //                 ],
                //                 [
                //                     "v62.0",
                //                     1.4
                //                 ],
                //                 [
                //                     "v61.0",
                //                     0.88
                //                 ],
                //                 [
                //                     "v60.0",
                //                     0.56
                //                 ],
                //                 [
                //                     "v59.0",
                //                     0.45
                //                 ],
                //                 [
                //                     "v58.0",
                //                     0.49
                //                 ],
                //                 [
                //                     "v57.0",
                //                     0.32
                //                 ],
                //                 [
                //                     "v56.0",
                //                     0.29
                //                 ],
                //                 [
                //                     "v55.0",
                //                     0.79
                //                 ],
                //                 [
                //                     "v54.0",
                //                     0.18
                //                 ],
                //                 [
                //                     "v51.0",
                //                     0.13
                //                 ],
                //                 [
                //                     "v49.0",
                //                     2.16
                //                 ],
                //                 [
                //                     "v48.0",
                //                     0.13
                //                 ],
                //                 [
                //                     "v47.0",
                //                     0.11
                //                 ],
                //                 [
                //                     "v43.0",
                //                     0.17
                //                 ],
                //                 [
                //                     "v29.0",
                //                     0.26
                //                 ]
                //             ]
                //         },
                //         {
                //             name: "Firefox",
                //             id: "Firefox",
                //             data: [
                //                 [
                //                     "v58.0",
                //                     1.02
                //                 ],
                //                 [
                //                     "v57.0",
                //                     7.36
                //                 ],
                //                 [
                //                     "v56.0",
                //                     0.35
                //                 ],
                //                 [
                //                     "v55.0",
                //                     0.11
                //                 ],
                //                 [
                //                     "v54.0",
                //                     0.1
                //                 ],
                //                 [
                //                     "v52.0",
                //                     0.95
                //                 ],
                //                 [
                //                     "v51.0",
                //                     0.15
                //                 ],
                //                 [
                //                     "v50.0",
                //                     0.1
                //                 ],
                //                 [
                //                     "v48.0",
                //                     0.31
                //                 ],
                //                 [
                //                     "v47.0",
                //                     0.12
                //                 ]
                //             ]
                //         },
                //         {
                //             name: "Internet Explorer",
                //             id: "Internet Explorer",
                //             data: [
                //                 [
                //                     "v11.0",
                //                     6.2
                //                 ],
                //                 [
                //                     "v10.0",
                //                     0.29
                //                 ],
                //                 [
                //                     "v9.0",
                //                     0.27
                //                 ],
                //                 [
                //                     "v8.0",
                //                     0.47
                //                 ]
                //             ]
                //         },
                //         {
                //             name: "Safari",
                //             id: "Safari",
                //             data: [
                //                 [
                //                     "v11.0",
                //                     3.39
                //                 ],
                //                 [
                //                     "v10.1",
                //                     0.96
                //                 ],
                //                 [
                //                     "v10.0",
                //                     0.36
                //                 ],
                //                 [
                //                     "v9.1",
                //                     0.54
                //                 ],
                //                 [
                //                     "v9.0",
                //                     0.13
                //                 ],
                //                 [
                //                     "v5.1",
                //                     0.2
                //                 ]
                //             ]
                //         },
                //         {
                //             name: "Edge",
                //             id: "Edge",
                //             data: [
                //                 [
                //                     "v16",
                //                     2.6
                //                 ],
                //                 [
                //                     "v15",
                //                     0.92
                //                 ],
                //                 [
                //                     "v14",
                //                     0.4
                //                 ],
                //                 [
                //                     "v13",
                //                     0.1
                //                 ]
                //             ]
                //         },
                //         {
                //             name: "Opera",
                //             id: "Opera",
                //             data: [
                //                 [
                //                     "v50.0",
                //                     0.96
                //                 ],
                //                 [
                //                     "v49.0",
                //                     0.82
                //                 ],
                //                 [
                //                     "v12.1",
                //                     0.14
                //                 ]
                //             ]
                //         }
                //     ]
                // }
            });
        });
        
    })

    






})