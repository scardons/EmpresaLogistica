"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstadoEnvio = void 0;
const redisClient_1 = require("../../shared/redisClient");
const envio_repository_mysql_1 = require("../../infrastructure/repositories/envio.repository.mysql");
const getEstadoEnvio = async (req, res) => {
    const envioId = req.params.id;
    try {
        // Primero intentar obtener el estado del envío desde Redis
        const estadoRedis = await redisClient_1.redisClient.get(`envio:${envioId}:estado`);
        if (estadoRedis) {
            return res.status(200).send(estadoRedis); // Si está en caché, devolverlo directamente
        }
        // Si no está en Redis, obtenerlo de la base de datos
        const envioRepository = new envio_repository_mysql_1.EnvioRepositoryMysql();
        const estado = await envioRepository.getEstadoEnvio(Number(envioId));
        if (estado) {
            // Guardar el estado en Redis para futuras consultas
            await redisClient_1.redisClient.set(`envio:${envioId}:estado`, estado);
            return res.status(200).send(estado); // Retornar el estado
        }
        return res.status(404).json({ message: 'Envío no encontrado' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al obtener el estado del envío' });
    }
};
exports.getEstadoEnvio = getEstadoEnvio;
