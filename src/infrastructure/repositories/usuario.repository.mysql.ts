// src/infrastructure/repositories/usuario.repository.mysql.ts

import { pool } from '../../config/db';
import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import bcrypt from 'bcrypt';

export class UsuarioRepository implements IUsuarioRepository {
  async crearUsuario(nombre: string, email: string, password: string, rol = 'cliente') {
    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);  // Usando un salt de 10 rondas de bcrypt

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)',
      [nombre, email, hashedPassword, rol]
    );
    return result;
  }

  async obtenerUsuarioPorEmail(email: string) {
    const [rows]: any = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }
}
