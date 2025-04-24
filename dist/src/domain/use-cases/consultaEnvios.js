"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaEnvios = void 0;
const filtros_repository_mysql_1 = require("../../infrastructure/repositories/filtros.repository.mysql");
const redisClient_1 = require("../../shared/redisClient");
class ConsultaEnvios {
    constructor() {
        this.envioRepository = new filtros_repository_mysql_1.FiltrosRepositoryMysql();
    }
    async ejecutar(filtros) {
        const { fechaInicio, fechaFin, estado, transportistaId, page, pageSize } = filtros;
        const cacheKey = `envios:${fechaInicio}:${fechaFin}:${estado}:${transportistaId}:${page}:${pageSize}`;
        const cachedData = await redisClient_1.redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const envios = await this.envioRepository.obtenerEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId, page, pageSize);
        const total = await this.envioRepository.contarEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId);
        const result = { envios, total };
        await redisClient_1.redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });
        return result;
    }
}
exports.ConsultaEnvios = ConsultaEnvios;
