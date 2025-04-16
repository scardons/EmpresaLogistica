"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
// Cargar las variables de entorno
(0, dotenv_1.config)();
exports.config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};
