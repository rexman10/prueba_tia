module.exports = (sequelize, DataTypes) => {
    const Precio = sequelize.define('Precio', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        producto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Producto',
                key: 'id'
            }
        },
        tienda_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tienda',
                key: 'id'
            }
        },
        precio: DataTypes.DECIMAL(10, 2),
        fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        hora_inicio: DataTypes.TIME,
        hora_fin: DataTypes.TIME
    }, {
        tableName: 'precio',
        timestamps: false
    });

    // Relaciones
    Precio.associate = (models) => {
        Precio.belongsTo(models.Producto, { foreignKey: 'producto_id' });
        Precio.belongsTo(models.Tienda, { foreignKey: 'tienda_id' });
    }

    return Precio;
}