module.exports = (sequelize, DataTypes) => {
    const PromocionTiendaProducto = sequelize.define('PromocionTiendaProducto', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        promocion_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Promocion',
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
        producto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Producto',
                key: 'id'
            }
        },
    }, {
        tableName: 'promocion_tienda_producto',
        timestamps: false
    })

    // Relaciones
    PromocionTiendaProducto.associate = (models) => {
        PromocionTiendaProducto.belongsTo(models.Promocion, { foreignKey: 'promocion_id' });
        PromocionTiendaProducto.belongsTo(models.Tienda, { foreignKey: 'tienda_id' });
        PromocionTiendaProducto.belongsTo(models.Producto, { foreignKey: 'producto_id' });
    }

    return PromocionTiendaProducto;
}