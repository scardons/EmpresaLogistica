// src/shared/testRedisConnection.ts
import { redisClient } from './redisClient';

const testRedisConnection = async () => {
  try {
    console.log('Iniciando prueba de conexión con Redis...');

    // Establecer un valor en Redis
    await redisClient.set('testKey', 'Hello Redis!');
    console.log('Valor establecido en Redis.');

    // Obtener el valor desde Redis
    const value = await redisClient.get('testKey');
    console.log('Valor recuperado de Redis:', value);
  } catch (error) {
    console.error('Error al conectar o manipular Redis:', error);
  }
};

testRedisConnection();
