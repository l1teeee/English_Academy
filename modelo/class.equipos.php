<?php
    require_once("class.conexion.php");

    $action = $_POST["action"];
    $json = array();


    if($action == "mostrar"){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){
            $stmt = $db->prepare( "CALL Ver_equipos()");
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($data){
                $json['status'] = true;
                $json['data'] = $data;
            }else{
                $json['status'] = false;
                $json['msg'] = 'No existen trabajadores en el sistema';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = 'No hay conexion';
        }
        echo json_encode($json);
    }

    if($action == "eliminar"){
        $id = $_POST['id'];
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Eliminar_Equipos (?)");
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
            $stmt = $db->prepare( "CALL Ficha_equipos (?)");
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
        $monitor = $_POST['monitor'];
        $cpu = $_POST["cpu"];
        $ups = $_POST["ups"];
        $teclado = $_POST["teclado"];
        $mouse = $_POST["mouse"];
        $extras = $_POST['impresora'];
        $area = $_POST['area'];
        $nombre = $_POST['nombre'];
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){ 
                $stmt = $db->prepare( "CALL Editar_equipo (?,?,?,?,?,?,?,?)");
                $stmt->bindParam( 1 , $monitor, PDO::PARAM_INT| PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 2 , $cpu, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 3 , $ups, PDO::PARAM_INT| PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 4 , $teclado, PDO::PARAM_INT| PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 5 , $mouse, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 6 , $extras, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 7 , $area, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 8 , $nombre, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $count = $stmt->rowCount();
                if($count > 0){
                    $json['status'] = true;
                }else{
                    $json['status'] = false;
                    $json['msg'] = "No se pudo editar el equipo";
                }
            }else{
                $json['status'] = false;
                $json['msg'] = "Fallo de conexion con la base de datos";
            }
        echo json_encode($json);
    }

    if($action == "agregar"){
        $monitor = $_POST['monitor'];
        $cpu = $_POST["cpu"];
        $ups = $_POST["ups"];
        $teclado = $_POST["teclado"];
        $mouse = $_POST["mouse"];
        $extras = $_POST['impresora'];
        $area = $_POST['area'];
        $nombre = $_POST['nombre'];
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){ 
                $stmt = $db->prepare( "CALL Agregar_equipo (?,?,?,?,?,?,?,?)");
                $stmt->bindParam( 1 , $monitor, PDO::PARAM_INT| PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 2 , $cpu, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 3 , $ups, PDO::PARAM_INT| PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 4 , $teclado, PDO::PARAM_INT| PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 5 , $mouse, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 6 , $extras, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 7 , $area, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 8 , $nombre, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $count = $stmt->rowCount();
                if($count > 0){
                    $json['status'] = true;
                }else{
                    $json['status'] = false;
                    $json['msg'] = "No se pudo agregar el equipo";
                }
            }else{
                $json['status'] = false;
                $json['msg'] = "Fallo de conexion con la base de datos";
            }
        echo json_encode($json);
    }
?>