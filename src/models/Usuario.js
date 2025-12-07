const db = require('../../config/db');

module.exports = {
    async criar(nome, email, senha_hash, vendedor = 0) {
        const sql = `
            INSERT INTO usuario (nome, email, senha_hash, vendedor)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [nome, email, senha_hash, vendedor]);
        return result.insertId;
    },

    async buscarPorId(id) {
        const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id]);
        return rows[0];
    },

    async buscarPorEmail(email) {
        const [rows] = await db.query(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        );
        return rows[0];
    }
};
