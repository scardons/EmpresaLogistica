"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/envioEstado.routes.ts
const express_1 = require("express");
const envioEstado_controller_1 = require("../controllers/envioEstado.controller"); // Importa el controlador
const actualizarEstado_controller_1 = require("../controllers/actualizarEstado.controller");
const router = (0, express_1.Router)();
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
router.get('/:id/estado', envioEstado_controller_1.getEstadoEnvio);
router.put('/:id/estado', actualizarEstado_controller_1.actualizarEstadoEnvio);
exports.default = router;
