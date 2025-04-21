"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureRedisConnection = exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
// Crear el cliente de Redis
const redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379',
});
exports.redisClient = redisClient;
// Conectar a Redis solo cuando sea necesario
const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    }
    catch (err) {
    }
};
exports.connectRedis = connectRedis;
// Manejo de errores
redisClient.on('error', (err) => {
});
// Función para asegurarse de que el cliente esté conectado antes de usarlo
const ensureRedisConnection = async () => {
    if (!redisClient.isOpen) {
        await connectRedis();
    }
};
exports.ensureRedisConnection = ensureRedisConnection;
