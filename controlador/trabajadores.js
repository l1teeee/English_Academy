$(document).ready(function () {

    $(document).on('click', '.eliminar', function () {
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de eliminar el trabajador con id: `+ id + `?</h3>
                    <button id="borrar" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    $(document).on('click', '#borrar', function () {
        $("#question").remove();
        let action = "eliminar";
        let id = $(this).attr("data-id");
        $.ajax({
            url: 'modelo/class.trabajadores.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var area = JSON.parse(respuesta);
                if (area.status == false) {
                    var modal = "";
                    modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
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
                } else {
                    var modal = "";
                    modal += `
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
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
        mostrarTrabajadores();
    });
    
    $(document).on('click', '#cerrar', function () {
        $("#question").remove();
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#edit").remove();
        $("#agg").remove();
        $("#contrasena").remove();
        mostrarTrabajadores();
    });

    $(document).on('click', '.contra', function () {
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="contrasena" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex items-center justify-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Resetear</span> <span style="color: #4d227c;"> contraseña</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="fmrContra" data_id="${id}">
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="contraNueva" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña Nueva: <span style="color: red">*</span></label>
                                                <input style="font-size: 20px" type="password" id="contraNueva" name="contraNueva" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="contraConf" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirmar contraseña: <span style="color: red">*</span></label>
                                                <input style="font-size: 20px" type="password" id="contraConf" name="contraConf" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                            </div>
                                            <button style="font-size: 20px" type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Guardar</button>
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>   
        `;
        $("body").append(modal);
    });


    $(document).on('submit', '#fmrContra', function (e) {
        let id = $(this).attr("data_id");
        var estado = true;
        if ($('#contraNueva').val() == "") {
            console.log("Constraseña vacia");
            estado = false;
        } else {
            let texto = $('#contraNueva').val();
            let validar = /^[a-zA-Z\s0-9._]{3,}$/;
            if (!validar.test(texto)) {
                console.log("contraseña incorrecta");
                estado = false;
            }
        }
        if ($('#contraConf').val() == "") {
            console.log("Contraseña vacia");
            estado = false;
        } else {
            let texto = $('#contraConf').val();
            let validar = /^[a-zA-Z\s0-9._]{3,}$/;
            if (!validar.test(texto)) {
                console.log("contraseña incorrecta");
                estado = false;
            }
        }
        
        if (estado == true) {
            $("#contrasena").remove();
            let contraNueva = $(this).find("#contraNueva").val();
            let contraConf = $(this).find("#contraConf").val();
            let action = "contrasena";
            $.ajax({
                url: 'modelo/class.trabajadores.php',
                type: 'POST',
                data: {
                    action: action,
                    contraNueva: contraNueva,
                    contraConf: contraConf,
                    id: id
                },
                success: function (respuesta) {
                    var mensaje = JSON.parse(respuesta);
                    if (mensaje.status == false) {
                        console.log(mensaje.msg);
                        var modal = "";
                        modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
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
                    } else {
                        var modal = "";
                        modal += `
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-autoflex flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El trabajador ha sido ingresado con éxito!</h3>
                                    <button id="cerrar" style="font-size: 20px" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                        $("body").append(modal);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        e.preventDefault();
    });


    //Funcion para mostrar trabajadores completos
    if ($("#items").length) {
        mostrarTrabajadores();
    }

    function mostrarTrabajadores() {
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.trabajadores.php',
            type: 'POST',
            data: {
                action: action,
            },
            success: function (respuesta) {
                var resultado = "";
                var trabajadores = JSON.parse(respuesta);
                if (trabajadores.status == false) {
                    resultado = trabajadores.msg;
                } else {
                    trabajadores.data.forEach(trabajador => {
                        resultado += `
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${trabajador.Id_trabajador}
                            </th>
                            <td class="py-4 px-6">
                                ${trabajador.Nombre} ${trabajador.Apellido}
                            </td>
                            <td class="py-4 px-6">
                                <b>${trabajador.Usuario}</b> 
                            </td>
                            <td class="py-4 px-6">
                                <b>${trabajador.Tipo}</b> 
                            </td>
                            <td class="py-4 px-6">
                                <div class="grid grid-cols-3 gap-3 w-full"> 
                                    <a href = "editar_trabajador.php?id=${trabajador.Id_trabajador}"style="font-size: 20px" class="editar font-medium text-green-600 underline dark:text-green-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-edit'></i></a>
                                    <a  data_id="${trabajador.Id_trabajador}" style="font-size: 20px; " class="eliminar font-medium text-red-600 underline dark:text-red-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-trash'></i></a>
                                    <a  data_id="${trabajador.Id_trabajador}" style="font-size: 20px; " class="contra font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-reset'></i></a>
                                </div>    
                            </td>
                        </tr>        
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

    $('#txtBuscar').keyup(function(e){
        if($('#txtBuscar').val()){
            let texto = $('#txtBuscar').val();
            let action = "buscar";
            $.ajax({
                url: 'modelo/class.trabajadores.php',
                type: 'POST',
                data: {
                    action: action,
                    texto: texto
                },
                success: function(respuesta){
                    var resultado = "";
                    var trabajadores = JSON.parse(respuesta);
                    if(trabajadores.status == false){
                        resultado += `
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row" colspan="4" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${trabajadores.msj}
                            </th>
                        </tr> 
                        `;
                    }else{
                        trabajadores.data.forEach(trabajador => {
                            resultado += `
                            <tr class="bg-white dark:bg-gray-800">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${trabajador.Id_trabajador}
                            </th>
                            <td class="py-4 px-6">
                                ${trabajador.Nombre} ${trabajador.Apellido}
                            </td>
                            <td class="py-4 px-6">
                                <b>${trabajador.Usuario}</b> 
                            </td>
                            <td class="py-4 px-6">
                                <b>${trabajador.Tipo}</b> 
                            </td>
                            <td class="py-4 px-6">
                                <div class="grid grid-cols-3 gap-3 w-full"> 
                                    <a href = "editar_trabajador.php?id=${trabajador.Id_trabajador}"style="font-size: 20px" class="editar font-medium text-green-600 underline dark:text-green-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-edit'></i></a>
                                    <a  data_id="${trabajador.Id_trabajador}" style="font-size: 20px; " class="eliminar font-medium text-red-600 underline dark:text-red-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-trash'></i></a>
                                    <a  data_id="${trabajador.Id_trabajador}" style="font-size: 20px; " class="contra font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-reset'></i></a>
                                </div> 
                            </td>
                        </tr>      
                            `
                        });
                    }
                    $('#items').html(resultado);
                },
                error : function(error){
                    console.log(error);
                }
            });
        }else{
            mostrarTrabajadores();
        }
    });

});