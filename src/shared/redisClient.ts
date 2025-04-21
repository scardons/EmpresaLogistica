import { createClient } from 'redis';

// Crear el cliente de Redis
const redisClient = createClient({
  url: 'redis://localhost:6379',
});

// Conectar a Redis solo cuando sea necesario
const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
  }
};

// Manejo de errores
redisClient.on('error', (err) => {
});

// Función para asegurarse de que el cliente esté conectado antes de usarlo
const ensureRedisConnection = async () => {
  if (!redisClient.isOpen) {
    await connectRedis();
  }
};

export { redisClient, connectRedis, ensureRedisConnection };
