$(document).ready(function(){

    let action = "mostrar";
        $.ajax({
            url: 'modelo/class.area.php',
            type: 'POST',
            data: {
                action: action,
            },
            success: function (respuesta) {
                var resultado = "";
                var areas = JSON.parse(respuesta);
                if (areas.status == false) {
                    resultado = areas.msg;
                } else {
                    areas.data.forEach(area => {
                        if(area.Nombre != "Bodega"){
                            resultado += `<option value="${area.Id_area}">${area.Nombre}</option> `;
                        }
                    });
                }
                $('#area').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });

    $(document).on('click','#cerrar',function(){
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
    });

    id = $("body").attr("data_id");
    action = "ficha";
    $.ajax({
        url: 'modelo/class.personal.php',
        type: 'POST',
        data: {
            action: action,
            id: id
        },
        success: function (respuesta) {
            
            var mensaje = JSON.parse(respuesta);
            if (mensaje.status == false) {
                var modal = "";
                modal += `
                <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
            <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="p-6 text-center">
                            <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                            <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${mensaje.msg}</h3>
                            <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
                $("body").append(modal);
            } else {
                mensaje.data.forEach(trabajador =>{
                    $("#nombre").val(trabajador.Nombre);
                    $("#apellido").val(trabajador.Apellido);
                    $("#usuario").val(trabajador.Usuario);
                    $("#tipo").val(trabajador.Tipo);
                    $("#area").val(trabajador.Area);
                    $("#file-preview").attr("src", "media/Personal/"+ trabajador.Imagen + " ");
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    $('#frmEditar').submit(function(e){
        var estado = true;
        if ($('#nombre').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700">Campo nombre Vacio</p>';
            $("#errorNombre").html(resultado);
            estado = false;
        } else {
            let texto = $('#nombre').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú\s]{3,}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700">Nombre ingresado invalido.</p>';
                $("#errorNombre").html(resultado);
                estado = false;
            }
        }
        if ($('#apellido').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700">Campo apellido Vacio</p>';
            $("#errorApellido").html(resultado);
            estado = false;
        } else {
            let texto = $('#apellido').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú\s]{3,}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700">Apellido ingresado invalido.</p>';
                $("#errorApellido").html(resultado);
                estado = false;
            }
        }
        if ($('#usuario').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700">Usuario vacio</p>';
            $("#errorUsuario").html(resultado);
            estado = false;
        } else {
            let texto = $('#usuario').val();
            let validar = /^[a-zA-Z0-9\._-]+@[cdb]+\.[edu]+\.s+v$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700">Usuario ingresado incorrecto.</p>';
                $("#errorUsuario").html(resultado);
                estado = false;
            }
        }

        if (estado == true) {
            $.ajax({
                url: 'modelo/class.personal.php',
                type: 'POST',
                data: new FormData(this),
                contentType: false,
                processData: false,
                async: false,
                success: function (respuesta) {
                    var mensaje = JSON.parse(respuesta);
                    if (mensaje.status == false) {
                        var modal = "";
                        modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${mensaje.msg}</h3>
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
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${mensaje.msg}</h3>
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

});