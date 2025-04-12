import { Request, Response } from 'express';
import { crearUsuario } from '../models/usuarioModel';
import bcrypt from 'bcrypt';

export async function registrar(req: Request, res: Response): Promise<any> {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await crearUsuario(nombre, email, hashedPassword);

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
}
