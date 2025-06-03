module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.STRING,
        fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        tableName: 'producto',
        timestamps: false
    });
    
    return Producto;
}