"use strict";
//src/interface/controllers/usuario.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrar = registrar;
exports.login = login;
exports.perfil = perfil;
const registrarUsuario_1 = require("../../domain/use-cases/registrarUsuario");
const loginUsuario_1 = require("../../domain/use-cases/loginUsuario");
const usuario_repository_mysql_1 = require("../../infrastructure/repositories/usuario.repository.mysql");
const usuarioRepository = new usuario_repository_mysql_1.UsuarioRepository();
const registrarUsuarioUseCase = new registrarUsuario_1.RegistrarUsuario(usuarioRepository);
const loginUsuarioUseCase = new loginUsuario_1.LoginUsuario(usuarioRepository);
async function registrar(req, res) {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        await registrarUsuarioUseCase.execute(nombre, email, password);
        return res.status(201).json({ message: 'Usuario registrado correctamente' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
}
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }
    try {
        const token = await loginUsuarioUseCase.execute(email, password);
        return res.status(200).json({ message: 'Login exitoso', token });
    }
    catch (error) {
        // console.error('Error al loguearse:', error.message);  // Para ver el mensaje de error
        return res.status(400).json({ message: error.message });
    }
}
async function perfil(req, res) {
    try {
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
}
