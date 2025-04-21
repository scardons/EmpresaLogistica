import { Request, Response } from 'express';
import { RegistrarEnvio } from '../../domain/use-cases/registrarEnvio';
import { EnvioRepositoryMysql } from '../../infrastructure/repositories/envio.repository.mysql';
import { DireccionValidator } from '../../infrastructure/services/direccionValidator';
import { AsignarRutaUseCase } from '../../domain/use-cases/asignarRutaEnvio'; 
import { promises } from 'dns';

const envioRepository = new EnvioRepositoryMysql();
const direccionValidator = new DireccionValidator();

const registrarEnvioUseCase = new RegistrarEnvio(envioRepository, direccionValidator);

// 🔥 INSTANCIA DEL CASO DE USO PARA ASIGNAR RUTA
const asignarRutaUseCase = new AsignarRutaUseCase(envioRepository);

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
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error al registrar envío' });
  }
};

// En envio.controller.ts
export const asignarRutaHandler = async (req: Request, res: Response): Promise<any> => {
  const { envioId, rutaId, transportistaId } = req.body;

  try {
    await asignarRutaUseCase.execute(envioId, rutaId, transportistaId);
    return res.status(200).json({ mensaje: 'Ruta asignada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al asignar ruta' });
  }
};

