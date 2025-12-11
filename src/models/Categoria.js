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
    },

    async filhas(mae_id) {
        const [rows] = await db.query(
            "SELECT * FROM categoria WHERE mae_id = ?",
            [mae_id]
        );
        return rows;
    },

    async arvore() {
        const [rows] = await db.query("SELECT * FROM categoria");
        const mapa = {};
    
        rows.forEach(cat => mapa[cat.id] = { ...cat, filhas: [] });
    
        const raiz = [];
    
        rows.forEach(cat => {
            if (cat.mae_id === null) raiz.push(mapa[cat.id]);
            else mapa[cat.mae_id].filhas.push(mapa[cat.id]);
        });
    
        return raiz;
    }
};
