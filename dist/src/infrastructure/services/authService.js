"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerPerfil = exports.loginUsuario = exports.registrarUsuario = void 0;
// src/infrastructure/services/authService.ts
const api_1 = require("../../../frontend/src/services/api");
const registrarUsuario = async (datos) => {
    return api_1.API.post('/registrar', datos);
};
exports.registrarUsuario = registrarUsuario;
const loginUsuario = async (credenciales) => {
    return api_1.API.post('/login', credenciales);
};
exports.loginUsuario = loginUsuario;
const obtenerPerfil = async (token) => {
    return api_1.API.get('/perfil', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
exports.obtenerPerfil = obtenerPerfil;
