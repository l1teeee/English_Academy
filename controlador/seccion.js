$(document).ready(function () {
  //FUNCION PARA MOSTRAR LA INFORMACION EN ESPECIFICO DEL MODULO
  if ($("#informacion").length) {
    mostrarInfo();
  }

  function mostrarInfo() {
    var mod = $("#informacion").attr("data_id");
    var action = "ModuloIndividual";
    $.ajax({
      type: "POST",
      url: "modelo/class.modulo.php",
      data: {
        action: action,
        modulo: mod,
      },
      success: function (response) {
        var modulo = JSON.parse(response);
        $("#codigoM").html(modulo.data[0].id_modulo);
        $("#nombreM").html(modulo.data[0].nombre);
        $("#cantidadM").html(modulo.data[0].cantidad);
        var nombre = modulo.data[0].id_modulo + " - " + modulo.data[0].nombre;
        $("#nombres").html(nombre);
      },
    });
  }

  //FUNCION PARA MOSTRAR LOS ALUMNOS QUE HAY EN ESTA SECCION EN ESPECIFICO

  function mostrarAlumnosMod(pagina) {
    var mod = $("#informacion").attr("data_id");
    var action = "alumnosSeccion";
    //var seccion = $("#delete").attr("data_id");
    var seccion = $("#seccion_act").val();
    $('#seccioness').html("de Seccion "+seccion);

    // Cantidad de elementos a mostrar por página
    var elementosPorPagina = 6;

    $.ajax({
      type: "POST",
      url: "modelo/class.secciones.php",
      data: {
        action: action,
        modulo: mod,
        seccion: seccion,
      },
      success: function (response) {
        var estudiantes = JSON.parse(response);
        var table = "";
        if (estudiantes.status == false) {
          table = "<td colspan='6' style='text-align: center; font-size:15px;' ><b><h1 class='font-sans py-4'>" + estudiantes.msg + "</h1></b></td>";
        } else {
          // Cálculo de los índices de inicio y fin para la página actual
          var inicio = (pagina - 1) * elementosPorPagina;
          var fin = inicio + elementosPorPagina;
          estudiantes.data.slice(inicio, fin).forEach((estudiante) => {
            table += `
                            <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                class="font-sans px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${
                                  estudiante.nombres +
                                  " " +
                                  estudiante.apellidos
                                }
                            </th>
                            <td class="font-sans px-6 py-4">
                                ${estudiante.programa}
                            </td>
                            <td class=" font-sans px-6 py-4">
                                ${estudiante.estado}
                            </td>
                            <td class="font-sans px-6 py-4">
                                ${estudiante.edad}
                            </td>
                            <td class="font-sans px-6 py-4">
                                ${estudiante.telefono}
                            </td>
                            <td class=" px-6 py-4">
                                <div class="flex flex-row justify-center">
                                    <div  class="flex flex-row">
                                        <lord-icon id="deleteAlum" data_id="${
                                          estudiante.id_estudiante
                                        }" src="https://cdn.lordicon.com/nhfyhmlt.json"
                                            trigger="hover" colors="primary:#e83a30"
                                            style="color:#e83a30;font-size:2.3rem;"
                                            data-tooltip-target="eliminarAlu">
                                        </lord-icon>
                                        <div id="eliminarAlu"  role="tooltip"
                                            class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                            Eliminar Estudiante
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `;
          });

          $("#alumnosModulo").html(table);

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

          var cantidadPaginas = Math.ceil(
            estudiantes.data.length / elementosPorPagina
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
        }
        $("#alumnosModulo").html(table);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  //PAGINACION USUARIOS
  // Evento de clic en los enlaces de paginación

  $(document).on("click", ".pagina", function () {
    var pagina = $(this).data("pagina");
    mostrarAlumnosMod(pagina);
  });

  var paginaActual = 1; // Variable para almacenar la página actual

  // Evento de clic en los enlaces de paginación

  $(document).on("click", ".pagina", function () {
    var pagina = $(this).data("pagina");
    paginaActual = pagina;
    mostrarAlumnosMod(paginaActual);
  });

  $(document).on("click", "#nextPage", function () {
    paginaActual++;
    mostrarAlumnosMod(paginaActual);
  });

  $(document).on("click", "#previousPage", function () {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarAlumnosMod(paginaActual);
    }
  });

  //FUNCION PARA ELIMIINAR UN ESTUDIANTE EN ESPECIFICO DE LA SECCIÓN

  $(document).on("click", "#deleteAlum", function () {
    var estu = $(this).attr("data_id");
    var action = "deleteAlum";
    var mod = $("#informacion").attr("data_id");
    var seccion = $("#seccion_act").val();

    $.ajax({
      type: "POST",
      url: "modelo/class.secciones.php",
      data: {
        action: action,
        alumno: estu,
        modulo: mod,
        seccion: seccion,
      },
      success: function (response) {
        var respuesta = JSON.parse(response);

        if (respuesta.status == true) {
          var modal = "";
          modal += `
                        <div id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 80px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
                                    <button id="cerrarSi" style="font-size: 20px" type="button" class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          $("body").append(modal);
        } else {
          var modal = "";
          modal += `
                        <div id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 80px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
                                    <button id="cerrarSi" style="font-size: 20px" type="button" class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          $("body").append(modal);
        }
        mostrarAlumnosMod(1);
      },
    });
  });

  //FUNCION PARA MOSTRAR TODOS LOS ESTUDIANTES QUE PERTENECEN AL MODULO PERO NO TIENEN SECCION ASIGNADA
  function mostrarAlumnosSinSeccion(sinseccion) {
    var mod = $("#informacion").attr("data_id");
    var action = "SinSeccion";

    var elementosPorPagina = 6;

    $.ajax({
      type: "POST",
      url: "modelo/class.secciones.php",
      data: {
        action: action,
        modulo: mod,
      },
      success: function (response) {
        var estudiantes = JSON.parse(response);
        var table = "";
        if (estudiantes.status == false) {
          table = "<td colspan='6' style='text-align: center; font-size:15px;' ><b><h1 class='font-sans py-4'>" + estudiantes.msg + "</h1></b></td>";
        } else {
          var inicio = (sinseccion - 1) * elementosPorPagina;
          var fin = inicio + elementosPorPagina;
          estudiantes.data.slice(inicio, fin).forEach((estu) => {
            table += `<tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            class="font-sans px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${estu.nombres + " " + estu.apellidos}
                        </th>
                        <td class="font-sans px-6 py-4">
                            ${estu.programa}
                        </td>
                        <td class=" font-sans px-6 py-4">
                            ${estu.sexo}
                        </td>
                        <td class="font-sans px-6 py-4">
                            ${estu.edad}
                        </td>
                        <td class="font-sans px-6 py-4">
                            ${estu.telefono}
                        </td>
                        <td class=" px-6 py-4">
                            <div class="flex flex-row justify-center">
                                <div class="flex flex-row">
                                    <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                    <lord-icon id="agregaraseccion" data_id="${
                                      estu.id_estudiante
                                    }" src="https://cdn.lordicon.com/egiwmiit.json"
                                        trigger="hover" colors="primary:#109121" state="hover"
                                        style="color:#109121;font-size:2.3rem;"
                                        data-tooltip-target="agregar1">
                                    </lord-icon>
                                    <div id="agregar1" role="tooltip"
                                        class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Agregar Estudiante
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>`;
          });
          $("#alumnosSin").html(table);
          function generarEnlacesPaginacion(sinseccion, cantidadPaginas) {
            var enlacesPaginacion = "";
            var paginasMostradas = 3;
            var paginaInicial = Math.max(
              1,
              sinseccion - Math.floor(paginasMostradas / 2)
            );

            for (
              var i = paginaInicial;
              i <=
              Math.min(cantidadPaginas, paginaInicial + paginasMostradas - 1);
              i++
            ) {
              if (i === sinseccion) {
                enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
              } else {
                enlacesPaginacion += ` <a href="javascript:void(0);" data-sinseccion="${i}" class="font-sans sinseccion flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
              }
            }

            return enlacesPaginacion;
          }

          var cantidadPaginas = Math.ceil(
            estudiantes.data.length / elementosPorPagina
          );
          var enlacesPaginacion = generarEnlacesPaginacion(
            sinseccion,
            cantidadPaginas
          );

          $("#paginacion1").html(enlacesPaginacion);

          var preSin = "";
          var nextSin = "";

          preSin += `<a href="#"
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="previousPageSin">
          <span class="sr-only">Previous</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
          </a>`;

          nextSin += `<a href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          id="nextPageSin">
          <span class="sr-only">Next</span>
          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          </a>`;

          //BOTONES PARA NAVEGACION

          $("#botonPrevi1").html(preSin);
          $("#botonNext1").html(nextSin);

          if (paginaActualSin >= cantidadPaginas) {
            $("#nextPageSin").addClass(" opacity-50");
            $("#nextPageSin").removeAttr("href");
            $("#nextPageSin").hide();
          }

          // var cantidadPaginas = Math.ceil(
          //   estudiantes.data.length / elementosPorPagina
          // );
          // var enlacesPaginacion = "";
          // for (var i = 1; i <= cantidadPaginas; i++) {
          // if (i === sinseccion) {
          //   enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
          // } else {
          //   enlacesPaginacion += ` <a href="javascript:void(0);" data-sinseccion="${i}" class="font-sans sinseccion flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
          // }
          // }

          // $("#paginacion1").html(enlacesPaginacion);
        }
        $("#alumnosSin").html(table);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  var paginaActualSin = 1;

  // Evento de clic en los enlaces de paginación de la sección juvenil
  $(document).on("click", ".sinseccion", function () {
    var sinseccion = $(this).data("sinseccion");
    paginaActualSin = sinseccion;
    mostrarAlumnosSinSeccion(paginaActualSin);
  });

  $(document).on("click", "#nextPageSin", function () {
    paginaActualSin++;
    mostrarAlumnosSinSeccion(paginaActualSin);
  });

  $(document).on("click", "#previousPageSin", function () {
    if (paginaActualSin > 1) {
      paginaActualSin--;
      mostrarAlumnosSinSeccion(paginaActualSin);
    }
  });

  //FUNCION PARA AGREGAR UNA PERSONA EN ESPECIFICO A LA SECCION
  $(document).on("click", "#agregaraseccion", function () {
    var estu = $(this).attr("data_id");
    var seccion = $("#seccion_act").val();
    var action = "agregaraseccion";
    var modulo = $("#codigoM").text();
    $.ajax({
      type: "POST",
      url: "modelo/class.secciones.php",
      data: {
        action: action,
        estu: estu,
        seccion: seccion,
        modulo: modulo,
      },
      success: function (response) {
        var respuesta = JSON.parse(response);
        if (respuesta.status == false) {
          var modal = "";
          modal += `
                        <div id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 80px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
                                    <button id="cerrarSi" style="font-size: 20px" type="button" class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
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
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
                                    <button id="cerrarSi" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          $("body").append(modal);
          mostrarAlumnosSinSeccion(1);
        }
      },
    });
  });

  //APARACION DE MODAL
  $(document).on("click", "#agregarEstu", function () {
    $("#extralarge-modal").hide();
    $("#fondoss").remove();
    mostrarAlumnosSinSeccion(1);
  });

  $(document).on("click", "#ajustes2", function () {
    $(this).hide();
    $("#extralarge-modal").show();
    $("#fondoss").remove();
    $(
      '<div modal-backdrop class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>'
    ).remove();
    mostrarAlumnosMod(1);
  });

  //FUNCION PARA MOSTRAR TODAS LAS SECCIONES DE CIERTO MODULO
  if ($("#secciones").length) {
    mostrarSecciones();
  }

  function mostrarSecciones() {
    var action = "mostrarSecciones";
    var mod = $("#informacion").attr("data_id");

    $.ajax({
      type: "POST",
      url: "modelo/class.secciones.php",
      data: {
        action: action,
        modulo: mod,
      },
      success: function (response) {
        var secciones = JSON.parse(response);
        var resultado = "";
        var docente = "";
        var aula = "";

        // if($('#secciones').children().length > 0 ){
        //   $("#docente").val(secciones.data[0].docente);
        //   $("#salon").val(secciones.data[0].salon);
        // }

        if (secciones.status == false) {
          resultado = "<h1>" + secciones.msg + "</h1>";
        } else {
          secciones.data.forEach((seccion) => {
            if (seccion.docente == "") {
              docente = "Sin asignar";
            } else {
              docente = seccion.docente;
            }

            if (seccion.salon == "") {
              aula = "Sin asignar";
            } else {
              aula = seccion.salon;
            }

            resultado += `
            <div class="flex flex-col sm:w-full md:w-80 lg:w-80 xl:w-80 2xl:w-80">
                <!-- AQUI SE-->
                <div class="px-5 bg-blue-700 text-gray-100 rounded-t-lg py-4 text-center">
                    <h1 class="font-sans font-bold text-lg">${seccion.nombre}</h1>
                </div>
                <div class="rounded-b-lg border-2 border-b-gray-300 border-t-transparent border-x-gray-300 px-4 py-4">
                    <div class="my-4">
                        <h1 class="font-sans font-bold text-lg">Docente:</h1>
                        <h1 id="profesor" class="font-sans">${docente}</h1>
                        <input type='hidden' id="seccion" value="${seccion.id_seccion}">
                    </div>
                    <div class="my-4">
                        <h1 class="font-sans font-bold text-lg">Cantidad de Alumnos:</h1>
                        <h1 id="cantidadSeccion" class="font-sans">${seccion.cantidad}</h1>
                    </div>
                    <div class="">
                        <h1 class="font-sans font-bold text-lg">Aula:</h1>
                        <h1 id="aula" class="font-sans">${aula}</h1>
                    </div>
                    <div class="flex flex-row justify-center	">
                        <div class="px-2" data-modal-target="modificarSeccion" data-modal-toggle="modificarSeccion">
                            <i id="modifySec" data_id="${seccion.id_seccion}" teacher="${docente}" classroom='${aula}'
                                total="${seccion.cantidad}" class='bx bx-edit-alt mt-1' trigger="hover"
                                data-tooltip-target="modificar" style="color:#109121;font-size:2.3rem;"></i>
                            <div id="modificar" role="tooltip"
                                class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Modificar Sección
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div id="delete" data_id="${seccion.id_seccion}" class="px-2" data-modal-target="popup-modal"
                            data-modal-toggle="popup-modal">
                            <lord-icon src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                            </lord-icon>
                            <div id="eliminar" role="tooltip"
                                class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Eliminar Sección
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div id="ajustesSeccion" data_id="${seccion.id_seccion}" class="flex flex-row"
                            data-modal-target="extralarge-modal" data-modal-toggle="extralarge-modal">

                            <a class="px-2" data-modal-target="defaultModal" data-modal-toggle="defaultModal">
                                <lord-icon src="https://cdn.lordicon.com/hwuyodym.json" trigger="hover"
                                    style="width:2.3rem;height:2.3rem" colors="primary:#fbb61d"
                                    data-tooltip-target="ajustes">
                                </lord-icon>
                                <div id="ajustes" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Ajustes de Alumnos
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
                        `;
          });
        }
        $("#secciones").html(resultado);
      },
    });
  }

  //FUNCIONES PARA MOSTRAR Y DESAPARECER EL MODAL DE LA SECCION
  $(document).on("click", "#closeModal", function () {
    $("#extralarge-modal").hide();
    $("#fondoModal").hide();
    $("#fondoss").hide();
    $("#next").next().remove();
  });

  $(document).on("click", "#ajustesSeccion", function () {
    $("#extralarge-modal").show();
    $("#fondoModal").show();
    var seccion = $(this).attr("data_id");
    $("#seccion_act").val(seccion);
    $("body").append(
      `<div id="fondoss" modal-backdrop="" class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>`
    );
    mostrarAlumnosMod(1);
  });

  //FUNCION PARA AGREGAR SECCIONES

  $(document).on("click", "#CrearSecciones", function (e) {
    e.preventDefault();
    var mod = $("#informacion").attr("data_id");
    var cant = $("#cantidadM").text();
    var secciones = $("#cantiSecc").val();
    var action = "seccionamiento";
    var regexNum = /^\d+$/;
    var val = true;

    if (!regexNum.test(secciones) || secciones == "" || secciones == null) {
      val = false;
      alert("Favor revise la cantidad de secciones que desea");
    } else if (secciones == 0) {
      val = false;
      alert("No se pueden crear 0 secciones");
    } else if (secciones < 0) {
      val = false;
      alert("El valor no puede ser menor a 0");
    }

    if (val) {
      $.ajax({
        type: "POST",
        url: "modelo/class.secciones.php",
        data: {
          action: action,
          mod: mod,
          cant: cant,
          secciones: secciones,
        },
        success: function (response) {
          var secciones = JSON.parse(response);
          $("#next").next().remove();
          var modal = "";

          if (secciones.status == false) {
            modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 80px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${secciones.msg}</h3>
                                    <button id="cerrarSi" style="font-size: 20px" type="button" class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          } else {
            modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${secciones.msg}</h3>
                                    <button id="cerrarSi" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
          }
          $("#cantiSecc").val("");
          $("body").append(modal);
        },
      });
    }
  });

  //DIALOGO PARA CONFIRMAR EL DELETE
  $(document).on("click", "#delete", function () {
    var id = $(this).attr("data_id");
    var modal = `
            <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                        <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button id="cerrarNo" type="button"
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
                                    <h3 class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Desea eliminar este
                                        estudiante?</h3>
                                    <button id="borrar" data_id="${id}" data-modal-hide="popup-modal" type="button"
                                        class="font-sans text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Si, estoy seguro
                                    </button>
                                    <button id="cerrarNo" data-modal-hide="popup-modal" type="button"
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
  //FIN MODAL PARA CONFIRMAR LA ELIMINIACION DE UN ESTDUANTE

  //VENTANA MODAL PARA MODIFICAR MODULO
  $(document).on("click", "#modifySec", function () {
    var id = $(this).attr("data_id");
    var salon = $(this).attr("classroom");
    var profesor = $(this).attr("teacher");
    var cantidad = $(this).attr("total");
    // var docente = $('#profesor').text();
    // var salon = encodeURIComponent($('#aula').text());

    //alert(sala);
    var modal = `
    <div z-50 id='fondoM' modal-backdrop=''
        class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
    <div id="success" aria-modal="true" role="dialog" tabindex="-1"
        class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                        <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                            Modificar Sección
                        </h3>
                        <button id="cerrarNo" type="button"
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
                        <form id="frmModifySeccion">
                            <div class="relative z-0 w-full mb-3 pt-1 group">
                                <input id="docente" type="text"
                                    class="font-sans mt-4 bg-white-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value="">
                                <label for="floating_email"
                                    class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Nombre
                                    del Docente</label>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6 pt-1">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input id="salon" type="text"
                                        class="font-sans mt-4 bg-white-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value="">
                                    <label for="floating_first_name"
                                        class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Aula</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" id="cantidad"
                                        class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value="" disabled="">
                                    <label for="floating_first_name"
                                        class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad
                                        Alumnos</label>
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" id="UpdateSeccion" data_id="${id}"
                                    class="font-sans text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Modificar Modulo</button>
                                <button id="cerrarNo" type="button"
                                    class="font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;

    $("body").append(modal);

    if (salon == "Sin asignar") {
      salon = "";
    }

    if (profesor == "Sin asignar") {
      profesor = "";
    }

    $("#salon").val(salon);
    $("#docente").val(profesor);
    $("#cantidad").val(cantidad);
  });

  //FUNCION PARA ABRRI EL DIALOGO DE MODIFICACION DE LA SECCION

  $(document).on("click", "#modifySec", function () {
    $("#modificarSeccion").show();
  });

  //ACCCION PARA ACTUALIZAR LA SECCION
  $(document).on("click", "#UpdateSeccion", function (e) {
    e.preventDefault();
    var docente = $("#docente").val();
    var aula = $("#salon").val();
    var action = "updateSeccion";
    var modulo = $("#codigoM").text();
    var seccion = $("#UpdateSeccion").attr("data_id");
    var texto = /^([A-ZÁÉÍÓÚa-zñáéíóúÁÉÍÓÚ\.]+[\s]*)+$/;
    var validar = true;

    if (docente == "" || !texto.test(docente)) {
      alert("Favor revise el nombre del docente");
      $("#docente").css("border-color", "red");
      validar = false;
    } else {
      $("#docente").css("border-color", "#CBD5E0");
    }

    if (aula == "") {
      alert("Favor revise el aula");
      $("#salon").css("border-color", "red");
      validar = false;
    } else {
      $("#salon").css("border-color", "#CBD5E0");
    }

    if (validar) {
      $.ajax({
        type: "POST",
        url: "modelo/class.secciones.php",
        data: {
          action: action,
          docente: docente,
          aula: aula,
          modulo: modulo,
          seccion: seccion,
        },
        success: function (response) {
          var respuesta = JSON.parse(response);
          $("#modificarSeccion").hide();
          $("#fondoM").remove();
          $("#alertaUp").remove();

          if (respuesta.status == false) {
            var modal = "";
            modal += `
            <div id="alertaUpNO">
                <div id='fondoM' modal-backdrop=''
                    class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50'>
                </div>
                <div id="error" aria-modal="true" role="dialog" tabindex="-1"
                    class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                            <div class="p-6 text-center">
                                <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px'></i>
                                <h3 style="font-size: 25px"
                                    class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}
                                </h3>
                                <button id="close" style="font-size: 20px" type="button"
                                    class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
      `;
          } else {
            var modal = "";
            modal += `
            
            <div id="alertaUp">
                <div z-50 id='fondoM' modal-backdrop=''
                    class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                <div id="success" aria-modal="true" role="dialog" tabindex="-1"
                    class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                            <div class="p-6 text-center">
                                <i class='bx bx-check-circle' style='color:#2a3891; font-size: 80px'></i>
                                <h3 style="font-size: 25px"
                                    class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}
                                </h3>
                                <button id="close" style="font-size: 20px" type="button"
                                    class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      `;
          }
          $("body").append(modal);
          $("#next").next().remove();
          mostrarSecciones();
        },
      });
    }
  });

  // $("#frmModifySeccion").submit(function (e) {
  //   var docente = $("#docente").val();
  //   var aula = $("#salon").val();
  //   var action = "updateSeccion";
  //   var modulo = $("#codigoM").text();
  //   var seccion = $("#UpdateSeccion").attr("data_id");
  //   var texto = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/;
  //   var validar = true;
  //   alert(docente);

  //   if (docente == "" || !texto.test(docente)) {
  //     alert("Favor revise el nombre del docente");
  //     $("#docente").css("border-color", "red");
  //     validar = false;
  //   } else {
  //     $("#docente").css("border-color", "#CBD5E0");
  //   }

  //   if (aula == "") {
  //     alert("Favor revise el aula");
  //     $("#salon").css("border-color", "red");
  //     validar = false;
  //   } else {
  //     $("#salon").css("border-color", "#CBD5E0");
  //   }

  //   if (validar) {
  //     $.ajax({
  //       type: "POST",
  //       url: "modelo/class.secciones.php",
  //       data: {
  //         action: action,
  //         docente: docente,
  //         aula: aula,
  //         modulo: modulo,
  //         seccion: seccion,
  //       },
  //       success: function (response) {
  //         var respuesta = JSON.parse(response);
  //         $("#modificarSeccion").hide();

  //         if (respuesta.status == false) {
  //           var modal = "";
  //           modal += `
  //         <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
  //     <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
  //         <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
  //             <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
  //                 <div class="p-6 text-center">
  //                     <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>
  //                     <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
  //                     <button id="close" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  //     `;
  //         } else {
  //           var modal = "";
  //           modal += `
  //         <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
  //     <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
  //         <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
  //             <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
  //                 <div class="p-6 text-center">
  //                     <i class='bx bx-check-circle' style='color:#2a3891; font-size: 80px' ></i>
  //                     <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${respuesta.msg}</h3>
  //                     <button id="close" style="font-size: 20px" type="button" class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  //     `;
  //         }
  //         $("body").append(modal);
  //         $("#next").next().remove();
  //         mostrarSecciones();
  //       },
  //     });
  //   }
  //   e.preventDefault();
  // });

  //ACCION PARA BORRAR UNA SECCION

  $(document).on("click", "#borrar", function () {
    var id = $(this).attr("data_id");
    var action = "borrarSeccion";
    var mod = $("#informacion").attr("data_id");

    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();

    $.ajax({
      type: "POST",
      url: "modelo/class.secciones.php",
      data: {
        action: action,
        seccion: id,
        modulo: mod,
      },

      success: function (response) {
        var result = JSON.parse(response);
        console.log(result.msg);
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

        $("body").append(modal);
      },
    });
    mostrarSecciones(1);
  });

  //FUNCIONES PARA LOS SEARCH

  //SEARCH DE ESTUDIANTES DENTRO DE LA SECCION
  $("#buscarEstuSeccion").keyup(function (e) {
    if ($("#buscarEstuSeccion").val()) {
      let text = $("#buscarEstuSeccion").val();
      let action = "buscarEnSeccion";
      let seccion = $("#seccion_act").val();
      let modulo = $("#codigoM").text();

      $.ajax({
        type: "POST",
        url: "modelo/class.secciones.php",
        data: {
          texto: text,
          action: action,
          seccion: seccion,
          modulo: modulo,
        },

        success: function (response) {
          var estudiantes = JSON.parse(response);
          var table = "";

          if (estudiantes.status == false) {
            table = `
            <tr class="bg-white dark:bg-gray-800">
            <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                ${estudiantes.msj}
            </th>
        </tr> 
            `;
          } else {
            estudiantes.data.forEach((estudiante) => {
              table += `
                <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row"
                    class="font-sans px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${estudiante.nombres + " " + estudiante.apellidos}
                </th>
                <td class="font-sans px-6 py-4">
                    ${estudiante.programa}
                </td>
                <td class=" font-sans px-6 py-4">
                    ${estudiante.sexo}
                </td>
                <td class="font-sans px-6 py-4">
                    ${estudiante.edad}
                </td>
                <td class="font-sans px-6 py-4">
                    ${estudiante.telefono}
                </td>
                <td class=" px-6 py-4">
                    <div class="flex flex-row justify-center">
                        <div  class="flex flex-row">
                            <lord-icon id="deleteAlum" data_id="${
                              estudiante.id_estudiante
                            }" src="https://cdn.lordicon.com/nhfyhmlt.json"
                                trigger="hover" colors="primary:#e83a30"
                                style="color:#e83a30;font-size:2.3rem;"
                                data-tooltip-target="eliminarAlu">
                            </lord-icon>
                            <div id="eliminarAlu"  role="tooltip"
                                class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Eliminar Estudiante
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
                
                `;
            });
          }
          $("#alumnosModulo").html(table);
        },
      });
    } else {
      mostrarAlumnosMod(1);
    }
  });

  //SEARCH DE SECCIONES DENTRO DEL MODULO
  $("#searchSecciones").keyup(function (e) {
    if ($("#searchSecciones").val()) {
      var modulo = $("#codigoM").text();
      var text = $("#searchSecciones").val();
      var action = "searchSecciones";

      $.ajax({
        type: "POST",
        url: "modelo/class.secciones.php",
        data: {
          texto: text,
          modulo: modulo,
          action: action,
        },
        success: function (response) {
          var secciones = JSON.parse(response);
          var resultado = "";

          if (secciones.status == false) {
            resultado = `
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                                    ${secciones.msj}
                                </th>
                            </tr> 
                            `;
          } else {
            secciones.data.forEach((seccion) => {
              if (seccion.docente == "") {
                docente = "Sin asignar";
              } else {
                docente = seccion.docente;
              }

              if (seccion.salon == "") {
                aula = "Sin asignar";
              } else {
                aula = seccion.salon;
              }

              resultado += `
            <div class="flex flex-col sm:w-full md:w-80 lg:w-80 xl:w-80 2xl:w-80">
                <!-- AQUI SE-->
                <div class="px-5 bg-blue-700 text-gray-100 rounded-t-lg py-4 text-center">
                    <h1 class="font-sans font-bold text-lg">${seccion.nombre}</h1>
                </div>
                <div class="rounded-b-lg border-2 border-b-gray-300 border-t-transparent border-x-gray-300 px-4 py-4">
                    <div class="my-4">
                        <h1 class="font-sans font-bold text-lg">Docente:</h1>
                        <h1 id="profesor" class="font-sans">${docente}</h1>
                        <input type='hidden' id="seccion" value="${seccion.id_seccion}">
                    </div>
                    <div class="my-4">
                        <h1 class="font-sans font-bold text-lg">Cantidad de Alumnos:</h1>
                        <h1 id="cantidadSeccion" class="font-sans">${seccion.cantidad}</h1>
                    </div>
                    <div class="">
                        <h1 class="font-sans font-bold text-lg">Aula:</h1>
                        <h1 id="aula" class="font-sans">${aula}</h1>
                    </div>
                    <div class="flex flex-row justify-center	">
                        <div class="px-2" data-modal-target="modificarSeccion" data-modal-toggle="modificarSeccion">
                            <i id="modifySec" data_id="${seccion.id_seccion}" teacher="${docente}" classroom='${aula}'
                                total="${seccion.cantidad}" class='bx bx-edit-alt mt-1' trigger="hover"
                                data-tooltip-target="modificar" style="color:#109121;font-size:2.3rem;"></i>
                            <div id="modificar" role="tooltip"
                                class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Modificar Sección
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div id="delete" data_id="${seccion.id_seccion}" class="px-2" data-modal-target="popup-modal"
                            data-modal-toggle="popup-modal">
                            <lord-icon src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                            </lord-icon>
                            <div id="eliminar" role="tooltip"
                                class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Eliminar Sección
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div id="ajustesSeccion" data_id="${seccion.id_seccion}" class="flex flex-row"
                            data-modal-target="extralarge-modal" data-modal-toggle="extralarge-modal">

                            <a class="px-2" data-modal-target="defaultModal" data-modal-toggle="defaultModal">
                                <lord-icon src="https://cdn.lordicon.com/hwuyodym.json" trigger="hover"
                                    style="width:2.3rem;height:2.3rem" colors="primary:#fbb61d"
                                    data-tooltip-target="ajustes">
                                </lord-icon>
                                <div id="ajustes" role="tooltip"
                                    class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Ajustes de Alumnos
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
                        `;
            });
          }
          $("#secciones").html(resultado);
        },
      });
    } else {
      mostrarSecciones(1);
    }
  });

  //SEARCH DE ESTUDIANTES DENTRO DEL MODULO
  $("#buscarEstuModulo").keyup(function (e) {
    if ($("#buscarEstuModulo").val()) {
      let text = $("#buscarEstuModulo").val();
      let action = "buscarEnModulo";
      let modulo = $("#codigoM").text();

      $.ajax({
        type: "POST",
        url: "modelo/class.secciones.php",
        data: {
          text: text,
          action: action,
          modulo: modulo,
        },

        success: function (response) {
          var estudiantesM = JSON.parse(response);

          var resultado = "";
          if (estudiantesM.status == false) {
            resultado = `
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                                    ${estudiantesM.msj}
                                </th>
                            </tr> 
                            `;
          } else {
            estudiantesM.data.forEach((estu) => {
              resultado += `
              <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row"
                  class="font-sans px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${estu.nombres + " " + estu.apellidos}
              </th>
              <td class="font-sans px-6 py-4">
                  ${estu.programa}
              </td>
              <td class=" font-sans px-6 py-4">
                  ${estu.sexo}
              </td>
              <td class="font-sans px-6 py-4">
                  ${estu.edad}
              </td>
              <td class="font-sans px-6 py-4">
                  ${estu.telefono}
              </td>
              <td class=" px-6 py-4">
                  <div class="flex flex-row justify-center">
                      <div class="flex flex-row">
                          <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                          <lord-icon id="agregaraseccion" data_id="${
                            estu.id_estudiante
                          }" src="https://cdn.lordicon.com/egiwmiit.json"
                              trigger="hover" colors="primary:#109121" state="hover"
                              style="color:#109121;font-size:2.3rem;"
                              data-tooltip-target="agregar1">
                          </lord-icon>
                          <div id="agregar1" role="tooltip"
                              class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Agregar Estudiante
                              <div class="tooltip-arrow" data-popper-arrow></div>
                          </div>
                      </div>
                  </div>
              </td>
          </tr>
              `;
            });
          }
          $("#alumnosSin").html(resultado);
        },
      });
    } else {
      mostrarAlumnosSinSeccion(1);
    }
  });

  //FUNCION PARA LA CREACION DEL PDF DEL MODULO

  $(document).on("click", "#close", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    $("#fondoss").remove();

    mostrarSecciones();
  });
  //FUNCIONES PARA CERRAR LAS VENTANAS MODALES
  //FUNCIONES DONDE SE CIERRA Y NO SE ACTUALIZA NADA DE INFORMACIÓN
  $(document).on("click", "#cerrarNo", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    $("#fondoss").remove();
  });

  $(document).on("click", "#closeModal", function () {
    $("#fondoss").remove();
    $("#next").next().remove();
  });

  //FUNCIONES PARA CERRAR DONDE SE CIERRA Y SE ACTUALIZA ALGUNA INFORMACIÓN

  $(document).on("click", "#cerrar", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    $("#fondoss").remove();

    location.reload();
  });

  $(document).on("click", "#cerrarSi", function () {
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    mostrarSecciones();
  });
});
