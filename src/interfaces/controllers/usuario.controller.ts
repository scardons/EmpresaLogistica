//src/interface/controllers/usuario.controller.ts

import { Request, Response } from 'express';
import { LoginUsuario } from '../../domain/use-cases/loginUsuario';
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository.mysql';
import { AuthRequest } from '../../interfaces/middlewares/authMiddleware';


const usuarioRepository = new UsuarioRepository();
const loginUsuarioUseCase = new LoginUsuario(usuarioRepository);


// controlador del login

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    return 
  }

  try {
    const token = await loginUsuarioUseCase.execute(email, password);
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


// controlador del perfil

export async function perfil(req: AuthRequest, res: Response): Promise<void> {
  try {
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
