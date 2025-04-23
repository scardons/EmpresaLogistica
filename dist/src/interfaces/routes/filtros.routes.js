"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/interfaces/routes/filtros.routes.ts
const express_1 = require("express");
const consultaEnvios_controller_1 = require("../controllers/consultaEnvios.controller");
const router = (0, express_1.Router)();
// Ruta para la consulta avanzada de envíos con filtros
router.get('/filtros', consultaEnvios_controller_1.obtenerEnviosConFiltros);
exports.default = router;
