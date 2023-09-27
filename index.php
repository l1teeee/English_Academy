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



    <!--Link para aplicar fuente-->
    <link href="http://fonts.cdnfonts.com/css/tw-cen-mt-condensed" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://kit.fontawesome.com/b7bea40bc9.js" crossorigin="anonymous"></script>
    <title>Academy- Login Personal</title>
</head>

<body class="bg-center bg-no-repeat w-screen h-screen bg-gray-400 bg-blend-multiply object-cover"
    style="background-image: url('media/fondoOri.jpeg')">

    <section class=" px-5 lg:px-0 h-screen flex justify-center items-center">
        <div class=" pt-5  mx-auto  max-w-screen-md pb-3 lg:pt-6 backdrop-sepia-0 bg-white/50 rounded-lg h-screen flex justify-center items-center" style="height:auto">
            <!--  para el div de arriba-->
            <form class="flex flex-col" id="fmrLogin" method="post" onsubmit="return validarLogin()">
                <a href="#" class="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src="media/logo academia.png" alt="logo"
                        style="display: block; margin-left: auto; margin-right: auto; width: 70%;">
                </a>
                <div class="px-0">
                    <div class="py-1 lg:py-2">
                        <h5 class="text-xl text-center font-medium text-gray-800 dark:text-white">
                        </h5>
                        <div class="px-8 pt-4 space-y-4">
                            <label style="font-size: 18px" for="input-group-1"
                                class="block mb-2 text-sm font-medium text-white dark:text-white">Correo
                                institucional:</label>
                            <div class="relative mb-2">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z">
                                        </path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </div>
                                <input type="text" id="txtUsuario"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="usuario@cdb.edu.sv">
                            </div>
                            <label style="font-size: 18px" for="website-admin"
                                class="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                            <div class="" x-data="{ show: true }">
                                <div class="relative mb-2">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <i class="fa-solid fa-lock" style="color: #616770;"></i>
                                    </div>
                                    <input placeholder="••••••••" id="txtPassword" :type="show ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full 
                                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                    focus:placeholder-gray-500
                                    focus:bg-white 
                                    focus:border-gray-600  
                                    focus:outline-none
                                    pl-10">
                                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">

                                        <svg class="h-6 text-gray-700" fill="none" @click="show = !show"
                                            :class="{'hidden': !show, 'block':show }" xmlns="http://www.w3.org/2000/svg"
                                            viewbox="0 0 576 512">
                                            <path fill="currentColor"
                                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                            </path>
                                        </svg>

                                        <svg class="h-6 text-gray-700" fill="none" @click="show = !show"
                                            :class="{'block': !show, 'hidden':show }" xmlns="http://www.w3.org/2000/svg"
                                            viewbox="0 0 640 512">
                                            <path fill="currentColor"
                                                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                            </path>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center items-center mt-8">
                                <button style="font-size: 20px" type="submit"
                                class="w-full focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm py-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">                                    
                                Sign in</button>
                            </div>
                            <div id="errorLogin" class="text-center"></div>
                        </div>
                        <div class="mx-8 px-5 pt-4">
                            <div class="mx-4 flex" style="justify-content:space-between">
                                <div class="border-t-4 border-gray-10 border-4 flex items-center w-full"
                                    style="margin-right:2rem;">
                                </div>
                                <div class="flex justify-center items-center">
                                    <h5 class="text-center absolute text-xl text-center text-white w-full">
                                        Or
                                    </h5>
                                </div>
                                <div class="border-t-4 border-gray-100 border-4 flex items-center w-full"
                                    style="margin-left:2rem;">
                                </div>
                            </div>




                            <div class="flex justify-center items-center mt-8">
                                <button type="button"
                                    class="text-black bg-white bg-[#ffff] hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg border-2  text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                    <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false"
                                        data-prefix="fab" data-icon="google" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                        <path fill="currentColor"
                                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                                        </path>
                                    </svg>
                                    Sign in with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>

    

    <script src="https://code.jquery.com/jquery-3.6.1.js"
        integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="controlador/loginPersonal.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    <script src="js/validaciones.js"></script>
</body>

</html>

<style>
    * {
        font-family: 'Work Sans', sans-serif;
    }
</style>