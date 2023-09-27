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
    <title>Secciones por Modulo</title>
</head>

<body id="body-pd">

    <?php
    //Se inicializa la var $pag para determinar en que sección del menu se encuentra para dar estilo de enfoque
    include('recursos/menu.php');
    //Captura del modulo que estamos accediendo
    $mod = ($_GET['modulo']) ? $_GET['modulo'] : "";
    ?>








    <div class="h-screen flex flex-col overscroll-x-none">
        <div id="informacion" data_id="<?php echo $mod ?>" class="pt-20 pb-4 flex flex-row">
            <h5 class="font-sans text-lg md:text-5xl text-blue-800 font-semibold">Secciones Por</h5>
            <h5 class="font-sans pl-2 text-lg md:text-5xl text-blue-800 font-semibold">Módulo:</h5>
            <h5 id="nombres" class="font-sans pl-2 text-xl md:text-5xl text-black font-bold"></h5>
        </div>
        <div
            class="rounded bg-gray-100 flex flex-col md:flex-row mr-6 mb-4 px-4 py-4 justify-around h-auto  sm:w-full md:9/12 lg:9/12 xl:w-9/12 2xl:w-9/12">
            <div>
                <h1
                    class=" font-sans text-xl py-4 px-4 font-bold text-blue-800 lg:text-4xl sm:px-8 xl:px-12 dark:text-gray-400">
                    Información General:</h1>
            </div>
            <div class="flex flex-col">
                <h1
                    class="font-sans text-lg px-4 font-normal text-gray-800 lg:text-xl sm:px-8 xl:px-12 dark:text-gray-400">
                    Código Del Modulo</h1>
                <h1 id="codigoM"
                    class="font-sans text-lg px-4 font-bold text-red-600 lg:text-xl sm:px-8  dark:text-gray-400">
                </h1>
            </div>
            <div class="flex flex-col">
                <h1
                    class="font-sans text-lg px-4 font-normal text-gray-800 lg:text-xl sm:px-8 xl:px-12 dark:text-gray-400">
                    Nombre Del Modulo:</h1>
                <h1 id="nombreM"
                    class="font-sans text-lg px-4 font-bold text-gray-900 lg:text-xl sm:px-8  dark:text-gray-400">
                </h1>
            </div>
            <div class="flex flex-col">
                <input id="seccion_act" type="hidden" value="">
                <h1
                    class=" font-sans text-lg px-4 font-normal text-gray-800 lg:text-xl sm:px-8 xl:px-12 dark:text-gray-400">
                    Cantidad De Alumnos:</h1>
                <h1 id="cantidadM"
                    class="font-sans text-lg px-4 font-bold text-gray-900 lg:text-xl sm:px-8  dark:text-gray-400">
                </h1>
            </div>
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
                    <input type="search" id="searchSecciones"
                        class="font-sans block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar Seccion">
                    <button type="button" id=""
                        class="ml-4 lg:ml-96 font-sans text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        data-modal-target="cantidad_estudiante" data-modal-toggle="cantidad_estudiante"
                        data-tooltip-target="agregar">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <div id="agregar" role="tooltip"
                        class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Agregar Sección
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <!-- <div id="generarReporte"
                        class="ml-2 lg:ml-96 mr-2 font-sans text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        data-tooltip-target="generar">
                        <a href="modelo/class.pdf.php?modulo=<?php echo $mod ?>" target="_blank"
                            data-modal-target="defaultModal" data-modal-toggle="defaultModal">
                            <lord-icon src="https://cdn.lordicon.com/iiixgoqp.json" trigger="hover"
                                style="width:3rem;height:2.0rem" colors="primary:#ffffff">
                            </lord-icon>
                            <div id="generar" role="tooltip"
                                class=" font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Generar Reporte
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </a>
                    </div>-->
                </div>
            </div>
        </form>



        <!-- Main modal -->
        <div id="cantidad_estudiante" tabindex="-1" aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-200">
                        <h3 class="font-sans text-xl font-semibold text-gray-900 dark:text-white">
                            Cantidad de Secciones
                        </h3>
                        <button type="button" id="closeModal"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="cantidad_estudiante">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form id="frmCrearSecciones">
                        <div class="px-8 py-8">
                            <label for="number"
                                class="font-sans block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digite
                                la cantidad de secciones:</label>
                            <input type="number" id="cantiSecc"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                        </div>
                        <!-- Modal footer -->
                        <div
                            class="flex flex-row-reverse items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="cantidad_estudiante" id="closeModal" type="button"
                                class=" font-sans text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 ml-2 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                            <button data-modal-hide="cantidad_estudiante" type="submit" id="CrearSecciones"
                                class="font-sans text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear
                                Sección</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div class="flex flex-col md:flex-row flex-wrap overscroll-x-none gap-x-12 gap-y-4 mt-2 pb-4 pt-4">
            <!-- AQUI SE IMPRIMEN LAS SECCIONES DE ESTE MODULO -->
            <div id="secciones"
                class="flex flex-col md:flex-row flex-wrap overscroll-x-none gap-x-12 gap-y-4 mt-2 pb-4 pt-4"">
            </div>
        </div>
        <!-- lISTADO DE ESTUDIANTES EN SECCION -->
        <div id="extralarge-modal" tabindex="-1"
                class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full lg:my-22 md:my-10  max-h-full lg:flex justify-center items-center">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-300">
                            <h3 class="font-sans text-xl font-medium text-gray-900 dark:text-white">
                                Listado de Estudiantes&nbsp;
                            </h3>
                            <p class="font-sans text-xl font-medium text-gray-900 dark:text-white" id=seccioness> </p>
                            <button id="closeModal" type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="extralarge-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="overscroll-x-none px-4 py-4">
                            <div class="relative overflow-x-auto ">
                                <div class="flex items-center lg:flex-row-reverse  justify-between  px-4 py-2">
                                    <label for="table-search" class="sr-only font-sans">Search</label>
                                    <div class="flex flex-row">
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 left-0 flex items-center pl-3 pb-1 pointer-events-none">
                                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input type="text" id="buscarEstuSeccion"
                                                class="font-sans block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg h-full w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Buscar Estudiante">
                                        </div>
                                        <div class="flex flex-row " data-modal-hide="extralarge-modal"
                                            data-modal-target="extralarge-modal1" data-modal-toggle="extralarge-modal1">
                                            <a id="agregarEstu" type="button"
                                                class="ml-2 font-sans text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                data-modal-target="defaultModal" data-modal-toggle="defaultModal"
                                                data-tooltip-target="agregar2">
                                                <i class="fa-solid fa-user-plus" style="color: #ffffff;"></i>
                                            </a>
                                            <div id="agregar2" role="tooltip"
                                                class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                Agregar Estudiante
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="relative overflow-x-auto px-4 py-4">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                        <thead
                                            class="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="font-sans px-6 py-3 rounded-l-lg">
                                                    Nombre del Estudiante.
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Programa
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Estado
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Edad
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Número de Teléfono (Encargado)
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3 rounded-r-lg">
                                                    Asignación
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="alumnosModulo">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="flex flex-row justify-end mt-4 mb-4 mr-4">
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
                        </div>
                    </div>
                </div>
            </div>





            <!--AGREGAR ESTUDIANTE-->
            <div id="extralarge-modal1" tabindex="-1"
                class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-7xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-300">
                            <h3 class="font-sans text-xl font-medium text-gray-900 dark:text-white">
                                Agregar Estudiantes
                            </h3>
                            <button type="button" id="closeModal"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="extralarge-modal1">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="overscroll-x-none px-4 py-4">
                            <div class="relative overflow-x-auto ">
                                <div class="flex items-center flex-row-reverse  justify-between">
                                    <label for="table-search" class="sr-only font-sans">Search</label>
                                    <div class="flex flex-row mr-4">
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 left-0 flex items-center pl-3 pb-1 pointer-events-none">
                                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input type="text" id="buscarEstuModulo"
                                                class="font-sans block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg h-full w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Buscar Estudiante">
                                        </div>
                                    </div>
                                </div>
                                <div class="relative overflow-x-auto px-4 py-4">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                        <thead
                                            class="text-xs text-white uppercase bg-green-700 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="font-sans px-6 py-3 rounded-l-lg">
                                                    Nombre del Estudiante.
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Programa
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Sexo
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Edad
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3">
                                                    Número de Teléfono (Encargado)
                                                </th>
                                                <th scope="col" class="font-sans px-6 py-3 rounded-r-lg">
                                                    Asignación
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="alumnosSin">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="flex flex-row justify-end mt-4 mb-4 mr-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="flex items-center -space-x-px h-8 text-sm">
                                            <li id="botonPrevi1" class="font-sans flex items-center">
                                            </li>
                                            <!-- Enlaces de paginación se generarán aquí -->
                                            <li id="paginacion1" class="font-sans flex items-center">
                                            </li>
                                            <li id="botonNext1">
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="flex flex-row justify-end">
                                    <div class="flex flex-col pb-2 flex-end">
                                        <h5 id="tabs1" class="text-sm font-sans py-2"></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js"
        integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>


    <script id="next" src="controlador/seccion.js"></script>

</body>

</html>