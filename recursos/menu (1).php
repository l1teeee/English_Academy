<!-- Menú -->
<header class="header" id="header">
    <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>   
    <div class="header_img"><img src="https://innovation.com.mx/assets/images/avatar.png" alt="" > </div>
    <button type="button" data-modal-toggle="notif">
        <i class='bx bxs-bell' style="font-size: 20px; color: #2a3891"></i>
    </button>
</header>
<div class="l-navbar" id="nav-bar" style="font-size: 20px">
    <nav class="nav">
        <div> <a href="#" class="nav_logo"> <img src="media/logo-menu.png" style="height: 30px"/> <span class="nav_logo-name">Soporte Técnico CDB</span> </a>
            <div class="nav_list"> 
                <?php
                if($pag == "Articulos"){
                    ?>
                    <!--clase (active) para dar enfoque en la sección del menú en que se encuentre-->
                    <a href="#" class="nav_link active"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a> 
                    <?php
                }
                if($pag == "Equipos"){
                    ?>
                    <a href="#" class="nav_link"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link active"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a>                     
                    <?php
                }
                if($pag == "Bodega"){
                    ?>
                    <a href="#" class="nav_link"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link active"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a>                     
                    <?php
                }
                if($pag == "Chatarra"){
                    ?>
                    <a href="#" class="nav_link"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link active"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a> 
                    <?php
                }
                if($pag == "Equipos-area"){
                    ?>
                    <a href="#" class="nav_link"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link active"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a> 
                    <?php
                }
                if($pag == "Tickets"){
                    ?>
                    <a href="#" class="nav_link"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link active"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a> 
                    <?php
                }
                if($pag == "Dashboard"){
                    ?>
                    <a href="#" class="nav_link"> <i class='bx bxs-devices nav_icon'></i> <span class="nav_name">Artículos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-desktop nav_icon'></i> <span class="nav_name">Equipos</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-box nav_icon'></i> <span class="nav_name">Bodega</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-scatter-chart nav_icon'></i></i> <span class="nav_name">Chatarra</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bx-buildings nav_icon'></i></i> <span class="nav_name">Equipos por área</span> </a> 
                    <a href="#" class="nav_link"> <i class='bx bxs-receipt nav_icon'></i> <span class="nav_name">Tickets</span> </a> 
                    <?php
                }
                ?>
            </div>
         </div>
        <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">Cerrar sesión</span> </a>
    </nav>
</div>

<!-- Notificaciones  -->
<div id="notif" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h1 class="text-5xl font-extrabold dark:text-white"><span style="color: #2a3891;">Notificaciones del</span> <span style="color: #4d227c;"> sistema</span>
                </h1>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="notif">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
        </div>

           
            <div class="p-6 space-y-6">
            <!--Table-->
<div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400" style="font-size: 20px">
            <tr>
                <th scope="col" class="py-3 px-6 rounded-l-lg">
                    Mensaje
                </th>
                <th scope="col" class="py-3 px-6">
                    Enviado por
                </th>
                <th scope="col" class="py-3 px-6 rounded-r-lg">
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody style="font-size: 20px">
           
            
            <tr class="bg-white dark:bg-gray-800">
                <td class="py-4 px-6">
                    ¡Hola de nuevo!
                </td>
                <td class="py-4 px-6">
                    Francisco Solano
                </td>
                <td class="py-4 px-6">
                <a  href="check-ticket.php" style="font-size: 20px" class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" data-modal-toggle="check_ticket">Ver <i class='bx bxs-binoculars'></i></a>
   
                </td>
            </tr>
           
        </tbody>
        
    </table>
</div>
</div>
                

        </div>
    </div>
</div>