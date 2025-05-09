import express from 'express';
import { ensureRedisConnection, redisClient } from './shared/redisClient';
import { pool } from './config/db';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import cors from 'cors';
import { setupRoutes } from './interfaces/routes';

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://scardons.github.io'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para manejar JSON
app.use(express.json());

// Configurar las rutas desde interfaces/routes.ts
setupRoutes(app);

// Ruta para verificar conexión a MySQL
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1+1 AS resultado');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en la conexión BD' });
  }
});

// Ruta de prueba para Redis
app.get('/cache-test', async (req, res) => {
  try {
    await ensureRedisConnection();
    await redisClient.set('mensaje', 'Hola desde Redis');
    const valor = await redisClient.get('mensaje');
    res.json({
      message: 'Prueba de Redis exitosa',
      valorGuardado: valor,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al conectar con Redis', error });
  }
});

export default app;
