const Pedido = require('../models/Pedido');
const ItemPedido = require('../models/ItemPedido');
const Produto = require('../models/Produto');

module.exports = {
    async finalizar(req, res) {

        if (!req.session.usuario)
            return res.redirect('/usuario/login');

        const carrinho = req.session.carrinho || {};
        if (Object.keys(carrinho).length === 0)
            return res.send("Carrinho vazio.");

        let total = 0;
        const itensDetalhes = [];

        for (let id in carrinho) {
            const produto = await Produto.buscarPorId(id);
            const qtd = carrinho[id];
            const subtotal = produto.preco * qtd;

            total += subtotal;

            itensDetalhes.push({ produto, qtd, subtotal });
        }

        const pedidoId = await Pedido.criar(req.session.usuario.id, total);

        for (let item of itensDetalhes) {
            await ItemPedido.adicionar(
                pedidoId,
                item.produto.id,
                item.qtd,
                item.produto.preco
            );
        }

        req.session.carrinho = {};

        res.render('pedido-confirmado', {
            pedidoId,
            total
        });
    },

    async detalhe(req, res) {
        const id = req.query.id;

        const pedido = await Pedido.buscarPorId(id);
        const itens = await ItemPedido.itensDoPedido(id);

        res.render('pedido-detalhe', { pedido, itens });
    },

    async listarDoUsuario(req, res) {
        if (!req.session.usuario)
            return res.redirect('/usuario/login');

        const pedidos = await Pedido.pedidosDoUsuario(req.session.usuario.id);

        res.render('meus-pedidos', { pedidos });
    }
};
