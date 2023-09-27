<?php
    require_once("../modelo/class.conexion.php");
    //FUNCIONES PARA VALIDACIONES

    function generarCodigo($ape){
        $primeraletra = substr($ape,0,1);
        $segundaletra = strpos($ape,' ');
        $second = substr($ape, $segundaletra + 1,1);
        $num = sprintf("%03d", rand(0,999));
        $codigo = $primeraletra . $second . $num;

        return $codigo;
    }

    

    //funcion para recuperar el anterior modulo al que pertenecia un estudiante
    function getBeforeModulo($id){
        $db = new Conexion();
        $dbh = $db->get_conexion();
        $stmt = $dbh->prepare("SELECT modulo FROM estudiante WHERE id_estudiante=:code");
        $stmt->bindParam(':code', $id);
        $stmt->execute();
        $data = $stmt->fetchColumn();
        return $data;
    }

    function validarCodigo($code){
        $db = new Conexion();
        $dbh = $db->get_conexion();
        $sql = "SELECT * FROM estudiante WHERE Id_estudiante = :code";
        $stmt = $dbh->prepare($sql);
        $stmt ->bindParam(':code', $code);
        $stmt->execute();

        if($stmt->rowCount()){
            return true;
        } else {
            return false;
        }

    }

    function getCodigos($op){
        $db = new Conexion();
        $dbh = $db->get_conexion();
        $stmt = $dbh->prepare("CALL Last_modulo(?)");
        $stmt->bindParam(1,$op,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
    //PARA INCREMENTAR EL MODULO AL QUE VA A IR
    function incrementarCadena($cadena) {
        // Extraer el prefijo y el número de la cadena
        $prefijo = substr($cadena, 0, 2);
        $numero = (int) substr($cadena, 2);
        
        // Incrementar el número en 1
        $numero++;
    
        // Combinar el prefijo con el nuevo número
        $nuevaCadena = $prefijo . $numero;
    
        return $nuevaCadena;
    }

    function extaerLast($array){
        $patron = "/\d+/";
        $numeros = array();
        

        foreach($array as $unit){
            preg_match_all($patron, $unit, $con);
            $numeros = array_merge($numeros, $con[0]);
        }

        sort($numeros);
        $last = end($numeros);
        $num = $last + 1;

        return $num;
    }
    //FUNCION PARA ACTUALIZAR LA CANTIDAD DE ESTUDIANTES DE UN MODULO
    function cantidadModulo($code){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM estudiante WHERE modulo = ?");
        $stmt->bindParam(1,$code,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->rowCount();

        $stmt2 = $dbh->prepare("UPDATE modulo SET cantidad=? WHERE id_modulo = ?");
        $stmt2->bindParam(1,$data,PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt2->bindParam(2,$code,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt2->execute();
    }

    //FUNCION PARA ACTUALIZAR LA CANTIDAD DE ESTUDIANTES EN LAS SECCIONES
    function actualizarCantidadSeccion($mod, $sec){
        $db = new Conexion();
        $dbh = $db->get_conexion();
        $stmt = $dbh->prepare("SELECT * FROM estudiante WHERE modulo = ? AND seccion = ?");
        $stmt->bindParam(1,$mod,PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(2,$sec,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();

        $stmt->closeCursor();

        $update = $dbh->prepare("UPDATE seccion SET cantidad = ? WHERE modulo = ? AND id_seccion = ?");
        $update->bindParam(1,$count,PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->bindParam(2,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->bindParam(3,$sec,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->execute();
    }
    //FUNCION PARA RECUPERAR LA FECHA DE UN ESTUDIANTE PARA VALIDACION
    function recuperarFecha($id){
        $db = new Conexion();
        $dbh = $db->get_conexion();
        $stmt = $dbh->prepare("SELECT fecha_factura FROM estudiante WHERE id_estudiante=?");
        $stmt->bindParam(1,$id,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchColumn();

        return $data;
    }
    //FUNCION PARA EXTRAER TODOS LOS ESTUDIANTES DE UN MODULO PARA SU SECCIONAMIENTO
    function extraerEstudiante($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM estudiante WHERE modulo = ? ORDER BY apellidos");
        $stmt->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function extraerEstudianteActivo($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM estudiante WHERE modulo = ? AND estado = 'Activo'");
        $stmt->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
    //FUNCION PARA VERIFICAR SI EXISTEN SECCIONES PARA UN MODULO EN ESPECIFICO
    function verificarSeccion($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM seccion WHERE modulo = ?");
        $stmt->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $cont = $stmt->rowCount();

        if($cont > 0){
            return true;
        } else {
            return false;
        }
    }
    //EXTRAER LOS ESTUDIANTES DE CIERTA SECCION EN ESPECIFICO PARA BORRARLES SU RESPECTIVA SECCION
    function extraerEstudiantesSeccion($seccion, $modulo){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM estudiante WHERE modulo = ? AND seccion = ?");
        $stmt->bindParam(1,$modulo,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->bindParam(2,$seccion,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
    //FUNCION PARA LA CREACION DE LAS SECCIONES
    function avanzarLetra($letra){
        $ascii = ord($letra);

        if($letra === "Z" || $letra === "z"){
            return $letra === 'Z'?'A':'a';
        }

        $nuevoAscii = $ascii + 1;

        return chr($nuevoAscii);
    }
    //FUNCION PARA ACTUALIZAR LA CANTIDAD DE SECCIONES QUE HAY 
    function UpdateCantSecciones($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM seccion WHERE modulo = ?");
        $stmt->bindParam(1,$mod,PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        
        $stmt->execute();
        $count = $stmt->rowCount();

        $stmt->closeCursor();

        $update = $dbh->prepare("UPDATE modulo SET secciones = ? WHERE id_modulo = ?");
        $update->bindParam(1,$count,PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        $update->bindParam(2,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);

        $update->execute();
    }

    function deleteSecciones($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("DELETE FROM seccion WHERE modulo = ?");
        $stmt->bindParam(1,$mod,PDO::PARAM_INT | PDO::PARAM_INPUT_OUTPUT, 4000);
        
        $stmt->execute();
    }

    function getCantSecciones($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM seccion WHERE `modulo` = ?");
        $stmt->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();

        return $count;
    }

    function existsModulo($mod){
        $db = new Conexion();
        $dbh = $db->get_conexion();

        $stmt = $dbh->prepare("SELECT * FROM modulo WHERE id_modulo=?");
        $stmt->bindParam(1,$mod,PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
        $stmt->execute();
        $count = $stmt->rowCount();

        if($count > 0){
            return true;
        } else {
            return false;
        }
    }

    function decrementar($cadena) {
        preg_match('/^([A-Za-z]+)(\d+)$/', $cadena, $matches);
    
        if (count($matches) === 3) {
            $parteNoNumerica = $matches[1];
            $parteNumerica = intval($matches[2]);
    
            if ($parteNumerica > 1) {
                $parteNumerica--;
                return $parteNoNumerica . $parteNumerica;
            }
        }
    
        return $cadena;
    }
?>