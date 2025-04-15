"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarUsuario = void 0;
class RegistrarUsuario {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async execute(nombre, email, password) {
        const existe = await this.usuarioRepository.obtenerUsuarioPorEmail(email);
        if (existe) {
            throw new Error('El usuario ya existe');
        }
        return this.usuarioRepository.crearUsuario(nombre, email, password);
    }
}
exports.RegistrarUsuario = RegistrarUsuario;
