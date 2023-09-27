<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Link para framweork Tailwind CSS-->
    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.2/dist/flowbite.min.css" />
    <!--Link para aplicar fuente-->
    <link href="http://fonts.cdnfonts.com/css/tw-cen-mt-condensed" rel="stylesheet">      
    <title>Soporte Técnico CDB - Login</title>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
    

<div class="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 to-amber-700">
<div class="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6" id="fmrLogin" method="post">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="media/logo.png" alt="logo" style="display: block; margin-left: auto; margin-right: auto; width: 45%;">
      </a>
        <h5 style="font-size: 30px" class="text-xl font-medium text-gray-900 dark:text-white">Inicio de sesión</h5>
        <div>
            <label style="font-size: 20px" for="txtUsuario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correo institucional:</label>
            <input style="font-size: 20px" type="email" name="email" id="txtUsuario" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="usuario@cdb.edu.sv" required="">
            <div id="errorUsuario"></div>
        </div>
        <div>
            <label style="font-size: 20px" for="txtPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña:</label>
            <input style="font-size: 20px" type="password" name="password" id="txtPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="">
            <div id="errorContra"></div>
        </div>
        
        <button style="font-size: 20px" type="submit" class="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ingresar al sistema</button>
        <div style="font-size: 20px" class="text-sm font-medium text-gray-500 dark:text-gray-300">
            ¿Ha olvidado su contraseña? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Ingrese aquí</a>
        </div>
        <div id="errorLogin"></div>
    </form>
</div>
</div>
<script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<script src="controlador/loginTrabajador.js"></script>

</body>
</html>

<style>
  *{
    font-family: 'Tw Cen MT Condensed', 'sans-serif'; 
  }
</style>