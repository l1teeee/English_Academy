
<?php
require_once("class.conexion.php");
    $action = $_POST["action"];
    $json = array();

    if($action == "chatarra"){
        $articulo = $_POST['id'];
        $area = $_POST['area'];
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){
            $stmt = $db->prepare( "CALL Mover_chatarra(?,?)");
            $stmt->bindParam( 1 , $articulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam( 2 , $area, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count > 0){
                $json['status'] = true;
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No se pudo mover el articulo a chatarra</h1>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
        }
        echo json_encode($json);
    }

    //PROCESO PARA SOLICITAR A LA BASE DE DATOS LOS ARTICULOS FILTRADOS
    if($action == "buscar"){
        $texto = $_POST["texto"];
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){
                $stmt = $db->prepare( "CALL Buscar_articulo (?)");
                $stmt->bindParam( 1 , $texto, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $count = $stmt->rowCount();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if($data){
                    $json['status'] = true;
                    $json['data'] = $data;
                }else{
                    $json['status'] = false;
                    $json['msg'] = '<h1 id="mensaje"> No se encontro un articulo </h1>';
                }
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No hay conexión </h1>';
            }
            echo json_encode($json);
    }

    //PROCESO PARA MOSTRAR LOS ARTICULOS EN LA VISTA

    if($action == "mostrar"){
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){
                $stmt = $db->prepare( "CALL Llamar_articulos()");
                $stmt->execute();
                $count = $stmt->rowCount();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if($data){
                    $json['status'] = true;
                    $json['data'] = $data;
                }else{
                    $json['status'] = false;
                    $json['msg'] = '<h1 id="mensaje"> No existen articulos en el sistema</h1>';
                }
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
            }
            echo json_encode($json);
    }

    //FILTRAR POR NOMBRE EN ORDEN ALFABETICO

    if($action == "filtrar_nombre"){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        if($db){
            $stmt = $db->prepare( "CALL Filtro_Nombres()");
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($data){
                $json['status'] = true;
                $json['data'] = $data;
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No existen articulos en el sistema</h1>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
        }
        echo json_encode($json);
    }


    //BUSCAR POR ID ESPECIFICO

    if($action == "buscarID"){
        $id = $_POST["id"];
        if(is_numeric($id)){
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){
                $stmt = $db->prepare( "CALL Informacion_Articulo(?)");
                $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $count = $stmt->rowCount();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if($data){
                    $json['status'] = true;
                    $json['data'] = $data;
                }else{
                    $json['status'] = false;
                    $json['msg'] = '<h1 id="mensaje"> No se encontro ningun articulo con ese ID </h1>';
                }
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> El Id ingresado no es numerico </h1>';
        }
        echo json_encode($json);
    }

    //AGREGAR articulo

    if($action == "agregar"){
        $nombre = $_POST["nombre"];
        $codigo = $_POST["codigo"];
        $marca = $_POST["marca"];
        $modeloA = $_POST["modelo"];
        $serie = $_POST["serie"];
        $ubicacion = $_POST["ubicacion"];
        $tipo = $_POST["tipo"];
        $tipoA = $_POST["tipoA"];
        $cantidad = $_POST['cantidad'];

        $nombre_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú0-9\s]{3,15}$~',$nombre);
        $cantidad_check = preg_match('~^[0-9]{1,4}$~', $cantidad);

        $accept_types = array(
            "image/pjpeg",
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
        );
        
        $to_path = "../media";


        if($nombre_check && $cantidad_check && !in_array($_FILES["imagen"]["type"], $accept_types) ){
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){ 
                $stmt = $db->prepare( "CALL Nuevo_Articulo (?,?,?,?,?,?,?,?,?)");
                $stmt->bindParam( 1 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 2 , $codigo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 3 , $marca, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 4 , $modeloA, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 5 , $serie, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 6 , $ubicacion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 7 , $tipo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 8 , $tipoA, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 9 , $cantidad, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $id = $db->lastInsertId();
                $count = $stmt->rowCount();
                if($count > 0){
                    $nombre_pic = $nombre_pic = "articulo" . $id .".jpg";
                    if(move_uploaded_file($_FILES["imagen"]["tmp_name"], $to_path . "/" . $nombre_pic)){
                        $stmt = $db->prepare( "CALL Subir_imagen (?,?)");
                        $stmt->bindParam( 1 , $nombre_pic, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                        $stmt->bindParam( 2 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                        $stmt->execute();
                        $count = $stmt->rowCount();
                        if($count > 0){
                            $json['status'] = true;
                        }else{
                            $json['status'] = false;
                            $json['msg'] = "no se actualizo el nombre";
                            $json["prueba"] = $nombre;
                        }
                    }else{
                        $json['status'] = false;
                        $json['msg'] = "no se guardo la imagen en la carpeta";
                    }
                }else{
                    $json['status'] = false;
                    $json['msg'] = "no se guardaron los primeros datos";
                }
            }else{
                $json['status'] = false;
                $json['msg'] = "no se conecto a la db";
            }
        }else{
            $json['status'] = false;
            $json['msg'] = "no paso los path";
        }
        echo json_encode($json);
    }

    if($action == "editar"){
        $nombre = $_POST["nombre"];
        $codigo = $_POST["codigo"];
        $marca = $_POST["marca"];
        $modeloA = $_POST["modelo"];
        $serie = $_POST["serie"];
        $ubicacion = $_POST["ubicacion"];
        $tipo = $_POST["tipo"];
        $tipoA = $_POST["tipoA"];
        $img = $_POST["img"];
        $cantidad = $_POST["cantidad"];
        $id = $_POST["id"];

        $nombre_check = preg_match('~^[a-zA-zÁáÉéÍíÓóÚú0-9\s]{3,15}$~',$nombre);
        $cantidad_check = preg_match('~^[0-9]{1,4}$~', $cantidad);


        if($nombre_check && $cantidad_check){
            $modelo = new Conexion;
            $db = $modelo->get_conexion();
            if($db){ 
                $stmt = $db->prepare( "CALL Modificar_Articulo (?,?,?,?,?,?,?,?,?,?,?)");
                $stmt->bindParam( 1 , $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 2 , $codigo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 3 , $marca, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 4 , $modeloA, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 5 , $serie, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 6 , $ubicacion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 7 , $tipo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam( 8 , $tipoA, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(9, $cantidad, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(10, $img, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(11, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $id = $db->lastInsertId();
                $count = $stmt->rowCount();
                if($count > 0){
                    $json['status'] = true;
                    $json['msg'] = '<h1 id="mensaje">Articulo modificado correctamente</h1>';
                    $json['boton2'] = '<a href="articulos.php" class="resultantes">Salir</a>';
                }else{
                    $json['status'] = false;
                    $json['msg'] = '<h1 id="mensaje"> Error al modificar el articulo </h1>';
                    $json['boton1'] = '<a href="articulos.php">Salir</a>';
                }
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
                $json['boton1'] = '<a href="articulos.php">Salir</a>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> Datos ingresados incorrectos </h1>';
            $json['boton1'] = '<a href="articulos.php">Salir</a>';
        }
        echo json_encode($json);
    }

    // PACIENTE UNICO

    if($action == "info"){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        $id = $_POST["id"];

        if($db){
            $stmt = $db->prepare( "CALL Informacion_Articulo(?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($data){
                $json['status'] = true;
                $json['data'] = $data;
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No existen articulos en el sistema</h1>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
        }
        echo json_encode($json);
    }

    if($action == "eliminar"){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        $id = $_POST["id"];

        if($db){
            $stmt = $db->prepare( "CALL Eliminar_Articulo(?)");
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
            $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
        }
        echo json_encode($json);
    }

    if($action == "llenarSelect1"){
        $modelo = new Conexion;
        $db = $modelo->get_conexion();
        $id = $_POST["id"];
        if($db){
            $stmt = $db->prepare( "CALL Llenar_select2(?)");
            $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($data){
                $stmt = $db->prepare( "CALL Llenar_select1(?)");
                $stmt->bindParam( 1 , $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                $count = $stmt->rowCount();
                $data2 = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if($data2){
                    $json['status'] = true;
                    $json['data'] = $data + $data2;
                }else{
                    $json['status'] = false;
                    $json['msg'] = '<h1 id="mensaje"> Error</h1>';
                }
            }else{
                $json['status'] = false;
                $json['msg'] = '<h1 id="mensaje"> No existen articulos en el sistema</h1>';
            }
        }else{
            $json['status'] = false;
            $json['msg'] = '<h1 id="mensaje"> No hay conexion </h1>';
        }
        echo json_encode($json);
}

?>