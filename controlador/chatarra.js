$(document).ready(function (){
    if ($("#items2").length) {
        mostrarArticulos();
    }

    function mostrarArticulos() {
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.articulos.php',
            type: 'POST',
            data: {
                action: action,
            },
            success: function (respuesta) {
                var resultado = "";
                var tipo;
                var articulos = JSON.parse(respuesta);
                if (articulos.status == false) {
                    resultado = articulos.msg;
                } else {
                    articulos.data.forEach(articulo => {
                        if(articulo.Ubicacion == "Chatarra"){
                            if(articulo.Tipo_articulo == "F"){
                                tipo = "No contable";
                            }
                            else{
                                tipo = "Contable";
                            }
                            resultado += `
                            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style="margin-bottom: 3vw;">
                                <img class="rounded-t-lg" src="media/${articulo.img}" alt="articulo" style="height: 350px; width: 400px" />
                                <div class="p-5">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${articulo.Nombre} ( ${articulo.Modelo} ) </h5>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Artículo:</b> ${tipo}</p>
                                </div>
                            </div>       
                            `
                        }
                    });
                }
                $('#items2').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
});
