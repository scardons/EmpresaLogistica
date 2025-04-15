// src/domain/use-cases/registrarUsuario.ts
import { IUsuarioRepository } from '../repositories/IUsuarioRepository';

export class RegistrarUsuario {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(nombre: string, email: string, password: string) {
    const existe = await this.usuarioRepository.obtenerUsuarioPorEmail(email);
    if (existe) {
      throw new Error('El usuario ya existe');
    }

    return this.usuarioRepository.crearUsuario(nombre, email, password);
  }
}
