const { Precio, Promocion, PromocionTiendaProducto } = require('../models');
const { Op } = require('sequelize');

exports.crearPrecio = async (req, res) => {
  try {
    const { tienda_id, producto_id, fecha_inicio, fecha_fin, hora_inicio, hora_fin } = req.body;

    // Buscar si existe un precio solapado para el mismo producto y tienda
    // Verificar solapamiento de fechas primero
    const preciosSolapadosFecha = await Precio.findAll({
      where: {
      tienda_id,
      producto_id,
      fecha_inicio: { [Op.lte]: fecha_fin },
      fecha_fin: { [Op.gte]: fecha_inicio }
      }
    });

    // Si hay solapamiento de fechas, verificar solapamiento de horas
    let existeSolapado = false;
    // Convertir las horas a formato comparable (HH:mm:ss)
    const parseTime = (t) => typeof t === 'string' ? t : t.toTimeString().slice(0, 8);

    for (const precio of preciosSolapadosFecha) {
      const dbHoraInicio = parseTime(precio.hora_inicio);
      const dbHoraFin = parseTime(precio.hora_fin);
      const reqHoraInicio = parseTime(hora_inicio);
      const reqHoraFin = parseTime(hora_fin);

      if (
      dbHoraInicio <= reqHoraFin &&
      dbHoraFin >= reqHoraInicio
      ) {
      existeSolapado = true;
      break;
      }
    }

    if (existeSolapado) {
      return res.status(400).json({ error: 'Ya existe un precio para este producto en la tienda dentro del rango de fechas y horario especificado.' });
    }

    const nuevoPrecio = await Precio.create(req.body);
    res.status(201).json(nuevoPrecio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPrecioFinal = async (req, res) => {
  const { tienda_id, producto_id, fecha, hora } = req.query;

  try {
    // Obtener precio base válido
    const precio = await Precio.findOne({
      where: {
        tienda_id,
        producto_id,
        fecha_inicio: { [Op.lte]: fecha },
        fecha_fin: { [Op.gte]: fecha },
        hora_inicio: { [Op.lte]: hora },
        hora_fin: { [Op.gte]: hora }
      }
    });

    if (!precio) {
      return res.status(404).json({ mensaje: 'Precio no encontrado' });
    }

    let precioFinal = precio.precio;
    let mayorDescuento = 0;

    const relaciones = await PromocionTiendaProducto.findAll({
      where: {
        tienda_id: parseInt(tienda_id),
        producto_id: parseInt(producto_id)
      }
    });

    const promocionIds = relaciones.map(rel => rel.promocion_id);

    let promocionesValidas = [];
    if (promocionIds.length > 0) {
      promocionesValidas = await Promocion.findAll({
        where: {
          id: { [Op.in]: promocionIds },
          fecha_inicio: { [Op.lte]: fecha },
          fecha_fin: { [Op.gte]: fecha },
          hora_inicio: { [Op.lte]: hora },
          hora_fin: { [Op.gte]: hora }
        }
      });
    }

    if (promocionesValidas.length > 0) {
      mayorDescuento = Math.max(...promocionesValidas.map(p => p.descuento));
      precioFinal = precio.precio * (1 - mayorDescuento);
    }

    return res.json(
      {
        precio_base: parseFloat(precio.precio),
        descuento_aplicado: (mayorDescuento * 100) + '%',
        precio_final: parseFloat(precioFinal),
      }
    )

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
