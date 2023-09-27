<?php

require_once("class.conexion.php");
$action = $_POST["action"];
$json = array();

if($action == "mostrar"){
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL `Ver_Areas`();");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen pacientes en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "agregar"){
    $nombre = $_POST["nombre"];
    $coordinador = $_POST["coordinador"];
    $correo = $_POST["correo"];
    
    $nombre_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú\s0-9]{3,}$~',$nombre);
    $coordinador_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú\s\._-]{3,}$~',$coordinador);
    $correo_check = preg_match('~^[a-zA-Z0-9\._-]+@[cdb]+\.[edu]+\.s+v$~',$correo);

    if($nombre_check && $coordinador_check && $correo_check ){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Agregar_Area (?,?,?)");
            $stmt->bindParam( 1 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $coordinador, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 3 , $correo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $id = $db->lastInsertId();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
                $json['msg'] = '<h1 id="mensaje">Paciente ingresado correctamente</h1>';
                $json['boton1'] = '<a href="ficha.php'.$id.'" class="resultantes">Ver ficha</a>';
                $json['boton2'] = '<a href="pacientes.php?" class="resultantes">Salir</a>';
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> Error al ingresar el paciente </h1>';
                $json['boton1'] = '<a href="pacientes.php">Salir</a>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
            $json['boton1'] = '<a href="pacientes.php">Salir</a>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> Datos ingresados incorrectos </h1>';
        $json['boton1'] = '<a href="pacientes.php?">Salir</a>';
    }
    echo json_encode($json);
}

if($action == "eliminar"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Eliminar_area (?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        if($count > 0){
            $json['status'] = true;
        }else{
            $json['status'] = false;
        }
    }else{
        $json['status'] = false;
    }
    echo json_encode($json);
}

if($action == "ficha"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Ficha_Area (?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
        }
    }else{
        $json['status'] = false;
    }
    echo json_encode($json);
}

if($action == "editar"){
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $coordinador = $_POST["coordinador"];
    $correo = $_POST["correo"];
    
    $nombre_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú\s0-9]{3,}$~',$nombre);
    $coordinador_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú\s\._-]{3,}$~',$coordinador);
    $correo_check = preg_match('~^[a-zA-Z0-9\._-]+@[cdb]+\.[edu]+\.s+v$~',$correo);

    if($nombre_check && $coordinador_check && $correo_check ){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Editar_Area (?,?,?,?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 3 , $coordinador, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 4 , $correo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
            }else{
                $json['status'] = false;
            }
        }else{
            $json['status'] = false;
        }
    }else{
        $json['status'] = false;
    }
    echo json_encode($json);
}


?>