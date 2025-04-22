"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transportista_controller_1 = require("../controllers/transportista.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /transportistas:
 *   post:
 *     summary: Registrar un nuevo transportista
 *     description: Este endpoint permite registrar un nuevo transportista en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               placa:
 *                 type: string
 *                 example: ABC123
 *               telefono:
 *                 type: string
 *                 example: "1234567890"
 *               capacidad:
 *                 type: integer
 *                 example: 10000  # Capacidad del vehículo en kg
 *     responses:
 *       201:
 *         description: Transportista registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 placa:
 *                   type: string
 *                   example: ABC123
 *                 telefono:
 *                   type: string
 *                   example: "1234567890"
 *                 capacidad:
 *                   type: integer
 *                   example: 10000
 *                 fecha_registro:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-04-21T00:00:00.000Z"
 *       400:
 *         description: Solicitud incorrecta, faltan datos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", transportista_controller_1.crearTransportista);
exports.default = router;
