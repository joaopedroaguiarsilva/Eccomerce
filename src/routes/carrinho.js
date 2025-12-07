const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controllers/CarrinhoController');

router.get('/', (req, res) => CarrinhoController.listar(req, res));
router.post('/add', (req, res) => CarrinhoController.adicionar(req, res));
router.post('/remover', (req, res) => CarrinhoController.remover(req, res));
router.post('/alterar', (req, res) => CarrinhoController.alterarQuantidade(req, res));

module.exports = router;
