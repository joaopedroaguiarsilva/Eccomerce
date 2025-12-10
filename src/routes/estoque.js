const express = require('express');
const router = express.Router();
const EstoqueController = require('../controllers/EstoqueController');

router.get('/:id', EstoqueController.view);
router.post('/:id/movimentar', EstoqueController.movimentar);

module.exports = router;
