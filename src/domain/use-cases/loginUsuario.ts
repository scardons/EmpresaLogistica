import dotenv from 'dotenv';
dotenv.config(); // Esto debe ir antes de usar process.env

import { IUsuarioRepository } from '../repositories/IUsuarioRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginUsuario {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const usuario = await this.usuarioRepository.obtenerUsuarioPorEmail(email);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return token;
  }
}
