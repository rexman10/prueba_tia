const express = require('express');
const router = express.Router();
const { crearPrecio, obtenerPrecioFinal } = require('../controllers/precioController');

router.post('/', crearPrecio);
router.get('/final', obtenerPrecioFinal);

module.exports = router;
