// src/routes/envioEstado.routes.ts
import { Router } from 'express';
import { getEstadoEnvio } from '../controllers/envioEstado.controller'; // Importa el controlador
import { actualizarEstadoEnvio } from '../controllers/actualizarEstado.controller';

const router = Router();

/**
 * @swagger
 * /envio/{id}/estado:
 *   get:
 *     summary: Obtiene el estado de un envío
 *     description: Devuelve el estado de un envío específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del envío
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado del envío recuperado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Enviado"
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error al obtener el estado del envío
 *   put:
 *     summary: Actualiza el estado de un envío
 *     description: Actualiza el estado de un envío específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del envío
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoEstado:
 *                 type: string
 *                 example: "En tránsito"
 *     responses:
 *       200:
 *         description: Estado actualizado con éxito
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error al actualizar el estado del envío
 */

router.get('/:id/estado', getEstadoEnvio);
router.put('/:id/estado', actualizarEstadoEnvio);


export default router;
