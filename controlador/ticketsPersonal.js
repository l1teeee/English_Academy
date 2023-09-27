$(document).ready(function () {

    //FUNCION MOSTRAR TICKETS QUE ESTAN EN ESPERA

    function ticketsEspera(id){
        let action = "mostrarEspera";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
                    resultado = tickets.msg;
                } else {
                    tickets.data.forEach(ticket => {
                        resultado += `
                        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 " style="margin-bottom: 3vw;">
                            <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} </h5>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Prioridad: </b> <br>${ticket.Prioridad}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Estado:</b> <br>En Espera</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="detalles text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class='bx bxs-receipt' style='color:#ffffff'></i></a>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="editar text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"><i class='bx bx-edit' style='color:#ffffff'></i></a>
                        </div>
                    </div>    
                        `
                    });
                }
                $('#espera').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    if ($("#espera").length) {
        let id = $("body").attr("data_personal");
        ticketsEspera(id);
    }

    //FUNCION MOSTRAR TICKETS QUE ESTAN CANCELADOS

    function ticketsCancelados(id){
        let action = "mostrarCancelados";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
                    resultado = tickets.msg;
                } else {
                    tickets.data.forEach(ticket => {
                        resultado += `
                        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 " style="margin-bottom: 3vw;">
                            <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} </h5>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Descripcion: </b> <br> ${ticket.Descripcion}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Estado:</b> <br>Cancelado</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="restaurar focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"><i class='bx bx-reset'></i></a>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="eliminar focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class='bx bx-trash'></i></a>
                            </div>
                        </div>    
                        `
                    });
                }
                $('#cancelados').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    if ($("#cancelados").length) {
        let id = $("body").attr("data_personal");
        ticketsCancelados(id);
    }


    //FUNCION MOSTRAR TICKETS QUE ESTAN EN ESPERA

    function ticketsAceptados(id){
        let action = "mostrarAceptados2";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
                    resultado = tickets.msg;
                } else {
                    tickets.data.forEach(ticket => {
                        resultado += `
                        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 " style="margin-bottom: 3vw;">
                            <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} </h5>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Responable: </b> <br>${ticket.Trabajador}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Estado:</b> <br>Aceptado</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="detalles2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class='bx bxs-receipt' style='color:#ffffff'></i></a>
                                `;
                                
                                if(ticket.Porcentaje == 100){
                                    resultado += `<a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="confirmarSol text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"><i class='bx bx-check' style='color:#ffffff'></i></a>`;
                                }

                                resultado+=`
                        </div>
                    </div>    
                        `
                    });
                }
                $('#aceptados').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    if ($("#aceptados").length) {
        let id = $("body").attr("data_personal");
        ticketsAceptados(id);
    }
    

    //GENERACION DE FORMULARIO PARA AGREGAR NUEVO TICKET

    $(document).on('click', '.agregar', function () {
        let id = $(this).attr("data_id");
        var resultado = "";
        resultado += `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="agg" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Nuevo</span> <span style="color: #4d227c;"> ticket</span></h1>
                                    </div>

                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="fmrAgregar" data_id="${id}">
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo del Ticket: <span style="color: red">*</span></label>
                                                    <input style="font-size: 20px" type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <div id="errorNombre"></div>
                                                </div>
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripcion del problema: <span style="color: red">*</span></label>
                                                    <textarea style="font-size: 20px" type="text" id="descripcion" name="descripcion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                                    <div id="errorDescripcion"></div>
                                                </div>
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="prioridad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prioridad: <span style="color: red">*</span></label>
                                                    <select  style="font-size: 20px" id="prioridad" name="prioridad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                                        <option value="Urgente">-- Seleccionar --</option>    
                                                        <option value="Urgente">Urgente</option>
                                                        <option value="Alta">Alta</option>
                                                        <option value="Media">Media</option>
                                                        <option value="Baja">Baja</option>         
                                                    </select>
                                                    <div id="errorPrioridad"></div>
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
    });

    //RECOLECCION DE DATOS DEL FORMULARIO E INGRESO A LA DB

    $(document).on('submit', '#fmrAgregar', function (e) {
        let id = $(this).attr("data_id");
        var estado = true;
        if ($('#nombre').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700"> Campo nombre Vacio </p>';
            $("#errorNombre").html(resultado);
            estado = false;
        } else {
            let texto = $('#nombre').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚúÑñ0-9@.;,-_%()?¿!¡:""°\s]{3,30}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700"> Titulo de ticket no valido </p>';
                $("#errorNombre").html(resultado);
                estado = false;
            }
        }
        if ($('#descripcion').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700" > Campo descripcion Vacio </p>';
            $("#errorDescripcion").html(resultado);
            estado = false;
        } else {
            let texto = $('#descripcion').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚúÑñ0-9@.;,-_%()?¿!¡:""°\s]{3,}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700" > Descripcion no valida </p>';
                $("#errorDescripcion").html(resultado);
                estado = false;
            }
        }
        if ($("#prioridad").val() != "Urgente" && $("#prioridad").val() != "Alta" && $("#prioridad").val() != "Media" && $("#prioridad").val() != "Baja"){
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700" >Prioridad seleccionada invalida</p>';
            $('#errorPrioridad').html(resultado);
            estado = false;
        }
        if (estado == true) {
            $("#agg").remove();
            let descripcion = $(this).find("#descripcion").val();
            let nombre = $(this).find("#nombre").val();
            let prioridad = $(this).find("#prioridad").val();
            let action = "agregar";
            $.ajax({
                url: 'modelo/class.tickets.php',
                type: 'POST',
                data: {
                    action: action,
                    descripcion: descripcion,
                    nombre: nombre,
                    prioridad: prioridad,
                    id: id
                },
                success: function (respuesta) {
                    var mensaje = JSON.parse(respuesta);
                    if (mensaje.status == false) {
                        console.log(mensaje.msg);
                        var modal = "";
                        modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket creado con éxito!</h3>
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
            let idPer = $("body").attr("data_personal");
            ticketsEspera(idPer);
            ticketsCancelados(idPer);
            ticketsAceptados(idPer);
        }
        e.preventDefault();
    });

    //INFORMACION DEL TICKET

    $(document).on('click', '.detalles2', function () {
        let id = $(this).attr("data_id");
        let action = "ficha";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
                    resultado += `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                } else {
                    tickets.data.forEach(ticket => {
                        resultado += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="detalles" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Información del</span> <span style="color: #4d227c;"> ticket: ${ticket.Id_ticket}</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <div class ="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo del ticket:</label>
                                            <p style="font-size: 20px" > ${ticket.Titulo}</p>
                                        </div>
                                        <div class ="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Comentario:</label>
                                            `; 
                                            
                                            if(ticket.Comentario == null){
                                                resultado += `<p style="font-size: 20px" > No existe comentario alguno</p>`;
                                            }else{
                                                resultado += `<p style="font-size: 20px" > ${ticket.Comentario}</p>`;
                                            }

                                            resultado+=`
                                        </div>
                                        <div class ="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prioridad:</label>
                                            <p style="font-size: 20px" > ${ticket.Prioridad}</p>
                                        </div>
                                        <div class="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Progreso actual:</label>
                                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 20px">${ticket.Porcentaje}%</div></div>
                                        </div>
                                        <div class="mb-6">
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cerrar</a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        `;
                    }); 
                }
                $('body').append(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //CREACION DEL MODAL DETALLES DEL TICKET

    $(document).on('click', '.detalles', function () {
        let id = $(this).attr("data_id");
        let action = "ficha";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
                    resultado += `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                } else {
                    tickets.data.forEach(ticket => {
                        resultado += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="detalles" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Información del</span> <span style="color: #4d227c;"> ticket: ${ticket.Id_ticket}</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <div class ="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo del ticket:</label>
                                            <p style="font-size: 20px" > ${ticket.Titulo}</p>
                                        </div>
                                        <div class ="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripción:</label>
                                            <p style="font-size: 20px" > ${ticket.Descripcion}</p>
                                        </div>
                                        <div class ="mb-6">
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prioridad:</label>
                                            <p style="font-size: 20px" > ${ticket.Prioridad}</p>
                                        </div>
                                        <div class="mb-6">
                                            <button data_id="${ticket.Id_ticket}" style="font-size: 20px" type="button" class="cancelar focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Cancelar ticket <i class='bx bx-minus-circle' style='color:#ffffff'></i></button>
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        `;
                    }); 
                }
                $('body').append(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //VENTANA DE CONFIRMACION DE CANCELACION DE TICKET

    $(document).on('click', '.cancelar', function () {
        $("#detalles").remove();
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de cancelar el ticket con id: `+ id + `?</h3>
                    <button id="cancelar" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    //PROCESO DE CANCELACION DE TICKET

    $(document).on('click', '#cancelar', function () {
        $("#question").remove();
        let action = "cancelar";
        let id = $(this).attr("data-id");
        $.ajax({
            url: 'modelo/class.tickets.php',
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
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket cancelado con éxito!</h3>
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
        let idPer = $("body").attr("data_personal");
        ticketsEspera(idPer);
        ticketsCancelados(idPer);
        ticketsAceptados(idPer);
    });

    //MODAL CONFIRMACION DE LA ELIMINACION DEL TICKET

    $(document).on('click', '.eliminar', function () {
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div z-50 id='fondoM' modal-backdrop='' class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de eliminar el ticket con id: `+ id + `?</h3>
                    <button id="borrar" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    //ELIMINACION DEL TICKET DEL SISTEMA

    $(document).on('click', '#borrar', function () {
        $("#question").remove();
        let action = "eliminar";
        let id = $(this).attr("data-id");
        $.ajax({
            url: 'modelo/class.tickets.php',
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket eliminado con éxito!</h3>
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
        let idPer = $("body").attr("data_personal");
        ticketsCancelados(idPer);
        ticketsEspera(idPer);
        ticketsAceptados(idPer);
    });


    //PREGUNTAR SI RESTAURAR EL TICKET

    $(document).on('click', '.restaurar', function () {
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de restaurar el ticket con id: `+ id + `?</h3>
                    <button id="restaurar" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    //RESTAURAR A EN ESPERERA EL TICKET

    $(document).on('click', '#restaurar', function () {
        $("#question").remove();
        let action = "restaurar";
        let id = $(this).attr("data-id");
        $.ajax({
            url: 'modelo/class.tickets.php',
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
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket restaurado con éxito!</h3>
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
        let idPer = $("body").attr("data_personal");
        ticketsCancelados(idPer);
        ticketsEspera(idPer);
        ticketsAceptados(idPer);
    });

    //FORMULARIO PARA EDITAR EL TICKET EN ESPERA

    $(document).on('click', '.editar', function () {
        let id = $(this).attr("data_id");
        let action = "ficha";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var resultado = "";
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
                    resultado += `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                } else {
                    tickets.data.forEach(ticket => {
                        resultado += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="edit" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Información del</span> <span style="color: #4d227c;"> ticket: ${ticket.Id_ticket}</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="editar" data_id="${ticket.Id_ticket}">
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo del Ticket: <span style="color: red">*</span></label>
                                                    <input value="${ticket.Titulo}" style="font-size: 20px" type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <div id="errorNombre"> </div>
                                                </div>
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripcion del problema: <span style="color: red">*</span></label>
                                                    <textarea style="font-size: 20px" type="text" id="descripcion" name="descripcion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">${ticket.Descripcion}</textarea>
                                                    <div id="errorDescripcion"> </div>
                                                </div>
                                                <div class="mb-6">
                                                    <label style="font-size: 20px" for="prioridad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prioridad: <span style="color: red">*</span></label>
                                                    <select  style="font-size: 20px" id="prioridad" name="prioridad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                                        `;
                                                        if(ticket.Prioridad == "Urgente"){
                                                            resultado += `
                                                                <option selected value="Urgente">Urgente</option>
                                                                <option value="Alta">Alta</option>
                                                                <option value="Media">Media</option>
                                                                <option value="Baja">Baja</option> 
                                                            `;
                                                        }else if(ticket.Prioridad == "Alta"){
                                                            resultado += `
                                                                <option value="Urgente">Urgente</option>
                                                                <option selected value="Alta">Alta</option>
                                                                <option value="Media">Media</option>
                                                                <option value="Baja">Baja</option> 
                                                            `;
                                                        }else if(ticket.Prioridad == "Media"){
                                                            resultado += `
                                                                <option value="Urgente">Urgente</option>
                                                                <option value="Alta">Alta</option>
                                                                <option selected value="Media">Media</option>
                                                                <option value="Baja">Baja</option> 
                                                            `;
                                                        }else if(ticket.Prioridad == "Baja"){
                                                            resultado += `
                                                                <option value="Urgente">Urgente</option>
                                                                <option value="Alta">Alta</option>
                                                                <option value="Media">Media</option>
                                                                <option selected value="Baja">Baja</option> 
                                                            `;
                                                        }
                                                    resultado +=`        
                                                    </select>
                                                    <div id="errorPrioridad"> </div>
                                                </div>
                                            <button style="font-size: 20px" type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Guardar</button>
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        `;
                    }); 
                }
                $('body').append(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //EDITAR TICKETS

    $(document).on('submit', '#editar', function (e) {
        let id = $(this).attr("data_id");
        var estado = true;
        if ($('#nombre').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700">Campo nombre Vacio</p>';
            $("#errorNombre").html(resultado);
            estado = false;
        } else {
            let texto = $('#nombre').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚúÑñ0-9@.;,-_%()?¿!¡:""°\s]{3,30}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700">Titulo del ticket invalido</p>';
                $("#errorNombre").html(resultado);
                estado = false;
            }
        }
        if ($('#descripcion').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700">Descipcion vacia</p>';
            $("#errorDescripcion").html(resultado);
            estado = false;
        } else {
            let texto = $('#descripcion').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚúÑñ0-9@.;,-_%()?¿!¡:""°\s]{3,}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700">Descripcion no valida</p>';
                $("#errorDescripcion").html(resultado);
                estado = false;
            }
        }
        if ($("#prioridad").val() != "Urgente" && $("#prioridad").val() != "Alta" && $("#prioridad").val() != "Media" && $("#prioridad").val() != "Baja"){
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700" >Prioridad seleccionada invalida</p>';
            $('#errorPrioridad').html(resultado);
            estado = false;
        }
        if (estado == true) {
            $("#edit").remove();
            let descripcion = $(this).find("#descripcion").val();
            let nombre = $(this).find("#nombre").val();
            let prioridad = $(this).find("#prioridad").val();
            let action = "editar";
            $.ajax({
                url: 'modelo/class.tickets.php',
                type: 'POST',
                data: {
                    action: action,
                    descripcion: descripcion,
                    nombre: nombre,
                    prioridad: prioridad,
                    id: id
                },
                success: function (respuesta) {
                    var mensaje = JSON.parse(respuesta);
                    if (mensaje.status == false) {
                        console.log(mensaje.msg);
                        var modal = "";
                        modal += `
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket editado con éxito!</h3>
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
            let idPer = $("body").attr("data_personal");
            ticketsEspera(idPer);
            ticketsCancelados(idPer);
            ticketsAceptados(idPer);
        }
        e.preventDefault();
    });

    //VENTANA DE CONFIRMACION DE SOLUCION DEL TICKET

    $(document).on('click', '.confirmarSol', function () {
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Confirma la solucion proporcionada en el ticket con id: `+ id + `?</h3>
                    <button id="confirmarSol" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    //PROCESO DE CONFIRMACION DE LA SOLUCION DEL TICKET

    $(document).on('click', '#confirmarSol', function () {
        $("#question").remove();
        let action = "solucion";
        let id = $(this).attr("data-id");
        let idPer = $("body").attr("data_personal");
        $.ajax({
            url: 'modelo/class.tickets.php',
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
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
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
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket confirmado con éxito!</h3>
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
        ticketsEspera(idPer);
        ticketsAceptados(idPer);
        ticketsCancelados(idPer);
    });


        //BUSCAR POR ID EN ESPERA

        $('#frmBuscarEspera').submit(function(e){
            let idPer = $("body").attr("data_personal");
            if($('#txtBuscarEspera').val() == ""){
                var modal = "";
                modal += `
                <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                            <div class="p-6 text-center">
                                <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">No ha ingresado ningun Id</h3>
                                <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $("body").append(modal);
            }else{
                let action = "buscarIdEspera";
                let id = $("#txtBuscarEspera").val();
                $.ajax({
                    url: 'modelo/class.tickets.php',
                    type: 'POST',
                    data: {
                        action: action,
                        id : id,
                        idPer: idPer
                    },
                    success: function(respuesta){
                        var resultado = "";
                        var tickets = JSON.parse(respuesta);
                        if(tickets.status == false){
                            var modal = "";
                            modal += `
                            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="p-6 text-center">
                                        <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                        <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${tickets.msg}</h3>
                                        <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        $("body").append(modal);
                        }else{
                            tickets.data.forEach(ticket => {
                                resultado += `
                            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 " style="margin-bottom: 3vw;">
                                <div class="p-5">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} </h5>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Prioridad: </b> <br>${ticket.Prioridad}</p>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Nombre del Personal:</b> <br>${ticket.Personal}</p>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                                <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                    <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="detalles text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class='bx bxs-receipt' style='color:#ffffff'></i></a>
                            </div>
                        </div>    
                            `
                            });
                        }
                        $('#espera').html(resultado);
                    },
                    error : function(error){
                        console.log(error);
                    }
                });
            }
                e.preventDefault();
        });

        $('#txtBuscarEspera').keyup(function(e){
            if(!$('#txtBuscarEspera').val()){
                let idPer = $("body").attr("data_personal");
                ticketsEspera(idPer);
            }
        });


        $('#frmBuscarAceptados').submit(function(e){
            let idPer = $("body").attr("data_personal");
            if($('#txtBuscarAceptados').val() == ""){
                var modal = "";
                modal += `
                <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                            <div class="p-6 text-center">
                                <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">No ha ingresado ningun Id</h3>
                                <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $("body").append(modal);
            }else{
                let action = "buscarIdAceptados";
                let id = $("#txtBuscarAceptados").val();
                $.ajax({
                    url: 'modelo/class.tickets.php',
                    type: 'POST',
                    data: {
                        action: action,
                        id: id,
                        idPer: idPer
                    },
                    success: function(respuesta){
                        var resultado = "";
                        var tickets = JSON.parse(respuesta);
                        if(tickets.status == false){
                            var modal = "";
                            modal += `
                            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="p-6 text-center">
                                        <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                        <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${tickets.msg}</h3>
                                        <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        $("body").append(modal);
                        }else{
                            tickets.data.forEach(ticket => {
                                resultado += `
                                <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 " style="margin-bottom: 3vw;">
                                <div class="p-5">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} </h5>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Responable: </b> <br>${ticket.Trabajador}</p>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Estado:</b> <br>Aceptado</p>
                                    <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                                <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                    <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="detalles2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class='bx bxs-receipt' style='color:#ffffff'></i></a>
                                    `;
                                    
                                    if(ticket.Porcentaje == 100){
                                        resultado += `<a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="confirmarSol text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"><i class='bx bx-check' style='color:#ffffff'></i></a>`;
                                    }
    
                                    resultado+=`
                            </div>
                        </div>    
                            `
                            });
                        }
                        $('#aceptados').html(resultado);
                    },
                    error : function(error){
                        console.log(error);
                    }
                });
            }
                e.preventDefault();
        });
    
    
        $('#txtBuscarAceptados').keyup(function(e){
            if(!$('#txtBuscarAceptados').val()){
                let idPer = $("body").attr("data_personal");
                ticketsAceptados(idPer);
            }
        });


        $('#frmBuscarCancelados').submit(function(e){
            let idPer = $("body").attr("data_personal");
            if($('#txtBuscarCancelados').val() == ""){
                var modal = "";
                modal += `
                <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                            <div class="p-6 text-center">
                                <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">No ha ingresado ningun Id</h3>
                                <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $("body").append(modal);
            }else{
                let action = "buscarIdCancelados";
                let id = $("#txtBuscarCancelados").val();
                $.ajax({
                    url: 'modelo/class.tickets.php',
                    type: 'POST',
                    data: {
                        action: action,
                        id: id,
                        idPer: idPer
                    },
                    success: function(respuesta){
                        var resultado = "";
                        var tickets = JSON.parse(respuesta);
                        if(tickets.status == false){
                            var modal = "";
                            modal += `
                            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                        <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="p-6 text-center">
                                        <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                        <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${tickets.msg}</h3>
                                        <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        $("body").append(modal);
                        }else{
                            tickets.data.forEach(ticket => {
                                resultado += `
                                <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 " style="margin-bottom: 3vw;">
                            <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} </h5>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Descripcion: </b> <br> ${ticket.Descripcion}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Estado:</b> <br>Cancelado</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="restaurar focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"><i class='bx bx-reset'></i></a>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="eliminar focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class='bx bx-trash'></i></a>
                            </div>
                        </div>    
                        `
                            });
                        }
                        $('#cancelados').html(resultado);
                    },
                    error : function(error){
                        console.log(error);
                    }
                });
            }
                e.preventDefault();
        });
    
    
        $('#txtBuscarCancelados').keyup(function(e){
            if(!$('#txtBuscarCancelados').val()){
                let idPer = $("body").attr("data_personal");
                ticketsCancelados(idPer);
            }
        });
    


    //METODO PARA CERRAR TODOS LOS MODALES

    $(document).on('click', '#cerrar', function () {
        $("#question").remove();
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#edit").remove();
        $("#agg").remove();
        $("#detalles").remove();
        let id = $("body").attr("data_personal");
        ticketsEspera(id);
        ticketsAceptados(id);
        ticketsCancelados(id);
    });

});