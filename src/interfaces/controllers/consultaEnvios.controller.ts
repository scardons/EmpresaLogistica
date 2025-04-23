// src/controllers/consultaEnvios.controller.ts
import { Request, Response } from 'express';
import { ConsultaEnvios } from '../../domain/use-cases/consultaEnvios'; // Importa el caso de uso
import { ConsultaFiltros } from '../../domain/entities/consultaFiltros.entity'; // Importa la entidad de filtros

export const obtenerEnviosConFiltros = async (req: Request, res: Response): Promise<any> => {
  try {
    // Obtención de parámetros desde la consulta
    const { fechaInicio, fechaFin, estado, transportistaId, page = 1, pageSize = 10 } = req.query;

    // Validación de parámetros
    if (fechaInicio && isNaN(Date.parse(fechaInicio as string))) {
      return res.status(400).json({ error: 'Parámetro "fechaInicio" inválido' });
    }

    if (fechaFin && isNaN(Date.parse(fechaFin as string))) {
      return res.status(400).json({ error: 'Parámetro "fechaFin" inválido' });
    }

    if (estado && typeof estado !== 'string') {
      return res.status(400).json({ error: 'Parámetro "estado" inválido' });
    }

    if (transportistaId && isNaN(Number(transportistaId))) {
      return res.status(400).json({ error: 'Parámetro "transportistaId" inválido' });
    }

    // Creación del objeto de filtros para consulta
    const filtros: ConsultaFiltros = {
      fechaInicio: fechaInicio ? new Date(fechaInicio as string) : undefined,
      fechaFin: fechaFin ? new Date(fechaFin as string) : undefined,
      estado: estado as string, // Estado como string
      transportistaId: transportistaId ? Number(transportistaId) : undefined,
      page: Number(page), // Paginación: página actual
      pageSize: Number(pageSize), // Paginación: tamaño de página
    };

    // Creación de instancia del caso de uso
    const consultaEnvios = new ConsultaEnvios();
    // Ejecución del caso de uso para obtener envíos filtrados
    const resultado = await consultaEnvios.ejecutar(filtros);

    // Respuesta con los envíos filtrados
    res.status(200).json(resultado);
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};
