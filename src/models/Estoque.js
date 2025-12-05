const db = require('../../config/db');

module.exports = {
    async registrarMovimentacao(produto_id, quantidade) {
        const sql = `
            INSERT INTO estoque_movimentacao (produto_id, quantidade)
            VALUES (?, ?)
        `;
        await db.query(sql, [produto_id, quantidade]);
    },

    async saldo(produto_id) {
        const sql = `
            SELECT COALESCE(SUM(quantidade), 0) AS saldo
              FROM estoque_movimentacao
             WHERE produto_id = ?
        `;
        const [rows] = await db.query(sql, [produto_id]);
        return rows[0].saldo;
    }
};
