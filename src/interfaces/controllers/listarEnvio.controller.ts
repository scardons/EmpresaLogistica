// src/controllers/listarEnvio.controller.ts

import { Request, Response } from 'express';
import { EnvioRepositoryMysql } from '../../infrastructure/repositories/EnvioRepositoryMysql';
import { ListarEstadosEnvios } from '../../domain/use-cases/ListarEstadosEnvios';

// Instancia del repositorio y caso de uso
const envioRepository = new EnvioRepositoryMysql();
const listarEstadosEnviosUseCase = new ListarEstadosEnvios(envioRepository);

export class ListarEnvioController {
  static async listarEstados(req: Request, res: Response): Promise<void> {
    try {
      const envios = await listarEstadosEnviosUseCase.execute();
      res.json(envios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al listar envíos' });
    }
  }  
}
