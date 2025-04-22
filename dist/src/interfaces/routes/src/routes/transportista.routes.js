"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transportista_controller_1 = require("../../../controllers/transportista.controller");
const router = (0, express_1.Router)();
router.post("/", transportista_controller_1.crearTransportista);
exports.default = router;
