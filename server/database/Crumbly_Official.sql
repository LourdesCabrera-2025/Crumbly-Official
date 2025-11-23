CREATE DATABASE CRUMBLY 
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE CRUMBLY;

-- ============================
--        TABLA: Tipo_Usuario
-- ============================
CREATE TABLE Tipo_Usuario (
id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
tipo_usuario VARCHAR(50) NOT NULL 
);

-- ============================
--        TABLA: Usuario_Local
-- ============================
CREATE TABLE Usuario_Local (
id_usuario_local INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
token VARCHAR(255),
id_tipo_usuario INT,
I
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Usuario_Firebase
-- ============================
CREATE TABLE Usuario_Firebase (
id_usuario_firebase INT AUTO_INCREMENT PRIMARY KEY,

firebase_uid VARCHAR(128) NOT NULL UNIQUE,
display_name VARCHAR(150),
email VARCHAR(150) NOT NULL,
photo_url VARCHAR(255),

provider VARCHAR(50) DEFAULT 'google.com',
email_verified TINYINT(1) DEFAULT 1,

id_tipo_usuario INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
id_cliente VARCHAR(20) NOT NULL,
FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Metodo_Pago
-- ============================
CREATE TABLE Metodo_Pago(
id_metodo INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR (50) NOT NULL
);


-- ============================
--        TABLA: Cliente
-- ============================
CREATE TABLE Cliente (
id_cliente VARCHAR (20) PRIMARY KEY,
nombre VARCHAR(60) NOT NULL,
apellido VARCHAR(60) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
id_metodo INT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (id_metodo) REFERENCES Metodo_Pago(id_metodo) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Departamento
-- ============================

CREATE TABLE Departamento (
id_departamento INT AUTO_INCREMENT PRIMARY KEY,
nombre_departamento VARCHAR(80) NOT NULL
);

-- ============================
--        TABLA: MUNICIPIO
-- ============================

CREATE TABLE Municipio (
id_municipio INT AUTO_INCREMENT PRIMARY KEY,
nombre_municipio VARCHAR (100) NOT NULL,
id_departamento INT,
FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento) ON DELETE CASCADE ON UPDATE CASCADE
);
-- ============================
--        TABLA: Direccion
-- ============================
CREATE TABLE Direccion(
id_direccion INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR (20),
direccion VARCHAR(255) NOT NULL,
telefono VARCHAR(10) NOT NULL,
CONSTRAINT chk_telefono_sv
        CHECK (telefono REGEXP '^[267][0-9]{7}$'),
id_departamento INT,
cp VARCHAR(10),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_departamento) REFERENCES Departamento (id_departamento) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Administrador
-- ============================
CREATE TABLE Administrador (
id_admin  VARCHAR (20) PRIMARY KEY, 
nombre VARCHAR(60) NOT NULL,
apellido VARCHAR(60) NOT NULL,
telefono VARCHAR(10) NOT NULL,
image_admin VARCHAR(255),
id_usuario_local INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT chk_telefono_sv_admin CHECK (telefono REGEXP '^[267][0-9]{7}$'),
FOREIGN KEY (id_usuario_local) REFERENCES Usuario_Local(id_usuario_local) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Categoria
-- ============================
CREATE TABLE Categoria (
id_categoria INT AUTO_INCREMENT PRIMARY KEY, 
nombre_categoria VARCHAR(100) NOT NULL,
descripcion VARCHAR(255) NOT NULL
);

-- ============================
--        TABLA: Estado_Producto
-- ============================
CREATE TABLE Estado_Producto (
id_estado_producto INT AUTO_INCREMENT PRIMARY KEY,
nombre_estado VARCHAR(50) NOT NULL
);

-- ============================
--        TABLA: Producto
-- ============================
CREATE TABLE Producto (
id_producto VARCHAR(20) PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
precio DECIMAL(10,2) NOT NULL,
stock INT DEFAULT 0,
id_categoria INT,
id_admin VARCHAR(20),
id_estado_producto INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_estado_producto) REFERENCES Estado_Producto(id_estado_producto) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Oferta
-- ============================
CREATE TABLE Oferta(
id_oferta INT AUTO_INCREMENT PRIMARY KEY,
id_producto VARCHAR(20),
descuento DECIMAL(5,2),
fecha_inicio DATE,
fecha_fin DATE,
FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Estado_Pedido
-- ============================
CREATE TABLE Estado_Pedido(
id_estado_pedido INT AUTO_INCREMENT PRIMARY KEY,
nombre_estado VARCHAR(50) NOT NULL
);

-- ============================
--        TABLA: Pedido
-- ============================
CREATE TABLE Pedido(
id_pedido INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR(20),
fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
total DECIMAL (10,2),
id_estado_pedido INT,
FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_estado_pedido) REFERENCES Estado_Pedido(id_estado_pedido) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Detalle_Pedido
-- ============================
CREATE TABLE Detalle_Pedido(
id_detalle INT AUTO_INCREMENT PRIMARY KEY,
id_pedido INT, 
id_producto VARCHAR(20),
cantidad INT NOT NULL,
subtotal DECIMAL (10,2),
FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_producto) REFERENCES Producto (id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Pago_Pedido
-- ============================
CREATE TABLE Pago_Pedido(
id_pago INT AUTO_INCREMENT PRIMARY KEY,
id_pedido INT,
id_metodo INT,
monto DECIMAL (10,2),
fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_metodo) REFERENCES Metodo_Pago(id_metodo) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Entrega_Pedido
-- ============================
CREATE TABLE Entrega_Pedido (
id_entrega INT AUTO_INCREMENT PRIMARY KEY, 
id_pedido INT,
id_direccion INT,
fecha_entrega DATE, 
FOREIGN KEY (id_pedido) REFERENCES Pedido (id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_direccion) REFERENCES Direccion(id_direccion) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Valoracion
-- ============================
CREATE TABLE Valoracion (
id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
id_cliente VARCHAR(20),
id_producto VARCHAR(20),
puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
comentario TEXT,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_producto) REFERENCES Producto (id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================
--        TABLA: Log_Acciones
-- ============================
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