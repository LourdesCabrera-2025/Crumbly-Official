-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: CRUMBLY
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Administrador`
--

DROP TABLE IF EXISTS `Administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Administrador` (
  `id_admin` varchar(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `Administrador_ibfk_1` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `Tipo_Usuario` (`id_tipo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administrador`
--

LOCK TABLES `Administrador` WRITE;
/*!40000 ALTER TABLE `Administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `Administrador` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_code_admin 
BEFORE INSERT ON Administrador 
FOR EACH ROW 
BEGIN 
	DECLARE next_num INT;
    DECLARE current_year CHAR(4);
    
    -- AÑO ACTUAL --
    SET current_year = YEAR(CURDATE());
    
    -- obtener el numero secuencial mas alto (los 4 digitos despues del prefijo 'ADM') --
    SELECT IFNULL(MAX(CAST(SUBSTRING(id_admin, 4, 4) AS UNSIGNED)), 0) + 1
    INTO next_num 
    FROM Administrador
    WHERE RIGHT (id_admin, 4) = current_year;
    
    -- generar el nuevo ID con el formato ADM + numero de 4 digitos + año --
    SET NEW.id_admin = CONCAT('ADM' , LPAD(next_num , 4, '0'), current_year);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Categoria`
--

DROP TABLE IF EXISTS `Categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categoria`
--

LOCK TABLES `Categoria` WRITE;
/*!40000 ALTER TABLE `Categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `Categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cliente` (
  `id_cliente` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_code_client 
BEFORE INSERT ON Cliente
FOR EACH ROW 
BEGIN 
	DECLARE next_num INT;
    DECLARE current_year CHAR(4);
    
    -- AÑO ACTUAL --
    SET current_year = YEAR(CURDATE());
    
    -- obtener el numero secuencial mas alto (los 4 digitos despues del prefijo 'CLI') --
    SELECT IFNULL(MAX(CAST(SUBSTRING(id_cliente, 4, 4) AS UNSIGNED)), 0) + 1
    INTO next_num 
    FROM Cliente
    WHERE RIGHT (id_cliente, 4) = current_year;
    
    -- generar el nuevo ID con el formato ADM + numero de 4 digitos + año --
    SET NEW.id_cliente = CONCAT('CLI' , LPAD(next_num , 4, '0'), current_year);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Detalle_Pedido`
--

DROP TABLE IF EXISTS `Detalle_Pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Detalle_Pedido` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` varchar(20) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `Detalle_Pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `Pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Detalle_Pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Detalle_Pedido`
--

LOCK TABLES `Detalle_Pedido` WRITE;
/*!40000 ALTER TABLE `Detalle_Pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `Detalle_Pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Direccion`
--

DROP TABLE IF EXISTS `Direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Direccion` (
  `id_direccion` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `Direccion_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Direccion`
--

LOCK TABLES `Direccion` WRITE;
/*!40000 ALTER TABLE `Direccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Entrega_Pedido`
--

DROP TABLE IF EXISTS `Entrega_Pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Entrega_Pedido` (
  `id_entrega` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) DEFAULT NULL,
  `id_direccion` int(11) DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  PRIMARY KEY (`id_entrega`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_direccion` (`id_direccion`),
  CONSTRAINT `Entrega_Pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `Pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Entrega_Pedido_ibfk_2` FOREIGN KEY (`id_direccion`) REFERENCES `Direccion` (`id_direccion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entrega_Pedido`
--

LOCK TABLES `Entrega_Pedido` WRITE;
/*!40000 ALTER TABLE `Entrega_Pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `Entrega_Pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Estado_Pedido`
--

DROP TABLE IF EXISTS `Estado_Pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Estado_Pedido` (
  `id_estado_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estado_Pedido`
--

LOCK TABLES `Estado_Pedido` WRITE;
/*!40000 ALTER TABLE `Estado_Pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `Estado_Pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Estado_Producto`
--

DROP TABLE IF EXISTS `Estado_Producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Estado_Producto` (
  `id_estado_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estado_Producto`
--

LOCK TABLES `Estado_Producto` WRITE;
/*!40000 ALTER TABLE `Estado_Producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `Estado_Producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Metodo_Pago`
--

DROP TABLE IF EXISTS `Metodo_Pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Metodo_Pago` (
  `id_metodo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_metodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Metodo_Pago`
--

LOCK TABLES `Metodo_Pago` WRITE;
/*!40000 ALTER TABLE `Metodo_Pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `Metodo_Pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Oferta`
--

DROP TABLE IF EXISTS `Oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Oferta` (
  `id_oferta` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` varchar(20) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_oferta`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `Oferta_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Oferta`
--

LOCK TABLES `Oferta` WRITE;
/*!40000 ALTER TABLE `Oferta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Oferta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pago_Pedido`
--

DROP TABLE IF EXISTS `Pago_Pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pago_Pedido` (
  `id_pago` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) DEFAULT NULL,
  `id_metodo` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_pago`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_metodo` (`id_metodo`),
  CONSTRAINT `Pago_Pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `Pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Pago_Pedido_ibfk_2` FOREIGN KEY (`id_metodo`) REFERENCES `Metodo_Pago` (`id_metodo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pago_Pedido`
--

LOCK TABLES `Pago_Pedido` WRITE;
/*!40000 ALTER TABLE `Pago_Pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pago_Pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pedido`
--

DROP TABLE IF EXISTS `Pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` varchar(20) DEFAULT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `total` decimal(10,2) DEFAULT NULL,
  `id_estado_pedido` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_estado_pedido` (`id_estado_pedido`),
  CONSTRAINT `Pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Pedido_ibfk_2` FOREIGN KEY (`id_estado_pedido`) REFERENCES `Estado_Pedido` (`id_estado_pedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pedido`
--

LOCK TABLES `Pedido` WRITE;
/*!40000 ALTER TABLE `Pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Producto`
--

DROP TABLE IF EXISTS `Producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Producto` (
  `id_producto` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `id_categoria` int(11) DEFAULT NULL,
  `id_admin` varchar(20) DEFAULT NULL,
  `id_estado_producto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_estado_producto` (`id_estado_producto`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `Producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Producto_ibfk_2` FOREIGN KEY (`id_estado_producto`) REFERENCES `Estado_Producto` (`id_estado_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Producto_ibfk_3` FOREIGN KEY (`id_admin`) REFERENCES `Administrador` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Producto`
--

LOCK TABLES `Producto` WRITE;
/*!40000 ALTER TABLE `Producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `Producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_code_product
BEFORE INSERT ON Producto
FOR EACH ROW 
BEGIN 
	DECLARE next_num INT;
    DECLARE current_year CHAR(4);
    
    -- AÑO ACTUAL --
    SET current_year = YEAR(CURDATE());
    
    -- obtener el numero secuencial mas alto (los 4 digitos despues del prefijo 'ADM') --
    SELECT IFNULL(MAX(CAST(SUBSTRING(id_producto, 4, 4) AS UNSIGNED)), 0) + 1
    INTO next_num 
    FROM Producto
    WHERE RIGHT (id_producto, 4) = current_year;
    
    -- generar el nuevo ID con el formato ADM + numero de 4 digitos + año --
    SET NEW.id_producto = CONCAT('PROD' , LPAD(next_num , 4, '0'), current_year);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Tipo_Usuario`
--

DROP TABLE IF EXISTS `Tipo_Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tipo_Usuario` (
  `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Usuario`
--

LOCK TABLES `Tipo_Usuario` WRITE;
/*!40000 ALTER TABLE `Tipo_Usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tipo_Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario_Firebase`
--

DROP TABLE IF EXISTS `Usuario_Firebase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario_Firebase` (
  `id_usuario_firebase` int(11) NOT NULL AUTO_INCREMENT,
  `uid_firebase` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario_firebase`),
  UNIQUE KEY `uid_firebase` (`uid_firebase`),
  KEY `id_tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `Usuario_Firebase_ibfk_1` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `Tipo_Usuario` (`id_tipo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario_Firebase`
--

LOCK TABLES `Usuario_Firebase` WRITE;
/*!40000 ALTER TABLE `Usuario_Firebase` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuario_Firebase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario_Local`
--

DROP TABLE IF EXISTS `Usuario_Local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario_Local` (
  `id_usuario_local` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario_local`),
  UNIQUE KEY `username` (`username`),
  KEY `id_tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `Usuario_Local_ibfk_1` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `Tipo_Usuario` (`id_tipo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario_Local`
--

LOCK TABLES `Usuario_Local` WRITE;
/*!40000 ALTER TABLE `Usuario_Local` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuario_Local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Valoracion`
--

DROP TABLE IF EXISTS `Valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Valoracion` (
  `id_valoración` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` varchar(20) DEFAULT NULL,
  `id_producto` varchar(20) DEFAULT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_valoración`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `Valoracion_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Valoracion_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Valoracion`
--

LOCK TABLES `Valoracion` WRITE;
/*!40000 ALTER TABLE `Valoracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Valoracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-29  0:05:27
