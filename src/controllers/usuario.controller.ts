import { Request, Response } from 'express';
import { crearUsuario } from '../models/usuarioModel';
import bcrypt from 'bcrypt';

export const registrar = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await crearUsuario(nombre, email, hashedPassword);
    res.status(201).json({ message: 'usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};
