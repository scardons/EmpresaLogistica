// src/interfaces/routes/filtros.routes.ts
import { Router } from 'express';
import { obtenerEnviosConFiltros } from '../controllers/consultaEnvios.controller';

const router = Router();

/**
 * @swagger
 * /filtros:
 *   get:
 *     summary: Consulta avanzada de envíos con filtros
 *     description: Permite realizar una consulta avanzada de envíos aplicando filtros como estado, tipo de producto, fecha de registro, etc.
 *     responses:
 *       200:
 *         description: Lista de envíos con los filtros aplicados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 envios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       destinatario:
 *                         type: string
 *                       direccion:
 *                         type: string
 *                       peso:
 *                         type: string
 *                       dimensiones:
 *                         type: string
 *                       tipoProducto:
 *                         type: string
 *                       fechaRegistro:
 *                         type: string
 *                         format: date-time
 *                       fechaEntrega:
 *                         type: string
 *                         format: date-time
 *                       estado:
 *                         type: string
 *                       rutaId:
 *                         type: integer
 *                       transportistaId:
 *                         type: integer
 *       400:
 *         description: Parámetros de filtro inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/filtros', obtenerEnviosConFiltros);

export default router;
