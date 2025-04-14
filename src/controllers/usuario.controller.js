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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrar = registrar;
exports.login = login;
exports.perfil = perfil;
const usuarioModel_1 = require("../models/usuarioModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarioModel_2 = require("../models/usuarioModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function registrar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield (0, usuarioModel_1.crearUsuario)(nombre, email, hashedPassword);
            return res.status(201).json({ message: 'Usuario registrado correctamente' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al registrar el usuario', error });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        }
        try {
            const usuario = yield (0, usuarioModel_2.obtenerUsuarioPorEmail)(email);
            if (!usuario) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
            const passwordValido = yield bcrypt_1.default.compare(password, usuario.password);
            if (!passwordValido) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }
            const token = jsonwebtoken_1.default.sign({ id: usuario.id, nombre: usuario.nombre, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login exitoso', token });
        }
        catch (error) {
            console.error('Error en login:', error); // <--- agrega este log
            return res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    });
}
function perfil(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // req.user viene del middleware verifyToken
            if (!req.user) {
                res.status(401).json({ message: 'No autorizado' });
                return;
            }
            res.json({
                message: 'Perfil del usuario',
                usuario: req.user,
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al obtener el perfil' });
        }
    });
}
