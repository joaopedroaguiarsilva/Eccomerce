const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

module.exports = {
    async index(req, res) {
        const ordem = req.query.ordem || "";
        const categoriaId = req.query.categoria || "";

        const categorias = await Categoria.todas();

        let produtos;


        if (categoriaId) {
            produtos = await Produto.produtosPorCategoria(categoriaId);
        } else {
            produtos = await Produto.buscarAtivos();
        }


        if (ordem === 'asc') {
            produtos.sort((a, b) => a.preco - b.preco);
        } else if (ordem === 'desc') {
            produtos.sort((a, b) => b.preco - a.preco);
        }

        res.render('home', {
            produtos,
            categorias,
            categoriaSelecionada: categoriaId,
            ordemSelecionada: ordem
        });
    },

    async buscar(req, res) {
    const termo = req.query.q || "";
    const categoriaId = req.query.categoria || "";
    const ordem = req.query.ordem || "";

    const categorias = await Categoria.todas();

    let produtos;

    // 🔹 Se tiver categoria selecionada, pega produtos só dessa categoria
    if (categoriaId) {
        produtos = await Produto.produtosPorCategoria(categoriaId);
    } else {
        produtos = await Produto.buscarAtivos();
    }

    // 🔹 Aplica filtro de busca
    if (termo) {
        produtos = produtos.filter(p =>
            p.nome.toLowerCase().includes(termo.toLowerCase())
        );
    }

    // 🔹 Ordenação
    if (ordem === 'asc') {
        produtos.sort((a, b) => a.preco - b.preco);
    } else if (ordem === 'desc') {
        produtos.sort((a, b) => b.preco - a.preco);
    }

    res.render('home', {
        produtos,
        categorias,
        categoriaSelecionada: categoriaId,
        ordemSelecionada: ordem,
        termo
    });
}


};
