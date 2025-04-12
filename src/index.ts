import express from 'express';
import { pool } from './config/db';
import usuarioRoutes from './routes/usuario.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/usuarios', usuarioRoutes);


app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1+1 AS resultado');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en la conexion bd' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
