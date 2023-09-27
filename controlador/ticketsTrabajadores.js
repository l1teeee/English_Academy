$(document).ready(function () {

    //FUNCION MOSTRAR TICKETS QUE ESTAN EN ESPERA

    function ticketsEspera(){
        let action = "mostrarEspera2";
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
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
            error: function (error) {
                console.log(error);
            }
        });
    };

    if ($("#espera").length) {
        ticketsEspera();
    }



    function ticketsAceptados(id){
        let action = "mostrarAceptados";
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
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Nombre del Personal:</b> <br>${ticket.Personal}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Descripcion:</b> <br>${ticket.Descripcion}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="actualizar text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"><i class='bx bx-refresh' style='color:#ffffff'></i></a>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="editar text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"><i class='bx bxs-edit' style='color:#ffffff'></i></a>
                        </div>
                    </div>    
                        `
                    });
                }
                $('#proceso').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    if ($("#proceso").length) {
        let id = $("body").attr("data_personal");
        ticketsAceptados(id);
    }

    //MOSTRAR TICKETS SOLUCIONADOS

    function ticketsSolucionados(id){
        let action = "mostrarSolucionados";
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
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${ticket.Titulo} (Ticket : ${ticket.Id_ticket}) </h5>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Prioridad: </b> <br>${ticket.Prioridad}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Nombre del Personal:</b> <br>${ticket.Personal}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                        </div>
                    </div>    
                        `
                    });
                }
                $('#solucionado').html(resultado);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    if ($("#solucionado").length) {
        let id = $("body").attr("data_personal");
        ticketsSolucionados(id);
    }

    //DETALLES DEL TICKET

    $(document).on('click', '.detalles', function () {
        let id = $(this).attr("data_id");
        let rol = $("body").attr("data_rol");
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
                                            <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Progreso actual:</label>
                                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 20px">${ticket.Porcentaje}%</div></div>
                                            </div>
                                            <button data_id="${ticket.Id_ticket}" style="font-size: 20px" type="button" class="aceptar focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-green-900">Aceptar ticket <i class='bx bx-check' style='color:#ffffff'></i></button>
                                            `;
                                            if(rol == "Administrador"){
                                                resultado += `
                                                <button data_id="${ticket.Id_ticket}" style="font-size: 20px" type="button" class="asignarP focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Asignar ticket <i class='bx bx-minus-circle' style='color:#ffffff'></i></button>
                                                `;
                                            }
                                            resultado +=`
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

    //VENTANA DE CONFIRMACION DE ACEPTACION DE TICKET

    $(document).on('click', '.asignarP', function () {
        $("#detalles").remove();
        let id = $(this).attr("data_id");
        let action = "mostrar";
        $.ajax({
            url: 'modelo/class.trabajadores.php',
            type: 'POST',
            data: {
                action: action,
            },
            success: function (respuesta) {
                var trabajadores = JSON.parse(respuesta);
                if (trabajadores.status == false) {
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
                        <div id="asignar" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Asignar</span> <span style="color: #4d227c;"> Trabajador</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="asignarP" data_id="${id}">
                                            <div class ="mb-6">
                                                <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre del trabajador:</label>
                                                <select  style="font-size: 20px" id="trabajador" name="trabajador" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                                 `; 
                                                 trabajadores.data.forEach(trabajador => {
                                                    modal += `<option value="${trabajador.Id_trabajador}">${trabajador.Nombre} ${trabajador.Apellido}</option>`;
                                                 });                                                
                                                 modal+=`
                                                </select>
                                            </div>
                                        <div class="mb-6">
                                            <button style="font-size: 20px" type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Asignar</button>
                                            <a id="cerrar" style="font-size: 20px"  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    `;
                    $("body").append(modal);
                }
            }
        });
    });

    $(document).on('submit', '#asignarP', function (e) {
        let idT = $(this).attr("data_id");
        var estado = true;
        if (estado == true) {
            $("#asignar").remove();
            let idP = $(this).find("#trabajador").val();
            let action = "aceptar";
            $.ajax({
                url: 'modelo/class.tickets.php',
                type: 'POST',
                data: {
                    action: action,
                    id: idT,
                    idPer: idP 
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Trabajador asignado con éxito!</h3>
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
            ticketsEspera();
            let idPer = $("body").attr("data_personal");
            ticketsSolucionados(idPer);
            ticketsAceptados(idPer);
        }
        e.preventDefault();
    });

    $(document).on('click', '.aceptar', function () {
        $("#detalles").remove();
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de aceptar el ticket con id: `+ id + `?</h3>
                    <button id="aceptar" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

     //PROCESO DE ACEPTACION DE TICKET

     $(document).on('click', '#aceptar', function () {
        $("#question").remove();
        let action = "aceptar";
        let id = $(this).attr("data-id");
        let idPer = $("body").attr("data_personal");
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id,
                idPer: idPer
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket aceptado con éxito!</h3>
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
        ticketsEspera();
        ticketsSolucionados(idPer);
        ticketsAceptados(idPer);
    });

    //FORMULARIO PARA EDITAR EL TICKET PRIORIDAD EL TICKET

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
                        <div id="edit" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Editar</span> <span style="color: #4d227c;"> prioridad</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="editar" data_id="${ticket.Id_ticket}">
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
        if (estado == true) {
            $("#edit").remove();
            let prioridad = $(this).find("#prioridad").val();
            let action = "editarPrioridad";
            $.ajax({
                url: 'modelo/class.tickets.php',
                type: 'POST',
                data: {
                    action: action,
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Prioridad actualizada con éxito!</h3>
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
            ticketsEspera();
            let idPer = $("body").attr("data_personal");
            ticketsSolucionados(idPer);
            ticketsAceptados(idPer);
        }
        e.preventDefault();
    });


    //FORMULARIO PARA ACTUALIZAR EL TICKET

    $(document).on('click', '.actualizar', function () {
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
                        <div id="edit" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto flex justify-center items-center">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Actualizar</span> <span style="color: #4d227c;"> ticket: ${ticket.Id_ticket}</span></h1>
                                    </div>
                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="actualizar" data_id="${ticket.Id_ticket}">
                                            <div class ="mb-6">
                                                <label style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo del ticket: <span style="color: red">*</span></label>
                                                <p style="font-size: 20px" > ${ticket.Titulo}</p>
                                            </div>
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="comentario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Comentario: <span style="color: red">*</span></label>
                                                <textarea style="font-size: 20px" type="text" id="comentario" name="comentario" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                                                <div id="errorComentario"></div>
                                            </div>
                                            <div class="mb-6">
                                                <label for="default-range" style="font-size: 20px" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Porcentaje del proceso: <span style="color: red">*</span></label>
                                                <input id="default-range" type="range" id="porcentaje" name="porcentaje" min="0" max="100" step="5" value="${ticket.Porcentaje}" onchange="document.getElementById('outvol').value=value" class="w-1/2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                                                <output id="outvol" name="outvol" for="porcentaje">${ticket.Porcentaje}</output>%
                                            </div>
                                            <div id="errorPorcentaje"></div>
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

    $(document).on('submit', '#actualizar', function (e) {
        let id = $(this).attr("data_id");
        var estado = true;
        if ($('#comentaio').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700"> Campo comentario Vacio </p>';
            $("#errorComentario").html(resultado);
            estado = false;
        } else {
            let texto = $('#comentario').val();
            let validar = /^[a-zA-zÁáÉéÍíÓóÚúÑñ0-9@.;,-_%()?¿!¡:""°\s]{3,}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700"> Comentario invalido </p>';
                $("#errorComentario").html(resultado);
                estado = false;
            }
        }
        if ($('#outvol').val() == "") {
            var resultado = "";
            resultado += '<p class="mb-2.5 text-red-700"> Porcentaje vacio </p>';
            $("#errorNombre").html(resultado);
            estado = false;
        } else {
            let texto = $('#outvol').val();
            let validar = /^[0-9]{1,3}$/;
            if (!validar.test(texto)) {
                var resultado = "";
                resultado += '<p class="mb-2.5 text-red-700"> Porcentaje ingresado incorrecto </p>';
                $("#errorPorcentaje").html(resultado);
                estado = false;
            }
        }
        if (estado == true) {
            $("#edit").remove();
            let comentario = $(this).find("#comentario").val();
            let porcentaje = $(this).find("#outvol").val();
            let action = "actualizar";
            $.ajax({
                url: 'modelo/class.tickets.php',
                type: 'POST',
                data: {
                    action: action,
                    comentario: comentario,
                    porcentaje: porcentaje,
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡Ticket actualizado con éxito!</h3>
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
            ticketsEspera();
            let idPer = $("body").attr("data_personal");
            ticketsSolucionados(idPer);
            ticketsAceptados(idPer);
        }
        e.preventDefault();
    });

    //BUSCAR POR ID EN ESPERA

    $('#frmBuscarEspera').submit(function(e){
        if($('#txtBuscarEspera').val() == ""){
            var modal = "";
            modal += `
            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
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
            let idPer = null;
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


    // RESTAURAR VISTA DE TICKETS EN ESPERA

    $('#txtBuscarEspera').keyup(function(e){
        if(!$('#txtBuscarEspera').val()){
            ticketsEspera();
        }
    });

    //BUSCAR TICKET EN PROCESO POR ID

    $('#frmBuscarProceso').submit(function(e){
        let idPer = $("body").attr("data_personal");
        if($('#txtBuscarProceso').val() == ""){
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
            let action = "buscarIdProceso";
            let id = $("#txtBuscarProceso").val();
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
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Prioridad: </b> <br>${ticket.Prioridad}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Nombre del Personal:</b> <br>${ticket.Personal}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Descripcion:</b> <br>${ticket.Descripcion}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="actualizar text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"><i class='bx bx-refresh' style='color:#ffffff'></i></a>
                                <a data_id ="${ticket.Id_ticket}"  style="font-size: 20px" class="editar text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"><i class='bx bxs-edit' style='color:#ffffff'></i></a>
                        </div>
                    </div>    
                        `
                        });
                    }
                    $('#proceso').html(resultado);
                },
                error : function(error){
                    console.log(error);
                }
            });
        }
            e.preventDefault();
    });


    $('#txtBuscarProceso').keyup(function(e){
        if(!$('#txtBuscarProceso').val()){
            let idPer = $("body").attr("data_personal");
            ticketsAceptados(idPer);
        }
    });


    //BUSCAR TICKET EN SOLUCIONADOS POR ID

    $('#frmBuscarSolucionado').submit(function(e){
        let idPer = $("body").attr("data_personal");
        if($('#txtBuscarSolucionado').val() == ""){
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
            let action = "buscarIdSolucionado";
            let id = $("#txtBuscarSolucionado").val();
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
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Prioridad: </b> <br>${ticket.Prioridad}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Nombre del Personal:</b> <br>${ticket.Personal}</p>
                                <p  style="font-size: 20px" class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Progreso actual:</b> <br></p>
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="text-xs font-medium text-center p-0.5 leading-none rounded-full" style="width: ${ticket.Porcentaje}%; background-color: #4d227c; color: white; font-size: 18px">${ticket.Porcentaje}%</div></div><br>
                        </div>
                    </div>    
                        `
                        });
                    }
                    $('#solucionado').html(resultado);
                },
                error : function(error){
                    console.log(error);
                }
            });
        }
            e.preventDefault();
    });


    $('#txtBuscarSolucionado').keyup(function(e){
        if(!$('#txtBuscarSolucionado').val()){
            let idPer = $("body").attr("data_personal");
            ticketsSolucionados(idPer);
        }
    });


    //ENVIAR DOC PDF

    var arregloFinal = ['', 'tickets']; 

    function generarPDF(datos){
        $.redirect('controlador/pdfTickets.php', {data: datos});
    }

    function fichaTrabajador(){
        let id = $('body').attr("data_personal");
        let action = "ficha";
        $.ajax({
            url : 'modelo/class.trabajadores.php',
            type : 'POST',
            data : {
                action: action,
                id: id
            },
            success: function(respuesta){
                var trabajador = JSON.parse(respuesta);
                if (trabajador.status == false) {
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
                } else {
                    arregloFinal[1] = trabajador.data;
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    function limpiarTickets(id, arregloFinal){
        $("#question").remove();
        let action = "borrarSolucionados";
        $.ajax({
            url : 'modelo/class.tickets.php',
            type : 'POST',
            data : {
                action: action,
                id: id
            },
            success: function(respuesta){
                var trabajador = JSON.parse(respuesta);
                if (trabajador.status == false) {
                    var modal = "";
                    modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${trabajador.msg}</h3>
                                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    $("body").append(modal);
                }else{
                    generarPDF(JSON.stringify(arregloFinal));
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    }


    $(".pdf").click(function(){
        let id = $(this).attr("data_id");
        var modal = "";
        modal += `
        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
        <div id="question" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full items-center justify-center" >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                <div class="p-6 text-center">
                    <i class='bx bx-question-mark' style='color:#2a3891; font-size: 50px' ></i>                
                    <h3 style="font-size: 25px"  class="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) generar el PDF?</h3>
                    <p class="mb-5 text-gray-500 dark:text-gray-400">Al generar el PDF se eliminaran todos los tickets en estado "Solucionados".</p>
                    <button id="pdf" data-id="`+ id + `" style="font-size: 20px"  type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    <button id="cerrar" style="font-size: 20px"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                </div>
            </div>
        </div>
        `;
        $("body").append(modal);
    });

    $(document).on('click', '#pdf', function () {
        let id = $(this).attr("data-id");
        let action = "pdf";
        fichaTrabajador();
        $.ajax({
            url: 'modelo/class.tickets.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function (respuesta) {
                var tickets = JSON.parse(respuesta);
                if (tickets.status == false) {
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
                } else {
                    arregloFinal[2] = tickets.data;
                    limpiarTickets(id, arregloFinal);
                    
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
        ticketsEspera();
        let idPer = $("body").attr("data_personal");
        ticketsSolucionados(idPer);
        ticketsAceptados(idPer);
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
        $("#asignar").remove();
        ticketsEspera();
        let idPer = $("body").attr("data_personal");
        ticketsSolucionados(idPer);
        ticketsAceptados(idPer);
    });
    

});