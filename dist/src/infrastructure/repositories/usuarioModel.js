"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuario = crearUsuario;
exports.obtenerUsuarioPorEmail = obtenerUsuarioPorEmail;
const db_1 = require("../config/db");
async function crearUsuario(nombre, email, password, rol = 'cliente') {
    const [result] = await db_1.pool.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)', [nombre, email, password, rol]);
    return result;
}
async function obtenerUsuarioPorEmail(email) {
    const [rows] = await db_1.pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
}
