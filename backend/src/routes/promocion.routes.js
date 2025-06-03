const router = require('express').Router();
const controller = require('../controllers/promocionController');

router.post('/', controller.crearPromocion);
router.post('/asociar', controller.asociarPromocion);

module.exports = router;
