const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // ✅ carga variables desde .env

const sequelize = new Sequelize(
  process.env.DB_NAME,         // nombre base de datos
  process.env.DB_USER,         // usuario
  process.env.DB_PASSWORD,     // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
);

const models = {
  Tienda: require('./tienda')(sequelize, Sequelize.DataTypes),
  Producto: require('./producto')(sequelize, Sequelize.DataTypes),
  Precio: require('./precio')(sequelize, Sequelize.DataTypes),
  Promocion: require('./promocion')(sequelize, Sequelize.DataTypes),
  PromocionTiendaProducto: require('./promocionTiendaProducto')(sequelize, Sequelize.DataTypes),
//   ProductoTienda: require('./productoTienda')(sequelize, Sequelize.DataTypes)
};

module.exports = { sequelize, ...models };
