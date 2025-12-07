const Produto = require('../models/Produto');

module.exports = {

    inicializarCarrinho(req) {
        if (!req.session.carrinho) {
            req.session.carrinho = {};
        }
    },

    async listar(req, res) {
        this.inicializarCarrinho(req);

        const itens = [];
        let total = 0;

        for (let id in req.session.carrinho) {
            const produto = await Produto.buscarPorId(id);
            const qtde = req.session.carrinho[id];

            const subtotal = produto.preco * qtde;
            total += subtotal;

            itens.push({
                produto,
                quantidade: qtde,
                subtotal
            });
        }

        res.render('carrinho', {
            itens,
            total
        });
    },

    async adicionar(req, res) {
        this.inicializarCarrinho(req);

        const { id, quantidade } = req.body;

        req.session.carrinho[id] = 
            (req.session.carrinho[id] || 0) + parseInt(quantidade);

        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            return res.json({ ok: true });
        }

        res.redirect('/carrinho');
    },

    async remover(req, res) {
        this.inicializarCarrinho(req);

        const { id } = req.body;
        delete req.session.carrinho[id];

        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            return res.json({ ok: true });
        }

        res.redirect('/carrinho');
    },

    async alterarQuantidade(req, res) {
        this.inicializarCarrinho(req);

        const { id, quantidade } = req.body;

        req.session.carrinho[id] = parseInt(quantidade);

        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            return res.json({ ok: true });
        }

        res.redirect('/carrinho');
    }
};
