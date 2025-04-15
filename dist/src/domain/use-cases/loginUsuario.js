"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsuario = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Esto debe ir antes de usar process.env
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUsuario {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async execute(email, password) {
        const usuario = await this.usuarioRepository.obtenerUsuarioPorEmail(email);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        const passwordValido = await bcrypt_1.default.compare(password, usuario.password);
        if (!passwordValido) {
            throw new Error('Contraseña incorrecta');
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, nombre: usuario.nombre, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}
exports.LoginUsuario = LoginUsuario;
