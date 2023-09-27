<?php
    define("BASE_URL", "http://localhost/Academy-sistem/");
    class Conexion{
		public function get_conexion(){
			$user = "root";
			$pass = "";
			$host = "localhost";
			$db = "academy_system";
			$conexion = new PDO("mysql:host=$host;dbname=$db;",$user, $pass);
			return $conexion;
		}
	}
?>