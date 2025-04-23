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
    throw new Error('No se pudo conectar a Redis');
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

// Función de prueba para asegurarse de que la conexión a Redis está funcionando
const testRedisConnection = async () => {
  try {
    await redisClient.set('testKey', 'Hello Redis!');
    const value = await redisClient.get('testKey');
  } catch (error) {
  }
};

// Llamar a la función de prueba para verificar la conexión
const testConnection = async () => {
  await ensureRedisConnection();  // Asegurarse de que está conectado
  await testRedisConnection();    // Ejecutar la prueba de conexión
};

testConnection();

export { redisClient, connectRedis, ensureRedisConnection };
