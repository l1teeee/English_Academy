-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 24, 2023 at 04:23 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `academy_system`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `add_estudiante`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_estudiante` (IN `nombres` VARCHAR(40), IN `apellidos` VARCHAR(40), IN `edad` INT, IN `programa` VARCHAR(10), IN `factura` VARCHAR(10), IN `encargado` VARCHAR(50), IN `parentesco` VARCHAR(20), IN `correo` VARCHAR(100), IN `fecha` DATE, IN `codigo` VARCHAR(20), IN `modulo` VARCHAR(20), IN `telefono` VARCHAR(20), IN `sexo` VARCHAR(20), IN `fechafac` DATE, IN `estado` VARCHAR(20), IN `codigocdb` VARCHAR(30))   INSERT INTO `estudiante` (`id_estudiante`,`nombres`, `apellidos`, `correo`, `edad`, `programa`, `num_factura`, `fecha_ingreso`, `encargado`, `parentesco`, `modulo`, `telefono`, `sexo`, `fecha_factura`, `estado`, `codigo_cdb`) VALUES (codigo,nombres, apellidos, correo, edad, programa, factura, fecha, encargado, parentesco, modulo, telefono, sexo, fechafac, estado, codigocdb)$$

DROP PROCEDURE IF EXISTS `add_modulo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_modulo` (IN `nombre` VARCHAR(50), IN `id` VARCHAR(20), IN `programa` VARCHAR(20))   INSERT INTO `modulo` (`id_modulo`, `nombre`, `programa`) VALUES (id, nombre, programa)$$

DROP PROCEDURE IF EXISTS `add_seccion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_seccion` (IN `seccion` VARCHAR(20), IN `nombre` VARCHAR(20), IN `modulo` VARCHAR(20), IN `cantidad` INT)   INSERT INTO seccion (`id_seccion`, `nombre`, `modulo`, `cantidad`) VALUES (seccion, nombre, modulo, cantidad)$$

DROP PROCEDURE IF EXISTS `buscar_estu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar_estu` (IN `nombre` VARCHAR(100), IN `apellido` VARCHAR(100), IN `codigo` VARCHAR(100), IN `programa` VARCHAR(20))   IF programa = 'todos' THEN
SELECT * FROM estudiante WHERE `nombres` LIKE nombre OR `apellidos` LIKE apellido OR `id_estudiante` LIKE codigo;
	/* PARA EXTRAER LOS DEL PROGRAMA INFANTIL*/
	ELSEIF programa = 'infantil' THEN
    SELECT * FROM estudiante WHERE (`nombres` LIKE nombre OR `apellidos` LIKE apellido OR `id_estudiante` LIKE codigo) AND `programa` = 'Infantil';
    /*PARA EXTRAER LOS DEL PROGRAMA JUVENIL*/
    	ELSEIF programa = 'juvenil' THEN
        SELECT * FROM estudiante WHERE (`nombres` LIKE nombre OR `apellidos` LIKE apellido OR `id_estudiante` LIKE codigo) AND `programa` = 'Juvenil';
        END IF$$

DROP PROCEDURE IF EXISTS `buscar_estu_seccion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar_estu_seccion` (IN `op` VARCHAR(30), IN `modulo` VARCHAR(30), IN `seccion` VARCHAR(30), IN `texto` VARCHAR(255))   IF op = "seccion" THEN
	SELECT * FROM estudiante WHERE(`nombres` LIKE texto OR `apellidos` LIKE texto OR `id_estudiante` LIKE texto) AND `modulo` = modulo AND `seccion`= seccion;
    ELSEIF op = "sinseccion" THEN
    	SELECT * FROM estudiante WHERE (`nombres` LIKE texto OR `apellidos` LIKE texto OR `id_estudiante` LIKE texto) AND `modulo` = modulo AND `seccion` = seccion;
        END IF$$

DROP PROCEDURE IF EXISTS `buscar_modulo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar_modulo` (IN `modulos` VARCHAR(20), IN `nombre` VARCHAR(20))   SELECT * FROM modulo WHERE modulo.id_modulo LIKE modulos OR modulo.nombre LIKE nombre$$

DROP PROCEDURE IF EXISTS `deletes`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletes` (IN `op` VARCHAR(20), IN `id` VARCHAR(10))   IF op = 'estudiante' THEN
	DELETE FROM estudiante WHERE id_estudiante = id;
    ELSEIF op = 'modulo' THEN
    	DELETE FROM modulo WHERE id_modulo = id;
END IF$$

DROP PROCEDURE IF EXISTS `delete_estu_seccion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_estu_seccion` (IN `estu` VARCHAR(20))   UPDATE estudiante SET `seccion` = NULL WHERE `id_estudiante` = estu$$

DROP PROCEDURE IF EXISTS `delete_seccion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_seccion` (IN `seccion` VARCHAR(20), IN `modulo` VARCHAR(20))   DELETE FROM seccion WHERE `id_seccion` = seccion AND `modulo` = modulo$$

DROP PROCEDURE IF EXISTS `delete_seccion_estu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_seccion_estu` (IN `estu` INT(20))   UPDATE estudiante SET `seccion` = NULL WHERE `id_estudiante` = estu$$

DROP PROCEDURE IF EXISTS `Last_modulo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Last_modulo` (IN `op` VARCHAR(30))   IF op = "infantil" THEN
	SELECT id_modulo FROM modulo WHERE id_modulo LIKE 'MI%' ORDER BY CAST(SUBSTRING(id_modulo, 3) AS UNSIGNED);
	ELSEIF op = "juvenil" THEN
    SELECT id_modulo FROM modulo WHERE id_modulo LIKE 'MJ%' ORDER BY CAST(SUBSTRING(id_modulo, 3) AS UNSIGNED);
      END IF$$

DROP PROCEDURE IF EXISTS `Login_Personal`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Login_Personal` (IN `Usuario` VARCHAR(100))   SELECT * FROM personal p WHERE p.Usuario = Usuario$$

DROP PROCEDURE IF EXISTS `mostrar`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrar` (IN `op` VARCHAR(30))   IF op = 'estudiante' THEN
    SELECT * FROM estudiante;
	ELSEIF op = 'modulo' THEN
    	SELECT * FROM modulo ORDER BY CAST(SUBSTRING(id_modulo, 3) AS UNSIGNED);
        	ELSEIF op = 'listaM' THEN
            	SELECT id_modulo FROM modulo ORDER BY CAST(SUBSTRING(id_modulo, 3) AS UNSIGNED);
                ELSEIF op = 'infantil' THEN
                	SELECT * FROM estudiante WHERE programa = 'Infantil';
                    ELSEIF op ='juvenil' THEN
                    SELECT * FROM estudiante WHERE programa = 'Juvenil';
                    	ELSEIF op = 'MInfantil' THEN
                        SELECT * from modulo WHERE programa = 'Infantil';
                        	ELSEIF op = "MJuvenil" THEN 
                            	SELECT * FROM modulo WHERE programa = 'Juvenil';
                                	ELSEIF op = "egresados" THEN
                                    	SELECT * FROM estudiante WHERE estado = 'Egresado';
                                        	ELSEIF op = "egresadosI" THEN 
												SELECT * FROM estudiante WHERE estado = 'Egresado' AND programa = "Infantil";
                                                	ELSEIF op = "egresadosJ" THEN
                                                    	SELECT * FROM estudiante WHERE estado = 'Egresado' AND programa = "Juvenil";
                                END IF$$

DROP PROCEDURE IF EXISTS `mostrarSecciones`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrarSecciones` (IN `modulos` VARCHAR(10))   SELECT * FROM seccion WHERE modulo = modulos$$

DROP PROCEDURE IF EXISTS `mostrar_alumnos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrar_alumnos` (IN `mods` VARCHAR(10), IN `seccion` VARCHAR(10))   SELECT * FROM estudiante WHERE `modulo` = mods AND `seccion` = seccion$$

DROP PROCEDURE IF EXISTS `show_individual`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `show_individual` (IN `op` VARCHAR(30), IN `id` VARCHAR(20))   IF op = 'estudiante' THEN 
	SELECT * FROM estudiante WHERE id_estudiante = id;
    ELSEIF op = 'modulo' THEN 
    	SELECT * FROM modulo WHERE id_modulo = id;
        ELSEIF op = 'porModulo' THEN
        	SELECT * FROM estudiante WHERE modulo = id;
            END IF$$

DROP PROCEDURE IF EXISTS `update_estu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_estu` (IN `nombres` VARCHAR(40), IN `apellidos` VARCHAR(40), IN `correo` VARCHAR(100), IN `edad` INT, IN `programa` VARCHAR(10), IN `factura` VARCHAR(10), IN `encargado` VARCHAR(50), IN `parentesco` VARCHAR(20), IN `id` VARCHAR(10), IN `modulo` VARCHAR(10), IN `telefono` VARCHAR(20), IN `sexo` VARCHAR(20), IN `estado` VARCHAR(30))   UPDATE `estudiante` SET `nombres` = nombres, `apellidos`= apellidos, `correo` = correo, `edad` = edad, `programa`= programa, `num_factura` = factura, `encargado` = encargado, `parentesco` = parentesco, `modulo` = modulo, `telefono` = telefono, `sexo` = sexo, `estado` = estado WHERE `id_estudiante` = id$$

DROP PROCEDURE IF EXISTS `update_seccion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_seccion` (IN `aula` VARCHAR(100), IN `docente` VARCHAR(100), IN `modulo` VARCHAR(20), IN `seccion` VARCHAR(20))   UPDATE seccion SET `docente` = docente, `salon` = aula WHERE `modulo` = modulo AND `id_seccion` = seccion$$

DROP PROCEDURE IF EXISTS `update_seccion_estu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_seccion_estu` (IN `alumno` VARCHAR(10), IN `seccion` VARCHAR(10))   UPDATE estudiante SET `seccion` = seccion WHERE `id_estudiante` = alumno$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
CREATE TABLE IF NOT EXISTS `estudiante` (
  `id_estudiante` varchar(20) NOT NULL,
  `nombres` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `apellidos` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `sexo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `programa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `num_factura` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_factura` date DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `modulo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `seccion` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `encargado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parentesco` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `codigo_cdb` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_estudiante`),
  KEY `seccion` (`seccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `nombres`, `apellidos`, `correo`, `edad`, `sexo`, `estado`, `programa`, `num_factura`, `fecha_factura`, `fecha_ingreso`, `modulo`, `seccion`, `encargado`, `parentesco`, `telefono`, `codigo_cdb`) VALUES
('A781', 'Asael Alessandro', 'Alvarado', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16089', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7792-1160', ''),
('AA098', 'Adriana María', 'Artiga Aranda', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16280', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Ana Maria Artiga Aranda', 'Madre', '7011-2937', ''),
('AA418', 'Jesus Adrian', 'Aguilar Abrego', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11547', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AA432', 'Alessandra Sarahí', 'Andrade Alvarenga', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16399', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('AA460', 'Madelline Esmeralda', 'Andrade Aguilar', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15736', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AA648', 'César Alexander', 'Ayala Alferez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16348', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Don Bosco', 'Otro', '7636-8197', ''),
('AA758', 'Emerson Joaquin', 'Alberto Alberto', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17370', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AA864', 'Yerli Tatiana', 'Alvarez Alfaro', '', 15, 'Femenino', 'Activo', 'Juvenil', 'FAC114007', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Celina Del Carmen Alfaro De Alvarez', 'Madre', '7418-0902', ''),
('AAF21', 'Matthew Aaron', 'Aguilar Argueta', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17379', '2023-08-23', '0000-00-00', 'MI2', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('AC121', 'Dominic Alejandro', 'Abarca Canizales', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11707', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Juan Abarca', 'Padre', '7873-1429', ''),
('AC311', 'Eileen Nayeli', 'Alegria Ceron', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11481', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AC749', 'Johana Sarai', 'Alberto Cañas', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11604', '2023-08-23', '0000-00-00', 'MI8', 'A', 'ELSIE DE ALBERTO', 'Otro', '7928-3664', ''),
('AD328', 'Fiorella Alexandra', 'Arévalo Díaz', 'fiorellaalexandraarevalo@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11320', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Norman Alexander Arevalo Gonzalez', 'Padre', '7840-5485', ''),
('AF289', 'Angie Lizbeth', 'Alfaro Flores', '', 8, 'Femenino', 'Activo', 'Infantil', 'FAC1184', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Gladis Flores', 'Madre', '7212-6140', ''),
('AF917', 'Raquel Elizabeth', 'Alfaro', '', 13, 'Femenino', 'Activo', 'Juvenil', 'FAC11763', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Ana Margarita Salazar', 'Madre', '7373-2002', ''),
('AG208', 'Mery Shlemm', 'Aquino González', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16122', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('AG358', 'Ester Vicenta', 'Aquino González', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16121', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7953-5627', ''),
('AG502', 'Johny Francisco', 'Ayala García', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15946', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Karla Libania Garcia', 'Madre', '7777-9422', ''),
('AG815', 'Anthony Asael', 'Avila Gomez', '', 6, 'Masculino', 'Pendiente', 'Infantil', '', '0000-00-00', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('AG876', 'Marcos Daniel', 'Ayala Guevara', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16154', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Cristobal Ayala', 'Otro', '7688-7517', ''),
('AH701', 'Angie Sophia', 'Alvarenga Hernandez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11623', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Milagro Hernandez', 'Madre', '7805-4868', ''),
('AL139', 'Gustavo Alexis', 'Ayala Lainez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11712', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AM108', 'Camila Nicole', 'Aquino Molina', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11831', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AM491', 'Diego Alexander', 'Alfaro Molina', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11645', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Iris Molina', 'Otro', '7467-8867', ''),
('AM520', 'Nathaly Fernanda', 'Alfaro Molina', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11644', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Iris Molina', 'Otro', '7467-8867', ''),
('AM545', 'Ariana Lucia', 'Ardon Martinez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11338', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AM693', 'Andrea Nicolle', 'Alvarez Monge', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11479', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AN652', 'Alisson Camila', 'Aguirre Narvarez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11669', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AR287', 'Xiomara Nicol', 'Aguilar Renderos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11632', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '6313-4146', ''),
('AR385', 'Lindsay Dariana', 'Alfaro Rivas', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11633', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AR473', 'Isis Belen', 'Alvarado Rivera', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16091', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Fidel Alvarado', 'Padre', '7792-1160', ''),
('AR617', 'Celeste Larissa', 'Alvarado Rivera', 'estudiante20160266@cdb.edu.sv', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16092', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Fidel Alvarado Rosa', 'Padre', '7792-1160', ''),
('AR998', 'Claudia Alexandra', 'Ardón Romero', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC17374', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('ARF79', 'Luis Antonio', 'Aguilar Rodriguez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16110', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Mirna Patricia Rodriguez De Aguilar', 'Madre', '7797-8206', ''),
('AS106', 'Elena Monserrat', 'Andrade Serrano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11639', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Idalia Elizabeth Serrano', 'Madre', '7170-6335', ''),
('AS315', 'Sophia Elizabeth', 'Andrade Serrano', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11640', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AS478', 'Daniel Emiliano', 'Alas Soriano', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11799', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Carla Xiomara Soriano Alas', 'Madre', '7932-7572', ''),
('AT729', 'Anderson Steven', 'Arias Tobias', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC17368', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7468-8491', ''),
('AV649', 'Leonardo Enrique', 'Aviles Velasco', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16065', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('AZ483', 'Fernando Ernesto', 'Ayala Zelaya', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16156', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7688-7517', ''),
('AZ672', 'Sofia Aracely', 'Aguirre Zepeda', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11825', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('AZ712', 'William Josue', 'Aguirre Zepeda', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11827', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('BA167', 'Gabriela Alexandra', 'Barrera Umaña', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11759', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('BB293', 'Adrian Armando', 'Beltran Bautista', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11771', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('BC654', 'Leonardo Alfredo', 'Benitez Chavez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11796', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Cindy Jazmin Chavez Vasquez', 'Madre', '7636-9058', ''),
('BE726', 'Fernando Elias', 'Bautista Escobar', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11586', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('BF712', 'Emily Nayely', 'Bautista Flores', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11482', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('BL837', 'Alessandra Monserrat', 'Berrio Lopez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11621', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Ivette De Berios', 'Otro', '7653-8220', ''),
('BP941', 'Melanie Giselle', 'Bernal Ponce', '', 12, 'Femenino', 'Activo', 'Juvenil', 'FAC11555', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Hector Osmin Bernal Lopez', 'Padre', '7029-4162', ''),
('BR315', 'Santiago Rafael', 'Blanco Rivera', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11716', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Maria Elena de Martinez', 'Abuela', '6125-3718', ''),
('BR620', 'Sebastian Emanuel', 'Blanco Rivera', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11715', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('C835', 'Lissbeth Eunice', 'Castillo', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17387', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7223-9934', ''),
('CA615', 'Megan Massiel', 'Cubias Alvarenga', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17395', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CA662', 'Melani Ariadna', 'Córdova Amaya', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11686', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '6009-4851', ''),
('CA712', 'Matthew Evander', 'Cerritos Aguirre', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16131', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CA749', 'Mauricio Josué', 'Campos Arias', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16138', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7675-8443', ''),
('CA787', 'Fiorella Nicole', 'Cubias Alvarenga', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11887', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Sandra Alvarenga', 'Madre', '7207-7562', ''),
('CB673', 'Hazel Yarely', 'Canales Blanco', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11389', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Sonia Canales', 'Madre', '6969-2902', ''),
('CB890', 'Greidys Marleni', 'Canales Blanco', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11390', '2023-08-23', '0000-00-00', 'MI7', 'B', 'SONIA MARLENI BLANCO DE CANALES', 'Madre', '7226-0801', ''),
('CC109', 'Wilber Emanuel', 'Campos Campos', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11801', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7695-7579', ''),
('CD219', 'Valeria Nicolle', 'Cordova Delgado', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16343', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7044-6494', ''),
('CF801', 'Levis Stanley', 'Cedillos Figueroa', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15994', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('CG182', 'Hector David', 'Cruz Gomez', 'david.cruz4am@gmail.com', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11658', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Flor Damaris Gomez de Cruz', 'Madre', '7364-8935', ''),
('CG501', 'Keren Daniela', 'Carrillo García', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16119', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '6104-8895', ''),
('CG765', 'Camila Yamileth', 'Chacon Garcia', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC15989', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7223-7129', ''),
('CH126', 'Daniel Alexander', 'Cardoza Hernandez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11602', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('CH882', 'Mayra Soraya', 'Cornejo Henriquez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11584', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Mayra Henriquez', 'Otro', '6008-1582', ''),
('CL673', 'Andrea Cecilia', 'Castillo Linares', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16041', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CL781', 'Sarai Elizabeth', 'Contreras Lemus', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16233', '2023-08-23', '0000-00-00', 'MI7', 'B', 'ISRAEL ARTURO CONTRERAS PALACIOS', 'Padre', '7730-8599', ''),
('CL784', 'Mathias Fernando', 'Chavez Lopez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11835', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Don Bosco', 'Otro', '7457-8616', ''),
('CM155', 'Matheo Alessandro', 'Carbajal Menjivar', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11600', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CM182', 'Gabriel Alexander', 'Castillo Medrano', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC15936', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Julia Yamileth', 'Otro', '6161-2079', ''),
('CM449', 'Mateo Alexander', 'Castillo Medrano', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11673', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('CM482', 'Aldo Javier', 'Chávez Medrano', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15948', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CO236', 'Erick Edgardo', 'Campos Orellana', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11238', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CO473', 'Simon Andres', 'Corado Ochoa', 'simoncorado@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11560', '2023-08-23', '2023-08-23', 'MI9', 'A', 'Isabel Corado', 'Madre', '7877-1356', ''),
('CP157', 'Jairo Nathanael', 'Cotez Paz', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17523', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7713-2852', ''),
('CP823', 'Kevin Xavier', 'Ceron Perez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15674', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CQ746', 'Camila Fernanda', 'Calderón Quintanilla', 'fercalderon3456@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16142', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Fredy Selin Calderón Mendez', 'Padre', '7920-3019', ''),
('CR189', 'Maria Fernanda', 'Chavez Rivera', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11812', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CR359', 'Alessandra Carolina', 'Cabrera Ramos', 'estudiante20160165@cdb.edu.sv', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11609', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Yesenia Carolina Ramos de Cabrera', 'Madre', '7165-1219', ''),
('CR403', 'Henry Adriel', 'Cruz Roque', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11622', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('CS436', 'Karen Marcela', 'Cuellar Sosa', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16329', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CS456', 'Mateo José', 'Castro Saenz', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11666', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Lorena Elizabeth Saenz', 'Madre', '7152-9279', ''),
('CS824', 'Daniela Rosemary', 'Cabeza Salazar', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11417', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('CV163', 'Joshua Steven', 'Chavez Vigil', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11883', '2023-08-23', '0000-00-00', 'MI8', 'A', 'MAIRA JESENIA VIGIL', 'Otro', '7711-9912', ''),
('CZ654', 'Alejandra Lisseth', 'Castillo Zetino', 'alelisscastillo@gmail.com', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC17386', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Claudia Yesenia Zetino de Castillo', 'Madre', '7223-9934', ''),
('DA192', 'Ricardo Jose', 'Diaz Amaya', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16143', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('DB345', 'Nelson Manuel', 'Dominguez Beltran', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15691', '2023-08-23', '0000-00-00', 'MI8', 'A', 'zoila Dominguez', 'Otro', '2290-5262', ''),
('DC623', 'Maite Beatriz', 'Diaz Chicas', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11660', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('DC713', 'Sebastian Rene', 'Diaz Chicas', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11659', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('DD643', 'Roberto Antonio', 'Durán Delgado', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11667', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('DP509', 'Maria Jose', 'Dimas Platero', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11829', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('DP538', 'Adriana Melissa', 'Diaz Pocasangre', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11624', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('DPQ42', 'Celeste Abigail', 'Diaz Palacios', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15737', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Brenda Johana Palacios De Diaz', 'Madre', '7897-0719', ''),
('DR825', 'Genesis Alexandra', 'Diaz Rivera', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11490', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('DT213', 'Maria Celeste', 'Diaz Torres', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11681', '2023-08-23', '0000-00-00', 'MI7', 'B', 'GLORIA IVETTE TORRES RIVAS', 'Madre', '6149-8392', ''),
('EA509', 'Ashlyn Lisseth', 'Escobar Arana', 'ashlynwsl52@gmail.com', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11710', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Sandra Lisseth Arana de Escobar', 'Madre', '7539-6625', ''),
('EBF14', 'Valeria Fernanda', 'Escobar Bonilla', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16379', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Roberto Vladimir Escobar', 'Padre', '7658-7973', ''),
('EBF58', 'Alejandra Michelle', 'Escobar Bonilla', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16378', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Roberto Vladimir Escobar', 'Padre', '7751-3058', ''),
('EG121', 'Nelson Enrique', 'Enriquez Garcia', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11664', '2023-08-23', '0000-00-00', 'MI7', 'B', 'CARMEN ENRIQUEZ', 'Madre', '7102-6849', ''),
('EG245', 'Allisson Daniela', 'Elias García', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11629', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7870-9922', ''),
('EG912', 'Ashley Alexandra', 'Elias Gacia', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11628', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '7870-9922', ''),
('EM971', 'David Alessandro', 'Erazo Martinez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11608', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Nuria Aviceli Abarca de Martinez', 'Madre', '7604-1005', ''),
('EO126', 'Mateo Alexander', 'Espinoza Osorio', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11520', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('EP395', 'Ingrid Milagro', 'Elias Ponce', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11680', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Ingrid Rosalpina Ponce', 'Otro', '7048-8936', ''),
('EP741', 'Josephine Yajaira', 'Elias Ponce', 'yajairaponcelias.09@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11679', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Ingrid Rosalpina Ponce de Elias', 'Madre', '7048-8936', ''),
('FC107', 'Sofia Valentina', 'Figueroa Castellanos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11599', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('FL437', 'Samuel Enrique', 'Flores', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16247', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('FM328', 'Cristina Marcela', 'Figueroa Martinez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11388', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('FM523', 'Gabriela Jimena', 'Flores Martinez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16165', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('FM526', 'Adriana Valentina', 'Flores Martínez', 'totolandia.08042021@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16166', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Eva Maria Martinez de Flores', 'Madre', '7622-5464', ''),
('FM679', 'Genesis Isabella', 'Flores Martinez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16164', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('FN632', 'Daniela Noemy', 'Fuentes Navarro', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11400', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('FQ902', 'Matias Sebastian', 'Flores Quintanilla', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17377', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('FR589', 'Iliana Pamela', 'Flores Ruiz', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11562', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Elsy Ruiz', 'Otro', '7846-3415', ''),
('FS639', 'Sofia Velentina', 'Flores Salazar', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16024', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('GA139', 'Emely Aracely', 'Granados Alas', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11821', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GD617', 'Gabriel Isaias', 'Gutierrez Delgado', 'estudiante20180038@cdb.edu.sv', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16235', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Ana Elizabeth Delgado de Gutierrez', 'Madre', '7127-2965', ''),
('GE237', 'Valeria Guadalupe', 'Guardado Escobar', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11698', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('GE284', 'Maria Fernanda', 'Garcia Escalante', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11589', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('GE607', 'Jhoselin Sarai', 'Garcia Estrada', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11335', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GE725', 'Andrea Valentina', 'Garcia Escalante', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11590', '2023-08-23', '0000-00-00', 'MI7', 'B', 'Fernando Edgardo Garcia Romero', 'Madre', '7660-6052', ''),
('GE941', 'Jefferson Alexander', 'Gómez Escobar', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11105', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GF521', 'Zoe Valentina', 'Guevara Flores', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16155', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('GF523', 'Glenda Isabella', 'Gonzalez Flores', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC17385', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GF628', 'Alexandra Del Carmen', 'Garcia Flores', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC15988', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7724-6707', ''),
('GG106', 'Alexis Emanuel', 'González González', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC17525', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('GG697', 'Gabriela Alexandra', 'González González', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16327', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GG837', 'Alicia Jimena', 'García Gutierrez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16199', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7846-6618', ''),
('GG935', 'Santiago Alberto', 'Garcia Garcia', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17535', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('GHK67', 'Mario Ernesto', 'Galvez Hidalgo', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15616', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Emerson Omar Gálvez Cardona', 'Otro', '7459-6187', ''),
('GM648', 'Kathlen Dariana', 'Gonzalez Mejia', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16307', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7685-2401', ''),
('GP208', 'Alisson Michelle', 'Garcia Pineda', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC17393', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GR317', 'Josue Daniel', 'Girón Recinos', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11636', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('GR379', 'Fania Marianela', 'Guardado Rodriguez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11597', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GR582', 'Santiago Josue', 'Gonzalez Rivas', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11789', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('GR725', 'Camila Nicole', 'Guadrón Ramos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11222', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('GR728', 'Giselle Abigail', 'Giron Recinos', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11637', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7711-0888', ''),
('GR913', 'Roxana Marcela', 'García Ramírez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16360', '2023-08-23', '0000-00-00', 'MJ3', '', 'Don Bosco', 'Otro', '7925-4665', ''),
('GR964', 'Bianca Isabella', 'Guadron Ramos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11223', '2023-08-23', '0000-00-00', 'MI7', 'B', 'Fredy Vladimir Guadron', 'Padre', '7886-6702', ''),
('GS748', 'Francisco Mateo', 'Garcia Solis', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17537', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('GT602', 'Fabiola Alessandra', 'Garcia T.', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17536', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('GV301', 'Paola Raquel', 'García Valle', 'estudiante20180197@cdb.edu.sv', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16345', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Gloria Cristabel Valle Molina', 'Madre', '7826-1505', ''),
('GV309', 'Jonathan Levi', 'García Valle', 'estudiante20160387@cdb.edu.sv', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16346', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Gloria Cristabel Valle Molina', 'Madre', '7826-1505', ''),
('GZ196', 'Rene Alejandro', 'Guardado Zepeda', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11699', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('H946', 'Christopher Romero', 'Hernandez Gamez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16401', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HA403', 'Jose Xavier', 'Hernandez Aguirre', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16132', '2023-08-23', '0000-00-00', 'MI8', 'A', 'HEISI PATRICIA AGUIRRE M.', 'Otro', '7171-4342', ''),
('HAE72', 'Alisson Fiorella', 'Hernandez Aguirre', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15986', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Karla Aguirre', 'Madre', '6450-0824', ''),
('HC129', 'Carlos Mateo', 'Hernandez Chavez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17371', '2023-08-23', '0000-00-00', 'MI8', 'A', 'ELENA CHAVEZ', 'Otro', '7517-9720', ''),
('HC550', 'Matías Ernesto', 'Hernández Cardona', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11674', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('HD143', 'Vanessa Alexandra', 'Hernandez Diaz', '', 6, 'Femenino', '', 'Juvenil', 'FAC15899', '0000-00-00', '0000-00-00', '', '', 'Don Bosco', 'Otro', '6155-4552', ''),
('HE110', 'Rony Alejandro', 'Hernández', '', 13, 'Masculino', 'Activo', 'Juvenil', 'FAC16059', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Loise Grace Alfaro', 'Madre', '7636-8197', ''),
('HE309', 'Orlando Efrain', 'Hernandez Estupinian', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16161', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HE642', 'David Eliseo', 'Hernandez Elias', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11244', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7090-9883', ''),
('HE647', 'Ashley Nayeli', 'Hernandez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16368', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('HE719', 'Jeferson Daniel', 'Hernandez Escobar', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11325', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HE859', 'Angie Esmeralda', 'Henriquez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16298', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HEG83', 'Miguel Mathias', 'Hernandez Escalante', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11546', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Irene Margarita Escalante', 'Madre', '6029-8817', ''),
('HF333', 'Alisson Daniela', 'Hernández Flores', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11692', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7837-8897', ''),
('HF845', 'Carol Mariel', 'Herrera Flores', 'arisita.mxb35@gmail.com', 6, 'Femenino', 'Pendiente', 'Infantil', '', '0000-00-00', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HG308', 'Gabriela Alejandra', 'Henriquez Garcia', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11662', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HG382', 'Andrea Celeste', 'Henriquez Garcia', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11663', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HL498', 'Sara Denisse', 'Hernandez Landaverde', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16058', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HM935', 'Zoe Fernanda', 'Hernandez Molina', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16375', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Cindy Guadalupe Molina Ponce', 'Madre', '6175-2759', ''),
('HO983', 'Brian Eliezer', 'Hernandez Ortiz', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16006', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HP762', 'Alisson Alexandra', 'Hercules Pineda', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16093', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HP901', 'Brandon Eli', 'Herrera Panameño', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16266', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '6169-2800', ''),
('HQ712', 'Dominic Mateo', 'Hernandez Quintanilla', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17530', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('HR724', 'Genesis Fernanda', 'Hernandez Roque', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11492', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7457-8328', ''),
('HR984', 'William Mateo', 'Hernandez Roque', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC17366', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('HU821', 'Mia Gabriela', 'Hurtado', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11109', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('JZ301', 'Fernando Alonso', 'Sánchez Juarez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11797', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LA322', 'Sofia Marisol', 'Lopez Amaya', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11706', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '7670-8691', ''),
('LA392', 'Genesis Daniela', 'Lopez Amaya', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11761', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7104-2970', ''),
('LA572', 'Paola Abigail', 'Lopez Amaya', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11705', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LA998', 'Joseph Daniel', 'Lopez Acevedo', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11760', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Dennis Acevedo Marlon Lopez', 'Otro', '6120-7750', ''),
('LC429', 'Maria Jose', 'Lopez Cordoba', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15843', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LC950', 'Anderson Rodrigo', 'Leon Calderon', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11702', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LCJ68', 'Genesis Valeria', 'Lopez Campos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11635', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Gabriela Campos Quintanilla', 'Madre', '6424-9897', ''),
('LE690', 'Emilia Valeria', 'Luna Escobar', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16341', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LG673', 'Carol Michelle', 'Luna Guillén', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16286', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('LH727', 'Alexandra Gabriela', 'Lopez Hernandez', 'saenlopez123@gmail.com', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16400', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Claudia Maria Hernandez Rivera', 'Madre', '7677-5862', ''),
('LH987', 'David Enrique', 'Lopez Hernandez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16402', '2023-08-23', '0000-00-00', 'MI7', 'B', 'CLAUDIA MARIA HERNANDEZ RIVERA', 'Madre', '7677-5862', ''),
('LL814', 'Dayanna Victoria', 'Lopez Lopez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC17373', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LL886', 'Carlos Eduardo', 'Lopez Lopez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17372', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('LN549', 'Rodrigo Enrique', 'León Navas', 'pppppaldc@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11661', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Wendy Navas de León', 'Madre', '7044-7522', ''),
('LP227', 'Gabriela Alejandra', 'Lozano Perdomo', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16088', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Jonattan Lozano', 'Otro', '7746-0626', ''),
('LP682', 'Diego Saúl', 'Lima Pocasangre', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15730', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Saul Aristides Lima Hernández', 'null', '7138-6338', ''),
('LP741', 'Luis René', 'López Pérez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11341', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7873-1313', ''),
('LP994', 'Scarlett Alessandra', 'Lopez Ponce', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16176', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('LQ135', 'Daniela Alexandra', 'Lizama Quan', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11688', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Eva Maritza Quan', 'Madre', '7874-1259', ''),
('LQZ99', 'Saul Alberto', 'Lizana Quan', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11689', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Eva Maritza Quan De Lizana', 'Madre', '7874-1259', ''),
('LR123', 'Diego Humberto', 'Lopez Romero', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16193', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Humberto Lopez', 'Padre', '7394-1825', ''),
('LR266', 'Andrea Raquel', 'López Ramírez', '', 12, 'Femenino', 'Activo', 'Juvenil', 'FAC16061', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Floridalma De Lopez', 'Madre', '7003-1211', ''),
('LR338', 'Mario Fernando', 'Leon Roque', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11670', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('LR994', 'Helen Rachell', 'Lovato Ramirez', 'helenrachelllovatoramirez@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17518', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Claudia Judith Ramirez de Lovato', 'Madre', '7786-0712', ''),
('LS917', 'Yessenia Carolina', 'Lemus Santamaria', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11412', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7712-8330', ''),
('LS920', 'Darwin Said', 'Luna Segovia', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11471', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LV582', 'Alejandra Sofia', 'Lemus Villalta', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11804', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '7988-8026', ''),
('LV724', 'Lorena Fernanda', 'Lemus Ventura', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11205', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('LV946', 'Nathalie Gabriela', 'Lucero Ventura', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17399', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('M322', 'Danilo Alejandro', 'Menjivar', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15907', '2023-08-23', '0000-00-00', 'MI7', 'B', 'Rina Cristela Peñate', 'Madre', '7648-3834', ''),
('M463', 'William Daniel', 'Martinez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16342', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7844-8228', ''),
('MA491', 'Lourdes Abigail', 'Martinez Alfaro', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11729', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MA510', 'Marina Concepción', 'Martínez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15854', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MA697', 'Iker Alejandro', 'Mejia Artiga', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11823', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Ana Carolina', 'Otro', '7603-2257', ''),
('MA746', 'Emma Sophia', 'Mina Ayala', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11778', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MC245', 'Genesis Adela', 'Maldonado Cornejo', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11513', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MC367', 'Maria Del Carmen', 'Martinez Córdova', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16187', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MC609', 'Eileen Adrianne', 'Merino Chicas', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11780', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MC912', 'Paolo Sebastian', 'Maldonado Cordova', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17414', '2023-08-23', '0000-00-00', 'MI8', 'A', 'MARIANA RAMIREZ', 'Otro', '7021-7930', ''),
('MC923', 'Camila Valeria', 'Mancia Cornejo', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11264', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MCV25', 'Lucas Santiago', 'Maldonado Cordova', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17415', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MD578', 'Marcos Balmore', 'Menjivar Deras', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11672', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Hilda Emperatriz Deras de Mejia', 'Madre', '7039-5216', ''),
('MG348', 'Rene Steven', 'Martínez Gutiérrez', 'martinezgutierrezrenesteven@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15782', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Iris Marisela Gutierrez ', 'Madre', '7633-3890', ''),
('MG523', 'Luis Adalberto', 'Martinez Guillen', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15853', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Alex Antonio Ramos', 'Otro', '2536-2687', ''),
('MG615', 'Daniela Alejandra', 'Martinez Garcia', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16236', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MG625', 'Samuel Eliseo', 'Montes Guevara', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16373', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MG729', 'Allison Sahory', 'Madrid Gonzalez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16126', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MG745', 'Edwin Alessandro', 'Monterrosa Garcia', 'alessandro.monterrosa15@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11709', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Maria Guadalupe García Ramos', 'Otro', '7531-7461', ''),
('MG921', 'Genesis Alejandra', 'Melara Galdamez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16220', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MG938', 'Katherine Andrea', 'Monterrosa Garcia', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11708', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MG945', 'Ivan Alejandro', 'Mejia Gonzalez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16128', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Hilsia Lorena Mejia Gonzalez', 'Madre', '7755-9291', ''),
('MH478', 'Oscar Samuel', 'Mena Hernandez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11690', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MH649', 'Cristel Anelisse', 'Mejia Herrera', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16042', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MH731', 'Angel Alejandro', 'Monzon Henriquez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC17526', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MH872', 'Jonatan Stanley', 'Martínez Hernandez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16218', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('ML819', 'Andrea Gabriela', 'Murillo López', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11404', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Yaneth de Murillo', 'Otro', '7206-7285', ''),
('MM437', 'Alexandra Abigail', 'Mejia Mejia', 'alexandramejiamejia04@gmail.com', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11451', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Karla Lorena Mejia de Mejia', 'Madre', '7740-9462', ''),
('MM509', 'Fatima Alessandra', 'Martinez Medrano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16047', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MM519', 'Grecia Fernanda', 'Molina Mancia', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16270', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('MM647', 'Jose Daniel', 'Menjivar Morales', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15867', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Raquel Alejandra Morales', 'Madre', '6137-3922', ''),
('MM834', 'Jefferson Alexander', 'Molina Mira', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11413', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MMM03', 'Valeria Sofia', 'Mercado Mejia', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15612', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MMM37', 'Mateo Santiago', 'Martinez Martinez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16331', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Herbert Mauricio Martinez Henriquez', 'Padre', '7170-2881', ''),
('MO809', 'Genesis Lucero', 'Mejia Orellana', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11115', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MP216', 'Joaquin Fernando', 'Machado Portillo', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11836', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MP713', 'Luis Jose', 'Martinez Palacios', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11807', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MP753', 'Amelia Valentina', 'Montez Perez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17388', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MP837', 'Emerson Arturo', 'Melgar Perez', '', 14, 'Masculino', 'Activo', 'Juvenil', 'FAC11713', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MR364', 'Mateo Alejandro', 'Mercedes Reyes', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11313', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('MR812', 'Pamela Michelle', 'Mendoza Ramirez', 'ramirezbautistauno.francisca@gmail.com', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11795', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Jose Santos Mendoza Sanchez', 'Padre', '7803-9240', ''),
('MR906', 'Kevin Leonardo', 'Meléndez Ramos', 'kmelendezramos@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11653', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Susana Veronica Ramos de Melendez', 'Madre', '7634-7290', ''),
('MRR91', 'Genesis Estefania', 'Martinez Reyes', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15786', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Dinora De Martinez', 'Madre', '7221-6246', ''),
('MRY55', 'Zoe Camila', 'Martinez Rivera', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11805', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('MS577', 'Fernando André', 'Molina Solano', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16116', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7082-5510', ''),
('MS811', 'Sergio Alessandro', 'Monterrosa Serrano', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11318', '2023-08-23', '0000-00-00', 'MI8', 'A', 'NORMA ELIZABETH SERRANO', 'Otro', '7053-9629', ''),
('MV740', 'Fernando Gabriel', 'Marroquin Valencia', 'fgmarro20@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16291', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Fatima Lisseth Valencia de Marroquín', 'Madre', '7544-8782', ''),
('NC368', 'Gabriel Eduardo', 'Najarro Campos', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16191', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Rafael Alexander Najarro Pérez', 'Padre', '7745-3854', ''),
('NM602', 'Valeria Carolina', 'Navas Martínez', '', 15, 'Femenino', 'Activo', 'Juvenil', 'FAC11614', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Vanessa Carolina Martinez De Navas', 'Madre', '7154-0195', ''),
('NV642', 'Gabriela Stephanie', 'Navarro Vasquez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16372', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('OC487', 'Mauricio Alexander', 'Ortiz Cuadra', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11838', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('OL987', 'Stefany Alexandra', 'Osorio Lopez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17396', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Joceline Lopez', 'Madre', '7360-8799', ''),
('OM213', 'Valeria Sofia', 'Ortega Melara', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11691', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('OO141', 'Belen Elizabeth', 'Osegueda Ochoa', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11560', '2023-08-23', '2023-08-23', 'MI9', 'A', 'Don Bosco', 'Otro', '7628-1589', ''),
('OO857', 'Sara Fernanda', 'Osegueda Ochoa', 'estudiante20200194@cdb.edu.sv', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11559', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Sergio Osegueda', 'null', '7628-1589', ''),
('OP654', 'Citlali Giovanna', 'Orantes Palacios', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11420', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Rebeca Palacios', 'Otro', '7732-5158', ''),
('OR274', 'Meghan Raquel', 'Ortiz Rodriguez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16094', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('OR423', 'Rosa Marbella', 'Ortíz Rodríguez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16095', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Don Bosco', 'Otro', '7860-7233', ''),
('OR820', 'Mateo Stanley', 'Oviedo Ramirez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11803', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Maria de los Angeles', 'Madre', '7970-2466', ''),
('OR872', 'Santiago Jose', 'Orellana Ramos', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11647', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('OS262', 'Rene Eduardo', 'Orellana Sanchez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16201', '2023-08-23', '2023-08-23', 'MI9', 'A', 'Don Bosco', 'Otro', '6062-0349', ''),
('P455', 'Raul Eduardo', 'Palacios', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11806', '2023-08-23', '0000-00-00', 'MI7', 'B', 'LUIS EDUARDO', 'Padre', '6180-9760', ''),
('PA962', 'Fernando Alexander', 'Perez Artiaga', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11557', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('PB651', 'Guillermo Jose', 'Palacios Barahona', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15843', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('PC875', 'Camila Abigail', 'Portillo Castellanos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15663', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Karina Ventura Palacios', 'Madre', '7644-3787', ''),
('PE257', 'Lorena Guadalupe', 'Perez Erazo', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16127', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('PF932', 'Kevin Daniel', 'Perez Flores', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11762', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Fatima Flores', 'Otro', '7186-1962', ''),
('PG875', 'Fabricio Ezequiel', 'Perez Garcia', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17367', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', '');
INSERT INTO `estudiante` (`id_estudiante`, `nombres`, `apellidos`, `correo`, `edad`, `sexo`, `estado`, `programa`, `num_factura`, `fecha_factura`, `fecha_ingreso`, `modulo`, `seccion`, `encargado`, `parentesco`, `telefono`, `codigo_cdb`) VALUES
('PL498', 'Daniel Alejandro', 'Perdomo Lopez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11833', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('PM437', 'Camila Fernanda', 'Palmer Medrano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16046', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('PM506', 'Maria Jose', 'Palmer Medrano', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11812', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7921-8839', ''),
('PM762', 'Santiago Jerseu', 'Peña Magaña', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11695', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('PM927', 'María Valentina', 'Palacios Monge', 'cpvalentina3009@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11304', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Alejandra Valentina Palacios', 'Madre', '6072-3121', ''),
('PO357', 'Carlos Javier', 'Ponce Orellana', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15733', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('PP295', 'Jennifer Alexia', 'Portillo Pérez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17391', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('PP439', 'Ledis Sophia', 'Portillo Pérez', 'ledisport28@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17392', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Cricia Aracely Perez', 'Madre', '7915-2794', ''),
('PR107', 'Alexia Camila', 'Perdomo Rivera', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17375', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('PS756', 'Carlos Rodrigo', 'Pleitez Sibrian', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16276', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Sara Patricia', 'Otro', '0000-0000', ''),
('PT567', 'Daniela Eunice', 'Peña Trejo', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11232', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7182-4125', ''),
('QM437', 'Santiago Yeray', 'Quintanilla Mendoza', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11587', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('QM853', 'Valeria Elizabeth', 'Quintanilla Martinez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16081', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '7936-1679', ''),
('QT687', 'Diego Fernando', 'Quintanilla Torres', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11888', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('RA302', 'Brice Heller', 'Rivera Arias', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16253', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RA634', 'Josué Alexander', 'Rodas Alvarez', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC16314', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('RA731', 'Fernanda Nicole', 'Ramos Andrade', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11511', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RAA67', 'Santiago Ernesto', 'Rivera Aguilar', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11593', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Claudia Lissette Aguilar Alarcón', 'Madre', '7675-8354', ''),
('RB140', 'Rodrigo Emanuel', 'Ramirez Bautista', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11793', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7243-0245', ''),
('RC657', 'Saori Jazmin', 'Rodriguez Carpio', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11694', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Yesica Marisol Carpio', 'Madre', '7643-5230', ''),
('RC926', 'Cristopher Jeremy', 'Reyes Castellon', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11142', '2023-08-23', '0000-00-00', 'MI7', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RD789', 'Josue Azahar', 'Roman Duran', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16351', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Karen Elizabeth Duran', 'Madre', '0000-0000', ''),
('RE395', 'Josue Emanuel', 'Renderos', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11824', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RF741', 'Sarah Lucero', 'Recinos Franco', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16245', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Dorian Franco', 'Otro', '7385-1700', ''),
('RG318', 'Paola Valentina', 'Rivas Gomez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11619', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Claudia Rivas', 'Otro', '0000-0000', ''),
('RG462', 'Andrés Francisco', 'Rivas González', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC15998', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7709-1039', ''),
('RG675', 'Liliana Abigail', 'Rodriguez Gonzalez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11605', '2023-08-23', '0000-00-00', 'MI7', 'B', 'ANTONY MAURICIO RODRIGUEZ', 'Madre', '7118-1170', ''),
('RG695', 'Alexander Enrique', 'Ramos Galdamez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16108', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RG768', 'Sofia Elizabeth', 'Rivas Gomez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11620', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RG805', 'Brenda Yamileth', 'Rivas Guevara', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11650', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RG812', 'Daniela Carolina', 'Rivas Gonzalez', '', 8, 'Femenino', 'Activo', 'Infantil', 'FAC15997', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Ivonne Carolina Gonzalez', 'Madre', '7709-1039', ''),
('RH109', 'Mateo Levi', 'Ramirez Huezo', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16282', '2023-08-23', '0000-00-00', 'MI7', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RH317', 'Gabriela Stefany', 'Rivas Hernandez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC17364', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RH438', 'Jennifer Patricia', 'Rivas Hernandez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17362', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RH439', 'Daniel Ernesto', 'Ramírez Huezo', 'daniel25huezo@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16281', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Silvia Jeannette Huezo de Ramirez', 'Madre', '7824-2464', ''),
('RH587', 'Nataly Esmeralda', 'Ramirez Henriquez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11786', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RL258', 'Johanna Marlene', 'Rivas López', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11211', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7743-5468', ''),
('RL284', 'Christopher Eliseo', 'Rivas Lopez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11214', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RL952', 'Genesis Alessandra', 'Ramirez Lopez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11357', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RM126', 'Ariathna Jaravy', 'Rodriguez Merlos', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11526', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RM203', 'Keity Jailyn', 'Rodriguez Merlos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11524', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Kenya Issis Merlos de Rodriguez', 'Madre', '7002-7912', ''),
('RM318', 'Sara Abigail', 'Ramirez Menjivar', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16300', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Flor de Maria Ramirez Menjivar', 'Madre', '7216-7947', ''),
('RM476', 'Emilio Alexander', 'Rodas Mijango', 'srodas.2212@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15796', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Jacqueline Noemi Mijango de Rodas', 'Madre', '7859-8777', ''),
('RM705', 'Karla Abigail', 'Rivas Mejia', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16079', '2023-08-23', '0000-00-00', 'MI8', 'A', 'CARLOS RIVAS', 'Otro', '7352-1421', ''),
('RM873', 'Uriel Enrique', 'Ruiz Martínez', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11701', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('RM964', 'Luis Alexis', 'Rodriguez Martinez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17489', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RO284', 'Lourdes Marcela', 'Rivas Ochoa', '2021lourdes.marcela.rivas.ochoa@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11561', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Bernabe Rivas', 'Madre', '7850-8583', ''),
('RO615', 'Marcelo Alonso', 'Rivas Oseguedas', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16097', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RO712', 'Gabriela Elizabeth', 'Rivera Orellana', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17363', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RO846', 'Marco Alejandro', 'Rivas Ochoa', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11566', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Bernabe de Jesús Rivas', 'Otro', '7262-0698', ''),
('RO926', 'Adrian Abel', 'Rodriguez Ortiz', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11809', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RP725', 'Ashly Maria', 'Rodas Pineda', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11649', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('RP742', 'Christian Daniel', 'Ruano Peraza', 'estudiante20170343@cdb.edu.sv', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11380', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Juan Daniel Ruano Rivera', 'Padre', '7266-5799', ''),
('RQ143', 'Leandro Ernesto', 'Ramírez Quintanilla', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11437', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RR175', 'Camila Sophia', 'Rivas Reyes', 'camisophia9925@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11554', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Helen Marlen Reyes Romero', 'Madre', '7564-4214', ''),
('RR521', 'Ashley Nicol', 'Romero Rodriguez', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11500', '2023-08-23', '0000-00-00', 'MJ1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RR529', 'Christopher Alexander', 'Ramos Rosales', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16308', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('RR538', 'Mia Fernanda', 'Romero Rocha', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17383', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Maria Rocha', 'Otro', '7859-5635', ''),
('RR695', 'Julian Mauricio', 'Ramirez Rivera', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC15857', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RR746', 'Ian Andres', 'Romero Rocha', '', 8, 'Masculino', 'Activo', 'Infantil', 'FAC17382', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Maria Jose Rocha Vega', 'Madre', '7859-5635', ''),
('RR923', 'Eduardo Josué', 'Rivas Romero', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17528', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('RS641', 'Adriana Melissa', 'Rodriguez Solorzano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC8915', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7723-2307', ''),
('RV718', 'Ashley Giselle', 'Ramirez Vasquez', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11322', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('RV781', 'Hector Alfonso', 'Romero Rivas', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16125', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Hector Romero', 'Otro', '7151-5392', ''),
('RV981', 'Ángel David', 'Ramírez Valladares', 'estudiante20160281@cdb.edu.sv', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11703', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Marta Guadalupe Valladares Ramírez', 'Madre', '7601-1538', ''),
('SA095', 'Willian Antonio', 'Sosa Alarcon', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC17389', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('SA502', 'Alexandra Yoliveth', 'Serrano Aragón', '', 14, 'Femenino', 'Activo', 'Juvenil', 'FAC11340', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Mirella Aragon Valdez', 'Madre', '7754-5718', ''),
('SB519', 'José Fernando', 'Sorto Bonilla', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC17381', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Andrea de Sorto', 'Otro', '7681-0293', ''),
('SC682', 'Oliver Alejandro', 'Santamaría Cruz', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC17411', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SC921', 'Valeria Mariam', 'Sanchez Cordova', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16376', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('SE532', 'Daniela Julissa', 'Segovia Estrada', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16364', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Gabriela Lisseth Estrada', 'Madre', '7862-1263', ''),
('SE782', 'Camila Alessandra', 'Sandoval Escamilla', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11447', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('SE830', 'Mariana Denisse', 'Servellon Escalante', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11784', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SE963', 'Nataly Sofia', 'Segovia Estrada', 'natalysofiasegoviaestrada@gmail.com', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC16365', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Gabriela Lisseth Estrada Juarez', 'Madre', '7862-1263', ''),
('SF548', 'Adriana Paola', 'Santana Flores', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11892', '2023-08-23', '0000-00-00', 'MI7', 'B', 'Nancy Catalina Flores de Santana', 'Madre', '6970-6131', ''),
('SG315', 'Alejandro Antonio', 'Salazar Gaitan', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC15855', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SG394', 'Elizabeth Nineth', 'Sensente Garcia', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11683', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SG516', 'Sofia Raquel', 'Sandoval Granados', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11822', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SG519', 'Daniel Alejandro', 'Sánchez González', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC15982', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SG948', 'Chistopher Omar', 'Sensente Garcia', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11684', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SM032', 'Sherlyn Jazmin', 'Sanchez Melara', '2021sherlynsanchez@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11399', '2023-08-23', '0000-00-00', '', '', 'Jacqueline Arely Sanchez de Orellana', 'Madre', '6173-1944', ''),
('SM229', 'Jose Fernando', 'Soriano Morales', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15611', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Erika Quintanilla Soriano', 'Madre', '7691-0050', ''),
('SM432', 'Fernando Josue', 'Sanchez Menjivar', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16349', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Wendy Menjivar', 'Madre', '7214-8839', ''),
('SM467', 'Dillan David', 'Sibrian Martinez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11273', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Maria Jose', 'Otro', '7313-5583', ''),
('SM521', 'Karla Susana', 'Samayoa Montes', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC15613', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('SME48', 'Salomón Efraín', 'Solís Mendoza', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11810', '2023-08-23', '0000-00-00', 'MI2', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('SO201', 'Douglas Alfredo', 'Sorto Ortiz', 'douglassorto2008@gmail.com', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC15862', '2023-08-23', '0000-00-00', 'MJ6', 'A', 'Doouglas Omar Sorto', 'Padre', '7459-5250', ''),
('SP536', 'Melany Alejandra', 'Sorto Perla', '', 6, 'Femenino', '', 'Juvenil', 'FAC11700', '0000-00-00', '0000-00-00', '', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('SR289', 'Christian David', 'Sanchez Rodriguez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11674', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SR810', 'Alexis Mauricio', 'Sorto Rojas', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16240', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('SS139', 'Genesis Monserrat', 'Solis Solis', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC16169', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SS246', 'Alexia Fernanda', 'Solis Solis', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC15856', '2023-08-23', '0000-00-00', 'MI1', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('SS768', 'Adelaida Berenice', 'Sosa Serrano', 'absserrano@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11515', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Vilma Serrano de Sosa', 'Madre', '7672-4442', ''),
('SSS36', 'Fatima Rocio', 'Sosa Serrano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11514', '2023-08-23', '0000-00-00', 'MI2', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('ST874', 'Jose Luis', 'Serpas Torres', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11802', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Johana Serpas', 'Otro', '7108-3260', ''),
('SV266', 'Nathaly Valeria', 'Sanchez Vasquez', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11818', '2023-08-23', '0000-00-00', 'MI8', 'A', 'Mirian Orellana', 'Otro', '7997-1860', ''),
('SV923', 'Mauricio Ismael', 'Sánchez Velasquez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11816', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7997-1860', ''),
('TC849', 'Cesar Samuel', 'Teodoro Cruz', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC17418', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('TF241', 'Iker Adilson', 'Torres Fuentes', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11598', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('TF483', 'Rodrigo Alexander', 'Torres Figuerroa', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC15993', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('TL711', 'Emery Daniela', 'Torres Lopez', 'emery25to@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11782', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Vielca Emery Lopez Mendez', 'Madre', '7870-0958', ''),
('TM546', 'Damian Gabriel', 'Treminio Marroquin', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11516', '2023-08-23', '0000-00-00', 'MI5', 'B', 'Don Bosco', 'Otro', '7116-7383', ''),
('TRM14', 'Rodrigo Vladimir', 'Turcios Rivera', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16398', '2023-08-23', '0000-00-00', 'MI2', 'A', 'Jairo Bladimir Turcios Rosales', 'Padre', '7898-3824', ''),
('UH617', 'Ariana Nicole', 'Urquilla Herrera', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16406', '2023-08-23', '0000-00-00', 'MI6', 'A', 'Olinda de Jesus Ayala', 'Madre', '7074-1608', ''),
('UH821', 'Valeria Monserrat', 'Urquilla Herrera', '', 6, 'Femenino', '', 'Infantil', 'FAC16407', '0000-00-00', '0000-00-00', '', '', 'OLINDA DE JESUS AYALA', 'Madre', '7074-1608', ''),
('UM319', 'Carlos Jesus', 'Umaña Molina', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16358', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('V309', 'Marvin Samuel', 'Valdez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11774', '2023-08-23', '0000-00-00', 'MI7', 'B', 'ANA MARAVILLA', 'Madre', '7526-0937', ''),
('VC126', 'Matías Emmanuel', 'Vides Castro', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11777', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('VC129', 'Steffany Carolina', 'Vásquez Chicas', 'steffanyc1809@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16257', '2023-08-23', '0000-00-00', 'MI15', 'A', 'Joselyn de Vasquez', 'null', '7840-8390', ''),
('VC169', 'Nelly Victoria', 'Vides Castro', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11776', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('VC294', 'Sara Abigail', 'Vindel Castillo', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11652', '2023-08-23', '0000-00-00', 'MJ15', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('VC725', 'Josué Alexander', 'Velásquez Castaneda', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC16337', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('VC927', 'Cynthia Fiorella', 'Villela Calderon', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16141', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('VE231', 'Andrea Lissette', 'Ventura Escobar', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11610', '2023-08-23', '0000-00-00', 'MI4', 'C', 'Don Bosco', 'Otro', '0000-0000', ''),
('VE379', 'Valery Lizbeth', 'Valte Esquivel', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17398', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('VE682', 'Alejandro Mauricio', 'Ventura Escobar', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11611', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('VE748', 'Alejandra Nicole', 'Valte Esquivel', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17397', '2023-08-23', '0000-00-00', 'MI3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('VF926', 'Joysi Alessandra', 'Valdez Figueroa', '', 13, 'Femenino', 'Activo', 'Infantil', 'FAC11655', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('VG879', 'David Enrique', 'Vásquez Gónzalez', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16258', '2023-08-23', '0000-00-00', 'MJ4', 'A', 'Don Bosco', 'Otro', '7840-8390', ''),
('VL145', 'Gabriela María', 'Velasco Lemus', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17361', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('VL690', 'Alicia Monsserratt', 'Velasco Lemus', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11791', '2023-08-23', '0000-00-00', 'MI8', 'A', 'DELMY LEMUS', 'Otro', '7350-0129', ''),
('VL846', 'Ariana Fernanda', 'Velasco Lemus', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11790', '2023-08-23', '0000-00-00', 'MI8', 'A', 'DELMY LEMUS', 'Otro', '7350-0129', ''),
('VM185', 'Teresita De Jesus', 'Vasquez Molina', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11832', '2023-08-23', '0000-00-00', 'MI3', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('VM694', 'Mariana Beatriz', 'Vasquez Medrano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC17384', '2023-08-23', '0000-00-00', 'MI5', 'A', 'Beatriz Vasquez', 'Madre', '7620-6298', ''),
('VP729', 'Rafael Edenilson', 'Valle Paulino', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11361', '2023-08-23', '0000-00-00', 'MJ2', 'A', 'Angelica Veronica Paulino', 'Madre', '6073-6889', ''),
('VR125', 'Dominic Antonio', 'Velasco Reynosa', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11448', '2023-08-23', '0000-00-00', 'MI6', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('VR146', 'Ariana Valeria', 'Valle Ramos', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11646', '2023-08-23', '0000-00-00', 'MI7', 'B', 'Marbely de Valle', 'Madre', '7968-7612', ''),
('VR631', 'Jonathan Adonay', 'Valencia Rivera', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC16102', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Nicole Valencia', 'Otro', '7318-4989', ''),
('VR946', 'Diana Valeria', 'Valle Rauda', '', 6, 'Femenino', 'Activo', 'Juvenil', 'FAC11522', '2023-08-23', '0000-00-00', 'MJ12', 'A', 'Diana Rauda', 'Otro', '7601-3133', ''),
('VS784', 'Hernán Adalid', 'Valle Salas', 'vallesalas15@gmail.com', 6, 'Masculino', 'Activo', 'Infantil', 'FAC16203', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Brenda Yasmin Salas de Valle', 'Madre', '7885-2510', ''),
('VV872', 'Rachell Mariel', 'Vásquez Vásquez', 'suki88.17@gmail.com', 6, 'Femenino', 'Activo', 'Infantil', 'FAC16361', '2023-08-23', '0000-00-00', 'MI12', 'A', 'Maryellen Guadalupe Vásquez Pineda', 'Madre', '7749-7382', ''),
('ZA742', 'Angeline Nicole', 'Zelaya Alfaro', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11673', '2023-08-23', '0000-00-00', 'MI4', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZB789', 'Lourdes Elizabeth', 'Zuniga Bonilla', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11643', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZC523', 'Jorge Andrés', 'Zapata Castillo', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC16312', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZH651', 'Rodrigo Gianluca', 'Zepeda Hernández', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11677', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZM573', 'Fernando Elias', 'Zomoza Moreno', '', 6, 'Masculino', 'Pendiente', 'Infantil', '', '0000-00-00', '0000-00-00', 'MI9', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZP764', 'Christopher Abdul', 'Zavala Perez', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11330', '2023-08-23', '0000-00-00', 'MI9', 'A', 'Sandra Roxana Zavala Pérez', 'Madre', '7985-1642', ''),
('ZR237', 'Lucas Uriel', 'Zelaya Reyes', '', 13, 'Masculino', 'Activo', 'Infantil', 'FAC11656', '2023-08-23', '0000-00-00', 'MI1', '', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZS540', 'Gustavo Alessandro', 'Zelayandia Serrano', '', 6, 'Masculino', 'Activo', 'Juvenil', 'FAC11767', '2023-08-23', '0000-00-00', 'MJ3', 'A', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZS623', 'Ashley Belen', 'Zelayandia Serrano', '', 6, 'Femenino', 'Activo', 'Infantil', 'FAC11765', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', ''),
('ZS968', 'Lucas Leandro', 'Zelayandia Serrano', '', 6, 'Masculino', 'Activo', 'Infantil', 'FAC11766', '2023-08-23', '0000-00-00', 'MI4', 'B', 'Don Bosco', 'Otro', '0000-0000', '');

-- --------------------------------------------------------

--
-- Table structure for table `modulo`
--

DROP TABLE IF EXISTS `modulo`;
CREATE TABLE IF NOT EXISTS `modulo` (
  `id_modulo` varchar(20) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `programa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cantidad` int NOT NULL,
  `profesor` varchar(100) NOT NULL,
  `salon` varchar(100) NOT NULL,
  `secciones` int NOT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `modulo`
--

INSERT INTO `modulo` (`id_modulo`, `nombre`, `programa`, `cantidad`, `profesor`, `salon`, `secciones`) VALUES
('MI1', 'Kids I', 'Infantil', 26, '', '', 1),
('MI10', 'Kids X', 'Infantil', 0, '', '', 0),
('MI11', 'Kids XI', 'Infantil', 0, '', '', 0),
('MI12', 'Kids XII', 'Infantil', 23, '', '', 1),
('MI13', 'Kids XIII', 'Infantil', 0, '', '', 0),
('MI14', 'Kids XIV', 'Infantil', 0, '', '', 0),
('MI15', 'Kids XV', 'Infantil', 16, '', '', 1),
('MI2', 'Kids II', 'Infantil', 19, '', '', 1),
('MI3', 'Kids III', 'Infantil', 40, '', '', 2),
('MI4', 'Kids IV', 'Infantil', 45, '', '', 3),
('MI5', 'Kids V', 'Infantil', 24, '', '', 2),
('MI6', 'Kids VI', 'Infantil', 34, '', '', 2),
('MI7', 'Kids VII', 'Infantil', 25, '', '', 2),
('MI8', 'Kids VIII', 'Infantil', 24, '', '', 1),
('MI9', 'Kids IX', 'Infantil', 18, '', '', 1),
('MJ1', 'Teens I', 'Juvenil', 10, '', '', 1),
('MJ10', 'Teens X', 'Juvenil', 0, '', '', 0),
('MJ11', 'Teens XI', 'Juvenil', 0, '', '', 0),
('MJ12', 'Teens XII', 'Juvenil', 14, '', '', 1),
('MJ13', 'Teens XIII', 'Juvenil', 0, '', '', 0),
('MJ14', 'Teens XIV', 'Juvenil', 0, '', '', 0),
('MJ15', 'Teens XV', 'Juvenil', 16, '', '', 1),
('MJ2', 'Teens II', 'Juvenil', 14, '', '', 1),
('MJ3', 'Teens III', 'Juvenil', 20, '', '', 1),
('MJ4', 'Teens IV', 'Juvenil', 23, '', '', 1),
('MJ5', 'Teens V', 'Juvenil', 0, '', '', 0),
('MJ6', 'Teens VI', 'Juvenil', 16, '', '', 1),
('MJ7', 'Teens VII', 'Juvenil', 0, '', '', 0),
('MJ8', 'Teens VIII', 'Juvenil', 0, '', '', 0),
('MJ9', 'Teens IX', 'Juvenil', 0, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
CREATE TABLE IF NOT EXISTS `personal` (
  `Id_personal` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Usuario` varchar(100) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  `Tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `personal`
--

INSERT INTO `personal` (`Id_personal`, `Nombre`, `Apellido`, `Usuario`, `Contrasena`, `Tipo`) VALUES
(1, 'Glenda', 'Pineda', 'glenda.pineda@cdb.edu.sv', '123456', 'Coordinador'),
(2, 'Jennifer', 'Guillen', 'jennifer.guillen@cdb.edu.sv', '123456', 'Colecturia'),
(3, 'Maira', 'Mejia', 'maira.mejia@cdb.edu.sv', '123456', 'Colecturia');

-- --------------------------------------------------------

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
CREATE TABLE IF NOT EXISTS `seccion` (
  `id_seccion` varchar(20) NOT NULL,
  `nombre` varchar(10) NOT NULL,
  `modulo` varchar(20) NOT NULL,
  `docente` varchar(50) NOT NULL,
  `salon` varchar(20) NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_seccion`,`modulo`),
  KEY `modulo` (`modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seccion`
--

INSERT INTO `seccion` (`id_seccion`, `nombre`, `modulo`, `docente`, `salon`, `cantidad`) VALUES
('A', 'MI1 A', 'MI1', 'Diana Fernandez', '9C', 12),
('A', 'MI12 A', 'MI12', 'Diana Fernandez', '9C', 23),
('A', 'MI15 A', 'MI15', 'Diana Fernandez', '9C', 16),
('A', 'MI2 A', 'MI2', 'Diana Fernandez', '9C', 16),
('A', 'MI3 \"A\"', 'MI3', 'Diana Fernandez', '9C', 21),
('A', 'MI4 \"A\"', 'MI4', 'Diana Fernandez', '9C', 14),
('A', 'MI5 \"A\"', 'MI5', 'Diana Fernandez', '9C', 13),
('A', 'MI6 \"A\"', 'MI6', 'Diana Fernandez', '9C', 16),
('A', 'MI7 \"A\"', 'MI7', 'Diana Fernandez', '9C', 11),
('A', 'MI8 A', 'MI8', 'Diana Fernandez', '9C', 24),
('A', 'MI9 A', 'MI9', 'Diana Fernandez', '9C', 18),
('A', 'MJ1 A', 'MJ1', 'Diana Fernandez', '9C', 10),
('A', 'MJ12 A', 'MJ12', 'Diana Fernandez', '9C', 14),
('A', 'MJ15 A', 'MJ15', 'Diana Fernandez', '9C', 16),
('A', 'MJ2 A', 'MJ2', 'Diana Fernandez', '9C', 14),
('A', 'MJ3 A', 'MJ3', 'Diana Fernandez', '9C', 19),
('A', 'MJ4 A', 'MJ4', 'Diana Fernandez', '9C', 23),
('A', 'MJ6 A', 'MJ6', 'Diana Fernandez', '9C', 16),
('B', 'MI3 \"B\"', 'MI3', 'Leydi Portillo', '2D', 19),
('B', 'MI4 \"B\"', 'MI4', 'Leydi Portillo', '2D', 16),
('B', 'MI5 \"B\"', 'MI5', 'Leydi Portillo', '2D', 11),
('B', 'MI6 \"B\"', 'MI6', 'Leydi Portillo', '2D', 18),
('B', 'MI7 \"B\"', 'MI7', 'Leydi Portillo', '2D', 14),
('C', 'MI4 \"C\"', 'MI4', 'Katerine Loucel', '1C', 15);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `seccion`
--
ALTER TABLE `seccion`
  ADD CONSTRAINT `seccion_ibfk_1` FOREIGN KEY (`modulo`) REFERENCES `modulo` (`id_modulo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
