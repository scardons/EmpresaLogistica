import { Request, Response } from 'express';
import { RegistrarEnvio } from '../../domain/use-cases/registrarEnvio';
import { EnvioRepositoryMysql } from '../../infrastructure/repositories/envio.repository.mysql';
import { DireccionValidator } from '../../infrastructure/services/direccionValidator';

const envioRepository = new EnvioRepositoryMysql();
const direccionValidator = new DireccionValidator();

const registrarEnvioUseCase = new RegistrarEnvio(envioRepository, direccionValidator);

export const registrarEnvio = async (req: Request, res: Response) => {
  try {
    const { destinatario, direccion, peso, dimensiones, tipoProducto } = req.body;

    const envio = await registrarEnvioUseCase.execute({
      destinatario,
      direccion,
      peso,
      dimensiones,
      tipoProducto,
    });

    res.status(201).json(envio);
  } catch (error: any) { // Especificamos que el error puede ser de cualquier tipo
    res.status(400).json({ message: error.message || 'Error al registrar envío' });
  }
};
