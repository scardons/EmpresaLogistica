"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaEnvios = void 0;
// src/domain/use-cases/consultaEnvios.ts
const filtros_repository_mysql_1 = require("../../infrastructure/repositories/filtros.repository.mysql");
const redisClient_1 = require("../../shared/redisClient"); // Cliente Redis
class ConsultaEnvios {
    constructor() {
        this.envioRepository = new filtros_repository_mysql_1.FiltrosRepositoryMysql();
    }
    async ejecutar(filtros) {
        const { fechaInicio, fechaFin, estado, transportistaId, page, pageSize } = filtros;
        // Generamos el cacheKey único basado en los filtros
        const cacheKey = `envios:${fechaInicio}:${fechaFin}:${estado}:${transportistaId}:${page}:${pageSize}`;
        // Verificamos si la consulta ya está en caché
        const cachedData = await redisClient_1.redisClient.get(cacheKey);
        if (cachedData) {
            // Si los datos están en caché, los devolvemos directamente
            console.log('Datos obtenidos desde el cache');
            return JSON.parse(cachedData);
        }
        // Si no están en caché, realizamos la consulta a la base de datos
        const envios = await this.envioRepository.obtenerEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId, // Pasamos transportistaId de los filtros
        page, pageSize);
        const total = await this.envioRepository.contarEnviosConFiltros(fechaInicio, fechaFin, estado, transportistaId // Pasamos transportistaId de los filtros
        );
        // Creamos el objeto de resultado
        const result = { envios, total };
        // Almacenamos los resultados en caché para futuras consultas
        await redisClient_1.redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 }); // Cache por 1 hora
        console.log('Datos obtenidos desde la base de datos y guardados en cache');
        return result;
    }
}
exports.ConsultaEnvios = ConsultaEnvios;
