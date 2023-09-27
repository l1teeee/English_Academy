$(document).ready(function () {
    // INICIO MOSTRAR DATOS PARA ACTUALIZAR INFORMACION DE ESTUDIANTE
    if ($("#frmUpdate").length) {
      mostrarAlumno(1);
    }
  
    function mostrarAlumno() {
      let action = "alumno";
      let id = $("#user").val();
      let factura;
      let nombres;
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
          id: id,
        },
        success: function (response) {
          var alumno = JSON.parse(response);
  
          if (alumno.data[0].num_factura == "") {
            factura = "placeholder = 'Escribir numero de factura'";
          } else {
            factura = `value = "${alumno.data[0].num_factura}"`;
          }
          completo = alumno.data[0].nombres + " " + alumno.data[0].apellidos;
  
          //   $('#nombres').val(alumno.data[0].nombres);
          //   $('#apellidos').val(alumno.data[0].apellidos);
          //   $('#edad').val(alumno.data[0].edad);
  
          form = `
            
            <div class="flex flex-col md:flex-row w-full">
            <div class="w-full md:w-1/2 mb-6 md:pr-12">
                <div class="flex flex-row">
                    <label for="nombres"
                        class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nombres:</label>
                    <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                </div>    
                <input type="text" id="nombres"
                    class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value='${alumno.data[0].nombres}' required>
            </div>
            <div class="w-full md:w-1/2 mb-6 md:pr-12">
                <div class="flex flex-row">
                    <label for="apellidos"
                        class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Apellidos:</label>
                    <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                </div>
  
                <input type="text" id="apellidos"
                    class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value="${alumno.data[0].apellidos}" required>
            </div>
          </div>
          <div class="flex flex-col md:flex-row w-full">
                      <div class="flex flex-row md:flex-col xl:w-1/2  sm:w-full  mb-6  xl:mr-6 lg:mr-6">
                          <div class="flex flex-col md:flex-row w-full ">
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <div class="flex flex-row">
                                      <label for="edad"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Edad:</label>
                                      <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                  </div>
                                  <input type="number" id="edad"
                                      class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value="${alumno.data[0].edad}" min="5" max="30" required>
      
                              </div>
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <div class="flex flex-row">
                                      <label for="programa"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Programa:</label>
                                      <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                  </div>
                                  <select id="programa" class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" selected>Seleccionar Programa</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Infantil">Infantil</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Juvenil">Juvenil</option>
                                  </select>
  
                              </div>
                          </div>
                          
                      </div>
                      <div class="flex flex-row md:flex-col xl:w-1/2 mb-6  sm:w-full xl:mr-6 lg:mr-6">
                          <div class="flex flex-col md:flex-row w-full ">
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <label for="programa"
                                      class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Módulo:</label>
                                  <select id="lista" class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                      
                                  </select>
                              </div>
      
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <label for="nombres"
                                      class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">N° de
                                      Factura:</label>
                                  <input type="text" id="factura"
                                      class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      ${factura} >
                              </div>
                          </div>
      
                      </div>
                  </div>
      
      
      
      
                  <div class="flex flex-col md:flex-row w-full">
                      <div class="flex flex-row md:flex-col xl:w-1/2  sm:w-full  mb-6  xl:mr-6 lg:mr-6">
                          <div class="flex flex-col md:flex-row w-full">
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <div class="flex flex-row">
                                      <label for="encargado"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Encargado:</label>
                                      <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                  </div>
                                  <input type="text" id="encargado"
                                      class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value="${alumno.data[0].encargado}" min="5" max="30" required>
                              </div>
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6"">
                                  <div class="flex flex-row">
                                      <label for="programa"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Parentesco:</label>
                                      <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                  </div>
                                  <select id="parentesco" class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" selected>Seleccionar Parentesco</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Madre">Madre</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Padre">Padre</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Tío">Tío</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Tía">Tía</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Abuelo">Abuelo</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Abuela">Abuela</option>
                                      <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="Otro">Otro</option>
                                  </select>
                              </div>
                          </div>
                      </div>
  
                      <div class="flex flex-row md:flex-col xl:w-1/2 mb-6  sm:w-full xl:mr-6 lg:mr-6">
                          <div class="flex flex-col md:flex-row w-full ">
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <div class="flex flex-row">
                                      <label for="nombres"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Correo:</label>
                                  </div>
                                  <input type="text" id="correo"
                                      class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value="${alumno.data[0].correo}">
                              </div>
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                                  <div class="flex flex-row">
                                      <label for="nombres"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                          Telefono del Encargado:</label>
                                      <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                  </div>
                                  <input type="text" id="telefono"
                                      class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value="${alumno.data[0].telefono}">
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="flex flex-col md:flex-row w-full">
                      <div class="flex flex-row md:flex-col xl:w-1/2  sm:w-full  mb-6  xl:mr-6 lg:mr-6">
                          <div class="flex flex-col md:flex-row w-full ">
                              <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6 xl:pr-10 lg:pr-10 md:pr-10 ">
                                  <div class="flex flex-row">
                                      <label for="programa"
                                          class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Sexo del
                                          Estudiante:</label>
                                      <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                  </div>
                                  <select id="sexo"
                                      class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                      <option
                                          class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                          style="background-color: white; color: black;" value="" selected>Seleccionar sexo</option>
                                      <option
                                          class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                          style="background-color: white; color: black;" value="Femenino">Femenino</option>
                                      <option
                                          class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                          style="background-color: white; color: black;" value="Masculino">Masculino</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  <div class="flex flex-row">
                      <div class="data-modal-target=" popup-modal" data-modal-toggle="popup-modal"
                          data-tooltip-target="cancelar">
                          <a href="list_Estu.php">
                          <button type="button"
                              class="font-sans focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-1.5 pt-3 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                              <lord-icon src="https://cdn.lordicon.com/nhfyhmlt.json" trigger="hover" colors="primary:#fff"
                                  style="width:2.2rem;height:2.2rem">
                              </lord-icon>
                          </button>
                          </a>
                          <div id="cancelar" role="tooltip"
                              class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Cancelar Proceso
                              <div class="tooltip-arrow" data-popper-arrow></div>
                          </div>
                      </div>
      
                      <div class="data-modal-target=" popup-modal" data-modal-toggle="popup-modal"
                          data-tooltip-target="guardar">
                          <button id="update" type="submit"
                              class="font-sans focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-1.5 pt-3 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                              <lord-icon src="https://cdn.lordicon.com/egiwmiit.json" trigger="hover" colors="primary:#fff"
                                  style="width:2.2rem;height:2.2rem">
                              </lord-icon>
                          </button>
                          <div id="guardar" role="tooltip"
                              class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Guardar Estudiante
                              <div class="tooltip-arrow" data-popper-arrow></div>
                          </div>
                      </div>
                  </div>
            `;
          $("#frmUpdate").html(form);
          mostrarModulos(alumno.data[0].modulo);
          $("#completo").html(completo);
          $("#programa").val(alumno.data[0].programa);
          $("#parentesco").val(alumno.data[0].parentesco);
          $("#sexo").val(alumno.data[0].sexo);
          //$("#lista").val(alumno.data[0].modulo);
          //alert(alumno.data[0].modulo);
        },
      });
    }
  
    //FIN DE IMPRESION DE DATOS PARA EL FORMULARIO DE ACTUALIZACION DE ESTUDIANTE
  
    //FUNCION PARA IMPRIMIR LOS MODULOS EN EL FORMULARIO DEL UPDATE
  
    function mostrarModulos(modulo) {
      let action = "lista";
      $.ajax({
        type: "POST",
        url: "modelo/class.modulo.php",
        data: {
          action: action,
        },
        success: function (response) {
          var modulos = JSON.parse(response);
          var resultado = `<option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="" >Seleccionar Módulo</option>`;
  
          if (modulos.status == true) {
            modulos.data.forEach((modulo) => {
              resultado += `
                          <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value="${modulo.id_modulo}">${modulo.id_modulo}</option>
                          `;
            });
          }
  
          $("#lista").html(resultado);
          $("#lista").val(modulo);
        },
      });
    }
  
    //ACCION DE ACTUALIZAR ESTUDIANTE
  
    //INICIO PARA MOSTRAR TODOS LOS ALUMNOS QUE HAY EN LA BDD
    if ($("#alumnos").length) {
      mostrarEstudiante(1);
    }
  
    function mostrarEstudiante(pagina) {
      let action = "mostrarEgresados";
  
      // Cantidad de elementos a mostrar por página
      var elementosPorPagina = 6;
  
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
        },
        success: function (response) {
          var estudiantes = JSON.parse(response);
          var resultado = "";
          var factura;
          var correo;
  
          var mensaje = estudiantes.status;
          if (estudiantes.status == false) {
            resultado = `
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                    ${estudiantes.msg}
                </th>
            </tr> 
            `;
          } else {
            // Cálculo de los índices de inicio y fin para la página actual
            var inicio = (pagina - 1) * elementosPorPagina;
            var fin = inicio + elementosPorPagina;
            estudiantes.data.slice(inicio, fin).forEach((estudiante) => {
              if (estudiante.num_factura == "") {
                factura = "No posee factura";
              } else {
                factura = estudiante.num_factura;
              }
  
              if (estudiante.correo == "") {
                correo = "No posee correo";
              } else {
                correo = estudiante.correo;
              }
              var fecha;
              fecha = moment(estudiante.fecha_ingreso).format("DD/MM/YYYY");
              resultado += `
                          <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300 overscroll-x-none">
                          <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              ${estudiante.nombres}
                          </th>
                          <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              ${estudiante.apellidos}
                          </th>
                          <td class="px-6 py-4 font-sans text-sm">
                              ${correo}
                          </td>
                          <td class="px-6 py-4 font-sans text-sm">
                              ${factura}
                          </td>
                          <td class="px-6 py-4 font-sans text-sm">
                              ${fecha}
                          </td>
                          <td class="px-6 py-4 font-sans flex flex-row">
                              <div id="info" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="staticModal">
                                  <lord-icon src="https://cdn.lordicon.com/kulwmpzs.json" trigger="hover"
                                      colors="primary:#5BA3DC" style="width:2.3rem;height:2.3rem"
                                      data-tooltip-target="informacion" trigger="hover">
                                  </lord-icon>
                                  <div id="informacion" role="tooltip"
                                      class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                      Mostrar informacion
                                      <div class="tooltip-arrow" data-popper-arrow></div>
                                  </div>
                              </div>

                              <div id="continuar" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                              <lord-icon src="https://cdn.lordicon.com/xsdtfyne.json" trigger="hover"
                              colors="primary:#F2B41A" state="hover-2" data-tooltip-target="modificar" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                  <div id="modificar" role="tooltip"
                                      class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Continuar proceso
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>

                                <div id="finalizar" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                                <lord-icon src="https://cdn.lordicon.com/rxufjlal.json" trigger="hover"
                                colors="primary:#CA1818" state="hover-2" data-tooltip-target="eliminar" style="width:2.3rem;height:2.3rem">
                                </lord-icon>
                                  <div id="eliminar" role="tooltip"
                                      class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                      Finalizar proceso
                                      <div class="tooltip-arrow" data-popper-arrow></div>
                                  </div>
                              </div>
                          </td>
                      </tr>
  
                          `;
            });
  
            $("#alumnos").html(resultado);
  
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
              "Mostrando " + inicio + " - " + fin + " de " + estudiantes.cantidad
            );
  
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
  
            //FIN DE BOTONES DE NAVEGACION
          }
          $("#alumnos").html(resultado);
        },
        error: function (error) {
          console.log(error);
        },
      }); //FIN AJAX
    } //FIN FUNCION
  
    //PAGINACION USUARIOS
    // Evento de clic en los enlaces de paginación
  
    $(document).on("click", ".pagina", function () {
      var pagina = $(this).data("pagina");
      mostrarEstudiante(pagina);
    });
  
    var paginaActual = 1; // Variable para almacenar la página actual
  
    // Evento de clic en los enlaces de paginación
  
    $(document).on("click", ".pagina", function () {
      var pagina = $(this).data("pagina");
      paginaActual = pagina;
      mostrarEstudiante(paginaActual);
    });
  
    $(document).on("click", "#nextPage", function () {
      paginaActual++;
      mostrarEstudiante(paginaActual);
    });
  
    $(document).on("click", "#previousPage", function () {
      if (paginaActual > 1) {
        paginaActual--;
        mostrarEstudiante(paginaActual);
      }
    });
  
    //FIN PAGINACION USUARIO
  
    //FUNCION PARA MOSTRAR LA INFORMACION DE UN ESTUDIANTE EN ESPECFICO
  
    $(document).on("click", "#info", function () {
      var estu = $(this).attr("data_id");
      var action = "individual";
      var resultado = "";
      var factura = "";
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
          id: estu,
        },
        success: function (response) {
          var alumno = JSON.parse(response);
          var modulo = "";
          var correo = "";
          var factura = "";
          var codigocdb = "";
          if (alumno.status == false) {
            resultado = alumno.msg;
          } else {
            alumno.data.forEach((alum) => {
              if (alum.modulo == "") {
                modulo = "Sin asignar";
              } else {
                modulo = alum.modulo;
              }
  
              if (alum.correo == "") {
                correo = "No posee";
              } else {
                correo = alum.correo;
              }
  
              if (alum.num_factura == "") {
                factura = "No posee";
              } else {
                factura = alum.num_factura;
              }
  
              if(alum.codigo_cdb == ""){
                codigocdb = "No posee";
              } else {
                codigocdb = alum.codigo_cdb;
              }
  
  
              estado = alum.estado;
  
              resultado += `
                          <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                          <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                          <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                              <div class="relative w-full max-w-2xl max-h-full">
                              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                  <div
                                      class="flex items-start justify-between p-4 border-b rounded-t border-gray-300 dark:border-gray-500">
                                      <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                                          Ver estudiante
                                      </h3>
                                      <button id="cerrar" type="button"
                                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                          data-modal-hide="staticModal">
                                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"></path>
                                          </svg>
                                      </button>
                                  </div>
                                  <!-- CUERPO DEL MODAL -->
                                  <div class="p-6 space-y-6">
                                      <form>
                                      <div class="grid grid-cols-2 gap-6">
                                      <div class="relative z-0 w-full mb-3 group">
                                          <input type="text" id="disabled_input" aria-label="disabled input"
                                              class="my-4 font-sans mb-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              value="${alum.id_estudiante}" disabled>
                                          <label for="floating_first_name"
                                              class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Código</label>
                                      </div>
                                      <div class="relative z-0 w-full mb-3 group">
                                          <input type="text" id="moduloest" aria-label="disabled input"
                                              class="my-4 font-sans mb-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              value="${modulo}" disabled>
                                          <label for="floating_last_name"
                                              class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Módulo</label>
                                      </div>
                                  </div>
                                          <div class="grid grid-cols-2 gap-6">
                                              <div class="relative z-0 w-full mb-3 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class="my-4 font-sans mb-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.nombres}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres</label>
                                              </div>
                                              <div class="relative z-0 w-full mb-3 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class="my-4 font-sans mb-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.apellidos}" disabled>
                                                  <label for="floating_last_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos</label>
                                              </div>
                                          </div>
                                          <div class="grid grid-cols-2 gap-6 pt-1">
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${correo}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo:</label>
                                              </div>
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.telefono}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
                                              </div>
                                          </div>
                                          <div class="grid grid-cols-2 gap-6 pt-1">
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.edad}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Edad</label>
                                              </div>
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.programa}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Programa</label>
                                              </div>
                                          </div>
                                          <div class="grid grid-cols-2 gap-6 pt-1">
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="facturaesp" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${factura}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">N° de Factura</label>
                                              </div>
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="estadoest" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.estado}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                                              </div>
                                              
                                          </div>
                                          <div class="grid grid-cols-2 gap-6 pt-1">
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.encargado}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Encargado</label>
                                              </div>
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.parentesco}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Parentesco</label>
                                              </div>
                                          </div>
                                          <div class="grid grid-cols-2 gap-6 pt-1">
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${alum.sexo}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sexo:</label>
                                              </div>
                                              <div class="relative z-0 w-full mb-6 group">
                                                  <input type="text" id="disabled-input" aria-label="disabled input"
                                                      class=" font-sans mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      value="${codigocdb}" disabled>
                                                  <label for="floating_first_name"
                                                      class="font-sans peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Código CDB</label>
                                              </div>
                                          </div>
                  
                                      </form>
                  
                                  </div>
                              </div>
                          </div>
                              </div>
                          </div>
                      </div>
                      `;
            });
          }
  
          $("body").append(resultado);
  
          if(factura == "No posee"){
            $('#facturaesp').css('color','red');
          }
  
          if(modulo == "Sin asignar"){
            $('#moduloest').css('color','red')
          }
  
          if(estado == "Pendiente"){
            $('#estadoest').css('color','#dbaa21')
          } else if(estado == "Activo"){
            $('#estadoest').css('color','green');
          }
  
        },
      });
    });
  
    //FIN FUNCION PARA MOSTRAR INFO INDIVIDUAL DE UN ESTIDANTE
    //INICIO DE FUNCION PARA MODAL DE CONFIRMACION PARA ELIMINIAR ESTUDIANTE
  
    $(document).on("click", "#finalizar", function () {
      var id = $(this).attr("data_id");
      var modal = `
          <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                      <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                          <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                          <div class="relative w-full max-w-md max-h-full">
                          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <button id="cerrar" type="button"
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

                                  <h3 class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Desea finalizar proceso para este estudiante?</h3>

                                  <button id="FinProceso" data_id="${id}" data-modal-hide="popup-modal" type="button"
                                      class="font-sans text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                      Si, estoy seguro
                                  </button>
                                  <button id="cerrar" data-modal-hide="popup-modal" type="button"
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

    $(document).on("click", "#FinProceso", function () {
      var id = $(this).attr("data_id");
      var action = "FinProceso";
  
      $("#fondoM").remove();
      $("#error").remove();
      $("#success").remove();
  
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
          id: id,
        },
  
        success: function (response) {
          var result = JSON.parse(response);

          if(result.status == false){
            var modal = `
                      <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                      <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                          <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                  <div class="p-6 text-center">
                                      <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                      <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msj}</h3>
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
                                      <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msj}</h3>
                                      <button id="close" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      `;
          }
          
          
  
          $("body").append(modal);
        },
      });
      let program = $('#todos').attr('data_id');
  
      if(program == "todos"){
        mostrarEstudiante(1);
      } else if(program == "infantil"){
        mostrarInfantil(1);
      } else {
        mostrarJuvenil(1);
      }
  
    });

    //MODAL PARA CONFIMAR SI EL ESTUDIANTE DESEA CONTINUAR CON EL PROCESO

    $(document).on("click", "#continuar", function () {
      var id = $(this).attr("data_id");
      var modal = `
          <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                      <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                          <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                          <div class="relative w-full max-w-md max-h-full">
                          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <button id="cerrar" type="button"
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
                                  <svg aria-hidden="true" class="mx-auto mb-4 text-yellow-600 w-24 h-24 dark:text-yellow-500" fill="none"
                                      stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>

                                  <h3 class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Desea continuar el proceso para este estudiante?</h3>

                                  <button id="ConProceso" data_id="${id}" data-modal-hide="popup-modal" type="button"
                                      class="font-sans text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                      Si, estoy seguro
                                  </button>
                                  <button id="cerrar" data-modal-hide="popup-modal" type="button"
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

    //ACTION PARA QUE EL ESTUDIANTE CONTINUE EL PROCESO EN TODO CASO PASARLO A MODULOS JUVENILES
  
    $(document).on("click", "#ConProceso", function () {
      var id = $(this).attr("data_id");
      var action = "ConProceso";
  
      $("#fondoM").remove();
      $("#error").remove();
      $("#success").remove();
  
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
          id: id,
        },
  
        success: function (response) {
          var result = JSON.parse(response);
          
          if(result.status == false){
            var modal = `
                      <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                      <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                          <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                  <div class="p-6 text-center">
                                      <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                      <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msj}</h3>
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
                                      <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msj}</h3>
                                      <button id="close" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      `;
          }
          
  
          $("body").append(modal);
        },
      });
      let program = $('#todos').attr('data_id');
  
      if(program == "todos"){
        mostrarEstudiante(1);
      } else if(program == "infantil"){
        mostrarInfantil(1);
      } else {
        mostrarJuvenil(1);
      }
  
    });
  
    
    //FUNCIONES PARA MOSTRAR LOS ESTUDIANTES POR PROGRAMA
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
      $("#BuscarEstu").val("");
      $("#alumnos").empty();
      mostrarEstudiante(1);
    });
  
    //FUNCION PARA MOSTRAR LOS ALUMNOS DEL MODULO INFANTIL
  
    $(document).on("click", "#infantil", function () {
      $("#todos").attr("data_id", "infantil");
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
      $("#BuscarEstu").val("");
      $("#alumnos").empty();
      mostrarInfantil(1);
    });
  
    //FUNCION PARA MOSTRAR LOS ALUMNOS DEL PROGRAMA JUVENIL
  
    $(document).on("click", "#juvenil", function () {
      $("#todos").attr("data_id", "juvenil");
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
      $("#BuscarEstu").val("");
      $("#alumno").empty();
      mostrarJuvenil(1);
    });
  
    //FUNCION PARA MOSTRAR TODOS LOS ALUMNOS DEL PROGRAMA INFANTIL
    function mostrarInfantil(infantil) {
      let action = "EgresadosInfantil";
  
      var elementosPorPagina = 6;
  
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
        },
  
        success: function (response) {
          var estudiantes = JSON.parse(response);
          var resultado = "";
          var factura;
          var correo;
          var mensaje = estudiantes.status;
          if (estudiantes.status == false) {
            resultado = `
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                    ${estudiantes.msg}
                </th>
            </tr> 
            `;          } else {
            var inicio = (infantil - 1) * elementosPorPagina;
            var fin = inicio + elementosPorPagina;
            estudiantes.data.slice(inicio, fin).forEach((estudiante) => {
              if (estudiante.num_factura == "") {
                factura = "No posee factura";
              } else {
                factura = estudiante.num_factura;
              }
  
              if (estudiante.correo == "") {
                correo = "No posee correo";
              } else {
                correo = estudiante.correo;
              }
  
              var fecha;
              fecha = moment(estudiante.fecha_ingreso).format("DD/MM/YYYY");
  
              resultado += `
                          <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300 overscroll-x-none">
                          <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              ${estudiante.nombres}
                          </th>
                          <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              ${estudiante.apellidos}
                          </th>
                          <td class="px-6 py-4 font-sans text-sm">
                              ${correo}
                          </td>
                          <td class="px-6 py-4 font-sans text-sm">
                              ${factura}
                          </td>
                          <td class="px-6 py-4 font-sans text-sm">
                              ${fecha}
                          </td>
                          <td class="px-6 py-4 font-sans flex flex-row">
                          <div id="info" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="staticModal">
                          <lord-icon src="https://cdn.lordicon.com/kulwmpzs.json" trigger="hover"
                              colors="primary:#5BA3DC" style="width:2.3rem;height:2.3rem"
                              data-tooltip-target="informacion" trigger="hover">
                          </lord-icon>
                          <div id="informacion" role="tooltip"
                              class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Mostrar informacion
                              <div class="tooltip-arrow" data-popper-arrow></div>
                          </div>
                      </div>
                      <a class="px-2" href='modiEstu.php?id=${estudiante.id_estudiante}'>
                      <lord-icon src="https://cdn.lordicon.com/xsdtfyne.json" trigger="hover"
                      colors="primary:#F2B41A" state="hover-2" data-tooltip-target="modificar" style="width:2.3rem;height:2.3rem">
                        </lord-icon>
                          <div id="modificar" role="tooltip"
                              class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Continuar proceso
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </a>
                        <div id="delete" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                        <lord-icon src="https://cdn.lordicon.com/rxufjlal.json" trigger="hover"
                        colors="primary:#CA1818" state="hover-2" data-tooltip-target="eliminar" style="width:2.3rem;height:2.3rem">
                        </lord-icon>
                          <div id="eliminar" role="tooltip"
                              class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Finalizar proceso
                              <div class="tooltip-arrow" data-popper-arrow></div>
                          </div>
                      </div>
                          </td>
                      </tr>
  
                          `;
            });
          }
  
          $("#alumnos").html(resultado);
  
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
            "Mostrando " + inicio + " - " + fin + " de " + estudiantes.cantidad
          );
  
          var cantidadPaginas = Math.ceil(
            estudiantes.data.length / elementosPorPagina
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
  
          // Creación de los enlaces de paginación
          // var cantidadPaginas = Math.ceil(
          //   estudiantes.data.length / elementosPorPagina
          // );
          // var enlacesPaginacion = "";
          // for (var i = 1; i <= cantidadPaginas; i++) {
          //   if (i === infantil) {
          //     enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
          //   } else {
          //     enlacesPaginacion += ` <a href="javascript:void(0);" data-infantil="${i}" class="font-sans infantil flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>
          //     `;
          //   }
          // }
  
          // $("#tabs").html(
          //   "Mostrando " + inicio + " - " + fin + " de " + estudiantes.cantidad
          // );
  
          // $("#paginacion").html(enlacesPaginacion);
        },
        error: function (error) {
          console.log(error);
        },
      }); //FIN AJAX
    } //FIN  FUNCION
  
    var paginaActualI = 1;
  
    // Evento de clic en los enlaces de paginación de la sección infantil
    $(document).on("click", ".infantil", function () {
      var infantil = $(this).data("infantil");
      paginaActualI = infantil;
      mostrarInfantil(paginaActualI);
    });
  
    $(document).on("click", "#nextPageI", function () {
      paginaActualI++;
      mostrarInfantil(paginaActualI);
    });
  
    $(document).on("click", "#previousPageI", function () {
      if (paginaActualI > 1) {
        paginaActualI--;
        mostrarInfantil(paginaActualI);
      }
    });
  
    //FUNCION PARA MOSTRAR TODOS LOS ESTUDIANTES DEL PROGRAMA JUVENIL
    function mostrarJuvenil(juvenil) {
      let action = "EgresadosJuvenil";
  
      var elementosPorPagina = 6;
  
      $.ajax({
        type: "POST",
        url: "modelo/class.estudiante.php",
        data: {
          action: action,
        },
        success: function (response) {
          var estudiantes = JSON.parse(response);
          var resultado = "";
          var factura;
  
          var mensaje = estudiantes.status;
          if (estudiantes.status == false) {
            resultado = `
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                    ${estudiantes.msg}
                </th>
            </tr> 
            `;
          } else {
            // Cálculo de los índices de inicio y fin para la página actual
            var inicio = (juvenil - 1) * elementosPorPagina;
            var fin = inicio + elementosPorPagina;
            estudiantes.data.slice(inicio, fin).forEach((estudiante) => {
              if (estudiante.num_factura == "") {
                factura = "No posee factura";
              } else {
                factura = estudiante.num_factura;
              }
  
              if (estudiante.correo == "") {
                correo = "No posee correo";
              } else {
                correo = estudiante.correo;
              }
  
              var fecha;
              fecha = moment(estudiante.fecha_ingreso).format("DD/MM/YYYY");
  
              resultado += `
                <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300 overscroll-x-none">
                  <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    ${estudiante.nombres}
                  </th>
                  <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    ${estudiante.apellidos}
                  </th>
                  <td class="px-6 py-4 font-sans text-sm">
                    ${correo}
                  </td>
                  <td class="px-6 py-4 font-sans text-sm">
                    ${factura}
                  </td>
                  <td class="px-6 py-4 font-sans text-sm">
                    ${fecha}
                  </td>
                  <td class="px-6 py-4 font-sans flex flex-row">
                  <div id="info" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="staticModal">
                  <lord-icon src="https://cdn.lordicon.com/kulwmpzs.json" trigger="hover"
                      colors="primary:#5BA3DC" style="width:2.3rem;height:2.3rem"
                      data-tooltip-target="informacion" trigger="hover">
                  </lord-icon>
                  <div id="informacion" role="tooltip"
                      class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      Mostrar informacion
                      <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
              </div>
              <a class="px-2" href='modiEstu.php?id=${estudiante.id_estudiante}'>
              <lord-icon src="https://cdn.lordicon.com/xsdtfyne.json" trigger="hover"
              colors="primary:#F2B41A" state="hover-2" data-tooltip-target="modificar" style="width:2.3rem;height:2.3rem">
                </lord-icon>
                  <div id="modificar" role="tooltip"
                      class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Continuar proceso
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </a>
                <div id="delete" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                <lord-icon src="https://cdn.lordicon.com/rxufjlal.json" trigger="hover"
                colors="primary:#CA1818" state="hover-2" data-tooltip-target="eliminar" style="width:2.3rem;height:2.3rem">
                </lord-icon>
                  <div id="eliminar" role="tooltip"
                      class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      Finalizar proceso
                      <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
              </div>
                  </td>
                </tr>
              `;
            });
  
            $("#alumnos").html(resultado);
  
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
              "Mostrando " + inicio + " - " + fin + " de " + estudiantes.cantidad
            );
  
            var cantidadPaginas = Math.ceil(
              estudiantes.data.length / elementosPorPagina
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
  
            // // Creación de los enlaces de paginación
            // var cantidadPaginas = Math.ceil(
            //   estudiantes.data.length / elementosPorPagina
            // );
            // var enlacesPaginacion = "";
            // for (var i = 1; i <= cantidadPaginas; i++) {
            // if (i === juvenil) {
            //   enlacesPaginacion += `<a class="pagina-actual font-sans flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
            // } else {
            //   enlacesPaginacion += ` <a href="javascript:void(0);" data-juvenil="${i}" class="font-sans juvenil flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>
            //   `;
            // }
            // }
  
            // $("#tabs").html(
            //   "Mostrando " + inicio + " - " + fin + " de " + estudiantes.cantidad
            // );
  
            // $("#paginacion").html(enlacesPaginacion);
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
      mostrarJuvenil(paginaActualJ);
    });
  
    $(document).on("click", "#nextPageJ", function () {
      paginaActualJ++;
      mostrarJuvenil(paginaActualJ);
    });
  
    $(document).on("click", "#previousPageJ", function () {
      if (paginaActualJ > 1) {
        paginaActualJ--;
        mostrarJuvenil(paginaActualJ);
      }
    });
  
    //PAGINACION
  
    //FUNCION PARA BUSCAR ESTUDIANTES
  
    $("#BuscarEstu").keyup(function (e) {
      if ($("#BuscarEstu").val()) {
        let text = $("#BuscarEstu").val();
        let action = "buscarEgresado";
        var programa = $("#todos").attr("data_id");
  
        $.ajax({
          type: "POST",
          url: "modelo/class.estudiante.php",
          data: {
            action: action,
            dato: text,
            programa: programa,
          },
          success: function (response) {
            var estudiantes = JSON.parse(response);
            var resultado = "";
            var factura;
            var correo;
  
            if (estudiantes.status == false) {
              resultado = `
                              <tr class="bg-white dark:bg-gray-800">
                                  <th scope="row" colspan="4" class="py-4 px-6 font-big font-sans text-gray-900 whitespace-nowrap dark:text-white">
                                      ${estudiantes.msj}
                                  </th>
                              </tr> 
                              `;
            } else {
              estudiantes.data.forEach((estudiante) => {
                if (estudiante.num_factura == "") {
                  factura = "No posee factura";
                } else {
                  factura = estudiante.num_factura;
                }
  
                if (estudiante.correo == "") {
                  correo = "No posee correo";
                } else {
                  correo = estudiante.correo;
                }
                var fecha;
                fecha = moment(estudiante.fecha_ingreso).format("DD/MM/YYYY");
  
                resultado += `
                            <tr class="bg-white border-b dark:bg-gray-300 dark:border-gray-300 overscroll-x-none">
                            <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                ${estudiante.nombres}
                            </th>
                            <th class="font-sans px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                ${estudiante.apellidos}
                            </th>
                            <td class="px-6 py-4 font-sans text-sm">
                                ${correo}
                            </td>
                            <td class="px-6 py-4 font-sans text-sm">
                                ${factura}
                            </td>
                            <td class="px-6 py-4 font-sans text-sm">
                                ${fecha}
                            </td>
                            <td class="px-6 py-4 font-sans flex flex-row">
                                <div id="info" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="staticModal">
                                    <lord-icon src="https://cdn.lordicon.com/kulwmpzs.json" trigger="hover"
                                        colors="primary:#fbb61d" style="width:2.3rem;height:2.3rem"
                                        data-tooltip-target="informacion" trigger="hover">
                                    </lord-icon>
                                    <div id="informacion" role="tooltip"
                                        class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Mostrar informacion
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                                <a class="px-2" href='modiEstu.php?id=${estudiante.id_estudiante}'>
                                    <i class='bx bx-edit-alt mt-1' trigger="hover" data-tooltip-target="modificar"
                                        style="color:#109121;font-size:2.3rem;"></i>
                                    <div id="modificar" role="tooltip"
                                        class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Modificar alumno
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </a>
                                <div id="delete" data_id="${estudiante.id_estudiante}" class="px-2" data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                                    <lord-icon src="https://cdn.lordicon.com/kfzfxczd.json" data-tooltip-target="eliminar"
                                        trigger="hover" colors="primary:#e83a30" style="width:2.3rem;height:2.3rem">
                                    </lord-icon>
                                    <div id="eliminar" role="tooltip"
                                        class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Eliminar alumno
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
  
                            `;
              });
            }
  
            $("#alumnos").html(resultado);
            $("#tabs").html("Mostrando 1 - 10 de " + estudiantes.cantidad);
          },
        });
      } else {
        if ($("#todos").attr("data_id") == "todos") {
          mostrarEstudiante(1);
        }
  
        if ($("#todos").attr("data_id") == "infantil") {
          mostrarInfantil(1);
        }
  
        if ($("#todos").attr("data_id") == "juvenil") {
          mostrarJuvenil(1);
        }
      }
    });
  
    //FUNCION PARA EL CIERRER DE CUALQUIER MODAL QUE APARECE EN PANTALLA
    $(document).on("click", "#cerrar", function () {
      $("#fondoM").remove();
      $("#error").remove();
      $("#success").remove();
    });
  
    $(document).on("click", "#close", function () {
      $("#fondoM").remove();
      $("#error").remove();
      $("#success").remove();
      let program = $('#todos').attr('data_id');
      if(program == "todos"){
        mostrarEstudiante(1);
      } else if(program == "infantil"){
        mostrarInfantil(1);
      } else {
        mostrarJuvenil(1);
      }
    });
  });
  