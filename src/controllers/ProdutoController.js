const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const Estoque = require('../models/Estoque');

module.exports = {
    async detalhe(req, res) {
        const id = req.query.id;

        const produto = await Produto.buscarPorId(id);
        if (!produto) return res.send("Produto não encontrado");

        const categorias = await Categoria.categoriasDoProduto(id);
        const saldo = await Estoque.saldo(id);

        res.render('produto', {
            produto,
            categorias,
            saldo
        });
    }
};
