const db = require('../../config/db');

module.exports = {
    async buscarAtivos() {
        const [rows] = await db.query(`
            SELECT * FROM produto
             WHERE ativo = 1
        `);
        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await db.query(`
            SELECT * FROM produto
             WHERE id = ?
        `, [id]);
        return rows[0];
    },

    async criar(vendedor_id, nome, descricao, preco, foto_url) {
        const sql = `
            INSERT INTO produto (vendedor_id, nome, descricao, preco, foto_url)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [
            vendedor_id, nome, descricao, preco, foto_url
        ]);

        return result.insertId;
    },

    async inverterStatus(id) {
        const sql = `
            UPDATE produto
               SET ativo = NOT ativo
             WHERE id = ?
        `;
        await db.query(sql, [id]);
    },

    async produtosPorCategoria(categoria_id) {
        const sql = `
            SELECT p.*
              FROM produto p
              JOIN produto_categoria pc ON pc.produto_id = p.id
             WHERE pc.categoria_id = ?
               AND p.ativo = 1
        `;
        const [rows] = await db.query(sql, [categoria_id]);
        return rows;
    },

    async existePedidoComProduto(id) {
        const sql = `
            SELECT 1
              FROM item_pedido
             WHERE produto_id = ?
             LIMIT 1
        `;
        const [rows] = await db.query(sql, [id]);
        return rows.length > 0;
    }
};
