$(document).ready(function(){
    var estado = true;
    $('#enviar').submit(function(e){
        estado = true;    
        if($('#nombre').val() == ""){
            console.log("no hay nombre");
            estado = false;
        }else{
            let texto = $('#nombre').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú\s0-9]{3,}$/;
            if(!validar.test(texto)){
                console.log("nombre incorrecto");
                estado = false;
            }   
        }
        if($('#coordinador').val() == ""){
            console.log("no hay coordinador");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#coordinador').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú\s\._-]{3,}$/;
            if(!validar.test(texto)){
                console.log("coordinador incorrecto");
                estado = false;
            }
        }
        if($('#correo').val() == ""){
            console.log("no hay correo");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#correo').val();
            let validar = /^[a-zA-Z0-9\._-]+@[cdb]+\.[edu]+\.s+v$/;
            if(!validar.test(texto)){
                console.log("correo incorrecto");
                estado = false;
            }
        }
        if(estado == true){
            var nombre = $("#nombre").val();
            var coordinador = $("#coordinador").val();
            var correo = $("#correo").val();
            let action = "agregar";
            $.ajax({
                url : 'modelo/class.area.php',
                type : 'POST',
                data : {
                    action : action,
                    nombre: nombre,
                    coordinador: coordinador,
                    correo: correo
                },
                success: function(respuesta){
                    var mensaje = JSON.parse(respuesta);
                    if(mensaje.status == false){
                        var modal = "";
                    modal += `
                    <div z-50 id='fondoM' modal-backdrop='' class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
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
                    <div z-50 id='fondoM' modal-backdrop='' class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El área ha sido agregada con éxito!</h3>
                                    <button id="cerrar" style="font-size: 20px" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                $("body").append(modal);
                    }
                },
                error : function(error){
                    console.log(error);
                }
            });
        }
        e.preventDefault();
    });

    $(document).on('click','#cerrar',function(){
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
    });

    
    
});