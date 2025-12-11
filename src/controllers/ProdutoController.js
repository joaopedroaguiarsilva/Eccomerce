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
        const id = req.params.id;

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

                for (let categoriaId of selecionadas) {
                    await Produto.adicionarCategoria(produtoId, categoriaId);
                }
            }

            res.redirect("/produto/" + produtoId);

        } catch (e) {
            console.error(e);
            res.render("novo-produto", { error: "Erro ao criar produto." });
        }

    }],

    async updateStatus(req, res) {
        const id = req.params.id;

        const produto = await Produto.buscarPorId(id);
        if (!produto) return res.send("Produto não encontrado");

        if (!req.session.usuario || req.session.usuario.id !== produto.vendedor_id) {
            return res.status(403).send("Você não tem permissão.");
        }

        await Produto.inverterStatus(id);

        res.redirect('/produto/' + id);
    }

};
