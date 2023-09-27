$(document).ready(function () {

    $(".cambiarContra").click(function(e){
        let id = $(this).attr("data_id");
        let tipo = $(this).attr("data_tipo");
        if(tipo == "personal"){
            var modal = "";
            modal += `
                <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                            <div id="contrasena" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                                <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                            <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Cambiar contraseña: </span> <span style="color: #4d227c;">Personal</span></h1>
                                        </div>
                                        <!--Fomrulario-->
                                        <div class="p-6 space-y-6">
                                            <form id="fmrContra" data_id="${id}" data_tipo="${tipo}">
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="contraVieja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña Antigua: <span style="color: red">*</span></label>
                                                    <input style="font-size: 20px" type="password" id="contraVieja" name="contraVieja" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
        }else{
            var modal = "";
        modal += `
            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="contrasena" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Cambiar contraseña:</span> <span style="color: #4d227c;"> Trabajador</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="fmrContra" data_id="${id}" data_tipo="${tipo}">
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="contraVieja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña Antigua: <span style="color: red">*</span></label>
                                                <input style="font-size: 20px" type="password" id="contraVieja" name="contraVieja" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
        }
    });

    $(document).on('submit', '#fmrContra', function (e) {
        let id = $(this).attr("data_id");
        let tipo = $(this).attr("data_tipo");
        if(tipo == "personal"){
            let action = "cambiarContra";
            var contraVieja = $("#contraVieja").val();;
            $("#contrasena").remove();
            $.ajax({
                url: 'modelo/class.personal.php',
                type: 'POST',
                data: {
                    action: action,
                    contraVieja: contraVieja,
                    id: id
                },
                success: function (respuesta) {
                    var mensaje = JSON.parse(respuesta);
                    if (mensaje.status == false) {
                        var modal = "";
                        modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
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
                        
                    } else {
                        var modal = "";
                        modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="contrasena" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Cambio de</span> <span style="color: #4d227c;"> contraseña</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="fmrCambio" data_id="${id}" data_tipo = "${tipo}">
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
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }else{
            let action = "cambiarContra";
            var contraVieja = $("#contraVieja").val();;
            $("#contrasena").remove();
            $.ajax({
                url: 'modelo/class.trabajadores.php',
                type: 'POST',
                data: {
                    action: action,
                    contraVieja: contraVieja,
                    id: id
                },
                success: function (respuesta) {
                    var mensaje = JSON.parse(respuesta);
                    if (mensaje.status == false) {
                        console.log(mensaje.msg);
                        var modal = "";
                        modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
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
                        
                    } else {
                        var modal = "";
                        modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="contrasena" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Cambio de</span> <span style="color: #4d227c;"> contraseña</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="fmrCambio" data_id="${id}" data_tipo = "${tipo}">
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
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        e.preventDefault();
    });

    $(document).on('submit', '#fmrCambio', function (e) {
        let id = $(this).attr("data_id");
        let tipo = $(this).attr("data_tipo");
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
            if(tipo == "personal"){
                $.ajax({
                    url: 'modelo/class.personal.php',
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
                        } else {
                            var modal = "";
                            modal += `
                        <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="p-6 text-center">
                                        <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                        <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Contraseña modificada con éxito!</h3>
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
            }else{
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
                        } else {
                            var modal = "";
                            modal += `
                        <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="p-6 text-center">
                                        <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                        <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Contraseña modificada con éxito!</h3>
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
        }
        e.preventDefault();
    });

    $(document).on('click', '#cerrar', function () {
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#contrasena").remove();
    });

});