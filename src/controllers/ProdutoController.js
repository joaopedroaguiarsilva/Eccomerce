const Produto = require('../models/Produto');

module.exports = {
    async detalhe(req, res) {
        const id = req.query.id;
        const produto = await Produto.buscarPorId(id);

        if (!produto) return res.send("Produto não encontrado");

        res.render('produto', { produto });
    }
};