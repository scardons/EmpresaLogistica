"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerEnviosConFiltros = void 0;
const consultaEnvios_1 = require("../../domain/use-cases/consultaEnvios");
const consultaMetricasDesempeno_1 = require("../../domain/use-cases/consultaMetricasDesempeno");
const obtenerEnviosConFiltros = async (req, res) => {
    try {
        const { fechaInicio, fechaFin, estado, transportistaId, page = 1, pageSize = 10 } = req.query;
        if (fechaInicio && isNaN(Date.parse(fechaInicio))) {
            return res.status(400).json({ error: 'Parámetro "fechaInicio" inválido' });
        }
        if (fechaFin && isNaN(Date.parse(fechaFin))) {
            return res.status(400).json({ error: 'Parámetro "fechaFin" inválido' });
        }
        if (estado && typeof estado !== 'string') {
            return res.status(400).json({ error: 'Parámetro "estado" inválido' });
        }
        if (transportistaId && isNaN(Number(transportistaId))) {
            return res.status(400).json({ error: 'Parámetro "transportistaId" inválido' });
        }
        const filtros = {
            fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
            fechaFin: fechaFin ? new Date(fechaFin) : undefined,
            estado: estado,
            transportistaId: transportistaId ? Number(transportistaId) : undefined,
            page: Number(page),
            pageSize: Number(pageSize),
        };
        const consultaEnvios = new consultaEnvios_1.ConsultaEnvios();
        const consultaMetricas = new consultaMetricasDesempeno_1.ConsultaMetricasDesempeno();
        // Ejecutar ambos casos de uso en paralelo
        const [enviosResultado, metricas] = await Promise.all([
            consultaEnvios.ejecutar(filtros),
            consultaMetricas.ejecutar({
                fechaInicio: filtros.fechaInicio,
                fechaFin: filtros.fechaFin,
            }),
        ]);
        res.status(200).json({
            ...enviosResultado,
            metricas,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Error desconocido' });
        }
    }
};
exports.obtenerEnviosConFiltros = obtenerEnviosConFiltros;
