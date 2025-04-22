"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioRepositoryMysql = void 0;
const db_1 = require("../../config/db");
class EnvioRepositoryMysql {
    async registrar(envio) {
        if (envio.dimensiones && typeof envio.dimensiones === "object") {
            envio.dimensiones = JSON.stringify(envio.dimensiones);
        }
        if (!envio.fechaRegistro) {
            envio.fechaRegistro = new Date().toISOString();
        }
        if (!envio.destinatario || !envio.direccion) {
            throw new Error("Faltan datos requeridos: destinatario o direccion");
        }
        const query = `
      INSERT INTO envios 
      (destinatario, direccion, dimensiones, fechaRegistro, estado, peso, rutaId, transportistaId, tipoProducto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [
            envio.destinatario,
            envio.direccion,
            envio.dimensiones,
            envio.fechaRegistro,
            envio.estado || "En espera",
            envio.peso || 0,
            envio.rutaId || null,
            envio.transportistaId || null,
            envio.tipoProducto || null,
        ];
        const [result] = await db_1.pool.execute(query, values);
        const envioInsertado = {
            id: result.insertId,
            ...envio,
        };
        return envioInsertado;
    }
    async getEnvioById(id) {
        const [rows] = await db_1.pool.execute("SELECT * FROM envios WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    async getRutaById(id) {
        const [rows] = await db_1.pool.execute("SELECT * FROM rutas WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    async getTransportistaById(id) {
        const [rows] = await db_1.pool.execute("SELECT * FROM transportistas WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    async asignarRuta(envioId, rutaId, transportistaId) {
        const [result] = await db_1.pool.execute("UPDATE envios SET rutaId = ?, transportistaId = ? WHERE id = ?", [rutaId, transportistaId, envioId]);
        if (result.affectedRows === 0) {
            throw new Error(`No se pudo actualizar el envío con ID ${envioId}`);
        }
    }
}
exports.EnvioRepositoryMysql = EnvioRepositoryMysql;
