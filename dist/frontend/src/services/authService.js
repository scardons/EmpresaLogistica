"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerPerfil = exports.loginUsuario = exports.registrarUsuario = void 0;
// src/services/authServices.ts
const api_1 = require("./api");
const axios_1 = __importDefault(require("axios"));
const registrarUsuario = async (data) => {
    const response = await axios_1.default.post('http://localhost:3000/usuarios/register', data);
    return response.data;
};
exports.registrarUsuario = registrarUsuario;
const loginUsuario = async (credenciales) => {
    const res = await api_1.API.post('/login', credenciales);
    return res.data;
};
exports.loginUsuario = loginUsuario;
const obtenerPerfil = async (token) => {
    const res = await api_1.API.get('/perfil', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
exports.obtenerPerfil = obtenerPerfil;
