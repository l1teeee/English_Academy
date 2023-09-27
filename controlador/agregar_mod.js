$(document).ready(function () {
    
    $("#frmAddModulo").submit(function (e) { 
        
       let nombre = $('#nombre').val();
       let programa = $('#programa').val();
       var val = true;
        
       if(nombre == "" || nombre == null){
        $('#nombre').css("border-color",'red');
        alert("Revise el campo del nombre");
        val = false;
       }

       if(programa == "" || programa == null){
        $('#programa').css('border-color', 'red');
        alert("Seleccione una opcion");
        val = false
       }

       if(val){
            var action = "agregar";
            var data = new FormData(this);

            data.append('action', action);
            data.append('nombre', nombre);
            data.append('programa', programa);

        $.ajax({
            type: "POST",
            url: "modelo/class.modulo.php",
            data: data,
            contentType: false,
            processData: false,
            async: false,
            success: function (response) {
                var result = JSON.parse(response);

                $('#agregarModulo').hide();

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
        
    });
});