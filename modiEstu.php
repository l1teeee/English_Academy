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
    $id = ($_GET['id']) ? $_GET['id'] : "";
    ?>
    <title>Lista de Estudiantes</title>
</head>

<body id="body-pd">

    <?php
    //Se inicializa la var $pag para determinar en que sección del menu se encuentra para dar estilo de enfoque
    include('recursos/menu.php');
    ?>



    <div class=" h-screen flex flex-col overscroll-x-none">
        <div class="pt-20 pb-4 flex flex-row">
            <h5 class="font-sans text-xl md:text-5xl text-blue-800 font-semibold">Modificar</h5>
            <h5 class="font-sans pl-2 text-xl md:text-5xl text-blue-800 font-semibold">Estudiante:</h5>
            <h5 id="completo" class="font-sans pl-2 text-xl md:text-5xl text-black font-bold"></h5>
            <input type="hidden" id="user" value="<?php echo $id ?>">
        </div>

       
        <form id="frmUpdate">
            
            
        </form>

    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js"
        integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="controlador/estudiantes.js"></script>
    <script src="controlador/update_estu.js"></script>

</body>

</html>