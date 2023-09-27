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
    <title>Lista de Módulos</title>
</head>

<body id="body-pd">

    <?php
    $pag = "Bodega"; //Se inicializa la var $pag para determinar en que sección del menu se encuentra para dar estilo de enfoque
    include('recursos/menu.php');
    ?>
    <div class="h-screen flex flex-col">
        <div class="pt-20 pb-2 flex flex-row">
            <h5 class="font-sans text-2xl md: md:text-5xl text-blue-800 font-semibold">Módulos por </h5>
            <h5 class="font-sans pl-2 text-2xl md:text-5xl sm:text-sm text-blue-800 font-bold">Nivel</h5>
        </div>
        <div class="border-b border-gray-200 dark:border-gray-700 mb-5">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li class="mr-2">
                    <input type="hidden" id="modulo_act">
                    
                    <a id="todos" data_id="todos" href="#"
                        class=" font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                        aria-current="page">
                        <svg id="LogoT" aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                            </path>
                        </svg>Todos
                    </a>
                </li>
                <li class="mr-2">
                    <a href="#" id="infantil"
                        class=" font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <svg id="LogoI" aria-hidden="true"
                            class=" text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd">
                                <i id="LogoIn" class='bx bx-child h-5 mr-2'
                                    style="color: #9ca3af;font-size:1.3rem;"></i>
                            </path>
                        </svg>Infantil
                    </a>
                </li>
                <li class="mr-2">
                    <a href="#" id="juvenil"
                        class=" font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <svg aria-hidden="true" id="LogoJ"
                            class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd">
                                <i id="LogoJu" class='bx bx-male h-5 mr-2' style="color: #9ca3af;font-size:1.3rem;"></i>
                            </path>
                        </svg>Juvenil
                    </a>
                </li>
            </ul>
        </div>
        <form class="relative">
            <label for="default-search"
                class="font-sans mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="font-sans absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <div class="flex flex-row">
                    <input type="hidden" value="" id="codigoMod">
                    <input type="search" id="buscarModulo"
                        class="font-sans block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar Módulo">
                    <button type="button"
                        class="ml-4 lg:ml-96 font-sans text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        data-modal-target="agregarModulo" data-modal-toggle="agregarModulo"
                        data-tooltip-target="agregar">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <div id="agregar" role="tooltip"
                        class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Agregar Módulo
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <!-- BOTON PARA AVANZAR A TODOS DE NIVEL -->
                    <div id="generarReporte"
                        class="ml-2 lg:ml-96 mr-2 font-sans text-white  bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        data-tooltip-target="generar">
                        <a data-modal-target="defaultModal" data-modal-toggle="defaultModal">
                            <lord-icon src="https://cdn.lordicon.com/egiwmiit.json" trigger="hover"
                                style="width:3rem;height:2.0rem" colors="primary:#ffffff">
                            </lord-icon>
                            <div id="generar" role="tooltip"
                                class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Siguiente Módulo
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </form>
        <div class="relative overflow-x-auto mt-8">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-t-lg">
                <thead
                    class="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                    <tr>
                        <th scope="col" class="text-sm font-sans px-5 py-2 rounded-l-lg">
                            Código
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            Nombre
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            Cantidad Alumnos
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            N° de Secciones
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2 rounded-r-lg">
                            Operaciones
                        </th>
                    </tr>
                </thead>
                <tbody id="modulos">
                </tbody>
            </table>
        </div>
        <div class="flex flex-row justify-end mt-4 mb-4">
            <nav aria-label="Page navigation example">
                <ul class="flex items-center -space-x-px h-8 text-sm">
                    <li id="botonPrevi" class="font-sans flex items-center">
                    </li>
                    <!-- Enlaces de paginación se generarán aquí -->
                    <li id="paginacion" class="font-sans flex items-center">
                    </li>
                    <li id="botonNext">
                    </li>
                </ul>
            </nav>
        </div>
        <div class="flex flex-row justify-end">
            <div class="flex flex-col pb-2 flex-end">
                <h5 id="tabs" class="text-sm font-sans py-2"></h5>
            </div>
        </div>
    </div>

    <div id="agregarModulo" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                    <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                        Crear Modulo
                    </h3>
                    <button id="close" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="agregarModulo">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form id="frmAddModulo">
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <div class="flex flex-row">
                                    <label for="nombres"
                                        class="font-sans block mb-2 text-xl font-medium text-gray-900 dark:text-white">Nombre
                                        del Modulo:</label>
                                    <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                </div>
                                <!-- INPUT PARA LOS NOMBRES -->
                                <input type="text" id="nombre"
                                    class="font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Escribir nombres" required>
                            </div>
                            <div class="relative z-0 w-full mt-auto mb-6 group">
                                <select id="programa"
                                    class="w-full font-sans text-dark bg-white border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    required>
                                    <option
                                        class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                        style="background-color: white; color: black;" value="" selected>Seleccionar
                                        Programa
                                    </option>
                                    <option
                                        class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                        style="background-color: white; color: black;" value="Infantil">Infantil
                                    </option>
                                    <option
                                        class="font-sans block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black text-dark"
                                        style="background-color: white; color: black;" value="Juvenil">Juvenil</option>
                                </select>
                            </div>
                        </div>
                </div>
                <div
                    class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit"
                        class="font-sans text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear
                        Modulo</button>
                    <button data-modal-hide="agregarModulo" id="close" type="button"
                        class="font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                </div>
                </form>
            </div>
        </div>
    </div>

    <!-- PARA HACER EL REPORTE DE LA ASISTENCIA -->
    <!-- <div id="ReporteAsistencia" data-modal-target data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                    <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                        Crear Modulo
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
                <div class="p-6 space-y-6">
                    <form id="frmAsistencia">
                        <div class="">
                            <div class="relative z-0 w-full mb-6 group">
                                <div class="flex flex-row">
                                    <label for="nombres"
                                        class="font-sans block mb-2 text-xl font-medium text-gray-900 dark:text-white">Fecha de Inicio:</label>
                                    <h5 class="font-sans text-red-500 text-lg font-bold ml-1"> *</h5>
                                    <h6>Favor, ingresar la fecha del primer dia de clases.</h6>
                                </div>
                                <input type="date" id="fechaInicio"
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
    </div> -->






    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js"
        integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="controlador/bodega.js"></script>
    <script src="controlador/agregar_mod.js"></script>
    <script id="next" src="controlador/modulos.js"></script>

</body>

</html>