module.exports = (sequelize, DataTypes) => {
    const TiendaTieneProducto = sequelize.define('TiendaTieneProducto', {
        tienda_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tienda',
                key: 'id'
            }
        },
        producto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Producto',
                key: 'id'
            }
        },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        estado: { type: DataTypes.STRING, defaultValue: 'activo' },
    }, {
        tableName: 'tienda_tiene_producto',
        timestamps: false
    });

    // Relaciones
    TiendaTieneProducto.associate = (models) => {
        TiendaTieneProducto.belongsTo(models.Tienda, { foreignKey: 'tienda_id' });
        TiendaTieneProducto.belongsTo(models.Producto, { foreignKey: 'producto_id' });
    };

    return TiendaTieneProducto;
};