$(document).ready(function () {


    if ($("#frmUpdate").length) {
        mostrarAlumno();
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
    

    $('#frmUpdate').submit(function (e) { 

        
        var texto = /^([A-ZÁÉÍÓÚa-zñáéíóúÁÉÍÓÚ\.]+[\s]*)+$/;
        var nums = /^[1-9][0-9]?$|^100$/;
        var regxcorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var regxtel= /[0-9]{4}\-[0-9]{4}/;
        var rexfac = /^FAC\d{4,6}$/;

        //Variable de validacion para que todos los datos esten correctos
        var val = true;
        
        //validacion del nombre
        if($('#nombres').val()=="" || !texto.test($('#nombres').val())) {   
            val = false;
            $('#nombres').css('border-color','red');
            alert("Favor revise el campo de nombre");
        } else {
            $('#nombres').css('border-color','#D1D5DB');
        }
        //validacion de apellidos
        if($('#apellidos').val()=="" || !texto.test($('#apellidos').val())){
            val = false;
            $('#apellidos').css('border-color','red');
            alert("Favor revise el campo de apellidos");
        } else {
            $('#apellidos').css('border-color','#D1D5DB');
        }

        if($('#edad').val()=="" || !nums.test($('#edad').val())){
            val = false;
            $('#edad').css('border-color','red');
            alert("Favor revise el campo de edad");
        } else if($('#edad').val() < 6){
            val = false;
            $('#edad').css('border-color', 'red');
            alert("La edad minima es de 6 años");
        } else {
            $('#edad').css('border-color','#D1D5DB');
        }

        //VALIDACION PARA LOS PROGRAMAS
        if($('#programa').val() == "" || $('#programa').val()==null){
            val = false;
            $('#programa').css('border-color','red');
            alert("Favor seleccione un programa");
        } else {
            $('#programa').css('border-color','#D1D5DB');
        }

        

        if($('#encargado').val()=="" || !texto.test($('#encargado').val())){
            val = false;
            $('#encargado').css('border-color','red');
            alert("Favor revise el campo del encargado");
        } else {
            $("#encargado").css("border-color",'#D1D5DB');
        }

        if($('#parentesco').val() == ""){
            val = false;
            $('#parentesco').css('border-color', 'red');
            alert("Favor seleccione un parentesco");
        } else {
            $('#parentesco').css('border-color','#D1D5DB');
        }

        if($('#correo').val() != ""){
            
            if(!regxcorreo.test($('#correo').val())){
                val = false;
                $('#correo').css('border-color','red');
                alert('Favor revise el formato del correo')
            } else {
                $('#correo').css('border-color','gray');
            }
        } else {
            $('#correo').css('border-color','#D1D5DB');
        }

        if($('#telefono').val()=="" || !regxtel.test($('#telefono').val())){
            val = false;
            $('#telefono').css('border-color','red');
            alert('Favor revise el formato del telefono, Ejemplo: 1234-5678');
        } else {
            $('#telefono').css('border-color','#D1D5DB')
        }


        if($('#factura').val()!="" ){

            if(!rexfac.test($('#factura').val())){
            val = false;
            $('#factura').css('border-color','red');
            alert("Favor revise el campo de factura");
            }
        } else {
            $('#factura').css('border-color','#D1D5DB');
        }

        if($('#sexo').val()=="" || $('#sexo').val() == null){
            val = false;
            $('#sexo').css('border-color', 'red');
            alert('Favor seleccione el sexo del alumno');
        } else {
            $('#sexo').css('border-color','#D1D5DB');
        }
        
        // if($('#programa').val() == "Infantil"){
        //     if($('#edad').val() < 6 || $('#edad').val() > 11){
        //         val = false;
        //         $('#edad').css('border-color', 'red');
        //         alert('Para ser parte del programa infantil debe tener una edad entre 1 a 12 años');
        //     } else {
        //         $('#edad').css('border-color','#D1D5DB');
        //     }
        // } else if($('#programa').val() == "Juvenil"){
        //     if($('#edad'). val > 18 || $('#edad').val() < 12){
        //         val = false;
        //         $('#edad').css('border-color', 'red');
        //         alert('Para ser parte del programa juvenil debe tener una edad entre 12 a 18 años');
        //     } else {
        //         $('#edad').css('border-color','#D1D5DB');
        //     }
        // }
       

        if(val){
            var action = "update";

            var formData = new FormData(this);

            formData.append('action', action);
            formData.append('user', $('#user').val());
            formData.append('nombres', $('#nombres').val());
            formData.append('apellidos', $('#apellidos').val());
            formData.append('edad', $('#edad').val());
            formData.append('programa', $('#programa').val());
            formData.append('factura', $('#factura').val());
            formData.append('encargado', $('#encargado').val());
            formData.append('parentesco', $('#parentesco').val());
            formData.append('correo', $('#correo').val());
            formData.append('modulo',$('#lista').val());
            formData.append('telefono',$('#telefono').val());
            formData.append('sexo',$('#sexo').val());
            $.ajax({
                type: "POST",
                url: "modelo/class.estudiante.php",
                data: formData,
                contentType: false,
                processData: false,
                async: false,
                success: function (response) {
                    var result = JSON.parse(response)

                    if(result.status == false){
                        var modal = "";
                        modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="error" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex justify-center items-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-x-circle' style='color:#2a3891; font-size: 50px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msg}</h3>
                                    <button id="cerrar" style="font-size: 20px"  type="button" class="font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                        $("#body-pd").append(modal);
                    } else {
                        //OPERACION EXITOSA
                        var modal = "";
                        modal += `
                        <div z-50 id='fondoM' modal-backdrop='' class='fondo bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>
                    <div id="success" aria-modal="true" role="dialog" tabindex="-1" class="fondo flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto flex items-center justify-center">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
                                <div class="p-6 text-center">
                                    <i class='bx bx-check-circle' style='color:#2a3891; font-size: 80px' ></i>                
                                    <h3 style="font-size: 25px"  class="font-sans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${result.msg}</h3>
                                    <button id="cerrar" style="font-size: 20px" type="button" class=" font-sans text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                        $("#body-pd").append(modal);
                    }

                }
            });

        }

        

    e.preventDefault();
    
  });

  $(document).on('click','#cerrar',function(){
    $("#fondoM").remove();
    $("#error").remove();
    $("#success").remove();
    window.location.href='list_Estu.php';
});
});