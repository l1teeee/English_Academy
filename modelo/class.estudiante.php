<?php
require_once("class.conexion.php");

$action = ($_POST['action']) ? $_POST['action'] : "";
$json = array();
//AGREGAR ESTUDIANTE
if ($action == "agregar") {
    //CAPTURA DE DATOS DEL AJAX
    $nombres = ($_POST['nombres']) ? $_POST['nombres'] : "";
    $apellidos = ($_POST['apellidos']) ? $_POST['apellidos'] : "";
    $edad = ($_POST['edad']) ? $_POST['edad'] : "";
    $factura = ($_POST['factura']) ? $_POST['factura'] : "";
    $encargado = ($_POST['encargado']) ? $_POST['encargado'] : "";
    $programa = ($_POST['programa']) ? $_POST['programa'] : "";
    $parentesco = ($_POST['parentesco']) ? $_POST['parentesco'] : "";
    $modulo = ($_POST['modulo']) ? $_POST['modulo'] : "";
    $correo = ($_POST['correo']) ? $_POST['correo'] : "";
    $telefono = ($_POST['telefono']) ? $_POST['telefono']:"";
    $sexo = ($_POST['sexo'])?$_POST['sexo']:"";
    $alumnocdb = ($_POST['alumnocdb'])?$_POST['alumnocdb']:"";
    $codigocdb = ($_POST['codigocdb'])?$_POST['codigocdb']:"";
    date_default_timezone_set("America/El_Salvador");
    $fecha = date("Y-m-d");
    $estado = "";

    if($factura == "" || $factura == null){
        $estado = "Pendiente";
    } else {
        $estado = "Activo";
    }

    include_once("../recursos/consultas.php");
    do {
        $codigo = generarCodigo($apellidos);
        $verifycode = validarCodigo($codigo);
    } while ($verifycode == true);

    if($factura != "" || $factura != null){
        $fechafac = date("Y-m-d");
    }else{
        $fechafac = "0000-00-00";
    }
    //VARIABLES DE CONEXCION
    $modelo = new Conexion;
    $db = $modelo->get_conexion();
    //echo ("<script>alert('Estas en el archivo de php, el nombre es:'+".$nombres.")</script>");

    $stmt = $db->prepare("CALL add_estudiante (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bindParam(1, $nombres, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(2, $apellidos, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(3, $edad, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(4, $programa, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(5, $factura, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(6, $encargado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(7, $parentesco, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(8, $correo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(9, $fecha, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(10, $codigo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(11, $modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(12, $telefono, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(13, $sexo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(14, $fechafac, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(15, $estado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
    $stmt->bindParam(16, $codigocdb, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);


    $stmt->execute();
    $cont = $stmt->rowCount();

    if ($cont > 0) {
        $json['status'] = true;
        $json['msg'] = "Se agregó correctamente";
    } else {
        $json['status'] = false;
        $json['msg'] = "Ha ocurrido un error";
    }

    if($modulo != ""){
        cantidadModulo($modulo);
    }
    
    echo json_encode($json);
}
//MOSTRAR TODOS LOS ESTUDIANTES
if ($action == "mostrar") {
    $db = new Conexion;
    $modelo = $db->get_conexion();

    if ($modelo) {
        $stmt = $modelo->prepare("CALL mostrar('estudiante')");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
            $json['cantidad'] = $count;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}
//MOSTRAR ESTUDIANTES DEL PROGRAMA INFANTIL
if ($action == "infantil") {
    $db = new Conexion;
    $modelo = $db->get_conexion();

    if ($modelo) {
        $stmt = $modelo->prepare("CALL mostrar('infantil')");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
            $json['cantidad'] = $count;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}
//MOSTRAR LOS ESTUDIANTES DEL PROGRAMA JUVENIL
if ($action == "juvenil") {
    $db = new Conexion;
    $modelo = $db->get_conexion();

    if ($modelo) {
        $stmt = $modelo->prepare("CALL mostrar('juvenil')");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
            $json['cantidad'] = $count;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}
//PARA MOSTRAR LA INFO DENTRO DEL FORMULARIO DE UPDATE
if ($action == "individual") {
    $db = new Conexion;
    $modelo = $db->get_conexion();
    $id = ($_POST['id']) ? $_POST['id'] : "";

    if ($modelo) {
        $stmt = $modelo->prepare("CALL show_individual('estudiante', ?)");
        $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}
//ELIMINIAR EL USUARIO
if($action=="eliminar"){
    $db = new Conexion;
    $modelo = $db->get_conexion();
    $id = ($_POST['id']) ? $_POST['id'] : "";

    if($modelo){
        $stmt = $modelo->prepare("CALL deletes('estudiante',?)");
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
//MOSTAR INFO INDIVIDUAL DE USUARIO
if($action == "alumno"){
    $db = new Conexion;
    $modelo = $db->get_conexion();
    $id = ($_POST['id']) ? $_POST['id'] : "";

    if ($modelo) {
        $stmt = $modelo->prepare("CALL show_individual('estudiante', ?)");
        $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    }
    echo json_encode($json);
}
//FUNCION PARA ACTUALIZAR INFOMRACION DE ESTUDIANTE
if($action == "update"){
    require_once('../recursos/consultas.php');
    $nombres = ($_POST['nombres']) ? $_POST['nombres'] : "";
    $apellidos = ($_POST['apellidos']) ? $_POST['apellidos'] : "";
    $edad = ($_POST['edad']) ? $_POST['edad'] : "";
    $factura = ($_POST['factura']) ? $_POST['factura'] : "";
    $encargado = ($_POST['encargado']) ? $_POST['encargado'] : "";
    $programa = ($_POST['programa']) ? $_POST['programa'] : "";
    $parentesco = ($_POST['parentesco']) ? $_POST['parentesco'] : "";
    $correo = ($_POST['correo']) ? $_POST['correo'] : "";
    $id = ($_POST['user'])?$_POST['user']:"";
    $telefono = ($_POST['telefono'])?$_POST['telefono']:"";
    $sexo = ($_POST['sexo'])?$_POST['sexo']:"";
    $modulo = ($_POST['modulo'])?$_POST['modulo']:"";
    $moduloAnterior = getBeforeModulo($id);
    $estado = "";

    if($factura != "" || $factura != null){
        $estado = "Activo"; 
    } else {
        $estado = "Pendiente";
    }
    

    $fechasrec = recuperarFecha($id);

    if($factura != "" || $factura != null){
        $fechafac = date("Y-m-d");
    } else {
        $fechafac = "0000-00-00";
    }

    $db = new Conexion;
    $modelo = $db->get_conexion();

    if($modelo){
        $stmt  = $modelo->prepare("CALL update_estu (?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->bindParam(1, $nombres, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(2, $apellidos, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(3, $correo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(4, $edad, PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(5, $programa, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(6, $factura, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(7, $encargado, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(8, $parentesco, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(9, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(10,$modulo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(11,$telefono, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(12,$sexo,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(13,$estado,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $stmt->execute();
        $cont= $stmt->rowCount();

        

        if($factura != "" || $factura != null && $fechasrec == "0000-00-00"){
            $stmt2 = $modelo->prepare("UPDATE estudiante SET fecha_factura=? WHERE id_estudiante=?");
            $stmt2->bindParam(1, $fechafac, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt2->bindParam(2, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
            $stmt2->execute();
        }
        //funcion para actualizar la cantidad de estudiantes según el modulo
        cantidadModulo($moduloAnterior);
        cantidadModulo($modulo);

        if($cont>0){
            $json['status']=true;
            $json['msg']= "Se actualizó correctamente el estudiante ".$id; 
        } else {
            $json['status']=false;
            $json['msg']="No hay información por actualizar";
        }
            echo json_encode($json);
    }
}

//BUSCAR ESTUDIANTES
if($action=="buscar"){
    $texto = ($_POST['dato'])?$_POST['dato']:"";
    $programa = ($_POST['programa'])?$_POST['programa']:"";
    $db = new Conexion;
    $modelo = $db->get_conexion();
    $final = "%".$texto."%";

    if($programa == "todos"){
        $sql = "SELECT * FROM estudiante WHERE `nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?";
    } else if($programa == "infantil"){
        $sql = "SELECT * FROM estudiante WHERE (`nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?) AND `programa` = 'Infantil'";
    } else {
        $sql = "SELECT * FROM estudiante WHERE (`nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?) AND `programa` = 'Juvenil'";
    }

    if($modelo){
        $stmt = $modelo->prepare($sql);
        $stmt->bindParam(1, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(2, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(3, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($count >0){
            $json['status']=true;
            $json['data']=$data;
        } else {
            if($programa == "todos"){
                $json['status']=false;
                $json['msj'] = "No se encontraron resultados";
            } else if($programa == "infantil"){
                $json['status']=false;
                $json['msj'] = "No se encontraron resultados en infantil";
            } else {
                $json['status']=false;
                $json['msj'] = "No se encontraron resultados en juvenil";
            }
            
        }
    } else {
        $json['status']=false;
        $json['msj']="No hay conexion";
    }
    echo json_encode($json);
}

//EJECUCIONES PARA EL LISTADO DE LOS ESTUDIANTES EGRESADOS

if($action == "mostrarEgresados"){
    $db = new Conexion;
    $modelo = $db->get_conexion();

    if ($modelo) {
        $stmt = $modelo->prepare("CALL mostrar('egresados')");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
            $json['cantidad'] = $count;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No hay estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}

if($action == "EgresadosInfantil"){
    $db = new Conexion;
    $modelo = $db->get_conexion();

    if ($modelo) {
        $stmt = $modelo->prepare("CALL mostrar('egresadosI')");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
            $json['cantidad'] = $count;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}

if($action == "EgresadosJuvenil"){
    $db = new Conexion;
    $modelo = $db->get_conexion();

    if ($modelo) {
        $stmt = $modelo->prepare("CALL mostrar('egresadosJ')");
        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $json['status'] = true;
            $json['data'] = $data;
            $json['cantidad'] = $count;
        } else {
            $json['status'] = false;
            $json['msg'] = "<h1>No existen estudiantes</h1>";
        }
    } else {
        $json['status'] = false;
        $json['msg'] = "<h1>No existe una conexion</h1>";
    }
    echo json_encode($json);
}

if($action == "buscarEgresado"){
    $texto = ($_POST['dato'])?$_POST['dato']:"";
    $programa = ($_POST['programa'])?$_POST['programa']:"";
    $db = new Conexion;
    $modelo = $db->get_conexion();
    $final = "%".$texto."%";

    if($programa == "todos"){
        $sql = "SELECT * FROM estudiante WHERE (`nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?) AND `estado` = 'Egresado'";
    } else if($programa == "infantil"){
        $sql = "SELECT * FROM estudiante WHERE (`nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?) AND `programa` = 'Infantil' AND `estado` = 'Egresado'";
    } else {
        $sql = "SELECT * FROM estudiante WHERE (`nombres` LIKE ? OR `apellidos` LIKE ? OR `id_estudiante` LIKE ?) AND `programa` = 'Juvenil' AND `estado` = 'Egresado'";
    }

    if($modelo){
        $stmt = $modelo->prepare($sql);
        $stmt->bindParam(1, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(2, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(3, $final, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $stmt->execute();
        $count = $stmt->rowCount();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($count >0){
            $json['status']=true;
            $json['data']=$data;
        } else {
            if($programa == "todos"){
                $json['status']=false;
                $json['msj'] = "No se encontraron resultados";
            } else if($programa == "infantil"){
                $json['status']=false;
                $json['msj'] = "No se encontraron resultados en infantil";
            } else {
                $json['status']=false;
                $json['msj'] = "No se encontraron resultados en juvenil";
            }
            
        }
    } else {
        $json['status']=false;
        $json['msj']="No hay conexion";
    }
    echo json_encode($json);
}

//ACTION PARA FINALIZAR EL PROCESO DE UN ESTUDIANTE
//Graduar un estudiante
if($action == "FinProceso"){
    $id = ($_POST['id'])?$_POST['id']:"";

    $db = new Conexion;
    $modelo = $db->get_conexion();

    if($modelo){

        $stmt = $modelo->prepare("UPDATE estudiante SET estado = 'Pendiente' AND modulo = 'MJ1' WHERE id_estudiante = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $stmt->execute();

        $count = $stmt->rowCount();

        if($count > 0){
            $json['status']=true;
            $json['msj']="El estudiante con codigo ".$id." continuara el proceso";
        } else {
            $json['status']=false;
            $json['msj']="Ha ocurrido un error";
        }

    } else {
        $json['status']=false;
        $json['msj']="No hay conexion";
    }
    echo json_encode($json);

}
/*

*/
if($action == "ConProceso"){
    $id = ($_POST['id'])?$_POST['id']:"";

    $db = new Conexion;
    $modelo = $db->get_conexion();

    if($modelo){

        $stmt = $modelo->prepare("UPDATE estudiante SET estado = 'Pendiente' WHERE id_estudiante = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $stmt->execute();

        $count = $stmt->rowCount();

        if($count > 0){
            $json['status']=true;
            $json['msj']="El estudiante con codigo ".$id." continua, proceda a asignarle un modulo";
        } else {
            $json['status']=false;
            $json['msj']="Ha ocurrido un error";
        }

    } else {
        $json['status']=false;
        $json['msj']="No hay conexion";
    }

    echo json_encode($json);
}


