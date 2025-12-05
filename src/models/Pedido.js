const db = require('../../config/db');

module.exports = {
    async criar(usuario_id, total) {
        const sql = `
            INSERT INTO pedido (usuario_id, total)
            VALUES (?, ?)
        `;
        const [result] = await db.query(sql, [usuario_id, total]);
        return result.insertId;
    },

    async buscarPorId(id) {
        const sql = `
            SELECT * FROM pedido
             WHERE id = ?
        `;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    },

    async pedidosDoUsuario(usuario_id) {
        const [rows] = await db.query(`
            SELECT *
              FROM pedido
             WHERE usuario_id = ?
             ORDER BY data_pedido DESC
        `, [usuario_id]);

        return rows;
    }
};
