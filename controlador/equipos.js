$(document).ready(function () {

    var monitores = `<option selected value="non">--- Seleccionar ---</option> `;
    var cpu = `<option selected value="non">--- Seleccionar ---</option> `;
    var ups = `<option selected value="non">--- Seleccionar ---</option> `;
    var areas;
    var teclado;
    var mouse;
    var impresora;

    llenarSelect();
    buscarAreas();

    function llenarSelect() {
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.articulos.php',
            type: 'POST',
            data: {
                action: action,
            },
            success: function (respuesta) {
                var resultado = "";
                var result = JSON.parse(respuesta);
                if (result.status == false) {
                    resultado = result.msg;
                } else {
                    result.data.forEach(articulo => {
                        if(articulo.Tipo == "monitor"){
                        monitores += `
                            <option value="${articulo.Id_articulo}">${articulo.Nombre}</option>   
                        `
                        }
                        if(articulo.Tipo == "ups"){
                           ups += `
                                <option value="${articulo.Id_articulo}">${articulo.Nombre}</option>   
                            `
                        }
                        if(articulo.Tipo == "cpu"){
                            cpu += `
                                 <option value="${articulo.Id_articulo}">${articulo.Nombre}</option>   
                             `
                         }
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    function buscarAreas(){
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.area.php',
            type: 'POST',
            data: {
                action: action,
            },
            success: function (respuesta) {
                var resultado = "";
                var result = JSON.parse(respuesta);
                if (result.status == false) {
                    resultado = result.msg;
                } else {
                    result.data.forEach(area => {
                       if(area.Nombre == "Bodega"){
                        encontrarSub(area.Id_area);
                       }
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    
    function encontrarSub(area){
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.subArea.php',
            type: 'POST',
            data: {
                action: action,
                id: area
            },
            success: function(respuesta){
                var result = JSON.parse(respuesta);
                if (result.status == false) {
                    console.log(result.msg);
                } else {
                    result.data.forEach(area => {
                       if(area.Nombre == "Bodega"){
                        areas = area.Id_sub;
                       }
                    });
                }
            }
        });
    }

    $(document).on('click', '.agregar', function () {
        var resultado = "";
        resultado += `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="agg" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Información del</span> <span style="color: #4d227c;"> trabajador</span></h1>
                                    </div>

                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="fmrAgregar">
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre: <span style="color: red">*</span></label>
                                                <input type="text" style="font-size: 20px" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="monitor" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monitor: <span style="color: red">*</span></label>
                                                <select style="font-size: 20px" id="monitor" name="monitor" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                                </select>
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="cpu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">CPU: <span style="color: red">*</span></label>
                                                <select style="font-size: 20px" id="cpu" name="cpu" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                                </select>
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="ups" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">UPS: <span style="color: red">*</span></label>
                                                <select style="font-size: 20px" id="ups" name="ups" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                                </select>    
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="teclado" class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teclado:</label>
                                                <input style="font-size: 20px" type="checkbox" id="teclado" name="teclado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <label style="font-size: 20px" for="mouse" class=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mouse:</label>
                                                <input style="font-size: 20px" type="checkbox" id="mouse" name="mouse" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <label style="font-size: 20px" for="impresora" class=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Impresora:</label>
                                                <input style="font-size: 20px" type="checkbox" id="impresora" name="impresora" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            </div>
                                            <button style="font-size: 20px" type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Guardar</button>
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>    
                `;
        $('body').append(resultado);
        $('#monitor').html(monitores);
        $('#cpu').html(cpu);
        $('#ups').html(ups);
    });

    $(document).on('submit', '#fmrAgregar', function (e) {
        e.preventDefault();
        var estado = true;
        if ($('#nombre').val() == "") {
            console.log("no hay nombre");
            estado = false;
        } else {
            let texto = $('#nombre').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚú\s0-9]{3,}$/;
            if (!validar.test(texto)) {
                console.log("nombre incorrecto");
                estado = false;
            }
        }
        if ($('#monitor').val() == "non") {
            console.log("monitor seleccionado no valido");
            estado = false;
        }
        if ($('#cpu').val() == "non") {
            console.log("cpu seleccionado no valido");
            estado = false;
        }
        if ($('#ups').val() == "non") {
            console.log("ups seleccionado no valido");
            estado = false;
        }
        if($('#teclado').prop("checked")){
            teclado = 1;
        }
        else{
            teclado = 0;
        }
        if($('#mouse').prop("checked")){
            mouse = 1;
        }
        else{
            mouse = 0;
        }
        if($('#impresora').prop("checked")){
            impresora = 1;
        }
        else{
            impresora = 0;
        }
        
        if (estado == true) {
            $("#agg").remove();
            let monitor = $(this).find("#monitor").val();
            let cpu = $(this).find("#cpu").val();
            let ups = $(this).find("#ups").val();
            let nombre = $(this).find("#nombre").val();
            let action = "agregar";
            $.ajax({
                url: 'modelo/class.equipos.php',
                type: 'POST',
                data: {
                    action: action,
                    monitor: monitor,
                    cpu: cpu,
                    ups: ups,
                    area: areas,
                    teclado: teclado,
                    mouse: mouse,
                    impresora: impresora,
                    nombre: nombre
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El equipo ha sido ingresado con éxito!</h3>
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

    $(document).on('click', '#cerrar', function () {
        $("#question").remove();
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#edit").remove();
        $("#agg").remove();
        mostrarEquipos();
    });

    if ($("#items").length) {
        mostrarEquipos();
    }

    function mostrarEquipos() {
        var teclado;
        var mouse;
        var impresora;
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.equipos.php',
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
                        if(area.Teclado == 1){
                            teclado = "Tiene";
                        }
                        else{
                            teclado = "No tiene";
                        }
                        if(area.Mouse == 1){
                            mouse = "Tiene";
                        }
                        else{
                            mouse = "No tiene";
                        }
                        if(area.Extras == 1){
                            impresora = "Tiene";
                        }
                        else{
                            impresora = "No tiene";
                        }
                        resultado += `
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${area.Nombre}
                            </th>
                            <td class="py-4 px-6">
                                ${area.Monitor}
                            </td>
                            <td class="py-4 px-6">
                                ${area.CPU} 
                            </td>
                            <td class="py-4 px-6">
                                ${area.UPS} 
                            </td>
                            <td class="py-4 px-6">
                                ${teclado} 
                            </td>
                            <td class="py-4 px-6">
                                ${mouse} 
                            </td>
                            <td class="py-4 px-6">
                                <a  data_id="${area.Id_equipo}" style="font-size: 20px" class="editar font-medium text-green-600 underline dark:text-green-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-edit'></i></a>
                                <a  data_id="${area.Id_equipo}" style="font-size: 20px;  margin-left: 10px" class="eliminar font-medium text-red-600 underline dark:text-red-500 hover:no-underline cursor-pointer" type="button" data-modal-toggle="question"><i class='bx bx-trash'></i></a>
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
    }


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
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de eliminar el equipo: `+id+`?</h3>
                    <button id="borrar" data-id="`+id+`" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
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
        let id = $(this).attr("data-id");
        $.ajax({
            url: 'modelo/class.equipos.php',
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El equipo ha sido eliminado con éxito!</h3>
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
        mostrarEquipos();
    });

    $(document).on('click','.editar',function(){
        let id = $(this).attr("data_id");
        llenarSelect1(id);
        let action = "ficha";
        $.ajax({
            url: 'modelo/class.equipos.php',
            type: 'POST',
            data: {
                action: action,
                id : id
            },
            success: function(respuesta){
                var resultado = "";
                var areas = JSON.parse(respuesta);
                if(areas.status == false){
                    resultado += `
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
                }else{
                    areas.data.forEach(equipo => {
                        resultado += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="agg" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Información del</span> <span style="color: #4d227c;"> trabajador</span></h1>
                                    </div>

                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="editar">
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre: <span style="color: red">*</span></label>
                                                <input value="${equipo.Nombre}" type="text" style="font-size: 20px" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="monitor" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monitor: <span style="color: red">*</span></label>
                                                <select style="font-size: 20px" id="monitor" name="monitor" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                                </select>
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="cpu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">CPU: <span style="color: red">*</span></label>
                                                <select style="font-size: 20px" id="cpu" name="cpu" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                                </select>
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="ups" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">UPS: <span style="color: red">*</span></label>
                                                <select style="font-size: 20px" id="ups" name="ups" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
                                                </select>    
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="teclado" class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teclado:</label>
                                                <input style="font-size: 20px" type="checkbox" id="teclado" name="teclado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <label style="font-size: 20px" for="mouse" class=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mouse:</label>
                                                <input style="font-size: 20px" type="checkbox" id="mouse" name="mouse" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <label style="font-size: 20px" for="impresora" class=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Impresora:</label>
                                                <input style="font-size: 20px" type="checkbox" id="impresora" name="impresora" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            </div>
                                            <button style="font-size: 20px" type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Guardar</button>
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>    
                        `
                    });
                }
                $('body').append(resultado);
                $('#monitor').html(monitores);
                $('#cpu').html(cpu);
                $('#ups').html(ups);
                
            },
            error : function(error){
                console.log(error);
            }
        });
    });

    function llenarSelect1(id) {
        let action = "llenarSelect1";
        $.ajax({
            url: 'modelo/class.articulos.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                monitores = "";
                ups = "";
                cpu = "";
                var result = JSON.parse(respuesta);
                if (result.status == false) {
                    resultado = result.msg;
                } else {
                    console.log(result.data);
                    result.data.forEach(articulo => {
                        if(articulo.Tipo == "monitor"){
                        monitores += `
                            <option value="${articulo.Id_articulo}">${articulo.Nombre}</option>   
                        `
                        }
                        if(articulo.Tipo == "ups"){
                           ups += `
                                <option value="${articulo.Id_articulo}">${articulo.Nombre}</option>   
                            `
                        }
                        if(articulo.Tipo == "cpu"){
                            cpu += `
                                 <option value="${articulo.Id_articulo}">${articulo.Nombre}</option>   
                             `
                         }
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

});