import { Request, Response } from 'express';
import { EnvioRepositoryMysql } from '../../infrastructure/repositories/envio.repository.mysql';
import { RegistrarEnvio } from '../../domain/use-cases/registrarEnvio';
import { AsignarRutaUseCase } from '../../domain/use-cases/asignarRutaEnvio';
import { DireccionValidator } from '../../infrastructure/services/direccionValidator';



const envioRepository = new EnvioRepositoryMysql();
const direccionValidator = new DireccionValidator();

// Casos de uso
const registrarEnvioUseCase = new RegistrarEnvio(envioRepository, direccionValidator);
const asignarRutaUseCase = new AsignarRutaUseCase(envioRepository);

// Controlador para registrar envío
export const registrarEnvio = async (req: Request, res: Response) => {
  try {
    const { destinatario, direccion, peso, dimensiones, tipoProducto, transportista, fechaEntrega } = req.body;

    const envio = await registrarEnvioUseCase.execute({
      destinatario,
      direccion,
      peso,
      dimensiones,
      tipoProducto,
      transportista,
      fechaEntrega,
      rutaId: 0
    });

    res.status(201).json(envio);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error al registrar envío' });
  }
};

// Controlador para asignar ruta
export const asignarRutaHandler = async (req: Request, res: Response): Promise<any> => {
  const { envioId, rutaId, transportistaId } = req.body;

  try {
    await asignarRutaUseCase.execute(envioId, rutaId, transportistaId);
    return res.status(200).json({ mensaje: 'Ruta asignada correctamente' });
  } catch (error: any) {
    console.error("Error al asignar ruta:", error);
    return res.status(500).json({
      error: 'Error al asignar ruta',
      details: error.message || 'Error desconocido'
    });
  }
};


