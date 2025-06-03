const { promocionTiendaProducto } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const promociones = await promocionTiendaProducto.findAll();
    res.json(promociones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getOne = async (req, res) => {
  try {
    const promocion = await promocionTiendaProducto.findByPk(req.params.id);
    if (promocion) {
      res.json(promocion);
    } else {
      res.status(404).json({ error: 'No encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.create = async (req, res) => {
    try {
        const nuevaPromocion = await promocionTiendaProducto.create(req.body);
        res.status(201).json(nuevaPromocion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        const promocion = await promocionTiendaProducto.findByPk(req.params.id);
        if (!promocion) {
            return res.status(404).json({ error: 'No encontrada' });
        }

        await promocion.update(req.body);
        res.json(promocion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.remove = async (req, res) => {
    try {
        const promocion = await promocionTiendaProducto.findByPk(req.params.id);
        if (!promocion) {
            return res.status(404).json({ error: 'No encontrada' });
        }

        await promocion.destroy();
        res.json({ mensaje: 'Eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}