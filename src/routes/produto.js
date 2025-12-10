const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('/novo', ProdutoController.formNovo);
router.post('/novo', ProdutoController.criar);
router.post('/:id/update_status', ProdutoController.updateStatus);
router.get('/:id', ProdutoController.detalhe);

module.exports = router;