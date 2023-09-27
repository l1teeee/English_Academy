$(document).ready(function () {

    if($("#modulo").length){
        mostrarModulos();
    }

    function mostrarModulos(){
        let action = "lista";
        $.ajax({
            type: "POST",
            url: "modelo/class.modulo.php",
            data: {
                action: action,
            },
            success: function (response) {
                var modulos = JSON.parse(response);
                var resultado = `<option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value = "" selected>Seleccionar Módulo</option>`;

                if(modulos.status == true){
                    modulos.data.forEach((modulo)=>{
                        resultado += `
                        <option class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark" style="background-color: white; color: black;" value ="${modulo.id_modulo}">${modulo.id_modulo}</option>
                        `;
                    })
                }

                $('#modulo').html(resultado);
            }
        });
    }

    $('#frmEstudiante').submit(function(e){
       //alert("Existe un parentesco " + $('#dropdownDefaultButton2').text())

        //EXPRESIONES REGULARES
        var texto = /^([A-ZÁÉÍÓÚa-zñáéíóúÁÉÍÓÚ\.]+[\s]*)+$/;
        var nums = /^[1-9][0-9]?$|^100$/;
        var regxcorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var regxtel= /[0-9]{4}\-[0-9]{4}/
        var rexfac = /^FAC\d{4,6}$/;
        //Variable de validacion para que todos los datos esten correctos
        var val = true;
        var correo = "";

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

        if($('#factura').val()!="" ){

            if(!rexfac.test($('#factura').val())){
            val = false;
            $('#factura').css('border-color','red');
            alert("Favor revise el campo de factura");
            }
        } else {
            $('#factura').css('border-color','#D1D5DB');
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

        if($('#alumnocdb').val() == "" || $('#alumnocdb').val() == null){
            val = false;
            alert('Seleccione si estudiante CDB o no');
        }

        if($('#alumnocdb').val() == "si" && $('#codigocdb').val() == ""){
            val = false;
            alert('Favor ingrese el codigo del estudiante cdb');
            $('#codigocdb').css('border-color','red');
        } else {
            $('#codigocdb').css('border-color','#D1D5DB')
        }

        if(val){
            var action = "agregar";

            var formData = new FormData(this);

            formData.append('action', action);
            formData.append('nombres', $('#nombres').val());
            formData.append('apellidos', $('#apellidos').val());
            formData.append('edad', $('#edad').val());
            formData.append('programa', $('#programa').val());
            formData.append('factura', $('#factura').val());
            formData.append('encargado', $('#encargado').val());
            formData.append('parentesco', $('#parentesco').val());
            formData.append('correo', $('#correo').val());
            formData.append('modulo',$('#modulo').val());
            formData.append('telefono',$('#telefono').val());
            formData.append('sexo',$('#sexo').val());
            formData.append('alumnocdb',$('#alumnocdb').val());
            formData.append('codigocdb',$('#codigocdb').val());

            $.ajax({
                type: "POST",
                url: "modelo/class.estudiante.php",
                data: formData,
                contentType: false,
                processData: false,
                async: false,
                success: function(response){
                    var result = JSON.parse(response);
                    //OPERACION NO XITOSA
                    
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