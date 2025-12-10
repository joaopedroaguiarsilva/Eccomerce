const Produto = require('../models/Produto');
const Estoque = require('../models/Estoque');

module.exports = {

    async view(req, res) {
        const id = req.params.id;

        const produto = await Produto.buscarPorId(id);
        const historico = await Estoque.historico(id);
        const saldo = await Estoque.saldo(id);

        if (!produto) return res.send("Produto inexistente");

        res.render("estoque", {
            produto,
            historico,
            saldo
        });
    },

    async movimentar(req, res) {
        const id = req.params.id;
        const { quantidade } = req.body;

        const valor = parseInt(quantidade);

        if (isNaN(valor) || valor === 0) {
            return res.send("Quantidade inválida");
        }

        await Estoque.registrarMovimentacao(id, valor);

        res.redirect(`/estoque/${id}`);
    }
};
