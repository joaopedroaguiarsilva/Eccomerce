const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.index);
router.get('/buscar', HomeController.buscar);

module.exports = router;
