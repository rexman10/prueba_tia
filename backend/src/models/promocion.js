module.exports = (sequelize, DataTypes) => {
    const Promocion = sequelize.define('Promocion', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descuento: DataTypes.FLOAT,
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        hora_inicio: DataTypes.TIME,
        hora_fin: DataTypes.TIME,
        fecha_creacion: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        }
    }, {
        tableName: 'promocion',
        timestamps: false
    });

    // Relaciones
    Promocion.associate = (models) => {
        // Relación directa con la tabla de unión
        Promocion.hasMany(models.PromocionTiendaProducto, { 
            foreignKey: 'promocion_id',
            onDelete: 'CASCADE'
        });
    };

    return Promocion;
};