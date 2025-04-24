"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltrosRepositoryMysql = void 0;
// src/infrastructure/repositories/filtros.repository.mysql.ts
const db_1 = require("../../config/db");
// Función para calcular el tiempo de entrega en horas
function calcularTiempoEntrega(fechaRegistro, fechaEntrega) {
    const milisegundos = fechaEntrega.getTime() - fechaRegistro.getTime();
    const horas = milisegundos / (1000 * 60 * 60);
    return Math.round(horas * 100) / 100; // Redondea a 2 decimales
}
class FiltrosRepositoryMysql {
    // Método para obtener los envíos con filtros
    async obtenerEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId, page = 1, pageSize = 10) {
        let query = "SELECT * FROM envios WHERE 1=1";
        const params = [];
        if (fechaInicio) {
            query += " AND fechaRegistro >= ?";
            params.push(fechaInicio);
        }
        if (fechaFin) {
            query += " AND fechaRegistro <= ?";
            params.push(fechaFin);
        }
        if (estado) {
            query += " AND estado = ?";
            params.push(estado);
        }
        if (transportistaId) {
            query += " AND transportistaId = ?";
            params.push(transportistaId);
        }
        query += " LIMIT ?, ?";
        params.push((page - 1) * pageSize);
        params.push(pageSize);
        const [rows] = await db_1.pool.execute(query, params);
        return rows;
    }
    // Método para contar los envíos con filtros
    async contarEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId) {
        let query = "SELECT COUNT(*) as total FROM envios WHERE 1=1";
        const params = [];
        if (fechaInicio) {
            query += " AND fechaRegistro >= ?";
            params.push(fechaInicio);
        }
        if (fechaFin) {
            query += " AND fechaRegistro <= ?";
            params.push(fechaFin);
        }
        if (estado) {
            query += " AND estado = ?";
            params.push(estado);
        }
        if (transportistaId) {
            query += " AND transportistaId = ?";
            params.push(transportistaId);
        }
        const [rows] = await db_1.pool.execute(query, params);
        return rows.length > 0 ? rows[0].total : 0;
    }
    // Método para obtener las métricas de desempeño
    async obtenerMetricasDesempeno(filtros) {
        const { fechaInicio, fechaFin } = filtros;
        let query = `
      SELECT 
        transportistaId,
        COUNT(*) AS totalEntregados,
        AVG(TIMESTAMPDIFF(HOUR, fechaRegistro, NOW())) AS promedioHoras
      FROM envios
      WHERE estado = 'Entregado'
    `;
        const params = [];
        if (fechaInicio) {
            query += " AND fechaRegistro >= ?";
            params.push(fechaInicio);
        }
        if (fechaFin) {
            query += " AND fechaRegistro <= ?";
            params.push(fechaFin);
        }
        query += " GROUP BY transportistaId";
        const [rows] = await db_1.pool.execute(query, params);
        // Mapeamos los resultados para obtener el tiempo promedio de entrega por transportista
        const tiempoPromedioEntregaPorTransportista = rows.map((row) => ({
            transportistaId: row.transportistaId,
            promedioHoras: row.promedioHoras,
        }));
        // Calculamos el total de entregados
        const totalEntregados = rows.reduce((acc, row) => acc + row.totalEntregados, 0);
        // Obtenemos los envíos con los filtros aplicados
        const envios = await this.obtenerEnviosConFiltros(fechaInicio, fechaFin);
        // Ahora agregamos el tiempo de entrega para cada envío
        envios.forEach((envio) => {
            if (envio.fechaEntrega) {
                envio.tiempoEntrega = calcularTiempoEntrega(envio.fechaRegistro, envio.fechaEntrega);
            }
            else {
                envio.tiempoEntrega = null; // Si no tiene fecha de entrega, dejamos como null
            }
        });
        return {
            tiempoPromedioEntregaPorTransportista,
            totalEntregados,
            envios, // Añadimos los envíos a las métricas
        };
    }
}
exports.FiltrosRepositoryMysql = FiltrosRepositoryMysql;
