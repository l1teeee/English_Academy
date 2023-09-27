<?php
include('recursos/session.php');
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Link para framweork Tailwind CSS-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
    <!-- ANIMACIONES EN JQUERY -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
    <link rel="shortcut icon" href="media/log.png" type="image/x-icon">
    <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>


    <!--Link para aplicar fuente-->
    <link href="http://fonts.cdnfonts.com/css/tw-cen-mt-condensed" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://kit.fontawesome.com/b7bea40bc9.js" crossorigin="anonymous"></script>
    <?php
    include('recursos/head-style.php');

    ?>
    <title>Lista de Estudiantes</title>
</head>

<body id="body-pd">

    <?php
    $pag = "Bodega"; //Se inicializa la var $pag para determinar en que sección del menu se encuentra para dar estilo de enfoque
    include('recursos/menu.php');
    ?>



    <div class=" h-screen flex flex-col overscroll-x-none">
        <div class="pt-20 pb-4 flex flex-row">
            <h5 class="font-sans text-3xl md:text-5xl text-blue-800 font-semibold">Nuevo</h5>
            <h5 class="font-sans pl-2 text-3xl md:text-5xl text-blue-800 font-bold">Estudiante </h5>
        </div>
        <form id="frmEstudiante">
            <div class="flex flex-col md:flex-row w-full">
                <div class="w-full md:w-1/2 mb-6 md:pr-12">
                    <div class="flex flex-row">
                        <label for="nombres"
                            class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nombres:</label>
                        <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                    </div>
                    <input type="text" id="nombres"
                        class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Escribir nombres" required>
                </div>
                <div class="w-full md:w-1/2 mb-6 md:pr-12">
                    <div class="flex flex-row">
                        <label for="apellidos"
                            class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Apellidos:</label>
                        <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                    </div>
                    <input type="text" id="apellidos"
                        class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Escribir apellidos" required>
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
                                placeholder="Escribir edad" min="5" max="30" required>
                        </div>
                        <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                            <div class="flex flex-row">
                                <label for="programa"
                                    class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Programa:</label>
                                <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                            </div>
                            <select id="programa"
                                class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <option
                                    class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                    style="background-color: white; color: black;" value="" selected>Seleccionar
                                    Programa</option>
                                <option
                                    class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                    style="background-color: white; color: black;" value="Infantil">Infantil</option>
                                <option
                                    class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                    style="background-color: white; color: black;" value="Juvenil">Juvenil</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row md:flex-col xl:w-1/2 mb-6  sm:w-full xl:mr-6 lg:mr-6">
                    <div class="flex flex-col md:flex-row w-full ">
                        <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                            <label for="programa"
                                class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Módulo:</label>
                            <select id="modulo"
                                class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            </select>
                        </div>
                        <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                            <label for="nombres"
                                class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">N° de
                                Factura:</label>
                            <input type="text" id="factura"
                                class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Escribir numero de la factura">
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
                                placeholder="Escribir nombre del encargado" min="5" max="30" required>
                        </div>
                        <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6"">
                                    <div class=" flex flex-row">
                            <label for="programa"
                                class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Parentesco:</label>
                            <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                        </div>
                        <select id="parentesco"
                            class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="" selected>Seleccionar Parentesco
                            </option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Madre">Madre</option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Padre">Padre</option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Tío">Tío</option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Tía">Tía</option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Abuelo">Abuelo</option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Abuela">Abuela</option>
                            <option
                                class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                style="background-color: white; color: black;" value="Otro">Otro</option>
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
                            placeholder="Escribir correo">
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
                            placeholder="Escribir numero">
                    </div>
                </div>
            </div>
    </div>
    <div class="flex flex-col md:flex-row w-full">
        <div class="flex flex-row md:flex-col xl:w-1/2  sm:w-full  mb-6  ">
            <div class="flex flex-col md:flex-row w-full mb-6  xl:mr-6 lg:mr-6">
                <div class="xl:w-1/2 lg:w-1/2 sm:w-full mb-6  xl:mr-12 lg:mr-6 md:mr-6">
                    <div class="flex flex-row">
                        <label for="nombres"
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
                <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                    <div class="flex flex-row">
                        <label for="nombres"
                            class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Estudiante CDB:</label>
                        <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                    </div>
                    <select id="alumnocdb"
                        class="w-full font-sans text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <option
                            class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                            style="background-color: white; color: black;" value="" selected>Seleccionar respuesta
                        </option>
                        <option
                            class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                            style="background-color: white; color: black;" value="si" id="alumnocdb">Si</option>
                        <option
                            class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                            style="background-color: white; color: black;" value="no">No</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="flex flex-row md:flex-col xl:w-1/2 mb-6 hidden  sm:w-full " id="codigoEstudiante">
            <div class="flex flex-col md:flex-row w-full ">
                <div class="xl:w-1/2 lg:w-1/2 sm:w-full  mb-6 xl:mr-6 lg:mr-6 md:mr-6">
                    <div class="flex flex-row">
                        <label for="nombres"
                            class="font-sans block mb-2 text-lg font-medium text-gray-900 dark:text-white">Codigo del
                            Estudiante:</label>
                    </div>
                    <input type="text" id="codigocdb"
                        class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Escribir codigo">
                </div>
            </div>
        </div>
    </div>
    <script>
        const selectElement = document.getElementById("alumnocdb");
        const codigoEstudiante = document.getElementById("codigoEstudiante");

        selectElement.addEventListener("change", function () {
            if (selectElement.value === "si") {
                codigoEstudiante.style.display = "flex";
            } else {
                codigoEstudiante.style.display = "none";
            }
        });

        function hide(elementId) {
            const element = document.getElementById(elementId);
            element.style.display = "none";
        }

        function show(elementId) {
            const element = document.getElementById(elementId);
            element.style.display = "flex";
        }
    </script>


    <div class="flex flex-row">
        <div class="data-modal-target=" popup-modal" data-modal-toggle="popup-modal" data-tooltip-target="cancelar">
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

        <div class="data-modal-target=" popup-modal" data-modal-toggle="popup-modal" data-tooltip-target="guardar">
            <button id="guardarestu" type="submit"
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
    </form>










    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js"
        integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="controlador/agregar_estu.js"></script>
    <script src="js/cerrarMenu.js"></script>

</body>

</html>