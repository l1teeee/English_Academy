<?php

require_once("class.conexion.php");
$action = $_POST["action"];
$json = array();

if($action == "mostrar"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL `Ver_SubAreas`(?);");
        $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $sub_area = array();
        foreach($data as $subarea){
            $id_sub = $subarea["Id_sub"];
            $nombre_sub = $subarea["Nombre"];
            $id_area = $subarea["Id_area"];
            $stmt = $db->prepare( "CALL `Equipos_sub`(?);");
            $stmt->bindParam( 1 , $id_sub, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data2 = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $computadoras = array();
            if($data2 == null){

            }else{
                foreach($data2 as $elemento){
                    $computadora = array();
                    $nombre = $elemento["Nombre"];
                    $teclado = $elemento["Teclado"];
                    $mouse = $elemento["Mouse"];
                    $extra = $elemento["Extra"];
    
                    $stmt = $db->prepare( "CALL `Equipo_articulo`(?);");
                    $stmt->bindParam( 1 , $elemento["Id_monitor"], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $stmt->execute();
                    $count = $stmt->rowCount();
                    $monitor = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    $stmt = $db->prepare( "CALL `Equipo_articulo`(?);");
                    $stmt->bindParam( 1 , $elemento["Id_cpu"], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $stmt->execute();
                    $count = $stmt->rowCount();
                    $cpu = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    $stmt = $db->prepare( "CALL `Equipo_articulo`(?);");
                    $stmt->bindParam( 1 , $elemento["Id_ups"], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $stmt->execute();
                    $count = $stmt->rowCount();
                    $ups = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    foreach($monitor as $texto){
                        $monitor_nombre = $texto["Nombre"];
                    }

                    foreach($cpu as $texto){
                        $cpu_nombre = $texto["Nombre"];
                    }

                    foreach($ups as $texto){
                        $ups_nombre = $texto["Nombre"];
                    }

                    $computadora['Nombre'] = $nombre;
                    $computadora['Monitor'] = $monitor_nombre;
                    $computadora['CPU'] = $cpu_nombre;
                    $computadora['UPS'] = $ups_nombre;
    
                    if($teclado == 0){
                        $computadora['Teclado'] = "No";
                    }else{
                        $computadora['Teclado'] = "Si";
                    }
    
                    if($mouse == 0){
                        $computadora['Mouse'] = "No";
                    }else{
                        $computadora['Mouse'] = "Si";
                    }
    
                    if($extra == 0){
                        $computadora['Extra'] = "No";
                    }else{
                        $computadora['Extra'] = "Si";
                    }
                    $computadoras[] = $computadora;
                }
            }
            
            $dataNew["Id_sub"] = $id_sub;
            $dataNew["Nombre"] = $nombre_sub;
            $dataNew["Id_area"] = $id_area;
            $dataNew["Computadoras"] = $computadoras; 
            $sub_area[] = $dataNew;
        }
        
        if($sub_area){
            $json['status'] = true;
            $json['data'] = $sub_area;
        }else{
            $json['status'] = false;
        }
    }else{
        $json['status'] = false;
    }
    echo json_encode($json);
}



if($action == "agregar"){
    $nombre = $_POST["nombre"];
    $id_area = $_POST["idArea"];
    $nombre_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú\s0-9]{3,}$~',$nombre);
    if($nombre_check){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){
            $stmt = $db->prepare( "CALL Agregar_SubArea (?,?)");
            $stmt->bindParam( 1 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $id_area, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "eliminar"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Eliminar_SubArea (?)");
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
        $stmt = $db->prepare( "CALL Ficha_SubArea (?)");
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
    
    $nombre_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú\s0-9]{3,}$~',$nombre);

    if($nombre_check ){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){ 
            $stmt = $db->prepare( "CALL Editar_SubArea (?,?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "equipos"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $dataNew = array();
        foreach($data as $elemento){
            

        }
        if($dataNew){
            $json['status'] = true;
            $json['data'] = $dataNew;
        }else{
            $json['status'] = false;
        }
    }else{
        $json['status'] = false;
    }
    echo json_encode($json);
}




?>