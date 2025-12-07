const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {

    telaLogin(req, res) {
        res.render('login');
    },

    telaCadastro(req, res) {
        res.render('cadastro');
    },

    async cadastrar(req, res) {
        let { nome, email, senha, vendedor } = req.body;

        vendedor = vendedor === "on" ? 1 : 0;

        const existe = await Usuario.buscarPorEmail(email);
        if (existe) return res.send("Email já cadastrado.");

        const senha_hash = await bcrypt.hash(senha, 10);

        const id = await Usuario.criar(nome, email, senha_hash, vendedor);

        req.session.usuario = { id, nome, email, vendedor };

        res.redirect('/');
    },

    async login(req, res) {
        const { nome, email, senha, vendedor } = req.body;

        const isVendedor = vendedor === "on" ? 1 : 0;

        const usuario = await Usuario.buscarPorEmail(email);
        if (!usuario) return res.send("Usuário não encontrado");

        const ok = await bcrypt.compare(senha, usuario.senha_hash);
        if (!ok) return res.send("Senha incorreta");

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        res.redirect('/');
    },

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
};
