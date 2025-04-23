// src/controllers/envioEstado.controller.ts

import { Request, Response } from 'express';
import { EnvioRepositoryMysql } from '../../infrastructure/repositories/envio.repository.mysql';

// Controlador para actualizar el estado de un envío
export const actualizarEstadoEnvio = async (req: Request, res: Response): Promise<any> => {
  const envioId = req.params.id;           // Obtenemos el ID del envío desde los parámetros de la ruta
  const { nuevoEstado } = req.body;        // Obtenemos el nuevo estado desde el cuerpo de la solicitud


  try {
    // Verificar que el nuevo estado sea uno válido
    const estadosValidos = ["En espera", "En tránsito", "Entregado"];
    if (!estadosValidos.includes(nuevoEstado)) {
      return res.status(400).json({ error: "Estado inválido. Los valores válidos son: 'En espera', 'En tránsito', 'Entregado'" });
    }

    // Verificar si el envío existe en la base de datos
    const envioRepository = new EnvioRepositoryMysql();
    const envioExistente = await envioRepository.obtenerEnvioPorId(Number(envioId));  // Método para obtener el envío por ID

    // Si el envío no existe, retornamos un error 404
    if (!envioExistente) {
      return res.status(404).json({ error: `Envío con ID ${envioId} no encontrado` });
    }

    // Llamar al repositorio para actualizar el estado del envío
    await envioRepository.actualizarEstadoEnvio(Number(envioId), nuevoEstado);

    // Retornar una respuesta exitosa
    return res.status(200).json({ mensaje: `Estado del envío actualizado a '${nuevoEstado}'` });

  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el estado del envío' });
  }
};
