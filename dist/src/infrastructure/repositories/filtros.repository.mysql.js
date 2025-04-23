"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltrosRepositoryMysql = void 0;
// src/infrastructure/repositories/filtros.repository.mysql.ts
const db_1 = require("../../config/db");
class FiltrosRepositoryMysql {
    // Método para obtener envíos con filtros avanzados
    async obtenerEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId, // Cambié transportista por transportistaId
    page = 1, pageSize = 10) {
        let query = 'SELECT * FROM envios WHERE 1=1';
        const params = [];
        if (fechaInicio) {
            query += ' AND fechaRegistro >= ?';
            params.push(fechaInicio);
        }
        if (fechaFin) {
            query += ' AND fechaRegistro <= ?';
            params.push(fechaFin);
        }
        if (estado) {
            query += ' AND estado = ?';
            params.push(estado);
        }
        if (transportistaId) {
            query += ' AND transportistaId = ?'; // Cambié transportista por transportistaId
            params.push(transportistaId); // Cambié transportista por transportistaId
        }
        query += ' LIMIT ?, ?';
        params.push((page - 1) * pageSize);
        params.push(pageSize);
        const [rows] = await db_1.pool.execute(query, params);
        return rows;
    }
    // Método para obtener la cantidad de envíos según los filtros
    async contarEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId // Cambié transportista por transportistaId
    ) {
        let query = 'SELECT COUNT(*) as total FROM envios WHERE 1=1';
        const params = [];
        if (fechaInicio) {
            query += ' AND fechaRegistro >= ?';
            params.push(fechaInicio);
        }
        if (fechaFin) {
            query += ' AND fechaRegistro <= ?';
            params.push(fechaFin);
        }
        if (estado) {
            query += ' AND estado = ?';
            params.push(estado);
        }
        if (transportistaId) {
            query += ' AND transportistaId = ?'; // Cambié transportista por transportistaId
            params.push(transportistaId); // Cambié transportista por transportistaId
        }
        const [rows] = await db_1.pool.execute(query, params);
        return rows.length > 0 ? rows[0].total : 0;
    }
}
exports.FiltrosRepositoryMysql = FiltrosRepositoryMysql;
