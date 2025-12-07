const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');

router.get('/', CategoriaController.listar);

module.exports = router;
