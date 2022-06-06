var api = new BASE_JS('api', 'api');
document.addEventListener("DOMContentLoaded", function() {
    var eventChange = new Event('change');

    api.select({
        name: 'codigo_asesor',
        url: '/obtener_asesores',
        placeholder: "Todos",
    })

    document.getElementById("codigo_asesor").addEventListener("change", function(event) {
        event.preventDefault();
        var codigo_asesor = this.value;


        api.ajax({
            url: '/obtener_resultado',
            datos: { codigo_asesor: codigo_asesor }
        }).then(function(response) {
            document.getElementById("response").textContent = JSON.stringify(response, undefined, 2);
        
        })
        
    })

    document.getElementById("codigo_asesor").dispatchEvent(eventChange);
})