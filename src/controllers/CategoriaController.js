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
    },

    async admin(req, res) {
        if (!req.session.usuario || !req.session.usuario.vendedor)
            return res.send("Acesso negado");

        const categorias = await Categoria.todas();
        const arvore = await Categoria.arvore();

        res.render("categoria_admin", {
            categorias,
            arvore
        });
    },

    async criar(req, res) {
        if (!req.session.usuario || !req.session.usuario.vendedor)
            return res.send("Acesso negado");

        const { nome, mae_id } = req.body;

        await Categoria.criar(nome, mae_id || null);

        res.redirect("/categoria/admin");
    }
};
