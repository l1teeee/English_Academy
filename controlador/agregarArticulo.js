$(document).ready(function(){
    var estado = true;
    var img = "";

    if ($("#slcUbicacion").length){
        llenarSelect();
    }

    function llenarSelect() {
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
                    resultado += `<option selected>--- Seleccionar ---</option> `;
                    areas.data.forEach(area => {
                        resultado += `
                            <option value="${area.Nombre}">${area.Nombre}</option>   
                        `
                    });
                }
                $('#slcUbicacion').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    $('#fmrAgregar').submit(function(e){
        e.preventDefault();
        estado = true;   
        if($('#txtNombre').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo nombre Vacio</p>';
            $('#errorNombre').html(resultado);
            $('#txtNombre').addClass("txtVacio");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#txtNombre').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú0-9\s]{3,15}$/;
            if(!validar.test(texto)){
                resultado += '<p id="mensaje">Nombre ingresado incorrecto</p>';
                $('#errorNombre').html(resultado);
                $('#txtNombre').addClass("txtVacio");
                estado = false;
            }   
        }
        if($('#txtMarca').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo marca Vacio</p>';
            $('#errorMarca').html(resultado);
            $('#txtMarca').addClass("txtVacio");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#txtMarca').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú0-9\s]{3,15}$/;
            if(!validar.test(texto)){
                resultado += '<p id="mensaje">Marca ingresado incorrecto</p>';
                $('#errorMarca').html(resultado);
                $('#txtMarca').addClass("txtVacio");
                estado = false;
            }
        }
        if($('#txtModelo').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo modelo Vacio</p>';
            $('#errorModelo').html(resultado);
            $('#txtModelo').addClass("txtVacio");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#txtModelo').val();
            let validar = /^[a-zA-z0-9-_\s]{3,25}$/;
            if(!validar.test(texto)){
                resultado += '<p id="mensaje">Modelo ingresado incorrecto</p>';
                $('#txtModelo').addClass("txtVacio");
                $('#errorModelo').html(resultado);
                estado = false;
            }
        }
        if($('#slcTipoA').val() == "--- Seleccionar ---"){
            var resultado = "";
            resultado += '<p id="mensaje">Articulo marcado de forma incorrecta</p>';
            $('#errorTipoA').html(resultado);
            $('#slcTipoA').addClass("txtVacio");
            estado = false;
        }
        if($('#slcTipoA').val() == "F"){
            if($('#slcTipo').val() == "--- Seleccionar ---"){
                var resultado = "";
                resultado += '<p id="mensaje">Tipo de articulo seleccionado invalido</p>';
                $('#errorTipo').html(resultado);
                $('#slcTipo').addClass("txtVacio");
                estado = false;
            }
        }
        if($('#slcUbicacion').val() == "--- Seleccionar ---"){
            var resultado = "";
            resultado += '<p id="mensaje">Ubicacion seleccionada invalida</p>';
            $('#errorUbicacion').html(resultado);
            $('#slcUbicacion').addClass("txtVacio");
            estado = false;
        }
        if($('#txtSerie').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo serie Vacio</p>';
            $('#errorSerie').html(resultado);
            $('#txtSerie').addClass("txtVacio");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#txtSerie').val();
            let validar = /^[a-zA-z0-9-_]{3,25}$/;
            if(!validar.test(texto)){
                resultado += '<p id="mensaje">Serie ingresada incorrecta</p>';
                $('#txtSerie').addClass("txtVacio");
                $('#errorserie').html(resultado);
                estado = false;
            }
        }
        if($('#txtCodigo').val() == ""){
            var resultado = "";
            resultado += '<p id="mensaje">Campo codigo Vacio</p>';
            $('#errorCodigo').html(resultado);
            $('#txtCodigo').addClass("txtVacio");
            estado = false;
        }else{
            var resultado = "";
            let texto = $('#txtCodigo').val();
            let validar = /^[a-zA-z0-9]{3,25}$/;
            if(!validar.test(texto)){
                resultado += '<p id="mensaje">Codigo ingresado incorrecto</p>';
                $('#txtCodigo').addClass("txtVacio");
                $('#errorCodigo').html(resultado);
                estado = false;
            }
        }
        if(estado == true){
            let nombre = $("#txtNombre").val();
            var marca = $("#txtMarca").val();
            var modelo = $("#txtModelo").val();
            var serie = $("#txtSerie").val();
            var codigo = $("#txtCodigo").val();
            var ubicacion = $("#slcUbicacion").val();
            var tipo ;
            var tipoA = $("#slcTipoA").val();
            var cantidad;
                if(tipoA == 'F'){
                    tipo = $("#slcTipo").val();
                    cantidad = 1;
                }
                else{
                    tipo = "contable"
                    cantidad = $("#cantidad").val();
                }
            let action = "agregar";
            var informacion = new FormData();
            var pic = $('#imagen')[0].files[0];
            informacion.append("action",action);
            informacion.append("nombre",nombre);
            informacion.append("marca",marca);
            informacion.append("modelo",modelo);
            informacion.append("serie",serie);
            informacion.append("codigo",codigo);
            informacion.append("ubicacion",ubicacion);
            informacion.append("tipo",tipo);
            informacion.append("tipoA",tipoA);
            informacion.append("cantidad",cantidad);
            informacion.append("imagen",pic);
            $.ajax({
                url : 'Modelo/class.articulos.php',
                type : 'POST',
                data : informacion,
                contentType: false,
                processData: false,
                async: false,
                success: function(respuesta){
                    var mensaje = JSON.parse(respuesta);
                    if(mensaje.status == false){
                        console.log(mensaje.msg);
                        console.log(mensaje.prueba);
                        console.log(nombre);
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El articulo ha sido agregado con éxito!</h3>
                                    <button id="cerrar2" style="font-size: 20px" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
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
        
    });

    $(document).on('click','#cerrar',function(){
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
    });

    $(document).on('click','#cerrar2',function(){
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        document.location.assign("articulos.php");
    });
});