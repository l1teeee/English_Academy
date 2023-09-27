$(document).ready(function(){

    //Funcion para mostrar articulos completos
    if ($("#items").length) {
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
                                <a  style="font-size: 20px" href="#" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">Ver más información <i class='bx bx-link' style='color:#5f91f6'  ></i></a>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Artículo:</b> ${tipo}</p>
                                <a  style="font-size: 20px" href="editarArticulo.php?id=${articulo.Id_articulo}" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i class='bx bx-edit-alt' style='color:#ffffff'></i></a>
                                <a  data_id ="${articulo.Id_articulo}" style="font-size: 20px" class="eliminar focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class='bx bx-trash'></i></a>
                            </div>
                        </div>       
                        `
                    });
                }
                $('#items').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    $(document).on('click','.eliminar',function(){
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div z-50 id='fondoM' modal-backdrop='' class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de eliminar el área: `+id+`?</h3>
                    <button id="borrar" data_id="`+id+`" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    $(document).on('click','#borrar',function(){
        $("#question").remove();
        let action = "eliminar";
        let id = $(this).attr("data_id");
        $.ajax({
            url: 'modelo/class.articulos.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function(respuesta){
                var area = JSON.parse(respuesta);
                if(area.status == false){
                    var modal = "";
                    modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Ha ocurrido un error. Por favor intente de nuevo</h3>
                                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                $("body").append(modal);
                }else{
                    var modal = "";
                    modal += `
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El elemento ha sido eliminado con éxito!</h3>
                                    <button id="cerrar" style="font-size: 20px" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                $("body").append(modal);
                }
            }
        });
        mostrarArticulos();
    });

    $(document).on('click','#cerrar',function(){
        $("#question").remove();
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#edit").remove();
        mostrarArticulos();
    });

});