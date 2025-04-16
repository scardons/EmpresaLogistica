"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioRepositoryMysql = void 0;
const db_1 = require("../../config/db");
class EnvioRepositoryMysql {
    async registrar(envio) {
        const [result] = await db_1.pool.query(`INSERT INTO envios (destinatario, direccion, peso, dimensiones, tipoProducto, fechaRegistro)
         VALUES (?, ?, ?, ?, ?, ?)`, [
            envio.destinatario,
            envio.direccion,
            envio.peso,
            envio.dimensiones,
            envio.tipoProducto,
            envio.fechaRegistro,
        ]);
        return {
            ...envio,
            id: result.insertId,
        };
    }
}
exports.EnvioRepositoryMysql = EnvioRepositoryMysql;
