$(document).ready(function(){

    

    if($(".caja").length){
        mostrarSubArea();
    }


    function mostrarSubArea(){
        let action = "mostrar";
        let id = $(".caja").attr("data_id");
        let area = $(".caja").attr("data_nombre");
        $("#areaText").html(area);
        $.ajax({
            url: 'modelo/class.subArea.php',
            type: 'POST',
            data: {
                action: action,
                id: id
            },
            success: function(respuesta){
                var resultado = "";
                var areas = JSON.parse(respuesta);
                if(areas.status == false){
                    console.log("error");
                }else{
                    console.log(areas);
                    let i = 1;
                    areas.data.forEach(area => {
                        if(i > 1){
                            resultado += `
                            <h2 id="accordion-flush-heading-`+i+`">
                                <button type="button" data_estado="escondido" data_num="`+i+`" class="btn flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-`+i+`" aria-expanded="false" aria-controls="accordion-flush-body-`+i+`">
                                    <span>${area.Nombre}</span>
                                    <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </h2>
                            <div id="accordion-flush-body-`+i+`" data_num="`+i+`" class="hidden no" aria-labelledby="accordion-flush-heading-`+i+`">
                                <div class="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                                    <div class="flex overflow-x-auto relative justify-end h-10">   
                                        <a data_id="${area.Id_sub}" style="font-size: 20px" class="editar font-medium text-green-600 underline dark:text-green-500 hover:no-underline"><i class="bx bx-edit"></i></a>
                                        <a data_id="${area.Id_sub}" style="font-size: 20px;  margin-left: 10px" class="eliminar font-medium text-red-600 underline dark:text-red-500 hover:no-underline"><i class="bx bx-trash"></i></a>
                                        <a data_id="${area.Id_sub}" style="font-size: 20px;  margin-left: 10px" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"><i class='bx bx-add-to-queue'></i></a>
                                    </div>
                                    <div class="overflow-x-auto relative">
                                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400" style="font-size: 20px">
                                                <tr>
                                                <th scope="col" class="py-3 px-6 rounded-l-lg">
                                                    Nombre
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    Monitor
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    CPU
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    UPS
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    Teclado
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    Mouse
                                                </th>
                                                <th scope="col" class="py-3 px-6 rounded-r-lg">
                                                    Acciones
                                                </th>
                                                </tr>
                                            </thead>
                                            <tbody class="llenar" data_id="${area.Id_sub}" style="font-size: 20px">
                                                `;
                                                area.Computadoras.forEach(equipo => {
                                                    resultado +=`
                                                    <tr class="bg-white dark:bg-gray-800">
                                                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${equipo.Nombre}</th>
                                                        <td class="py-4 px-6">${equipo.Monitor}</td>
                                                        <td class="py-4 px-6">${equipo.CPU}</td>
                                                        <td class="py-4 px-6">${equipo.UPS}</td>
                                                        <td class="py-4 px-6">${equipo.Teclado}</td>
                                                        <td class="py-4 px-6">${equipo.Mouse}</td>
                                                        <td class="py-4 px-6">
                                                            <a  href="#" style="font-size: 20px" class="font-medium text-green-600 underline dark:text-green-500 hover:no-underline"><i class='bx bx-edit'></i></a>
                                                            <a  href="#" style="font-size: 20px;  margin-left: 10px" class="font-medium text-red-600 underline dark:text-red-500 hover:no-underline"><i class='bx bx-trash'></i></a>
                                                            <a  href="#" style="font-size: 20px;  margin-left: 10px" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"><i class='bx bx-desktop'></i></a>
                                                        </td>
                                                    </tr>
                                                    `;
                                                });
                                                resultado +=`
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            `;
                        }else{
                            resultado += `
                            <h2  id="accordion-flush-heading-`+i+`">
                                <button data_estado="ver" data_num="`+i+`" type="button" class="btn flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-accordion-target="#accordion-flush-body-`+i+`" aria-expanded="true" aria-controls="accordion-flush-body-`+i+`">
                                    <span>${area.Nombre}</span>
                                    <svg data-accordion-icon="" class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </h2>
                            <div id="accordion-flush-body-`+i+`" data_num="`+i+`" class="si" aria-labelledby="accordion-flush-heading-`+i+`">
                                <div class="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                                    <div class="flex overflow-x-auto relative justify-end h-10">   
                                        <a data_id="${area.Id_sub}" style="font-size: 20px" class="editar font-medium text-green-600 underline dark:text-green-500 hover:no-underline"><i class="bx bx-edit"></i></a>
                                        <a data_id="${area.Id_sub}" style="font-size: 20px;  margin-left: 10px" class="eliminar font-medium text-red-600 underline dark:text-red-500 hover:no-underline"><i class="bx bx-trash"></i></a>
                                        <a data_id="${area.Id_sub}" style="font-size: 20px;  margin-left: 10px" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"><i class='bx bx-add-to-queue'></i></a>
                                    </div>
                                    <div class="overflow-x-auto relative">
                                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400" style="font-size: 20px">
                                                <tr>
                                                    <th scope="col" class="py-3 px-6 rounded-l-lg">
                                                        Nombre
                                                    </th>
                                                    <th scope="col" class="py-3 px-6">
                                                        Monitor
                                                    </th>
                                                    <th scope="col" class="py-3 px-6">
                                                        CPU
                                                    </th>
                                                    <th scope="col" class="py-3 px-6">
                                                        UPS
                                                    </th>
                                                    <th scope="col" class="py-3 px-6">
                                                        Teclado
                                                    </th>
                                                    <th scope="col" class="py-3 px-6">
                                                        Mouse
                                                    </th>
                                                    <th scope="col" class="py-3 px-6 rounded-r-lg">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="llenar" data_id="${area.Id_sub}" style="font-size: 20px">
                                            `;
                                            area.Computadoras.forEach(equipo => {
                                                resultado +=`
                                                <tr class="bg-white dark:bg-gray-800">
                                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${equipo.Nombre}</th>
                                                    <td class="py-4 px-6">${equipo.Monitor}</td>
                                                    <td class="py-4 px-6">${equipo.CPU}</td>
                                                    <td class="py-4 px-6">${equipo.UPS}</td>
                                                    <td class="py-4 px-6">${equipo.Teclado}</td>
                                                    <td class="py-4 px-6">${equipo.Mouse}</td>
                                                    <td class="py-4 px-6">
                                                        <a  href="#" style="font-size: 20px" class="font-medium text-green-600 underline dark:text-green-500 hover:no-underline"><i class='bx bx-edit'></i></a>
                                                        <a  href="#" style="font-size: 20px;  margin-left: 10px" class="font-medium text-red-600 underline dark:text-red-500 hover:no-underline"><i class='bx bx-trash'></i></a>
                                                        <a  href="#" style="font-size: 20px;  margin-left: 10px" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"><i class='bx bx-desktop'></i></a>
                                                    </td>
                                                </tr>
                                                `;
                                            });
                                            resultado +=`
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                        
                        i++;
                    });
                }
                $('.caja').html(resultado);
            },
            error : function(error){
                console.log(error);
            }
        });
    };

    $(document).on('click','.btn',function(){
        let estado = $(this).attr("data_estado");
        if(estado == "escondido"){
            let num = $(this).attr("data_num");
            $(".caja").find(".si").addClass("hidden");
            $(".caja").find(".si").addClass("no");
            $(".caja").find(".si").removeClass("si");
            $(".caja").find(".btn").attr("data_estado","escondido");
            $(".caja").find(".btn svg:last-child").removeClass("rotate-180");
            $(".caja").find(".btn").removeClass("bg-white");
            $(".caja").find(".btn").removeClass("dark:bg-gray-900");
            $(".caja").find(".btn").removeClass("text-gray-900");
            $(".caja").find(".btn").removeClass("dark:text-white");
            $(".caja").find(".btn").addClass("text-gray-500");
            $(".caja").find(".btn").addClass("dark:text-gray-400");
            let indicador = "#accordion-flush-body-"+num;
            $(indicador).removeClass("no");
            $(indicador).addClass("si");
            $(indicador).removeClass("hidden");
            $(this).removeAttr("aria-expanded");
            $(this).attr("aria-expanded","false");
            $(this).removeAttr("data_estado");
            $(this).attr("data_estado","ver");
            $(this).find("svg").addClass("rotate-180");
            $(this).removeClass("text-gray-500");
            $(this).removeClass("dark:text-gray-400");
            $(this).addClass("bg-white");
            $(this).addClass("dark:bg-gray-900");
            $(this).addClass("text-gray-900");
            $(this).addClass("dark:text-white");
        }
    });

    $('.agregar').click(function(){
        var resultado = "";
        resultado += `
                        <div z-50 id='fondoM' modal-backdrop='' class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                        <div id="edit" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Agregar nueva</span> <span style="color: #4d227c;"> Sub-área</span></h1>
                                    </div>

                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="agregar">
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre de la Sub-área: <span style="color: red">*</span></label>
                                                <input style="font-size: 20px" type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
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

    $(document).on('submit','#agregar',function(e){
        var estado = true;
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
        if(estado == true){
            $("#edit").remove();
            let id_area = $(".caja").attr("data_id");
            let nombre = $(this).find("#nombre").val();
            let action = "agregar";
            $.ajax({
                url : 'modelo/class.subArea.php',
                type : 'POST',
                data : {
                    action : action,
                    nombre: nombre,
                    idArea: id_area
                },
                success: function(respuesta){
                    var mensaje = JSON.parse(respuesta);
                    if(mensaje.status == false){
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El área ha sido editada con éxito!</h3>
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
                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro(a) de eliminar la sub-área: `+id+`?</h3>
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
            url: 'modelo/class.subArea.php',
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
        mostrarSubArea();
    });

    $(document).on('click','.editar',function(){
        let id = $(this).attr("data_id");
        let action = "ficha";
        $.ajax({
            url: 'modelo/class.subArea.php',
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
                    areas.data.forEach(area => {
                        resultado += `
                        <div z-50 id='fondoM' modal-backdrop='' class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                        <div id="edit" aria-modal="true" role="dialog" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                        <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Editar Sub-Área</span> <span style="color: #4d227c;"> ${area.Id_sub}</span></h1>
                                    </div>

                                    <!--Fomrulario-->
                                    <div class="p-6 space-y-6">
                                        <form id="editar" data_id="${area.Id_sub}">
                                            <div class="mb-6">
                                                <label style="font-size: 20px" for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre de la Sub-área: <span style="color: red">*</span></label>
                                                <input style="font-size: 20px" type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${area.Nombre}" required>
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
            },
            error : function(error){
                console.log(error);
            }
        });
    });

    $(document).on('submit','#editar',function(e){
        var estado = true;
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
        if(estado == true){
            $("#edit").remove();
            let id = $(this).attr("data_id");
            let nombre = $(this).find("#nombre").val();
            let action = "editar";
            $.ajax({
                url : 'modelo/class.subArea.php',
                type : 'POST',
                data : {
                    action : action,
                    id: id,
                    nombre: nombre,
                },
                success: function(respuesta){
                    var mensaje = JSON.parse(respuesta);
                    if(mensaje.status == false){
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
                                    <h3 style="font-size: 25px"  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¡El área ha sido editada con éxito!</h3>
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
        $("#question").remove();
        $("#fondoM").remove();
        $("#error").remove();
        $("#success").remove();
        $("#edit").remove();
        mostrarSubArea()
    });



});