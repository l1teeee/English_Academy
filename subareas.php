<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    include('recursos/head-style.php');
    ?> 
    <title>Soporte Técnico CDB - Equipos por área</title>
</head>
<body id="body-pd">

<?php
$pag = "Equipos-area"; 
include('recursos/menu.php');
$id = $_GET["id"];
$area = $_GET["nombre"];
?>

<!-- Contenido del sitio web-->
<h1 class="text-5xl font-extrabold dark:text-white" style="margin-top: 8vw;" ><span style="color: #2a3891;">Sub áreas: </span> <span id="areaText" style="color: #4d227c;"> </span></h1>
<br/>
<a style="font-size: 20px" href="vista_areas.php" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><i class='bx bx-arrow-back'></i> Regresar </a>
<a style="font-size: 20px" class="agregar py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Añadir nueva <i class='bx bx-plus'></i></a>

<div class="caja" data_nombre="<?php echo $area; ?>" data_id = "<?php echo $id; ?>" style="font-size: 20px; margin-bottom: 3vw; margin-top: 3vw" id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
  
</div>

<script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<script src="controlador/ver_subarea.js"></script>
</body>
</html>