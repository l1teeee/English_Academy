<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    include('recursos/head-style.php');
    session_start();
    if(!isset($_SESSION['id'])){
        header("location: loginPersonal.php");
    }
    ?> 
    <title>Soporte Técnico CDB - Personal</title>
</head>
<body id="body-pd">

<?php
$pag = "Personal"; //Se inicializa la var $pag para determinar en que sección del menu se encuentra para dar estilo de enfoque
include('recursos/menu.php');
?>

<!-- Contenido del sitio web-->
<h1 class="text-5xl font-extrabold dark:text-white" style="margin-top: 8vw;" ><span style="color: #2a3891;">Administración de </span> <span style="color: #4d227c;"> Personal</span></h1>
<br>

<!-- Form - Filtros-->
<form>
    
<div class="grid md:grid-cols-2 md:gap-6">
<div class="mb-6">
<div class="flex">
    <span  style="font-size: 20px" class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">Buscar:</span>
    <input  style="font-size: 20px" type="text" id="txtBuscar" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escriba aquí...">
</div>
</div>
<div class="mb-6 flex justify-end">
<button  style="font-size: 20px" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><i class='bx bx-search' style='color:#ffffff' ></i></button>
<a type="button" href="agregar_personal.php" style="font-size: 20px" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> <i class='bx bx-plus'></i></a></div>
</div>

</form>

<br>

<!--CURD-->
<div class="grid md:grid-cols-1 md:gap-6">

<!--Cada <div/> respresenta un producto-->
<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 " style="font-size: 20px">
            <tr>
                <th scope="col" class="py-3 px-6 rounded-l-lg">
                    Id personal
                </th>
                <th scope="col" class="py-3 px-6">
                    Nombre
                </th>
                <th scope="col" class="py-3 px-6 ">
                    Usuario
                </th>
                <th scope="col" class="py-3 px-6 ">
                    Tipo
                </th>
                <th scope="col" class="py-3 px-6 ">
                    Area
                </th>
                <th scope="col" class="py-3 px-6 rounded-l-lg">
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody style="font-size: 20px" id="items">

        </tbody>
    </table>
    
</div>
    
</div>

</div>
    
<script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<script src="controlador/personal.js"></script>
</body>
</html>