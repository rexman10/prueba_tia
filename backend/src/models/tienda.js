module.exports = (sequelize, DataTypes) => {
  const Tienda = sequelize.define('Tienda', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    estado: { type: DataTypes.STRING, defaultValue: 'activo' },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_apertura: DataTypes.DATE,
    fecha_cierre: DataTypes.DATE
  }, {
    tableName: 'tienda',
    timestamps: false
  });

  return Tienda;
};
