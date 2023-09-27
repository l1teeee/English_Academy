$(document).ready(function () {
  //PARA MOSTRAR TODOS LOS MODULOS
  if ($("#modulos").length) {
    mostrarModulos(1);
  }

  function mostrarModulos(pagina) {
    let action = "mostrar";

    var elementosPorPagina = 6;

    $.ajax({
      type: "POST",
      url: "modelo/class.modulo.php",
      data: {
        action: action,
      },
      success: function (response) {
        var modulos = JSON.parse(response);
        var result = "";

        if (modulos.status == false) {
          result = "<td colspan='5' style='text-align: center; font-size:15px;' ><b><h1 class='font-sans py-4'>" + modulos.msg + "</h1></b></td>";
        } else {
          var inicio = (pagina - 1) * elementosPorPagina;
          var fin = inicio + elementosPorPagina;
          modulos.data.slice(inicio, fin).forEach((modulo) => {
            result += `
                        <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300">
                        <th class="font-sans px-6 py-4 text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.id_modulo}
                        </th>
                        <td class="px-6 py-4 font-sans text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.nombre}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            ${modulo.cantidad}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            ${modulo.secciones}
                        </td>
                        <td class="px-6 py-4 font-sans flex flex-row">
                            <a class="px-2" href='ajusteNivel.php?modulo=${modulo.id_modulo}'>
                                <lord-icon  src="https://cdn.lordicon.com/hwuyodym.json" trigger="hover"
                                    style="width:2.3rem;height:2.3rem" colors="primary:#fbb61d"
                                    data-tooltip-target="ajustes">
                                </lord-icon>
                                <div id="ajustes" data_id="${modulo.id_modulo}" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Ajustes grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                            <div class="px-2" id="modiMod" datass="${modulo.id_modulo}" data_id="${modulo.nombre}" data-modal-target="modificarMod" data-modal-toggle="modificarMod">
                                <i class='bx bx-edit-alt mt-1' trigger="hover" data-tooltip-target="modificar"
                                    style="color:#109121;font-size:2.3rem;"></i>
                                <div id="modificar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Modificar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2" data-modal-target="eliminarSec" data-modal-toggle="eliminarSec">
                                <lord-icon id="delete" data_id="${modulo.id_modulo}" src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                    trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                <div id="eliminar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Eliminar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2" >
                                <a href="modelo/class.pdf.php?modulo=${modulo.id_modulo}" target="_blank">
                                <lord-icon  src="https://cdn.lordicon.com/osuxyevn.json" data-tooltip-target="Generar"
                                    trigger="hover" colors="primary:#1A5D1A" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                </a>
                                <div id="Generar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    PDF Aula
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2" >
                                <a target="_blank" href="modelo/class.info.php?modulo=${modulo.id_modulo}">
                                <lord-icon  src="https://cdn.lordicon.com/kipaqhoz.json" data-tooltip-target="grade"
                                    trigger="hover" colors="primary:#213555" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                </a>
                                <div id="grade" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    PDF GradeBook
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2">
                              <a href="modelo/class.pagos.php?modulo=${modulo.id_modulo}" target="_blank">
                                <lord-icon  src="https://cdn.lordicon.com/usxfmtjg.json" data-tooltip-target="Alumnos"
                                    trigger="hover" colors="primary:#0e29bd" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                </a>
                                <div id="Alumnos" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    PDF Pagos
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            
                            <button class="px-2" >
                                
                                <lord-icon data_id="${modulo.id_modulo}" data-modal-target="ReporteAsistencia" data-modal-toggle="ReporteAsistencia"
                                 id="asistencia" src="https://cdn.lordicon.com/qjuahhae.json" data-tooltip-target="Asistencia"
                                    trigger="hover" colors="primary:#213555" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                
                                <div id="Asistencia" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    PDF Asistencia
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </button>
                        </td>
                    </tr>
                        `;
          });
          $("#modulos").html(result);

          // Creación de los enlaces de paginación
          function generarEnlacesPaginacion(pagina, cantidadPaginas) {
            var enlacesPaginacion = "";
            var paginasMostradas = 3;
            var paginaInicial = Math.max(
              1,
              pagina - Math.floor(paginasMostradas / 2)
            );

            for (
              var i = paginaInicial;
              i <=
              Math.min(cantidadPaginas, paginaInicial + paginasMostradas - 1);
              i++
            ) {
              if (i === pagina) {
                enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
              } else {
                enlacesPaginacion += ` <a href="javascript:void(0);" data-pagina="${i}" class="font-sans pagina flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
              }
            }

            return enlacesPaginacion;
          }

          $("#tabs").html(
            "Mostrando " + inicio + " - " + fin + " de " + modulos.cantidad
          );

          var cantidadPaginas = Math.ceil(
            modulos.data.length / elementosPorPagina
          );
          var enlacesPaginacion = generarEnlacesPaginacion(
            pagina,
            cantidadPaginas
          );

          $("#paginacion").html(enlacesPaginacion);

          var botonesPaginacion = "";
          var botonesPaginacionNext = "";

          botonesPaginacion += `<a href="#"
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="previousPage">
          <span class="sr-only">Previous</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
          </a>`;

          botonesPaginacionNext += `<a href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="nextPage">
          <span class="sr-only">Next</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          </a>`;

          //BOTONES PARA NAVEGACION

          $("#botonPrevi").html(botonesPaginacion);
          $("#botonNext").html(botonesPaginacionNext);

          if (paginaActual >= cantidadPaginas) {
            $("#nextPage").addClass(" opacity-50");
            $("#nextPage").removeAttr("href");
            $("#nextPage").hide();
          }

          //FIN DE BOTONES DE NAVEGACION
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  } //FIN FUNCION PARA MOSTRAR TODOS LOS MODULOS

  // $(document).on('click','#crearAsistencia', function () {
    
  // });

  $(document).on('click','#crearAsistencia', function (e) {
    e.preventDefault();
    var val = true;
   
    if($('#fecha').val() == ""){
      val = false;
      $('#fecha').css('border-color','red');
    } else {
      $('#fecha').css('border-color','');
    }

    var modulo = $('#modulo_act').val();
    var url = "modelo/class.asistencia.php?fecha="+$('#fecha').val()+"&modulo="+modulo;

    if(val){
      window.open(url,'_blank');
      $('#fondoM').remove();
      $('#ReporteAsistencia').remove();
    }
  });

  // $('#frmAsistencia').submit(function (e) { 
    
  // });

  

  $(document).on('click','#asistencia', function () {
    var codigo = $(this).attr('data_id');
    $('#modulo_act').val(codigo);
    

     var modal =`
     <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
     <div id="ReporteAsistencia" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
     <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                    <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                        Crear Asistencia
                    </h3>
                    <button id="close" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="ReporteAsistencia">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form id="frmAsistencia">
                        <div class="">
                            <div class="relative z-0 w-full mb-6 group">
                                <div class="flex flex-row">
                                    <label for="nombres"
                                        class="font-sans block mb-2 text-xl font-medium text-gray-900 dark:text-white">Fecha de Inicio:</label>
                                    <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                </div>
                                <!-- INPUT PARA LA FECHA -->
                                <p class="font-sans block mb-2 text-xs font-medium text-gray-900 dark:text-white">Favor ingrese la fecha del primer sabado de clase</p>
                                <input type="date" id="fecha"
                                    class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                        </div>
                
                <div
                    class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" id="crearAsistencia" class="font-sans text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Asistencia</button>
                    <button data-modal-hide="ReporteAsistencia" id="close" type="button"
                        class="font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
     `;

      $('#body-pd').append(modal);

  });

  $(document).on("click", ".pagina", function () {
    var pagina = $(this).data("pagina");
    mostrarModulos(pagina);
  });

  var paginaActual = 1; // Variable para almacenar la página actual

  // Evento de clic en los enlaces de paginación

  $(document).on("click", ".pagina", function () {
    var pagina = $(this).data("pagina");
    paginaActual = pagina;
    mostrarModulos(paginaActual);
  });

  $(document).on("click", "#nextPage", function () {
    paginaActual++;
    mostrarModulos(paginaActual);
  });

  $(document).on("click", "#previousPage", function () {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarModulos(paginaActual);
    }
  });

  //VENTANA MODAL PARA CONFIRMAR ELIMINAR MODULO
  $(document).on("click", "#delete", function () {
    var id = $(this).attr("data_id");
    var modal = `
        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                        <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button id="close" type="button"
                                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-hide="popup-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <svg aria-hidden="true" class="mx-auto mb-4 text-red-600 w-24 h-24 dark:text-gray-200" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h3 class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Desea eliminar el modulo ${id}?</h3>
                                <button id="borrar" data_id="${id}" data-modal-hide="popup-modal" type="button"
                                    class="font-sans text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Si, estoy seguro
                                </button>
                                <button id="close" data-modal-hide="popup-modal" type="button"
                                    class="font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                                    cancelar</button>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
        `;

    $("body").append(modal);
  });

  //VENTANA MODAL PARA MODIFICAR MODULO
  $(document).on("click", "#modiMod", function () {
    var id = $(this).attr("data_id");
    var codigo = $(this).attr("datass");
    $("#codigoMod").val(codigo);
    var modal = `
        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                        <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                            <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                                Modificar Modulo
                            </h3>
                            <button id="close" type="button"
                                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-hide="popup-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                          </div>
    
                            <div class="p-6 space-y-6">
                                  <form id="UpdateModulo">
                                      <div class="relative z-0 w-full mb-3 pt-1 group">
                                          <input id="nombreMod" type="text"
                                              class="font-sans mt-4 bg-white-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                              value="">
                                          <label for="floating_email"
                                              class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Nombre
                                              del Modulo</label>
                                      </div>
                                      <div
                                          class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button  data-modal-hide="popup-modal" type="submit" id="ModifyMod"
                                            class="font-sans text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Modificar Modulo </button>
                                        <button id="close" data-modal-hide="popup-modal" type="button"
                                            class="font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                            Cancelar</button>
                                      </div>

                                  </form>
                              </div>
                              
                        </div>
                    </div>
                        </div>
                    </div>
        `;

    $("body").append(modal);
    $("#nombreMod").val(id);
  });

  //FUNCION PARA MODIFICAR EL NOMBRE DE UN MODULO

  $(document).on("click", "#ModifyMod", function (e) {
    e.preventDefault();

    var validar = true;
    var nombre = $("#nombreMod").val();
    var action = "UpdateNameMod";
    var texto = /^[a-zA-Z0-9\s]*$/;
    var codigoMod = $("#codigoMod").val();

    if (nombre == "" || nombre == null || !texto.test(nombre)) {
      validar = false;
      alert("Favor revise el nombre del modulo");
    }

    if (validar) {
      $.ajax({
        type: "POST",
        url: "modelo/class.modulo.php",
        data: {
          action: action,
          codigoMod: codigoMod,
          nombre: nombre,
        },
        success: function (response) {
          var respuesta = JSON.parse(response);

          $("#fondoM").remove();
          $("#success").remove();
          var modal = "";

          if (respuesta.status == false) {
            var modal = `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
                                    <button id="closeyes" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          } else {
            var modal = `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
                                    <button id="closeyes" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          }
          $("body").append(modal);
        },
      });
    }
  });

  //FUNCION PARA BORRAR UN MODULO

  $(document).on("click", "#borrar", function () {
    var id = $(this).attr("data_id");
    var action = "eliminar";

    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();

    $.ajax({
      type: "POST",
      url: "modelo/class.modulo.php",
      data: {
        action: action,
        id: id,
      },

      success: function (response) {
        var result = JSON.parse(response);

        var modal = `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msg}</h3>
                                    <button id="close" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

        $("body").append(modal);
      },
    });
    let program = $("#todos").attr("data_id");

    if (program == "todos") {
      mostrarModulos(1);
    } else if (program == "infantil") {
      mostrarModulosInfantil(1);
    } else {
      mostrarModulosJuveniles(1);
    }
  });

  //CLICKS PARA MOSTRAR LOS MODULOS POR NIVELES
  $(document).on("click", "#todos", function () {
    $(this).attr("data_id", "todos");
    $(this).css("color", "blue");
    $("#infantil").css("color", "gray");
    $("#juvenil").css("color", "gray");
    $("#LogoIn").css("color", "gray");
    $("#LogoJu").css("color", "gray");
    $("#LogoT").removeClass("w-5 h-5 mr-2 text-gray-600 dark:text-gray-500");
    $("#LogoT").addClass("w-5 h-5 mr-2 text-blue-600 dark:text-blue-500");
    $(this).removeClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $(this).addClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#juvenil").removeClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#juvenil").addClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $("#infantil").removeClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#infantil").addClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $("#modulos").empty();
    $("#BuscarModulo").val("");
    mostrarModulos(1);
  });

  $(document).on("click", "#infantil", function () {
    $($("#todos")).attr("data_id", "infantil");
    $("#infantil").css("color", "blue");
    $("#todos").css("color", "gray");
    $("#juvenil").css("color", "gray");
    $("#LogoT").removeClass("w-5 h-5 mr-2 text-blue-600 dark:text-blue-500");
    $("#LogoT").addClass("w-5 h-5 mr-2 text-gray-600 dark:text-gray-500");
    $("#LogoI").removeClass(
      "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
    );
    $("#LogoI").addClass(
      "text-blue-400 group-hover:text-blue-500 dark:text-blue-500 dark:group-hover:text-blue-300"
    );
    $(this).removeClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $(this).addClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#todos").removeClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#todos").addClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $("#juvenil").removeClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#juvenil").addClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $("#LogoIn").css("color", "blue");
    $("#LogoJu").css("color", "gray");
    $("#modulos").empty();
    $("#BuscarModulo").val("");
    mostrarModulosInfantil(1);
  });

  $(document).on("click", "#juvenil", function () {
    $($("#todos")).attr("data_id", "juvenil");
    $(this).css("color", "blue");
    $("#todos").css("color", "gray");
    $("#infantil").css("color", "gray");
    $("#LogoIn").css("color", "gray");
    $("#LogoJu").css("color", "blue");
    $(this).removeClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $(this).addClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#LogoJ").removeClass(
      "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
    );
    $("#LogoJ").addClass(
      "text-blue-400 group-hover:text-blue-500 dark:text-blue-500 dark:group-hover:text-blue-300"
    );
    $("#infantil").removeClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#infantil").addClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $("#todos").removeClass(
      "font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    );
    $("#todos").addClass(
      "font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    );
    $("#modulos").empty();
    $("#BuscarModulo").val("");
    mostrarModulosJuveniles(1);
  });

  function mostrarModulosInfantil(infantil) {
    let action = "MostrarInfantil";

    var elementosPorPagina = 6;

    $.ajax({
      type: "POST",
      url: "modelo/class.modulo.php",
      data: {
        action: action,
      },
      success: function (response) {
        var modulos = JSON.parse(response);
        var result = "";

        if (modulos.status == false) {
          result = modulos.msg;
        } else {
          var inicio = (infantil - 1) * elementosPorPagina;
          var fin = inicio + elementosPorPagina;
          modulos.data.slice(inicio, fin).forEach((modulo) => {
            result += `
                        <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300">
                        <th class="font-sans px-6 py-4 text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.id_modulo}
                        </th>
                        <td class="px-6 py-4 font-sans text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.nombre}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            ${modulo.cantidad}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            2
                        </td>
                        <td class="px-6 py-4 font-sans flex flex-row">
                            <a class="px-2" href='ajusteNivel.php'>
                                <lord-icon src="https://cdn.lordicon.com/hwuyodym.json" trigger="hover"
                                    style="width:2.3rem;height:2.3rem" colors="primary:#fbb61d"
                                    data-tooltip-target="ajustes">
                                </lord-icon>
                                <div id="ajustes" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Ajustes grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                            <div class="px-2" data-modal-target="staticModal" data-modal-toggle="staticModal">
                                <i class='bx bx-edit-alt mt-1' trigger="hover" data-tooltip-target="modificar"
                                    style="color:#109121;font-size:2.3rem;"></i>
                                <div id="modificar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Modificar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2" data-modal-target="eliminarSec" data-modal-toggle="eliminarSec">
                                <lord-icon id="delete" data_id="${modulo.id_modulo}" src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                    trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                <div id="eliminar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Eliminar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                        `;
          });
          $("#modulos").html(result);
          function generarEnlacesPaginacion(infantil, cantidadPaginas) {
            var enlacesPaginacion = "";
            var paginasMostradas = 3;
            var paginaInicial = Math.max(
              1,
              infantil - Math.floor(paginasMostradas / 2)
            );

            for (
              var i = paginaInicial;
              i <=
              Math.min(cantidadPaginas, paginaInicial + paginasMostradas - 1);
              i++
            ) {
              if (i === infantil) {
                enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
              } else {
                enlacesPaginacion += ` <a href="javascript:void(0);" data-infantil="${i}" class="font-sans infantil flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>
                `;
              }
            }

            return enlacesPaginacion;
          }

          $("#tabs").html(
            "Mostrando " + inicio + " - " + fin + " de " + modulos.cantidad
          );

          var cantidadPaginas = Math.ceil(
            modulos.data.length / elementosPorPagina
          );
          var enlacesPaginacion = generarEnlacesPaginacion(
            infantil,
            cantidadPaginas
          );

          $("#paginacion").html(enlacesPaginacion);

          var preI = "";
          var nextI = "";

          preI += `<a href="#"
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="previousPageI">
          <span class="sr-only">Previous</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
          </a>`;

          nextI += `<a href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="nextPageI">
          <span class="sr-only">Next</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          </a>`;

          //BOTONES PARA NAVEGACION

          $("#botonPrevi").html(preI);
          $("#botonNext").html(nextI);

          if (paginaActualI >= cantidadPaginas) {
            $("#nextPageI").addClass(" opacity-50");
            $("#nextPageI").removeAttr("href");
            $("#nextPageI").hide();
          }
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  var paginaActualI = 1;

  // Evento de clic en los enlaces de paginación de la sección infantil
  $(document).on("click", ".infantil", function () {
    var infantil = $(this).data("infantil");
    paginaActualI = infantil;
    mostrarModulosInfantil(paginaActualI);
  });

  $(document).on("click", "#nextPageI", function () {
    paginaActualI++;
    mostrarModulosInfantil(paginaActualI);
  });

  $(document).on("click", "#previousPageI", function () {
    if (paginaActualI > 1) {
      paginaActualI--;
      mostrarModulosInfantil(paginaActualI);
    }
  });

  function mostrarModulosJuveniles(juvenil) {
    let action = "MostrarJuveniles";

    var elementosPorPagina = 6;

    $.ajax({
      type: "POST",
      url: "modelo/class.modulo.php",
      data: {
        action: action,
      },
      success: function (response) {
        var modulos = JSON.parse(response);
        var result = "";

        if (modulos.status == false) {
          result = modulos.msg;
        } else {
          var inicio = (juvenil - 1) * elementosPorPagina;
          var fin = inicio + elementosPorPagina;
          modulos.data.slice(inicio, fin).forEach((modulo) => {
            result += `
                        <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300">
                        <th class="font-sans px-6 py-4 text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.id_modulo}
                        </th>
                        <td class="px-6 py-4 font-sans text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.nombre}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            ${modulo.cantidad}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            2
                        </td>
                        <td class="px-6 py-4 font-sans flex flex-row">
                            <a class="px-2" href='ajusteNivel.php'>
                                <lord-icon src="https://cdn.lordicon.com/hwuyodym.json" trigger="hover"
                                    style="width:2.3rem;height:2.3rem" colors="primary:#fbb61d"
                                    data-tooltip-target="ajustes">
                                </lord-icon>
                                <div id="ajustes" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Ajustes grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                            <div class="px-2" data-modal-target="staticModal" data-modal-toggle="staticModal">
                                <i class='bx bx-edit-alt mt-1' trigger="hover" data-tooltip-target="modificar"
                                    style="color:#109121;font-size:2.3rem;"></i>
                                <div id="modificar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Modificar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2" data-modal-target="eliminarSec" data-modal-toggle="eliminarSec">
                                <lord-icon id="delete" data_id="${modulo.id_modulo}" src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                    trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                <div id="eliminar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Eliminar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                        `;
          });
          $("#modulos").html(result);
          function generarEnlacesPaginacion(juvenil, cantidadPaginas) {
            var enlacesPaginacion = "";
            var paginasMostradas = 3;
            var paginaInicial = Math.max(
              1,
              juvenil - Math.floor(paginasMostradas / 2)
            );

            for (
              var i = paginaInicial;
              i <=
              Math.min(cantidadPaginas, paginaInicial + paginasMostradas - 1);
              i++
            ) {
              if (i === juvenil) {
                enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
              } else {
                enlacesPaginacion += ` <a href="javascript:void(0);" data-juvenil="${i}" class="font-sans juvenil flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>
                `;
              }
            }

            return enlacesPaginacion;
          }

          $("#tabs").html(
            "Mostrando " + inicio + " - " + fin + " de " + modulos.cantidad
          );

          var cantidadPaginas = Math.ceil(
            modulos.data.length / elementosPorPagina
          );
          var enlacesPaginacion = generarEnlacesPaginacion(
            juvenil,
            cantidadPaginas
          );

          $("#paginacion").html(enlacesPaginacion);

          var preJ = "";
          var nextJ = "";

          preJ += `<a href="#"
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="previousPageJ">
          <span class="sr-only">Previous</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
          </a>`;

          nextJ += `<a href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="nextPageJ">
          <span class="sr-only">Next</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          </a>`;

          //BOTONES PARA NAVEGACION

          $("#botonPrevi").html(preJ);
          $("#botonNext").html(nextJ);

          if (paginaActualJ >= cantidadPaginas) {
            $("#nextPageJ").addClass(" opacity-50");
            $("#nextPageJ").removeAttr("href");
            $("#nextPageJ").hide();
          }
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  //PAGINACION
  var paginaActualJ = 1;

  // Evento de clic en los enlaces de paginación de la sección juvenil
  $(document).on("click", ".juvenil", function () {
    var juvenil = $(this).data("juvenil");
    paginaActualJ = juvenil;
    mostrarModulosJuveniles(paginaActualJ);
  });

  $(document).on("click", "#nextPageJ", function () {
    paginaActualJ++;
    mostrarModulosJuveniles(paginaActualJ);
  });

  $(document).on("click", "#previousPageJ", function () {
    if (paginaActualJ > 1) {
      paginaActualJ--;
      mostrarModulosJuveniles(paginaActualJ);
    }
  });

  //FUNCION PARA BUSQUEDA DE MODULO

  $("#buscarModulo").keyup(function (e) {
    if ($("#buscarModulo").val()) {
      let text = $("#buscarModulo").val();
      let action = "buscarModulo";
      var programa = $("#todos").attr("data_id");
      $.ajax({
        type: "POST",
        url: "modelo/class.modulo.php",
        data: {
          action: action,
          texto: text,
          programa: programa,
        },
        success: function (response) {
          var modulos = JSON.parse(response);
          var result = "";

          if (modulos.status == false) {
            result = `
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulos.msg}
                        </th>
                    </tr> 
                    `;
          } else {
            modulos.data.forEach((modulo) => {
              result += `
                        <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300">
                        <th class="font-sans px-6 py-4 text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.id_modulo}
                        </th>
                        <td class="px-6 py-4 font-sans text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            ${modulo.nombre}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            ${modulo.cantidad}
                        </td>
                        <td class="px-6 py-4 font-sans text-lg">
                            2
                        </td>
                        <td class="px-6 py-4 font-sans flex flex-row">
                            <a class="px-2" href='ajusteNivel.php?modulo=${modulo.id_modulo}'>
                                <lord-icon src="https://cdn.lordicon.com/hwuyodym.json" trigger="hover"
                                    style="width:2.3rem;height:2.3rem" colors="primary:#fbb61d"
                                    data-tooltip-target="ajustes">
                                </lord-icon>
                                <div id="ajustes" data_id="${modulo.id_modulo}" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Ajustes grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                            <div class="px-2" data-modal-target="staticModal" data-modal-toggle="staticModal">
                                <i class='bx bx-edit-alt mt-1' trigger="hover" data-tooltip-target="modificar"
                                    style="color:#109121;font-size:2.3rem;"></i>
                                <div id="modificar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Modificar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-2" data-modal-target="eliminarSec" data-modal-toggle="eliminarSec">
                                <lord-icon id="delete" data_id="${modulo.id_modulo}" src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                    trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                <div id="eliminar" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Eliminar grupo
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                        `;
            });
          }
          $("#modulos").html(result);
        },
      });
    } else {
      if ($("#todos").attr("data_id") == "todos") {
        mostrarModulos(1);
      }

      if ($("#todos").attr("data_id") == "infantil") {
        mostrarModulosInfantil(1);
      }

      if ($("#todos").attr("data_id") == "juvenil") {
        mostrarModulosJuveniles(1);
      }
    }
  });

  //FUNCION PARA CONFIRMAR AVANZAR A TODOS LOS ESTUDIANTES

  $(document).on("click", "#generarReporte", function () {
    var modal = `
    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                    <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button id="close" type="button"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-hide="popup-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg aria-hidden="true" class="mx-auto mb-4 text-amber-400 w-24 h-24 text-amber-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Desea avanzar de modulo a todos los alumnos?</h3>
                            <button id="avanzar" data-modal-hide="popup-modal" type="button"
                                class="font-sans text-white bg-yellow-500 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Si, estoy seguro
                            </button>
                            <button id="close" data-modal-hide="popup-modal" type="button"
                                class="font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                                cancelar</button>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
    `;

    $("body").append(modal);
  });

  $(document).on("click", "#avanzar", function () {
    $("#fondoM").remove();
    $("#success").remove();
    var action = "Avanzar";
    $.ajax({
      type: "POST",
      url: "modelo/class.modulo.php",
      data: {
        action: action,
      },
      success: function (response) {
        var result = JSON.parse(response);
        var modal = "";

        if(result.status == false){
          var modal = `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msg}</h3>
                                    <button id="close" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        } else {
          var modal = `
                    <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msg}</h3>
                                    <button id="close" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        }

        $("body").append(modal);

        if ($("#todos").attr("data_id") == "todos") {
          mostrarModulos(1);
        }

        if ($("#todos").attr("data_id") == "infantil") {
          mostrarModulosInfantil(1);
        }

        if ($("#todos").attr("data_id") == "juvenil") {
          mostrarModulosJuveniles(1);
        }
      },
    });
  });

  $(document).on("click", "#close", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    $("#next").next().remove();
  });

  $(document).on("click", "#closeyes", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();

    if ($("#todos").attr("data_id") == "todos") {
      mostrarModulos(1);
    }

    if ($("#todos").attr("data_id") == "infantil") {
      mostrarModulosInfantil(1);
    }

    if ($("#todos").attr("data_id") == "juvenil") {
      mostrarModulosJuveniles(1);
    }
  });

  $(document).on("click", "#cerrar", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    location.reload();
  });
});
