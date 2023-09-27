<?php
    if(isset($_GET['cerrar'])){
        session_start();
        
        $_SESSION['id'] = NULL;
        $_SESSION['tipo'] = NULL;
        $_SESSION['nombre'] = NULL;
        $_SESSION['apellido'] = NULL;
        unset($_SESSION['id']);
        unset($_SESSION['tipo']);
        unset($_SESSION['nombre']);
        unset($_SESSION['apellido']);
        session_destroy();

        header("Location: ../index.php");
        
    }
?>