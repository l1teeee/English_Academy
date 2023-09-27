<?php
session_start();
if(!isset($_SESSION['id'])){
    ?>
        <script>
            alert("Debes iniciar sesión para acceder aquí");
        </script>
    <?php
    header("location: index.php");
}


?>