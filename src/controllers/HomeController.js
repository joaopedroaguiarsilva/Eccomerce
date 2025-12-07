const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

module.exports = {
    async index(req, res) {
        const produtos = await Produto.buscarAtivos();
        const categorias = await Categoria.todas();

        res.render('home', {
            produtos,
            categorias
        });
    },

    async buscar(req, res) {
        const termo = req.query.q || "";

        const todos = await Produto.buscarAtivos();
        const filtrados = todos.filter(p =>
            p.nome.toLowerCase().includes(termo.toLowerCase())
        );

        res.render('home', { produtos: filtrados, termo });
    }
};
