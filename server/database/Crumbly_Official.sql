CREATE DATABASE CRUMBLY 
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE CRUMBLY;


CREATE TABLE Tipo_Usuario (
id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre_tipo VARCHAR(50) NOT NULL
);


CREATE TABLE Usuario_Local (
id_usuario_local INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
id_tipo_usuario INT,
FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Usuario_Firebase (
id_usuario_firebase INT AUTO_INCREMENT PRIMARY KEY,
uid_firebase VARCHAR(100) NOT NULL UNIQUE,
correo VARCHAR (100) NOT NULL,
id_tipo_usuario INT,
FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Administrador (
id_admin  VARCHAR (20) PRIMARY KEY, 
nombre VARCHAR(100) UNIQUE,
id_tipo_usuario INT,
FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Cliente (
id_cliente VARCHAR (20) PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
correo VARCHAR(100) UNIQUE ,
ciudad VARCHAR(100) ,
cp VARCHAR(10) 
);

CREATE TABLE Direccion(
id_direccion INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR (20),
direccion VARCHAR(255) NOT NULL,
ciudad VARCHAR(100),
cp VARCHAR(10),
FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Categoria (
id_categoria INT AUTO_INCREMENT PRIMARY KEY, 
nombre_categoria VARCHAR(100) NOT NULL,
descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE Estado_Producto (
id_estado_producto INT AUTO_INCREMENT PRIMARY KEY,
nombre_estado VARCHAR(50) NOT NULL
);

CREATE TABLE Producto (
id_producto VARCHAR(20) PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
precio DECIMAL(10,2) NOT NULL,
stock INT DEFAULT 0,
id_categoria INT,
id_admin VARCHAR(20),
id_estado_producto INT,
FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_estado_producto) REFERENCES Estado_Producto (id_estado_producto) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Oferta(
id_oferta INT AUTO_INCREMENT PRIMARY KEY,
id_producto VARCHAR(20),
descuento DECIMAL(5,2),
fecha_inicio DATE,
fecha_fin DATE,
FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Estado_Pedido(
id_estado_pedido INT AUTO_INCREMENT PRIMARY KEY,
nombre_estado VARCHAR(50) NOT NULL
);

CREATE TABLE Pedido(
id_pedido INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR(20),
fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
total DECIMAL (10,2),
id_estado_pedido INT,
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_estado_pedido) REFERENCES Estado_Pedido(id_estado_pedido) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Detalle_Pedido(
id_detalle INT AUTO_INCREMENT PRIMARY KEY,
id_pedido INT , 
id_producto VARCHAR(20),
cantidad INT NOT NULL,
subtotal DECIMAL (10,2),
FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_producto) REFERENCES Producto (id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Metodo_Pago(
id_metodo INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR (50) NOT NULL
);

CREATE TABLE Pago_Pedido(
id_pago INT AUTO_INCREMENT PRIMARY KEY,
id_pedido INT ,
id_metodo INT,
monto DECIMAL (10,2),
fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_metodo) REFERENCES Metodo_Pago(id_metodo) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Entrega_Pedido (
id_entrega INT AUTO_INCREMENT PRIMARY KEY, 
id_pedido INT,
id_direccion INT,
fecha_entrega DATE, 
FOREIGN KEY (id_pedido) REFERENCES Pedido (id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_direccion) REFERENCES Direccion(id_direccion) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Valoracion (
id_valoración INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR(20),
id_producto VARCHAR(20),
puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
comentario TEXT,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_producto) REFERENCES Producto (id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Log_Acciones (
id_log INT AUTO_INCREMENT PRIMARY KEY,
id_admin VARCHAR(20),
accion VARCHAR(100),
fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creando Trigger --

DELIMITER $$
CREATE TRIGGER before_code_admin 
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
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER before_code_client 
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
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_code_product
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
END$$
DELIMITER ;