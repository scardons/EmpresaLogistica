import { Request, Response } from "express";
import { RegistrarUsuario } from "../../domain/use-cases/registrarUsuario";
import { UsuarioRepository } from "../../infrastructure/repositories/usuario.repository.mysql";

const usuarioRepository = new UsuarioRepository()
const registrarUsuarioUseCase = new RegistrarUsuario(usuarioRepository)

export async function registrar(req: Request, res: Response): Promise<void> {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
  res.status(400).json({ message: 'Todos los campos son obligatorios' });
  return 
  }
  try {
    await registrarUsuarioUseCase.execute(nombre, email, password);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
}
