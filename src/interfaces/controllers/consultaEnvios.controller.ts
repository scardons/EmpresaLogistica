// src/controllers/consultaEnvios.controller.ts
import { Request, Response } from 'express';
import { ConsultaEnvios } from '../../domain/use-cases/consultaEnvios'; // Importa el caso de uso
import { ConsultaFiltros } from '../../domain/entities/consultaFiltros.entity'; // Importa la entidad de filtros

export const obtenerEnviosConFiltros = async (req: Request, res: Response): Promise<any> => {
  console.log("Recibiendo solicitud en /api/envios/filtros");  // Log aquí
  try {
    console.log('✅ [GET /envios/filtros] Endpoint alcanzado');

    // Obtención de parámetros desde la consulta
    const { fechaInicio, fechaFin, estado, transportistaId, page = 1, pageSize = 10 } = req.query;

    console.log('🧩 Parámetros recibidos:', { fechaInicio, fechaFin, estado, transportistaId, page, pageSize });

    // Creación del objeto de filtros para consulta
    const filtros: ConsultaFiltros = {
      fechaInicio: fechaInicio ? new Date(fechaInicio as string) : undefined,
      fechaFin: fechaFin ? new Date(fechaFin as string) : undefined,
      estado: estado as string, // Estado como string
      transportistaId: transportistaId ? Number(transportistaId) : undefined,
      page: Number(page), // Paginación: página actual
      pageSize: Number(pageSize), // Paginación: tamaño de página
    };

    console.log('📦 Filtros formateados:', filtros);

    // Creación de instancia del caso de uso
    const consultaEnvios = new ConsultaEnvios();
    // Ejecución del caso de uso para obtener envíos filtrados
    const resultado = await consultaEnvios.ejecutar(filtros);

    console.log('📤 Resultado de consulta:', resultado);

    // Respuesta con los envíos filtrados
    res.status(200).json(resultado);
  } catch (error: unknown) {
    console.error('❌ Error al obtener los envíos con filtros:', error);

    // Manejo de errores
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};
