const { Producto } = require('../models');

exports.getAll = async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
};

exports.getOne = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (producto) res.json(producto);
  else res.status(404).json({ error: 'Producto no encontrado' });
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) return res.status(404).json({ error: 'No encontrado' });

  await producto.update(req.body);
  res.json(producto);
};

exports.remove = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) return res.status(404).json({ error: 'No encontrado' });

  await producto.destroy();
  res.json({ mensaje: 'Producto eliminado' });
};
