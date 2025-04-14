"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuario = crearUsuario;
exports.obtenerUsuarioPorEmail = obtenerUsuarioPorEmail;
const db_1 = require("../config/db");
function crearUsuario(nombre_1, email_1, password_1) {
    return __awaiter(this, arguments, void 0, function* (nombre, email, password, rol = 'cliente') {
        const [result] = yield db_1.pool.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)', [nombre, email, password, rol]);
        return result;
    });
}
// export async function obtenerUsuarioPorEmail(email: string): Promise<any>{
//     const[rows]: any = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
//     return rows[0]
// }
function obtenerUsuarioPorEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield db_1.pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    });
}
