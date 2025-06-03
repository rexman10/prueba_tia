const { Tienda } = require('../models');

exports.getAll = async (req, res) => {
  const tiendas = await Tienda.findAll();
  res.json(tiendas);
};

exports.getOne = async (req, res) => {
  const tienda = await Tienda.findByPk(req.params.id);
  if (tienda) res.json(tienda);
  else res.status(404).json({ error: 'No encontrada' });
};

exports.create = async (req, res) => {
  try {
    const nueva = await Tienda.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const tienda = await Tienda.findByPk(req.params.id);
  if (!tienda) return res.status(404).json({ error: 'No encontrada' });

  await tienda.update(req.body);
  res.json(tienda);
};

exports.remove = async (req, res) => {
  const tienda = await Tienda.findByPk(req.params.id);
  if (!tienda) return res.status(404).json({ error: 'No encontrada' });

  await tienda.destroy();
  res.json({ mensaje: 'Eliminada' });
};
