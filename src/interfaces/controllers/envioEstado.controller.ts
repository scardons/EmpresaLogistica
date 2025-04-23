import { Request, Response } from 'express';
import { redisClient } from '../../shared/redisClient';
import { EnvioRepositoryMysql } from '../../infrastructure/repositories/envio.repository.mysql';

export const getEstadoEnvio = async (req: Request, res: Response): Promise<any> => {
  const envioId = req.params.id;

  try {
    // Primero intentar obtener el estado del envío desde Redis
    const estadoRedis = await redisClient.get(`envio:${envioId}:estado`);
    if (estadoRedis) {
      return res.status(200).send(estadoRedis);  // Si está en caché, devolverlo directamente
    }

    // Si no está en Redis, obtenerlo de la base de datos
    const envioRepository = new EnvioRepositoryMysql();
    const estado = await envioRepository.getEstadoEnvio(Number(envioId));

    if (estado) {
      // Guardar el estado en Redis para futuras consultas
      await redisClient.set(`envio:${envioId}:estado`, estado);

      return res.status(200).send(estado);  // Retornar el estado
    }

    return res.status(404).json({ message: 'Envío no encontrado' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el estado del envío' });
  }
};



