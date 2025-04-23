"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerEnviosConFiltros = void 0;
const consultaEnvios_1 = require("../../domain/use-cases/consultaEnvios"); // Importa el caso de uso
const obtenerEnviosConFiltros = async (req, res) => {
    try {
        // Obtención de parámetros desde la consulta
        const { fechaInicio, fechaFin, estado, transportistaId, page = 1, pageSize = 10 } = req.query;
        // Validación de parámetros
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
        // Creación del objeto de filtros para consulta
        const filtros = {
            fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
            fechaFin: fechaFin ? new Date(fechaFin) : undefined,
            estado: estado, // Estado como string
            transportistaId: transportistaId ? Number(transportistaId) : undefined,
            page: Number(page), // Paginación: página actual
            pageSize: Number(pageSize), // Paginación: tamaño de página
        };
        // Creación de instancia del caso de uso
        const consultaEnvios = new consultaEnvios_1.ConsultaEnvios();
        // Ejecución del caso de uso para obtener envíos filtrados
        const resultado = await consultaEnvios.ejecutar(filtros);
        // Respuesta con los envíos filtrados
        res.status(200).json(resultado);
    }
    catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Error desconocido' });
        }
    }
};
exports.obtenerEnviosConFiltros = obtenerEnviosConFiltros;
