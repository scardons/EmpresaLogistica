"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioRepositoryMysql = void 0;
// src/infrastructure/repositories/envio.repository.mysql.ts
const db_1 = require("../../config/db"); // Importa el pool de conexiones
class EnvioRepositoryMysql {
    // Implementación del método registrar
    async registrar(envio) {
        const [result] = await db_1.pool.execute('INSERT INTO envios SET ?', [envio]);
        return result; // Devuelve el resultado de la inserción (por ejemplo, el ID insertado)
    }
    // Implementación de getEnvioById
    async getEnvioById(id) {
        const [rows] = await db_1.pool.execute('SELECT * FROM envios WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null; // Asegúrate de tratar `rows` como un array
    }
    // Implementación de getRutaById
    async getRutaById(id) {
        const [rows] = await db_1.pool.execute('SELECT * FROM rutas WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null; // Asegúrate de tratar `rows` como un array
    }
    // Implementación de getTransportistaById
    async getTransportistaById(id) {
        const [rows] = await db_1.pool.execute('SELECT * FROM transportistas WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null; // Asegúrate de tratar `rows` como un array
    }
    async asignarRuta(envioId, rutaId, transportistaId) {
        const [result] = await db_1.pool.execute('UPDATE envios SET rutaId = ?, transportistaId = ? WHERE id = ?', [rutaId, transportistaId, envioId]);
        if (result.affectedRows === 0) {
            throw new Error(`No se pudo actualizar el envío con ID ${envioId}`);
        }
    }
}
exports.EnvioRepositoryMysql = EnvioRepositoryMysql;
