"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
// src/infrastructure/services/api.ts
const axios_1 = __importDefault(require("axios"));
exports.API = axios_1.default.create({
    baseURL: 'http://localhost:3000/usuarios', // Ajusta si tu backend corre en otro puerto o ruta base
    headers: {
        'Content-Type': 'application/json',
    },
});
