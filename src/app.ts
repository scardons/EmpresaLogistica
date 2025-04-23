// src/app.ts
import express from 'express';
import usuarioRoutes from './interfaces/routes/usuario.routes';
import { ensureRedisConnection, redisClient } from './shared/redisClient';
import { pool } from './config/db';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import envioRoutes from './interfaces/routes/envio.routes';
import transportistaRoutes from "./interfaces/routes/transportista.routes";
import envioEstadoRoutes from './interfaces/routes/envioEstado.routes';
import filtrosRoutes from './interfaces/routes/filtros.routes';
console.log('📁 Rutas cargadas: /usuarios, /envios, /transportistas, /envio, /api/envios/filtros');

const app = express();

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para manejar JSON
app.use(express.json());

// Rutas para el manejo de usuarios, envíos y filtros
app.use('/usuarios', usuarioRoutes);
app.use('/envios', envioRoutes);
app.use("/transportistas", transportistaRoutes);
app.use("/envio", envioEstadoRoutes);
app.use('/api/envios', filtrosRoutes);  // Ruta de filtros
console.log("Rutas cargadas: /api/envios/filtros");


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
