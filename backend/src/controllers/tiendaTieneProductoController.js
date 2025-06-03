const {  TiendaTieneProducto } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const tiendaTieneProductos = await TiendaTieneProducto.findAll();
    res.json(tiendaTieneProductos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getOne = async (req, res) => {
  try {
    const tiendaTieneProducto = await TiendaTieneProducto.findByPk(req.params.id);
    if (tiendaTieneProducto) {
      res.json(tiendaTieneProducto);
    } else {
      res.status(404).json({ error: 'No encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.create = async (req, res) => {
  try {
    const nuevoTiendaTieneProducto = await TiendaTieneProducto.create(req.body);
    res.status(201).json(nuevoTiendaTieneProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.update = async (req, res) => {
  try {
    const tiendaTieneProducto = await TiendaTieneProducto.findByPk(req.params.id);
    if (!tiendaTieneProducto) {
      return res.status(404).json({ error: 'No encontrada' });
    }

    await tiendaTieneProducto.update(req.body);
    res.json(tiendaTieneProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.remove = async (req, res) => {
  try {
    const tiendaTieneProducto = await TiendaTieneProducto.findByPk(req.params.id);
    if (!tiendaTieneProducto) {
      return res.status(404).json({ error: 'No encontrada' });
    }

    await tiendaTieneProducto.destroy();
    res.json({ mensaje: 'Eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}