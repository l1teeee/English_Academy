<?php

require_once("class.conexion.php");

$action = $_POST["action"];
$json = array();

if($action == "agregar"){
    $descripcion = $_POST['descripcion'];
    $nombre = $_POST["nombre"];
    $id = $_POST["id"];
    $prioridad = $_POST["prioridad"];
    date_default_timezone_set('America/El_Salvador');
    $fechaActual = date('Y-m-d');
    $horaActual = date('h:i:s');
    $estado = "espera";
    $porcentaje = 0;
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Agregar_ticket (?,?,?,?,?,?,?,?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $estado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 3 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 4 , $descripcion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 5 , $porcentaje, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 6 , $prioridad, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 7 , $fechaActual, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 8 , $horaActual, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
            }else{
                $json['status'] = false;
                $json['msg'] = "ERROR AL AGREGAR";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "CON LA DB";
        }
    echo json_encode($json);
}

if($action == "editar"){
    $descripcion = $_POST['descripcion'];
    $nombre = $_POST["nombre"];
    $id = $_POST["id"];
    $prioridad = $_POST["prioridad"];
    $porcentaje = 0;
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Editar_ticket (?,?,?,?)");
            $stmt->bindParam( 1 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $descripcion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 3 , $prioridad, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 4 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
            }else{
                $json['status'] = false;
                $json['msg'] = "ERROR AL EDITAR";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "CON LA DB";
        }
    echo json_encode($json);
}

if($action == "mostrarEspera"){
    $id = $_POST["id"];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Tickets_Espera (?);");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen tickets en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "mostrarEspera2"){
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Tickets_Espera2 ();");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen tickets en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "mostrarAceptados"){
    $id = $_POST["id"];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Tickets_Aceptados (?);");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen tickets en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "mostrarAceptados2"){
    $id = $_POST["id"];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Tickets_Aceptados2 (?);");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen tickets en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}


if($action == "mostrarCancelados"){
    $id = $_POST["id"];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Tickets_Cancelados (?);");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen tickets en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "ficha"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Ficha_ticket (?)");
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

if($action == "cancelar"){
    $id = $_POST['id'];
    $estado = "cancelado";
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Estado_ticket (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $estado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "aceptar"){
    $id = $_POST['id'];
    $idTra = $_POST['idPer'];
    $estado = "aceptado";
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Aceptar_ticket (?,?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $estado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 3 , $idTra, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "eliminar"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Eliminar_ticket (?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "restaurar"){
    $id = $_POST['id'];
    $estado = "espera";
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Estado_ticket (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $estado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "editarPrioridad"){
    $id = $_POST["id"];
    $prioridad = $_POST["prioridad"];
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Editar_prioridad (?,?)");
            $stmt->bindParam( 1 , $prioridad, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
            }else{
                $json['status'] = false;
                $json['msg'] = "ERROR AL EDITAR";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "CON LA DB";
        }
    echo json_encode($json);
}

if($action == "actualizar"){
    $id = $_POST["id"];
    $comentario = $_POST["comentario"];
    $porcentaje = $_POST["porcentaje"];
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Actualizar_ticket (?,?,?)");
            $stmt->bindParam( 1 , $porcentaje, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 3 , $comentario, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
            }else{
                $json['status'] = false;
                $json['msg'] = "ERROR AL EDITAR";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "CON LA DB";
        }
    echo json_encode($json);
}

if($action == "solucion"){
    $id = $_POST['id'];
    $estado = "solucionado";
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Estado_ticket (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $estado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "mostrarSolucionados"){
    $id = $_POST["id"];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Tickets_Solucionados (?);");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen tickets en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "buscarIdEspera"){
    $id = $_POST['id'];
    if($_POST['idPer'] != null){
        $idPer = $_POST['idPer'];
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Buscar_Espera2 (?,?)");
            $stmt->bindParam( 1 , $idPer, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($count > 0){
                $json['status'] = true;
                $json['data'] = $data;
            }else{
                $json['status'] = false;
                $json['msg'] = "Ningun ticket encontrado";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "No se pudo conectar a la DB";
        }
    }else{
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Buscar_Espera (?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($count > 0){
                $json['status'] = true;
                $json['data'] = $data;
            }else{
                $json['status'] = false;
                $json['msg'] = "Ningun ticket encontrado";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "No se pudo conectar a la DB";
        }
    }
    
    echo json_encode($json);
}

if($action == "buscarIdProceso"){
    $id = $_POST['id'];
    $idPer = $_POST['idPer'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Buscar_Proceso (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $idPer, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = "Ningun ticket encontrado";
        }
    }else{
        $json['status'] = false;
        $json['msg'] = "No se pudo conectar a la DB";
    }
    echo json_encode($json);
}

if($action == "buscarIdSolucionado"){
    $id = $_POST['id'];
    $idPer = $_POST['idPer'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Buscar_Solucionado (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $idPer, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = "Ningun ticket encontrado";
        }
    }else{
        $json['status'] = false;
        $json['msg'] = "No se pudo conectar a la DB";
    }
    echo json_encode($json);
}

if($action == "buscarIdAceptados"){
    $id = $_POST['id'];
    $idPer = $_POST['idPer'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Buscar_Aceptados (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $idPer, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = "Ningun ticket encontrado";
        }
    }else{
        $json['status'] = false;
        $json['msg'] = "No se pudo conectar a la DB";
    }
    echo json_encode($json);
}

if($action == "buscarIdCancelados"){
    $id = $_POST['id'];
    $idPer = $_POST['idPer'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Buscar_Cancelados (?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $idPer, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = "Ningun ticket encontrado";
        }
    }else{
        $json['status'] = false;
        $json['msg'] = "No se pudo conectar a la DB";
    }
    echo json_encode($json);
}

if($action == "pdf"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL pdf (?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = "Ningun ticket encontrado";
        }
    }else{
        $json['status'] = false;
        $json['msg'] = "No se pudo conectar a la DB";
    }
    echo json_encode($json);
}

if($action == "borrarSolucionados"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Borrar_solucionados (?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = "No se pudo eliminar los tickets";
        }
    }else{
        $json['status'] = false;
        $json['msg'] = "No se pudo conectar a la DB";
    }
    echo json_encode($json);
}

?>