const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const Estoque = require('../models/Estoque');

function somenteVendedor(req, res, next) {
    if (!req.session.usuario || !req.session.usuario.vendedor) {
        return res.status(403).send("Área restrita a vendedores.");
    }
    next();
}

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
    },

    formNovo: [somenteVendedor, async (req, res) => {
        const categorias = await Categoria.todas();
        res.render("novo-produto", { categorias });
    }],

    criar: [somenteVendedor, async (req, res) => {
        try {
            const vendedorId = req.session.usuario.id;
            const { nome, descricao, preco, foto_url } = req.body;

            const produtoId = await Produto.criar(
                vendedorId,
                nome,
                descricao,
                preco,
                foto_url
            );

            if (req.body.categorias) {
                const selecionadas = Array.isArray(req.body.categorias)
                    ? req.body.categorias
                    : [req.body.categorias];

                for (let cat of selecionadas) {
                    await Categoria.vincularProduto(produtoId, cat);
                }
            }

            res.redirect("/produto?id=" + produtoId);

        } catch (e) {
            console.error(e);
            res.render("produto_novo", { error: "Erro ao criar produto." });
        }
    }]
};
