import app from './app';
import dotenv from 'dotenv';
import { connectRedis } from './shared/redisClient';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectRedis();
    console.log('✅ Conectado a Redis');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con Redis:', error);
  }
}

startServer();
