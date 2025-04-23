"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/shared/testRedisConnection.ts
const redisClient_1 = require("./redisClient");
const testRedisConnection = async () => {
    try {
        console.log('Iniciando prueba de conexión con Redis...');
        // Establecer un valor en Redis
        await redisClient_1.redisClient.set('testKey', 'Hello Redis!');
        console.log('Valor establecido en Redis.');
        // Obtener el valor desde Redis
        const value = await redisClient_1.redisClient.get('testKey');
        console.log('Valor recuperado de Redis:', value);
    }
    catch (error) {
        console.error('Error al conectar o manipular Redis:', error);
    }
};
testRedisConnection();
