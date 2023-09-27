<?php
require_once("../modelo/class.conexion.php");

// Definitions
$accept_types = array(
	"image/pjpeg",
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/gif",
);

$to_path = "../media";

// Check directory
if(!is_dir($to_path)){
	echo "[ERROR]Internal directory not exists";
	return;
}

// Check file type
if(!in_array($_FILES["file"]["type"], $accept_types)){
	echo "[ERROR]The file type is not accepted";
	return;
}

$modelo = new Conexion;
$db = $modelo->get_conexion();
$stmt = $db->prepare( "CALL Contar_id ()");
$stmt->execute();
$num = $stmt->fetch();
$nombre_pic = "articulo" . $num[0] .".jpg";

// Move the file
if (move_uploaded_file($_FILES["file"]["tmp_name"], $to_path . "/" . $nombre_pic)) {
	echo $nombre_pic;
	return;
}

// Default error
echo "[ERROR]Move image failed!";
?>