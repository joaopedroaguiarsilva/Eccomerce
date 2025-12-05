const db = require('../../config/db');

module.exports = {
    async todas() {
        const [rows] = await db.query("SELECT * FROM categoria");
        return rows;
    },

    async criar(nome, mae_id = null) {
        const sql = `INSERT INTO categoria (nome, mae_id) VALUES (?, ?)`;
        const [result] = await db.query(sql, [nome, mae_id]);
        return result.insertId;
    },

    async buscarPorId(id) {
        const [rows] = await db.query("SELECT * FROM categoria WHERE id = ?", [id]);
        return rows[0];
    },

    async categoriasDoProduto(produto_id) {
        const sql = `
            SELECT c.*
              FROM categoria c
              JOIN produto_categoria pc ON pc.categoria_id = c.id
             WHERE pc.produto_id = ?
        `;
        const [rows] = await db.query(sql, [produto_id]);
        return rows;
    }
};
