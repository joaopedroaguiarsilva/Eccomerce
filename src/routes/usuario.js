const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/login', UsuarioController.telaLogin);
router.get('/cadastro', UsuarioController.telaCadastro);
    
router.post('/login', UsuarioController.login);
router.post('/cadastro', UsuarioController.cadastrar);

router.get('/logout', UsuarioController.logout);

module.exports = router;
