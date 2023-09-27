<?php
    //CLASE PARA LAS ACCIONES DEL MODULO

    require_once("class.conexion.php");

        $action = ($_POST['action']) ? $_POST['action'] : "";
    $json = array();

    if($action == "agregar"){
        $nombres = ($_POST['nombre'])?$_POST['nombre']:"";
        $programa = ($_POST['programa'])?$_POST['programa']:"";
        $letras="";

        include_once('../recursos/consultas.php');

        if($programa == "Infantil"){
            $lista = getCodigos($programa);
            $letras = "MI";
        } else if($programa == "Juvenil"){
            $lista = getCodigos($programa);
            $letras = "MJ";
        }

        if(empty($lista)){
            $num = 1;
        } else {
            $num = extaerLast(array_pop($lista));
        }

        $codigo = $letras . $num; 

        $db = new Conexion();
        $modelo = $db->get_conexion();

        $stmt = $modelo->prepare("CALL add_modulo (?,?,?)");
        $stmt->bindParam(1,$nombres, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(2,$codigo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(3,$programa, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $stmt->execute();
        $cont = $stmt->rowCount();

        if($cont>0){
            $json['status']=true;
            $json['msg']="Se ha agregado correctamente ".$codigo;
        } else {
            $json['status']=true;
            $json['msg']="Ha ocurrido un error";
        }
        echo json_encode($json);
    }

    if($action == "mostrar"){
        $db = new Conexion;
        $modelo = $db->get_conexion();

        if ($modelo) {
            $stmt = $modelo->prepare("CALL mostrar('modulo')");
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($data) {
                $json['status'] = true;
                $json['data'] = $data;
                $json['cantidad'] = $count;
            } else {
                $json['status'] = false;
                $json['msg'] = "<h1>No existen modulos</h1>";
            }
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existe una conexion</h1>";
        }
        echo json_encode($json);
    }

    if($action == "eliminar"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['id']) ? $_POST['id'] : "";

        if($modelo){
            $stmt = $modelo->prepare("CALL deletes('modulo',?)");
            $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count>0){
                $json['status']=true;
                $json['msg']="Se ha borrado correctamente";
            } else {
                $json['status']=false;
                $json['msg'] = "Ha habido un error";
            }
        }
        echo json_encode($json);
    }

    if($action == "lista"){
        $db = new Conexion;
        $modelo = $db->get_conexion();

        if($modelo){
            $stmt = $modelo->prepare("CALL mostrar('listaM')");
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($count>0){
                $json['status'] = true;
                $json['data'] = $data;
            } else {
                $json['status'] = false;
            }
        }

        echo json_encode($json);
    }

    if($action == "MostrarInfantil"){
        $db = new Conexion;
        $modelo = $db->get_conexion();

        if($modelo){
            $stmt = $modelo->prepare("CALL mostrar('MInfantil')");
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $stmt->closeCursor();

            $stmt2 = $modelo->prepare("SELECT * FROM modulo WHERE programa = 'Infantil'");
            $stmt2->execute();
            $count = $stmt2->rowCount();

            if($count>0){
                $json['status'] = true;
                $json['data'] = $data;
                $json['cantidad'] = $count;
            } else {
                $json['status'] = false;
                $json['msg']="No existen modulos infantiles";
            }
        }

        echo json_encode($json);
    } 
    
    if($action=="MostrarJuveniles"){
        $db = new Conexion;
        $modelo = $db->get_conexion();

        if($modelo){
            $stmt = $modelo->prepare("CALL mostrar('MJuvenil')");
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $stmt->closeCursor();

            $stmt3 = $modelo->prepare("SELECT * FROM modulo WHERE programa = 'Juvenil'");
            $stmt3->execute();
            $count = $stmt3->rowCount();

            if($count>0){
                $json['status'] = true;
                $json['data'] = $data;
                $json['cantidad'] = $count;
            } else {
                $json['status'] = false;
                $json['msg'] = "No existen modulos Juveniles";
            }
        }

        echo json_encode($json);
    }
    //PARA MOSTRAR EL MODULO EN ESPECIFICO
    if($action == "ModuloIndividual"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['modulo']) ? $_POST['modulo'] : "";

        if ($modelo) {
            $stmt = $modelo->prepare("CALL show_individual('modulo', ?)");
            $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($data) {
                $json['status'] = true;
                $json['data'] = $data;
            } else {
                $json['status'] = false;
                $json['msg'] = "<h1>No existe modulo</h1>";
            }
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existe una conexion</h1>";
        }
        echo json_encode($json);
    }
    //PARA MOSTRAR LOS ALUMNOS DE UNA SECCION
    if($action == "alumnosModulo"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['modulo']) ? $_POST['modulo'] : "";

        if ($modelo) {
            $stmt = $modelo->prepare("CALL show_individual('porModulo', ?)");
            $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($data) {
                $json['status'] = true;
                $json['data'] = $data;
            } else {
                $json['status'] = false;
                $json['msg'] = "No hay estudiantes en este modulo";
            }
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existe una conexion</h1>";
        }
        echo json_encode($json);
    }

    //BUSCADOR DE MODULOS

    if($action == "buscarModulo"){
        $texto = ($_POST['texto'])?$_POST['texto']:"";
        $programa = ($_POST['programa'])?$_POST['programa']:"";
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $final = "%".$texto."%";

        $sql = "";
        if($programa == "todos"){
            $sql = "SELECT * FROM modulo WHERE modulo.id_modulo LIKE ? OR modulo.nombre LIKE ?";
        } else if($programa == "infantil"){
            $sql = "SELECT * FROM modulo WHERE (modulo.id_modulo LIKE ? OR modulo.nombre LIKE ?) AND modulo.programa = 'Infantil'";
        } else {
            $sql = "SELECT * FROM modulo WHERE (modulo.id_modulo LIKE ? OR modulo.nombre LIKE ?) AND modulo.programa = 'Juvenil'";
        }

        if($modelo){
            $stmt = $modelo->prepare($sql);
            $stmt->bindParam(1, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam(2, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            /*
                SELECT * FROM modulo WHERE `nombre` LIKE codigo OR `id_modulo` LIKE nombre
            */
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($count>0){
                $json['status']=true;
                $json['data']=$data;
            } else {
                if($programa == "todos"){
                    $json['status']=false;
                    $json['msg']="No se encontraron resultados";
                } else if($programa == "infantil"){
                    $json['status']=false;
                    $json['msg']="No se encontraron resultados en infantil";
                } else {
                    $json['status']=false;
                    $json['msg']="No se encontraron resultados en juvenil";
                }
                
            }
        } else {
            $json['status']=false;
            $json['msg'] = "No hay conexion";
        }
        echo json_encode($json);
    }
    //PARA ACTUALIZAR EL NOMBRE DEL MODULO
    if($action == "UpdateNameMod"){
        $codigo = ($_POST['codigoMod'])?$_POST['codigoMod']:"";
        $nombre = ($_POST['nombre'])?$_POST['nombre']:"";

        $db = new Conexion;
        $modelo = $db->get_conexion();

        if($modelo){
            $stmt = $modelo->prepare("UPDATE modulo SET nombre=? WHERE id_modulo=?");
            $stmt->bindParam(1, $nombre, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam(2, $codigo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

            $stmt->execute();
            $count = $stmt->rowCount();

            if($count>0){
                $json['status'] = true;
                $json['msg'] = "Se ha actualizado el nombre del modulo ".$codigo;
            } else {
                $json['status'] = false;
                $json['msg'] = "No se ha hecho ningun cambio";
            }

        } else {
            $json['status'] = false;
            $json['msg'] = "No hay conexion";
        }
            echo json_encode($json);
    }

    //PARA AVANZAR A TODOS LOS ESTUDIANTES
    if($action == "Avanzar"){
        include_once('../recursos/consultas.php');
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $factura ="";
        $fecha = "0000-00-00";
        $estado = "Pendiente";
        $count = 0;
        $count1 = 0;

        if($modelo){

            $stmt = $modelo->prepare("SELECT * FROM estudiante");
            $stmt->execute();
            $estudiantes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach($estudiantes as $estu){
                $newMod = incrementarCadena($estu['modulo']);
                deleteSecciones($estu['modulo']);
                $delete = $modelo->prepare("DELETE FROM seccion");
                $delete->execute();

                $validarMod = existsModulo($newMod);

                if($validarMod){
                    $update = $modelo->prepare("UPDATE estudiante SET modulo=?, estado = ?, seccion = ? WHERE id_estudiante =?");
                    $update->bindParam(1,$newMod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $update->bindParam(2,$estado,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $update->bindParam(3,$factura,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $update->bindParam(4,$estu['id_estudiante'],PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $update->execute();

                    cantidadModulo($newMod);
                    $antiguomod = decrementar($newMod);
                    cantidadModulo($antiguomod);
                    UpdateCantSecciones($estu['modulo']);
                    $count = $update->rowCount();
                    
                } else {
                    cantidadModulo($newMod);
                    $antiguomod = decrementar($newMod);
                    cantidadModulo($antiguomod);
                    UpdateCantSecciones($estu['modulo']);
                    $estados = "Egresado";
                    $updates = $modelo->prepare("UPDATE estudiante SET estado = ?, modulo = '', seccion='' WHERE id_estudiante = ?");
                    $updates->bindParam(1,$estados,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $updates->bindParam(2,$estu['id_estudiante'],PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                    $updates->execute();

                    
                    $count2 = $updates->rowCount();
                    UpdateCantSecciones($estu['modulo']);
                    cantidadModulo($antiguomod);
                    cantidadModulo($newMod);
                }

                
            }

            
            
            
            

            if($count > 0 || $count2>0){
                $json['status'] = true;
                $json['msg'] = "Se han avanzado";
            } else {
                $json['status'] = false;
                $json['msg'] = "Hubo un error";
            }

        } else {
            $json['status'] = false;
            $json['msg'] = "No hay conexion";
        }
        echo json_encode($json);
    }
?>