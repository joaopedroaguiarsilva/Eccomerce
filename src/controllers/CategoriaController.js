const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');

module.exports = {
    async listar(req, res) {
        const id = req.query.id;

        const categoria = await Categoria.buscarPorId(id);
        if (!categoria) return res.send("Categoria não encontrada");

        const produtos = await Produto.produtosPorCategoria(id);

        res.render('categoria', {
            categoria,
            produtos
        });
    }
};
