<?php
include('recursos/session.php');
?>
<!DOCTYPE html>
<html lang="es" class="">

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
    <title>Lista de Estudiantes</title>
</head>

<body id="body-pd">
    <?php
    $pag = "Bodega"; //Se inicializa la var $pag para determinar en que sección del menu se encuentra para dar estilo de enfoque
    include('recursos/menu.php');
    ?>
    <div class=" h-screen flex flex-col overscroll-y-none">
        <div class="pt-20 pb-4 flex flex-row">
            <h5 class="font-sans text-3xl md:text-5xl text-blue-800 font-semibold">Lista de </h5>
            <h5 class="font-sans pl-2 text-3xl md:text-5xl text-blue-800 font-bold">Estudiantes </h5>
        </div>
        <!-- ICONOS PARA BUSCAR -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-5">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li class="mr-2">
                    <a id="todos" data_id="todos" href="#"
                        class="font-sans inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
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
                    <a id="infantil" href="#"
                        class="font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <svg id="LogoI" aria-hidden="true"
                            class="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd">
                                <i id="LogoIn" class='bx bx-child h-5 mr-2'
                                    style="color: #9ca3af;font-size:1.3rem;"></i>
                            </path>
                        </svg>Infantil
                    </a>
                </li>
                <li class="mr-2">
                    <a id="juvenil" href="#"
                        class="font-sans inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <svg id="LogoJ" aria-hidden="true"
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
                <div class="flex flex-row ">
                    <input type="search" id="BuscarEstu"
                        class="font-sans block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar Estudiante">
                    <a type="button" href='agregarEstu.php'
                        class="ml-4 lg:ml-96 mr-6 font-sans text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        data-modal-target="defaultModal" data-modal-toggle="defaultModal" data-tooltip-target="agregar">
                        <i class="fa-solid fa-user-plus" style="color: #ffffff;"></i>
                    </a>
                    <div id="agregar" role="tooltip"
                        class="font-sans absolute z-10 invisible inline-block px-2 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Agregar Estudiante
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>
        </form>
        <!--TABLA-->
        <div class="relative overflow-x-auto mt-8">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-t-lg">
                <thead
                    class="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                    <tr>
                        <th scope="col" class="text-sm font-sans px-5 py-2 rounded-l-lg">
                            Nombres
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            Apellidos
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            Correo
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            N° FAC
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2">
                            Fecha ingreso
                        </th>
                        <th scope="col" class="text-sm font-sans px-5 py-2 rounded-r-lg">
                            Operaciones
                        </th>
                    </tr>
                </thead>
                <tbody id="alumnos">
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
    <!--Estudiantes-->
    <!--eliminar estudiante-->
    <div id="popup-modal" tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    </div>
    <!--Estudiantes-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js"
        integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="controlador/estudiantes.js"></script>
    <script src="js/cerrarMenu.js"></script>

</body>

</html>