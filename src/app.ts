import express from 'express';
import usuarioRoutes from './interfaces/routes/usuario.routes';
import redisClient from './shared/redisClient';
import { pool } from './config/db';

const app = express();

app.use(express.json());
app.use('/usuarios', usuarioRoutes);

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
