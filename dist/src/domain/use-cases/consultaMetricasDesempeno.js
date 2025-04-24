"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaMetricasDesempeno = void 0;
// src/domain/use-cases/consultaMetricaDesempeno.ts
const filtros_repository_mysql_1 = require("../../infrastructure/repositories/filtros.repository.mysql");
const redisClient_1 = require("../../shared/redisClient");
// Función para calcular el tiempo de entrega en horas
function calcularTiempoEntrega(fechaRegistro, fechaEntrega) {
    const milisegundos = fechaEntrega.getTime() - fechaRegistro.getTime();
    const horas = milisegundos / (1000 * 60 * 60);
    return Math.round(horas * 100) / 100; // redondea a 2 decimales
}
class ConsultaMetricasDesempeno {
    constructor() {
        this.envioRepository = new filtros_repository_mysql_1.FiltrosRepositoryMysql();
    }
    async ejecutar(filtros) {
        const { fechaInicio, fechaFin } = filtros;
        const cacheKey = `metricas:${fechaInicio}:${fechaFin}`;
        const cached = await redisClient_1.redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const metricas = await this.envioRepository.obtenerMetricasDesempeno({ fechaInicio, fechaFin });
        // Aquí calculamos el tiempo de entrega por cada envío
        metricas.envios = metricas.envios.map(envio => {
            if (envio.fechaEntrega) {
                envio.tiempoEntrega = calcularTiempoEntrega(envio.fechaRegistro, envio.fechaEntrega);
            }
            else {
                envio.tiempoEntrega = null; // O algún valor por defecto
            }
            return envio;
        });
        await redisClient_1.redisClient.set(cacheKey, JSON.stringify(metricas), { EX: 3600 });
        return metricas;
    }
}
exports.ConsultaMetricasDesempeno = ConsultaMetricasDesempeno;
