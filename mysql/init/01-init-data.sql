CREATE TABLE tienda (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(70) NOT NULL,
    fecha_creacion DATETIME,
    estado VARCHAR(20) DEFAULT 'en venta',
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
    estado VARCHAR(20) DEFAULT 'en venta',
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


-- Crear tiendas
INSERT INTO tienda (nombre, fecha_creacion, fecha_apertura, direccion) VALUES
('Tienda A', NOW(), '2020-01-15', 'Av. Siempre Viva 123'),
('Tienda B', NOW(), '2021-03-20', 'Calle Falsa 456'),
('Tienda C', NOW(), '2019-05-10', 'Av. Principal 789'),
('Tienda D', NOW(), '2022-08-05', 'Plaza Central 101'),
('Tienda E', NOW(), '2018-11-30', 'Malecón 2000');

-- Crear productos
INSERT INTO producto (nombre, fecha_creacion) VALUES
('Leche Entera', NOW()),
('Pan Integral', NOW()),
('Huevos x12', NOW()),
('Arroz 2kg', NOW()),
('Azúcar 1kg', NOW()),
('Aceite Vegetal 1L', NOW()),
('Café Molido 250g', NOW()),
('Atún en Lata', NOW()),
('Galletas Surtidas', NOW()),
('Yogurt Natural', NOW());

-- Asociar productos a tiendas con variedad de stock
INSERT INTO tienda_tiene_producto (tienda_id, producto_id, stock, estado) VALUES
-- Tienda A
(1, 1, 100, 'en venta'),
(1, 2, 80, 'en venta'),
(1, 3, 45, 'en venta'),
(1, 4, 60, 'en venta'),
(1, 5, 75, 'en venta'),
(1, 6, 30, 'en venta'),
(1, 7, 25, 'retirado'),

-- Tienda B
(2, 1, 50, 'en venta'),
(2, 2, 40, 'en venta'),
(2, 4, 80, 'en venta'),
(2, 6, 45, 'en venta'),
(2, 8, 60, 'en venta'),
(2, 9, 35, 'en venta'),

-- Tienda C
(3, 1, 75, 'en venta'),
(3, 3, 100, 'en venta'),
(3, 5, 60, 'en venta'),
(3, 7, 40, 'en venta'),
(3, 9, 30, 'retirado'),
(3, 10, 55, 'en venta'),

-- Tienda D
(4, 2, 65, 'en venta'),
(4, 4, 85, 'en venta'),
(4, 6, 50, 'en venta'),
(4, 8, 45, 'retirado'),
(4, 10, 70, 'en venta'),

-- Tienda E
(5, 1, 90, 'en venta'),
(5, 3, 60, 'en venta'),
(5, 5, 80, 'en venta'),
(5, 7, 30, 'en venta'),
(5, 9, 40, 'en venta');

-- Crear precios (varios precios por producto con diferentes horarios y fechas)
INSERT INTO precio (precio, fecha_inicio, fecha_fin, hora_inicio, hora_fin, producto_id, tienda_id, fecha_creacion) VALUES
-- Leche Entera (producto 1)
(1.20, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 1, 1, NOW()),  -- Tienda A
(1.00, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 1, 2, NOW()),  -- Tienda B
(1.15, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 1, 3, NOW()),  -- Tienda C
(1.25, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 1, 5, NOW()),  -- Tienda E
(1.10, '2025-07-01', '2025-07-31', '08:00:00', '22:00:00', 1, 1, NOW()),  -- Tienda A (precio futuro)

-- Pan Integral (producto 2)
(0.90, '2025-06-01', '2025-06-10', '08:00:00', '20:00:00', 2, 1, NOW()),  -- Tienda A
(0.95, '2025-06-01', '2025-06-30', '08:00:00', '20:00:00', 2, 2, NOW()),  -- Tienda B
(0.85, '2025-06-01', '2025-06-30', '08:00:00', '20:00:00', 2, 4, NOW()),  -- Tienda D

-- Huevos x12 (producto 3)
(2.50, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 3, 1, NOW()),  -- Tienda A
(2.35, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 3, 3, NOW()),  -- Tienda C
(2.60, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 3, 5, NOW()),  -- Tienda E

-- Arroz 2kg (producto 4)
(2.00, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 4, 1, NOW()),  -- Tienda A
(1.95, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 4, 2, NOW()),  -- Tienda B
(2.05, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 4, 4, NOW()),  -- Tienda D

-- Azúcar 1kg (producto 5)
(1.15, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 5, 1, NOW()),  -- Tienda A
(1.10, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 5, 3, NOW()),  -- Tienda C
(1.20, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 5, 5, NOW()),  -- Tienda E

-- Aceite Vegetal 1L (producto 6)
(3.80, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 6, 1, NOW()),  -- Tienda A
(3.75, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 6, 2, NOW()),  -- Tienda B
(3.90, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 6, 4, NOW()),  -- Tienda D

-- Café Molido 250g (producto 7)
(4.50, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 7, 1, NOW()),  -- Tienda A (inactivo)
(4.40, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 7, 3, NOW()),  -- Tienda C
(4.60, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 7, 5, NOW()),  -- Tienda E

-- Atún en Lata (producto 8)
(1.60, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 8, 2, NOW()),  -- Tienda B
(1.70, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 8, 4, NOW()),  -- Tienda D (inactivo)

-- Galletas Surtidas (producto 9)
(2.25, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 9, 2, NOW()),  -- Tienda B
(2.15, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 9, 3, NOW()),  -- Tienda C (inactivo)
(2.30, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 9, 5, NOW()),  -- Tienda E

-- Yogurt Natural (producto 10)
(1.80, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 10, 3, NOW()),  -- Tienda C
(1.90, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', 10, 4, NOW());  -- Tienda D

-- Crear promociones
INSERT INTO promocion (nombre, descuento, fecha_inicio, fecha_fin, hora_inicio, hora_fin, fecha_creacion) VALUES
('Promo Leche -10%', 0.10, '2025-06-01', '2025-06-30', '08:00:00', '22:00:00', NOW()),
('Promo Pan -20%', 0.20, '2025-06-01', '2025-06-05', '08:00:00', '22:00:00', NOW()),
('Súper Ahorro Huevos -15%', 0.15, '2025-06-10', '2025-06-15', '08:00:00', '20:00:00', NOW()),
('Descuento Arroz -5%', 0.05, '2025-06-05', '2025-06-20', '10:00:00', '18:00:00', NOW()),
('Oferta Azúcar -8%', 0.08, '2025-06-01', '2025-06-10', '08:00:00', '22:00:00', NOW()),
('Descuento Aceite -12%', 0.12, '2025-06-15', '2025-06-25', '09:00:00', '21:00:00', NOW()),
('Especial Café -15%', 0.15, '2025-06-01', '2025-06-07', '08:00:00', '20:00:00', NOW()),
('Oferta Atún -10%', 0.10, '2025-06-10', '2025-06-20', '08:00:00', '22:00:00', NOW()),
('Galletas con Descuento -18%', 0.18, '2025-06-05', '2025-06-15', '14:00:00', '20:00:00', NOW()),
('Yogurt en Oferta -5%', 0.05, '2025-06-01', '2025-06-30', '08:00:00', '12:00:00', NOW());

-- Asociar promociones a productos y tiendas
INSERT INTO promocion_tienda_producto (promocion_id, tienda_id, producto_id) VALUES
-- Promo Leche
(1, 1, 1),  -- Tienda A
(1, 2, 1),  -- Tienda B
(1, 3, 1),  -- Tienda C

-- Promo Pan
(2, 1, 2),  -- Tienda A
(2, 2, 2),  -- Tienda B

-- Promo Huevos
(3, 1, 3),  -- Tienda A
(3, 3, 3),  -- Tienda C
(3, 5, 3),  -- Tienda E

-- Promo Arroz
(4, 1, 4),  -- Tienda A
(4, 4, 4),  -- Tienda D

-- Promo Azúcar
(5, 3, 5),  -- Tienda C
(5, 5, 5),  -- Tienda E

-- Promo Aceite
(6, 1, 6),  -- Tienda A
(6, 2, 6),  -- Tienda B
(6, 4, 6),  -- Tienda D

-- Promo Café
(7, 3, 7),  -- Tienda C
(7, 5, 7),  -- Tienda E

-- Promo Atún
(8, 2, 8),  -- Tienda B

-- Promo Galletas
(9, 2, 9),  -- Tienda B
(9, 5, 9),  -- Tienda E

-- Promo Yogurt
(10, 3, 10),  -- Tienda C
(10, 4, 10);  -- Tienda D