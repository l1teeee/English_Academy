<?php
    require_once("class.conexion.php");
    require_once('../recursos/consultas.php');

    $action = ($_POST['action']) ? $_POST['action'] : "";
    $json = array();

    if($action == "mostrarSecciones"){
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] : "";
        $db = new Conexion();
        $modelo = $db->get_conexion();

        if($modelo){
            $stmt = $modelo->prepare("CALL mostrarSecciones(?)");
            $stmt->bindParam(1,$modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($count>0){
                $json['status'] = true;
                $json['data'] = $data;
            } else {
                $json['status'] = false;
                $json['msg'] = "No existen secciones";
            }
        } else {
            $json['status'] = false;
            $json['msg'] = "Sin conexion";
        }
        echo json_encode($json);
    }

    if($action == "seccionamiento"){
        require_once('../recursos/consultas.php');
        $db = new Conexion();
        $modelo = $db->get_conexion();

        $mod = ($_POST['mod']) ? $_POST['mod'] : "";
        $cant = ($_POST['cant']) ? $_POST['cant'] : "";
        $secciones = ($_POST['secciones']) ? $_POST['secciones'] : "";

        if($modelo){

            

            if($secciones == 1){
                //CUANDO SOLO QUIERE UNA SECCION
                $alumnos = $cant / $secciones;

                if($alumnos>=10){

                    //EXTRACCION DE DATOS
                        $verifySeccion = verificarSeccion($mod);
                        $estudiante = extraerEstudiante($mod);
                        $cantidad = count($estudiante);

                        if($verifySeccion == false){
                            //PARA AGREGAR LA SECCION EN CASO QUE NO EXISTE
                            $seccion = "A";
                            $nombre = $mod ." ".$seccion;

                            $stmt = $modelo->prepare("CALL add_seccion(?,?,?,?)");
                            $stmt->bindParam(1,$seccion,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                            $stmt->bindParam(2,$nombre,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                            $stmt->bindParam(3,$mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                            $stmt->bindParam(4,$cantidad, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                            $stmt->execute();

                            //EN TODO CASO TENGA LO MINIMO PARA UN GRUPO QUE SERIAN 12 ESTUDIANTE

                            foreach($estudiante as $estu){
                                $update = $modelo->prepare('CALL update_seccion_estu(?,?)');
                                $update->bindParam(1,$estu['id_estudiante'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                $update->bindParam(2,$seccion,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                $update->execute();
                            }
                            $count1 = $stmt->rowCount();
                            $count2 = $update->rowCount();
                            if($count1 > 0 ){
                                $json['status']=true;
                                $json['msg']="Se ha creado una sola sección";
                                
                            } else {
                                $json['status']=false;
                                $json['msg']="Ha ocurrido un error";   
                            }
                            

                        } else {
                            
                            $reps = getCantSecciones($mod);

                            for($i=0; $i<$reps; $i++){
                                $delete = $modelo->prepare("DELETE FROM seccion WHERE modulo = ?");
                                $delete->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                $delete->execute();
                                $delete->closeCursor();
                            }
                            
                            $seccion = "A";
                            $nombre = $mod ." ".$seccion;

                            $stmt = $modelo->prepare("CALL add_seccion(?,?,?,?)");
                            $stmt->bindParam(1,$seccion,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                            $stmt->bindParam(2,$nombre,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                            $stmt->bindParam(3,$mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                            $stmt->bindParam(4,$cantidad, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                            $stmt->execute();

                            //EN TODO CASO TENGA LO MINIMO PARA UN GRUPO QUE SERIAN 12 ESTUDIANTE

                            foreach($estudiante as $estu){
                                $update = $modelo->prepare('CALL update_seccion_estu(?,?)');
                                $update->bindParam(1,$estu['id_estudiante'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                $update->bindParam(2,$seccion,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                $update->execute();
                            }
                            $count1 = $stmt->rowCount();
                            $count2 = $update->rowCount();
                            if($count1 > 0 ){
                                $json['status']=true;
                                $json['msg']="Se ha creado una sola sección";
                               
                            } else {
                                $json['status']=false;
                                $json['msg']="Ha ocurrido un error";   
                            }

                            

                        }

                } else {
                    $json['status'] = false;
                    $json['msg'] = "No hay suficientes estudiantes";
                }

                UpdateCantSecciones($mod);
            } else {
                //DE AQUÍ PUEDEN SER MÁS DE DOS SECCIONES 
                $alumnos = $cant / $secciones;

                    if($alumnos>=10){

                            $verifySeccion = verificarSeccion($mod);
                            $estudiante = extraerEstudiante($mod);
                            $cantidad = count($estudiante);

                            if($verifySeccion == false){

                                $letra = "A";
                                //SEPARO EL ARRAY OBTENIDO DE LOS ESTUDIANTES DEL MODULO EN PARTES IGUALES SEGUN LA CANTIDAD DE DATOS
                                $tamano = ceil(count($estudiante)/$secciones);
                                $partes = array_chunk($estudiante, $tamano);
                                //PRIMER FOR EACH CREO LA SECCION
                                foreach($partes as $part){
                                    $nombre = $mod.' "'.$letra.'"';
                                    $cantt = count($part);
                                    $stmt = $modelo->prepare("CALL add_seccion(?,?,?,?)");
                                    $stmt->bindParam(1,$letra,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                    $stmt->bindParam(2,$nombre,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                    $stmt->bindParam(3,$mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                    $stmt->bindParam(4,$cantt, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                    $stmt->execute();
                                    //SEGUNDO FOREACH ASIGNO A CADA ESTUDIANTE LA SECCION A LA QUE PERTENECE
                                    foreach($part as $estu){
                                        $update = $modelo->prepare('CALL update_seccion_estu(?,?)');
                                        $update->bindParam(1,$estu['id_estudiante'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                        $update->bindParam(2,$letra,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                        $update->execute();
                                    }

                                    $letra = avanzarLetra($letra);
                                }

                                $count1 = $stmt->rowCount();
                                $count2 = $update->rowCount();

                                if($count1 > 0 ){
                                    $json['status']=true;
                                    $json['msg'] = "Se han creado ".$secciones." secciones";
                                    UpdateCantSecciones($mod);
                                } else {
                                    $json['status'] = false;
                                    $json['msg'] = "Ha ocurrido un error";
                                }

                            } else {
                                $reps = getCantSecciones($mod);

                                for($i=0; $i<$reps; $i++){
                                    $delete = $modelo->prepare("DELETE FROM seccion WHERE modulo = ?");
                                    $delete->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                    $delete->execute();
                                    
                                }

                                $letra = "A";

                                $tamano = ceil(count($estudiante)/$secciones);
                                $partes = array_chunk($estudiante, $tamano);

                                foreach($partes as $part){
                                    $nombre = $mod.' "'.$letra.'"';
                                    $cantt = count($part);
                                    $stmt = $modelo->prepare("CALL add_seccion(?,?,?,?)");
                                    $stmt->bindParam(1,$letra,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                    $stmt->bindParam(2,$nombre,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                    $stmt->bindParam(3,$mod, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                    $stmt->bindParam(4,$cantt, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                    $stmt->execute();

                                    foreach($part as $estu){
                                        $update = $modelo->prepare('CALL update_seccion_estu(?,?)');
                                        $update->bindParam(1,$estu['id_estudiante'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                                        $update->bindParam(2,$letra,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT,4000);
                                        $update->execute();
                                    }

                                    $letra = avanzarLetra($letra);
                                }

                                $count1 = $stmt->rowCount();
                                $count2 = $update->rowCount();

                                if($count1 > 0){
                                    $json['status']=true;
                                    $json['msg'] = "Se han creado ".$secciones." secciones";
                                    UpdateCantSecciones($mod);
                                } else {
                                    $json['status'] = false;
                                    $json['msg'] = "Ha ocurrido un error";
                                }
                            }

                    } else {

                        $sin = intval($alumnos);
                        $json['status'] = false;
                        $json['msg'] = "Se necesitan 12 estudiantes por seccion, tienes ".$sin."";
                    }
                    UpdateCantSecciones($mod);
            }


        } else {
            $json['status']=false;
            $json['msg']="No hay conexion";
        }

        echo json_encode($json);
    }

    if($action=="alumnosSeccion"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['modulo']) ? $_POST['modulo'] : "";
        $seccion = ($_POST['seccion']) ? $_POST['seccion'] : "";

        if ($modelo) {
            $stmt = $modelo->prepare("SELECT * FROM estudiante WHERE `modulo` = ? AND `seccion` = ?");
            $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam(2, $seccion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($data) {
                $json['status'] = true;
                $json['data'] = $data;
            } else {
                $json['status'] = false;
                $json['msg'] = "<h1>No hay estudiantes en esta seccion</h1>";
            }
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existe una conexion</h1>";
        }
        echo json_encode($json);
    }

    if($action == "borrarSeccion"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['seccion']) ? $_POST['seccion'] : "";
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] : "";

        if($modelo){
            $stmt = $modelo->prepare("CALL delete_seccion(?,?)");
            $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->bindParam(2, $modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt->execute();
            $count = $stmt->rowCount();
            require_once('../recursos/consultas.php');
            $estudiantes = extraerEstudiantesSeccion($id, $modulo);

            foreach($estudiantes as $estu){
                $update = $modelo->prepare('CALL delete_seccion_estu(?)');
                        $update->bindParam(1,$estu['id_estudiante'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                        $update->execute();
            }

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

    if($action == "deleteAlum"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['alumno']) ? $_POST['alumno'] : "";
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] : "";
        $seccion = ($_POST['seccion']) ? $_POST['seccion'] : "";

        $update = $modelo->prepare('CALL delete_estu_seccion(?)');
        $update->bindParam(1,$id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->execute();

        $count = $update->rowCount();

        actualizarCantidadSeccion($modulo, $seccion);

        if($count>0){
            $json['status']=true;
            $json['msg']="Se ha borrado correctamente";
        } else {
            $json['status']=false;
            $json['msg'] = "Ha habido un error";
        }
        echo json_encode($json);
    }

    if($action == "SinSeccion"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] : "";
        $empty = null;

        $stmt = $modelo->prepare("SELECT * FROM estudiante WHERE modulo = ? AND seccion=''");
        $stmt->bindParam(1,$modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        //$stmt->bindParam(2,$empty, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();

        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($count>0){
            $json['status']=true;
            $json['data']=$data;
        } else {
            $json['status']=false;
            $json['msg'] = "Todos los estudiantes estan asignados a una sección";
        }
        echo json_encode($json);
    }
    
    if($action=="agregaraseccion"){
        $db = new Conexion;
        $modelo = $db->get_conexion();
        $id = ($_POST['estu']) ? $_POST['estu'] : "";
        $seccion = ($_POST['seccion']) ? $_POST['seccion'] : "";
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] : "";

        $update = $modelo->prepare('UPDATE estudiante SET seccion=? WHERE id_estudiante=?');
        $update->bindParam(1,$seccion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->bindParam(2,$id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->execute();

        $count = $update->rowCount();

        actualizarCantidadSeccion($modulo, $seccion);

        if($count>0){
            $json['status']=true;
            $json['msg']="Se ha agregado a seccion ".$seccion." correctamente";
        } else {
            $json['status']=false;
            $json['msg'] = "Ha habido un error";
        }
        echo json_encode($json);
    }

    if($action == "updateSeccion"){
        $aula = ($_POST['aula']) ? $_POST['aula'] :"";
        $docente =  ($_POST['docente']) ? $_POST['docente'] : "";
        $modulo =  ($_POST['modulo']) ? $_POST['modulo'] : "";
        $seccion =  ($_POST['seccion']) ? $_POST['seccion'] : "";

        $db = new Conexion();
        $modelo = $db->get_conexion();

        if($modelo){
            $update = $modelo->prepare("CALL update_seccion(?,?,?,?)");
            $update->bindParam(1,$aula, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $update->bindParam(2,$docente, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $update->bindParam(3,$modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $update->bindParam(4,$seccion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

            $update->execute();

            $count = $update->rowCount();

            if($count>0){
                $json['status'] = true;
                $json['msg']="Actualización exitosa";
            } else {
                $json['status']=false;
                $json['msg'] = "No se pudo actualizar";
            }
        } else {
            $json['status']=false;
            $json['msg']="No hay conexion";
        }

        echo json_encode($json);
    }
    //BUSCAR ESTUDIANTES DENTRO DEL MODULO
    if($action == "buscarEnModulo"){
        $text = ($_POST['text']) ? $_POST['text'] :"";
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] :"";
        $seccion = "";

        $final = "%".$text."%";
        $db = new Conexion();
        $modelo = $db->get_conexion();
        
        if($modelo){
            $search = $modelo->prepare("SELECT * FROM estudiante WHERE(`nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?) AND `modulo` = ? AND `seccion`= ?");
            $search->bindParam(1,$final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(2,$final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(3,$final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(4,$modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(5,$seccion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);


            $search->execute();
            $count = $search->rowCount();
            $data = $search->fetchAll(PDO::FETCH_ASSOC);

            if($count>0){
                $json['status']=true;
                $json['data']=$data;
            } else {
                $json['status']=false;
                $json['msj']="No se encontraron resultados";
            }
        }

        echo json_encode($json);
    }
    //BUSCAR ESTUDIANTES DENTRO DE LA SECCION DEL MODULO
    if($action == "buscarEnSeccion"){
        $text = ($_POST['texto']) ? $_POST['texto'] :"";
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] :"";
        $seccion = ($_POST['seccion']) ? $_POST['seccion'] :"";

        $final = "%".$text."%";

        $db = new Conexion();
        $modelo = $db->get_conexion();

        if($modelo){
            $search = $modelo->prepare("SELECT * FROM estudiante WHERE (`id_estudiante` LIKE ? OR `nombres` LIKE ? OR `apellidos` LIKE ?) AND modulo=? AND seccion=?");
            $search->bindParam(1, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(2, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(3, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(4, $modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(5, $seccion, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

            $search->execute();
            $count = $search->rowCount();
            $data = $search->fetchAll(PDO::FETCH_ASSOC);

            if($count>0){
                $json['status']=true;
                $json['data']=$data;
            } else {
                $json['status']=false;
                $json['msj']="No se encontraron resultados";
            }

        } else {
            $json['status']=false;
            $jsonp['msg']="No hay conexion";
        }

        echo json_encode($json);
    }

    if($action == "searchSecciones"){
        $text = ($_POST['texto']) ? $_POST['texto'] :"";
        $modulo = ($_POST['modulo']) ? $_POST['modulo'] :"";
        

        $final = "%".$text."%";
        $db = new Conexion();
        $modelo = $db->get_conexion();
        
        if($modelo){
            $search = $modelo->prepare("SELECT * FROM seccion WHERE (id_seccion LIKE ? OR nombre LIKE ?) AND modulo = ?");
            $search->bindParam(1,$final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(2,$final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $search->bindParam(3,$modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);


            $search->execute();
            $count = $search->rowCount();
            $data = $search->fetchAll(PDO::FETCH_ASSOC);

            if($count>0){
                $json['status']=true;
                $json['data']=$data;
            } else {
                $json['status']=false;
                $json['msj']="No se encontraron resultados";
            }
        }

        echo json_encode($json);
    }
?>