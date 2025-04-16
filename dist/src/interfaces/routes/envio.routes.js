"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const envio_controller_1 = require("../controllers/envio.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Envíos
 *   description: Operaciones relacionadas con los envíos
 */
/**
 * @swagger
 * /envios/registrar:
 *   post:
 *     summary: Registrar un nuevo envío
 *     tags: [Envíos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destinatario
 *               - direccion
 *               - peso
 *               - dimensiones
 *               - tipoProducto
 *             properties:
 *               destinatario:
 *                 type: string
 *                 example: Juan Pérez
 *               direccion:
 *                 type: string
 *                 example: Calle 123 #45-67, Bogotá
 *               peso:
 *                 type: number
 *                 example: 12.5
 *               dimensiones:
 *                 type: string
 *                 example: 30x20x40
 *               tipoProducto:
 *                 type: string
 *                 example: Electrónica
 *     responses:
 *       201:
 *         description: Envío registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 destinatario:
 *                   type: string
 *                 direccion:
 *                   type: string
 *                 peso:
 *                   type: number
 *                 dimensiones:
 *                   type: string
 *                 tipoProducto:
 *                   type: string
 *                 fechaRegistro:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Error al registrar envío
 */
router.post('/registrar', envio_controller_1.registrarEnvio);
exports.default = router;
