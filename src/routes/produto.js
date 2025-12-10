const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('/', ProdutoController.detalhe);
router.get('/novo', ProdutoController.formNovo);
router.post('/novo', ProdutoController.criar);

module.exports = router;