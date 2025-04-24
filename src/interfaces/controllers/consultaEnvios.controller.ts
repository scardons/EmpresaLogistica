// src/controllers/consultaEnvios.controller.ts
import { Request, Response } from 'express';
import { ConsultaEnvios } from '../../domain/use-cases/consultaEnvios';
import { ConsultaMetricasDesempeno } from '../../domain/use-cases/consultaMetricasDesempeno';
import { ConsultaFiltros } from '../../domain/entities/consultaFiltros.entity';

export const obtenerEnviosConFiltros = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fechaInicio, fechaFin, estado, transportistaId, page = 1, pageSize = 10 } = req.query;

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

    const filtros: ConsultaFiltros = {
      fechaInicio: fechaInicio ? new Date(fechaInicio as string) : undefined,
      fechaFin: fechaFin ? new Date(fechaFin as string) : undefined,
      estado: estado as string,
      transportistaId: transportistaId ? Number(transportistaId) : undefined,
      page: Number(page),
      pageSize: Number(pageSize),
    };

    const consultaEnvios = new ConsultaEnvios();
    const consultaMetricas = new ConsultaMetricasDesempeno();

    // Ejecutar ambos casos de uso en paralelo
    const [enviosResultado, metricas] = await Promise.all([
      consultaEnvios.ejecutar(filtros),
      consultaMetricas.ejecutar({
        fechaInicio: filtros.fechaInicio,
        fechaFin: filtros.fechaFin,
      }),
    ]);

    res.status(200).json({
      ...enviosResultado,
      metricas,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};
