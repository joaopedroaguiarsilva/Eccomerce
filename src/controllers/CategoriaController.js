const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');

module.exports = {
    async listar(req, res) {
        const id = req.query.id;
        const ordem = req.query.ordem;

        const categoria = await Categoria.buscarPorId(id);
        if (!categoria) return res.send("Categoria não encontrada");

        let produtos = await Produto.produtosPorCategoria(id);

        if (ordem === 'asc') {
            produtos.sort((a, b) => a.preco - b.preco);
        } else if (ordem === 'desc') {
            produtos.sort((a, b) => b.preco - a.preco);
        }

        res.render('categoria', {
            categoria,
            produtos
        });
    }
};
