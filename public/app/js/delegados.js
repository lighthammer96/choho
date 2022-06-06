
var delegados = new BASE_JS('asociados', 'asociados');


document.addEventListener("DOMContentLoaded", function() {
    $(function() {
        $('input[type="radio"], input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass   : 'iradio_minimal-blue'
        })
    })

    $('input[name=hora_arribo]').inputmask("hh:mm", {
        placeholder: "HH:MM", 
        insertMode: false, 
        showMaskOnHover: false,
        hourFormat: 12
      }
   );

    var format = "";
    if(idioma_codigo == "es") {
        format = "dd/mm/yyyy";
       
        $("input[name=fecha_pasaje], input[name=fecha_vencimiento_pasaporte], input[name=fecha_termina_seguro], input[name=fecha_inicia_seguro], input[name=fecha_vencimiento_visa], input[name=fecha_emision_pasaporte]").attr("data-inputmask", "'alias': '"+format+"'");
    } else {
        format = "yyyy-mm-dd";
   
        $("input[name=fecha_pasaje], input[name=fecha_vencimiento_pasaporte], input[name=fecha_termina_seguro], input[name=fecha_inicia_seguro], input[name=fecha_vencimiento_visa], input[name=fecha_emision_pasaporte]").attr("data-inputmask", "'alias': '"+format+"'");
        
    }

    $("input[name=fecha_pasaje], input[name=fecha_termina_seguro], input[name=fecha_inicia_seguro], input[name=fecha_vencimiento_pasaporte], input[name=fecha_vencimiento_visa], input[name=fecha_emision_pasaporte]").inputmask();

 
    jQuery( "input[name=fecha_pasaje], input[name=fecha_termina_seguro], input[name=fecha_inicia_seguro], input[name=fecha_vencimiento_pasaporte], input[name=fecha_vencimiento_visa], input[name=fecha_emision_pasaporte]" ).datepicker({
        format: format,
        language: "es",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        // endDate: "now()",

    });

    delegados.TablaListado({
        tablaID: '#tabla-asociados',
        url: "/buscar_datos",
        delegados: 1

    });

    document.getElementById("ingresar-datos").addEventListener("click", function(event) {
        event.preventDefault();

        var datos = delegados.datatable.row('.selected').data();
        if(typeof datos == "undefined") {
            BASE_JS.sweet({
                text: seleccionar_registro
            });
            return false;
        } 


        var promise = delegados.get(datos.idmiembro);

        promise.then(function(response) {
            
            
            
        })
        

    })


    document.getElementById("guardar-asociados").addEventListener("click", function(event) {
        event.preventDefault();

        var required = true;
        // required = required && delegados.required("perfil_descripcion");

        
        if(required) {
            var promise = delegados.guardar();
            delegados.CerrarModal();
            // delegados.datatable.destroy();
            // delegados.TablaListado({
            //     tablaID: '#tabla-delegados',
            //     url: "/buscar_datos",
            // });

            promise.then(function(response) {
               
            })

        }
        

    })


    document.getElementById("cancelar-asociados").addEventListener("click", function(event) {
        event.preventDefault();
        delegados.CerrarModal();
    })

   

    
    document.getElementById("calendar-fecha_pasaje").addEventListener("click", function(e) {
        e.preventDefault();

  
        if($("input[name=fecha_pasaje]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha_pasaje]").blur();
            $("input[name=fecha_pasaje]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha_pasaje]").focus();
            $("input[name=fecha_pasaje]").addClass("focus-datepicker");
        }
       
    });

    document.getElementById("calendar-fecha_inicia_seguro").addEventListener("click", function(e) {
        e.preventDefault();

  
        if($("input[name=fecha_inicia_seguro]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha_inicia_seguro]").blur();
            $("input[name=fecha_inicia_seguro]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha_inicia_seguro]").focus();
            $("input[name=fecha_inicia_seguro]").addClass("focus-datepicker");
        }
       
    });

    document.getElementById("calendar-fecha_termina_seguro").addEventListener("click", function(e) {
        e.preventDefault();

  
        if($("input[name=fecha_termina_seguro]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha_termina_seguro]").blur();
            $("input[name=fecha_termina_seguro]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha_termina_seguro]").focus();
            $("input[name=fecha_termina_seguro]").addClass("focus-datepicker");
        }
       
    });


    document.getElementById("calendar-fecha_vencimiento_visa").addEventListener("click", function(e) {
        e.preventDefault();

  
        if($("input[name=fecha_vencimiento_visa]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha_vencimiento_visa]").blur();
            $("input[name=fecha_vencimiento_visa]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha_vencimiento_visa]").focus();
            $("input[name=fecha_vencimiento_visa]").addClass("focus-datepicker");
        }
       
    });


    document.getElementById("calendar-fecha_vencimiento_pasaporte").addEventListener("click", function(e) {
        e.preventDefault();

  
        if($("input[name=fecha_vencimiento_pasaporte]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha_vencimiento_pasaporte]").blur();
            $("input[name=fecha_vencimiento_pasaporte]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha_vencimiento_pasaporte]").focus();
            $("input[name=fecha_vencimiento_pasaporte]").addClass("focus-datepicker");
        }
       
    });


    document.getElementById("calendar-fecha_emision_pasaporte").addEventListener("click", function(e) {
        e.preventDefault();

  
        if($("input[name=fecha_emision_pasaporte]").hasClass("focus-datepicker")) {
   
            $("input[name=fecha_emision_pasaporte]").blur();
            $("input[name=fecha_emision_pasaporte]").removeClass("focus-datepicker");
        } else {
            
            $("input[name=fecha_emision_pasaporte]").focus();
            $("input[name=fecha_emision_pasaporte]").addClass("focus-datepicker");
        }
       
    });


    document.getElementById("time-hora_arribo").addEventListener("click", function(e) {
        e.preventDefault();
        
        if($("input[name=hora_arribo]").hasClass("focus-time")) {
   
            $("input[name=hora_arribo]").blur();
            $("input[name=hora_arribo]").removeClass("focus-time");
        } else {
            
            $("input[name=hora_arribo]").focus();
            $("input[name=hora_arribo]").addClass("focus-time");
        }
       
    }); 

     $("#posee_visa").on('ifClicked', function(event){
        // var tipolugarnac = $(this).val();
       // console.log($(this).parent(".icheckbox_minimal-blue")[0]);
        if(!$(this).parent(".icheckbox_minimal-blue").hasClass("checked")) {
            $("input[name=posee_visa]").val("S");
        } else {
            $("input[name=posee_visa]").val("N");
        }
    });

    $("#posee_seguro").on('ifClicked', function(event){
        // var tipolugarnac = $(this).val();
       // console.log($(this).parent(".icheckbox_minimal-blue")[0]);
        if(!$(this).parent(".icheckbox_minimal-blue").hasClass("checked")) {
            $("input[name=posee_seguro]").val("S");
        } else {
            $("input[name=posee_seguro]").val("N");
        }
    });


    

})

function imprimir_certificado(idmiembro) {
    
    window.open(BaseUrl + "/asociados/imprimir_certificado/"+idmiembro);
}