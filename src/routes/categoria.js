const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const router = express.Router();

router.get('/admin', CategoriaController.admin);
router.post('/criar', CategoriaController.criar);

module.exports = router;