const db = require('../../config/db');

module.exports = {
    async buscarPorId(id) {
        const [rows] = await db.query("SELECT * FROM produto WHERE id = ?", [id]);
        return rows[0];
    },

    async buscarAtivos() {
        const [rows] = await db.query("SELECT * FROM produto WHERE ativo = 1");
        return rows;
    }
};