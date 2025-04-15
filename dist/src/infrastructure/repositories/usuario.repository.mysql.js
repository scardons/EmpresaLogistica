"use strict";
// src/infrastructure/repositories/usuario.repository.mysql.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsuarioRepository {
    async crearUsuario(nombre, email, password, rol = 'cliente') {
        // Encriptar la contraseña antes de guardar
        const hashedPassword = await bcrypt_1.default.hash(password, 10); // Usando un salt de 10 rondas de bcrypt
        const [result] = await db_1.pool.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)', [nombre, email, hashedPassword, rol]);
        return result;
    }
    async obtenerUsuarioPorEmail(email) {
        const [rows] = await db_1.pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }
}
exports.UsuarioRepository = UsuarioRepository;
