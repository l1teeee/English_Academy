<?php

require_once("class.conexion.php");

$action = $_POST["action"];
$json = array();

if($action == "agregar"){
    $count = false;
    $uploadDir = "../media/Personal";
    $allowTypes = array('jpg', 'png', 'jpeg'); 
    $uploadStatus = 1;
    $uploadedFile = '';
    $password = $_POST['password'];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $usuario = $_POST["usuario"];
    $tipo = $_POST["tipo"];
    $area = $_POST["area"];
    $encriptada = password_hash($password, PASSWORD_BCRYPT);
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if(empty($_FILES["file"]["name"])){
        $cont = true;
    }else{
        $fileName = basename($_FILES["file"]["name"]); 
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        if(in_array($fileType, $allowTypes)){ 
            $cont = true;
        }else{
            $cont = false;
            $json['status'] = false;
            $json['msg'] = "Tipo de imagen no permitido";
        } 
    }
    if($cont){
        $stmt = $db->prepare( "CALL Agregar_personal (?,?,?,?,?,?)");
        $stmt->bindParam( 1 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $apellido, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 3 , $usuario, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 4 , $encriptada, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 5 , $tipo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 6 , $area, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($data as $content){
            $id = $content["LAST_INSERT_ID()"];
        }
        $count = $stmt->rowCount();
        if($count > 0){
            if(empty($_FILES["file"]["name"])){
                $nombre_pic = "pic.jpg";
                $uploadedFile = $nombre_pic; 
                $stmt = $db->prepare("CALL Subir_imagen_personal (?,?)");
                $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 2 , $uploadedFile, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $count = $stmt->rowCount();
                if($count > 0){
                    $json['status'] = true;
                    $json['msg'] = "Agregado correctamente";
                }else{
                    $json['status'] = false;
                    $json['msg'] = "Error al actualizar imagen";
                }
            }else{
                $nombre_pic = "personal" . $id .".jpg"; 
                if(move_uploaded_file($_FILES["file"]["tmp_name"], $uploadDir . "/" . $nombre_pic)){ 
                    $uploadedFile = $nombre_pic; 
                    $stmt = $db->prepare("CALL Subir_imagen_personal (?,?)");
                    $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $stmt->bindParam( 2 , $uploadedFile, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $stmt->execute();
                    $count = $stmt->rowCount();
                    if($count > 0){
                        $json['status'] = true;
                        $json['msg'] = "Agregado correctamente";
                    }else{
                        $json['status'] = false;
                        $json['msg'] = "Error al actualizar imagen";
                    }
                }else{ 
                    $json['status'] = false;
                    $json['msg'] = "Error al mover la imagen";
                }
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "Error al ingresar el personal";
        }
    }
    echo json_encode($json);
}

if($action == "mostrar"){
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Ver_personal ();");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $json['status'] = true;
            $json['data'] = $data;
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No existen trabajadores en el sistema</h1>';
        }
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
    }
    echo json_encode($json);
}

if($action == "login"){
    $usuario = ($_POST['usuario'])?$_POST['usuario']:"";
    $pass = ($_POST['contra'])?$_POST['contra']:"";
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){
        $stmt = $db->prepare( "CALL Login_Personal (?)");
        $stmt->bindParam( 1 , $usuario, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($count > 0){
            /*$encriptada = $data[0]["Contrasena"];
            if(password_verify($pass, $encriptada)){*/
                $contras = $data[0]['Contrasena'];
                if($pass == $contras){
                $json['status'] = true;
                $json['data'] = $data;
                session_start();
                $_SESSION['id'] = $data[0]["Id_personal"];
                $_SESSION['tipo'] = $data[0]['Tipo'];
                $_SESSION['nombre'] = $data[0]["Nombre"];
                $_SESSION['apellido'] = $data[0]["Apellido"];
                } else {
                    $json['status'] = false;
                    $json['msg'] = '<h1 id="mensaje"> Error en ingreso de sesión, por favor revise sus credenciales </h1>';
                }
            }
            else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> Error en ingreso de sesión, por favor revise sus credenciales </h1>';
            }
        }
        else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> Error en ingreso de sesión, por favor revise sus credenciales </h1>';
        } 
        echo json_encode($json);
    }else{
        $json['status'] = false;
        $json['msg'] = '<h1 id="mensaje"> No hay conexión </h1>';
    }
    



if($action == "eliminar"){
    $id = $_POST['id'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($db){ 
        $stmt = $db->prepare( "CALL Eliminar_personal (?)");
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
        $stmt = $db->prepare( "CALL Ficha_personal (?)");
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
    $count = false;
    $pic = false;
    $uploadDir = "../media/Personal";
    $allowTypes = array('jpg', 'png', 'jpeg'); 
    $uploadStatus = 1;
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $usuario = $_POST["usuario"];
    $tipo = $_POST["tipo"];
    $area = $_POST["area"];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    $val = false;
    if(empty($_FILES["file"]["name"])){
        $cont = true;
        $pic = false;
    }else{
        $fileName = basename($_FILES["file"]["name"]); 
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        if(in_array($fileType, $allowTypes)){ 
            $cont = true;
            $pic = true;
        }else{
            $cont = false;
            $json['status'] = false;
            $json['msg'] = "Tipo de imagen no permitido";
        } 
    }
    if($pic){
        $nombre_pic = "personal" . $id .".jpg"; 
        if(move_uploaded_file($_FILES["file"]["tmp_name"], $uploadDir . "/" . $nombre_pic)){ 
            $stmt = $db->prepare("CALL Subir_imagen_personal (?,?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $nombre_pic, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
                $json['msg'] = "Modificado correctamente";
                $val = true;
            }else{
                $json['status'] = false;
                $json['msg'] = "Error al actualizar imagen";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "Error al guardar la imagen";
        }
    }
    if($cont){
        $stmt = $db->prepare( "CALL Editar_personal (?,?,?,?,?,?)");
        $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 2 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 3 , $apellido, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 4 , $usuario, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 5 , $tipo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam( 6 , $area, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        if($count > 0){
            $json['status'] = true;
            $json['msg'] = "Modificado correctamente";
        }else{
            if($val = false){
                $json['status'] = false;
                $json['msg'] = "Error al editar";
            }else{
                $json['status'] = true;
                $json['msg'] = "Modificado correctamente";
            }
        }
    }
    echo json_encode($json);
}

if($action == "contrasena"){
    $id = $_POST['id'];
    $contraNueva = $_POST['contraNueva'];
    $contraConf = $_POST['contraConf'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    if($contraNueva == $contraNueva){
        if($db){
            $encriptada = password_hash($contraNueva, PASSWORD_BCRYPT); 
            $stmt = $db->prepare( "CALL Restaurar_contra_personal (?,?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $encriptada, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
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

if($action == "cambiarContra"){
    $id = $_POST['id'];
    $contraVieja = $_POST['contraVieja'];
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
        if($db){
            $encriptada = password_hash($contraVieja, PASSWORD_BCRYPT); 
            $stmt = $db->prepare( "CALL Consultar_contra(?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $count = $stmt->rowCount();
            if($count > 0){
                $encriptada = $data[0]["Contrasena"];
                if(password_verify($contraVieja, $encriptada)){
                    $json['status'] = true;
                }else{
                    $json['status'] = false;
                }
            }else{
                $json['status'] = false;
                $json["msg"] = "NO HAY PERSONAL";
            }
        }else{
            $json['status'] = false;
            $json["msg"] = "DB NO CONECTADA";
        }
    
    echo json_encode($json);
}

if($action == "buscar"){
    $texto = $_POST["texto"];
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){
            $stmt = $db->prepare( "CALL Buscar_Personal (?)");
            $stmt->bindParam( 1 , $texto, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($data){
                $json['status'] = true;
                $json['data'] = $data;
            }else{
                $json['status'] = false;
                $json['msj'] = 'No se encontro ningun trabajador';
            }
        }else{
            $json['status'] = false;
            $json['msj'] = 'No se conecto a la BD';
        }
        echo json_encode($json);
}

?>