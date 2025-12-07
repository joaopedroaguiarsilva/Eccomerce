const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

router.post('/finalizar', PedidoController.finalizar);
router.get('/', PedidoController.detalhe);
router.get('/meus', PedidoController.listarDoUsuario);

module.exports = router;
