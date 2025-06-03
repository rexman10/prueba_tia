const { Promocion, PromocionTiendaProducto } = require('../models');

exports.crearPromocion = async (req, res) => {
  try {
    const nueva = await Promocion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.asociarPromocion = async (req, res) => {
  try {
    const { promocion_id, asociaciones } = req.body;
    const registros = asociaciones.map(({ tienda_id, producto_id }) => ({
      promocion_id, tienda_id, producto_id
    }));
    const asociadas = await PromocionTiendaProducto.bulkCreate(registros);
    res.status(201).json(asociadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
