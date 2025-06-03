CREATE TABLE tienda (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(70) NOT NULL,
    fecha_creacion DATETIME,
    estado VARCHAR(20) DEFAULT 'activo',
    fecha_apertura DATE,
    fecha_cierre DATE,
    direccion VARCHAR(150) NOT NULL
);

CREATE TABLE producto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_creacion DATETIME,
    nombre VARCHAR(70) NOT NULL
);

-- Tabla intermedia tienda-producto
CREATE TABLE tienda_tiene_producto (
    tienda_id INT NOT NULL,
    producto_id INT NOT NULL,
    stock INT DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'activo',
    PRIMARY KEY (tienda_id, producto_id),
    FOREIGN KEY (tienda_id) REFERENCES tienda(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Tabla de precios (por tienda y producto)
CREATE TABLE precio (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_creacion DATETIME,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    producto_id INT NOT NULL,
    tienda_id INT NOT NULL,
    FOREIGN KEY (tienda_id) REFERENCES tienda(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Tabla de promociones generales
CREATE TABLE promocion (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_creacion DATETIME,
    nombre VARCHAR(70) NOT NULL,
    descuento DECIMAL(3, 2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- Tabla intermedia de promociones por producto y tienda
CREATE TABLE promocion_tienda_producto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    promocion_id INT NOT NULL,
    producto_id INT NOT NULL,
    tienda_id INT NOT NULL,
    FOREIGN KEY (promocion_id) REFERENCES promocion(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (tienda_id) REFERENCES tienda(id)
);
