// src/interfaces/routes/filtros.routes.ts
import { Router } from 'express';
import { obtenerEnviosConFiltros } from '../controllers/consultaEnvios.controller';

const router = Router();

// Ruta para la consulta avanzada de envíos con filtros
router.get('/filtros', obtenerEnviosConFiltros);

export default router;
