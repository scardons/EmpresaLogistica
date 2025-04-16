import { Request, Response } from 'express';
import { RegistrarUsuario } from '../../domain/use-cases/registrarUsuario';
import { LoginUsuario } from '../../domain/use-cases/loginUsuario';
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository.mysql';
import { AuthRequest } from '../../interfaces/middlewares/authMiddleware';


const usuarioRepository = new UsuarioRepository();

const registrarUsuarioUseCase = new RegistrarUsuario(usuarioRepository);
const loginUsuarioUseCase = new LoginUsuario(usuarioRepository);

export async function registrar(req: Request, res: Response): Promise<any> {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    await registrarUsuarioUseCase.execute(nombre, email, password);
    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
}


export async function login(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  try {
    const token = await loginUsuarioUseCase.execute(email, password);
    return res.status(200).json({ message: 'Login exitoso', token });
  } catch (error: any) {
    // console.error('Error al loguearse:', error.message);  // Para ver el mensaje de error
    return res.status(400).json({ message: error.message });
  }
}




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
