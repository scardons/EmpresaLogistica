import { Request, Response } from 'express';
import { crearUsuario } from '../models/usuarioModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {obtenerUsuarioPorEmail} from '../models/usuarioModel'
import dotenv from 'dotenv';
import { AuthRequest } from '../middlewares/authMiddleware';
import { promises } from 'dns';

dotenv.config();


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




export async function login(req: Request, res: Response): Promise<any>{
  const { email, password} = req.body

  if (!email || !password){
    return res.status(400).json({message: 'Email y contraseña son obligatorios'})
  }

  try{
    const usuario = await obtenerUsuarioPorEmail(email)

    if (!usuario){
      return res.status(400).json({message: 'Usuario no encontrado'})
    }

    const passwordValido = await bcrypt.compare(password, usuario.password)

    if (!passwordValido){
      return res.status(400).json({message: 'Contraseña incorrecta'})
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email},
      process.env.JWT_SECRET as string, // usamos el secreto del .env
      {expiresIn: '1h'}
    )

    return res.status(200).json({message: 'Login exitoso', token})
  } catch (error){
    return res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
}




export async function perfil(req: AuthRequest, res: Response): Promise<void> {
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
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
}