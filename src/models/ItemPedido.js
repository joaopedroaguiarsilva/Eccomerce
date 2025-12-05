const db = require('../../config/db');

module.exports = {
    async adicionar(pedido_id, produto_id, quantidade, preco) {
        const sql = `
            INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(sql, [pedido_id, produto_id, quantidade, preco]);
    },

    async itensDoPedido(pedido_id) {
        const sql = `
            SELECT i.*, p.nome, p.foto_url
              FROM item_pedido i
              JOIN produto p ON p.id = i.produto_id
             WHERE i.pedido_id = ?
        `;
        const [rows] = await db.query(sql, [pedido_id]);
        return rows;
    }
};
