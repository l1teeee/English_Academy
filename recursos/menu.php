<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
    <link rel="shortcut icon" href="media/log.png" type="image/x-icon">



    <!--Link para aplicar fuente-->
    <link href="http://fonts.cdnfonts.com/css/tw-cen-mt-condensed" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://kit.fontawesome.com/b7bea40bc9.js" crossorigin="anonymous"></script>
</head>

<!-- Menú -->
<header class="header" id="header">
    <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
    <div>
        <div class="header_img"> <img src="media/pic.jpg" alt="hola"> </div>

        <!-- <?php if ($_SESSION['tipo'] == "trabajador") { ?>
            <div class="header_img"> <img src="media/Trabajadores/<?php echo $_SESSION['imagen']; ?>" alt="hola"> </div>
        <?php } else { ?>
            <div class="header_img"> <img src="media/Personal/<?php echo $_SESSION['imagen']; ?>" alt="hola"> </div>
        <?php } ?> -->
    </div>
</header>

<?php
    if($_SESSION['tipo']=="Coordinador"){
?>
<div class="l-navbar overscroll-x-none" id="nav-bar" style="font-size: 20px">
    <nav class="nav">
        <div>
            <a href="dashboard.php" class="nav_logo"> <img src="media/log.png" style="height: 30px" /> <span
                    class="nav_logo-name font-sans ">Academy</span> </a>
            <div class="nav_list">
                <a href="list_Estu.php" class="nav_link " ><i class='bx bx-book-reader' data-tooltip-target="tooltip-right"
                    data-tooltip-placement="right" style="font-size:1.6rem;"></i><span
                        class="nav_name font-sans text-base">Estudiantes</span> </a>
                <div id="tooltip-right" role="tooltip"
                    class="font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Estudiantes
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <a href="list_Egresados.php" class="nav_link " ><i class='bx bxs-graduation' data-tooltip-target="tooltip-right3"
                    data-tooltip-placement="right" style="font-size:1.6rem;"></i><span
                        class="nav_name font-sans text-base">Estudiantes Egresados</span> </a>
                <div id="tooltip-right3" role="tooltip"
                    class="font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Estudiantes Egresados
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <a href="list_Nivel.php" class="nav_link " ><i class='bx bxs-group' data-tooltip-target="tooltip-right1"
                    data-tooltip-placement="right" style="font-size:1.6rem;"></i><span
                        class="nav_name font-sans text-base">Modulos</span> </a>
                <div id="tooltip-right1" role="tooltip"
                    class="font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Modulos
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                <a href="controlador/cerrarSesion.php?cerrar=yes" class="nav_link" > <i class='bx bx-log-out nav_icon' data-tooltip-target="tooltip-right2"
                    data-tooltip-placement="right"></i> <span
                        class="nav_name font-sans text-base">Cerrar
                        sesión</span> </a>
                <div id="tooltip-right2" role="tooltip"
                    class="font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Cerrar Sesión
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                
            </div>
        </div>
        
    </nav>
</div>

<?php 
} else if($_SESSION['tipo']=="Colecturia"){

    ?>
<div class="l-navbar overscroll-x-none" id="nav-bar" style="font-size: 20px">
    <nav class="nav">
        <div>
            <a href="dashboard.php" class="nav_logo"> <img src="media/log.png" style="height: 30px" /> <span
                    class="nav_logo-name font-sans ">Academy</span> </a>
            <div class="nav_list">
                <a href="list_Estu.php" class="nav_link " ><i class='bx bx-book-reader' data-tooltip-target="tooltip-right"
                    data-tooltip-placement="right" style="font-size:1.6rem;"></i><span
                        class="nav_name font-sans text-base">Estudiantes</span> </a>
                <div id="tooltip-right" role="tooltip"
                    class="font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Estudiantes
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                <a href="controlador/cerrarSesion.php?cerrar=yes" class="nav_link" > <i class='bx bx-log-out nav_icon' data-tooltip-target="tooltip-right2"
                    data-tooltip-placement="right"></i> <span
                        class="nav_name font-sans text-base">Cerrar
                        sesión</span> </a>
                <div id="tooltip-right2" role="tooltip"
                    class="font-sans absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Cerrar Sesión
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                
            </div>
        </div>
        
    </nav>
</div>

<?php
}
?>