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

    async atualizarStatus(id, ativo) {
        await db.query(`
            UPDATE produto SET ativo = ?
             WHERE id = ?
        `, [ativo, id]);
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
    }
};
