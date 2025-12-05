const db = require('../../config/db');

module.exports = {
    async vincular(produto_id, categoria_id) {
        const sql = `
            INSERT INTO produto_categoria (produto_id, categoria_id)
            VALUES (?, ?)
        `;
        await db.query(sql, [produto_id, categoria_id]);
    },

    async remover(produto_id, categoria_id) {
        await db.query(`
            DELETE FROM produto_categoria
             WHERE produto_id = ? AND categoria_id = ?
        `, [produto_id, categoria_id]);
    }
};
