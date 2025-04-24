// src/infrastructure/repositories/filtros.repository.mysql.ts
import { pool } from "../../config/db";
import { Envio } from "../../domain/entities/envio.entity";
import { RowDataPacket } from "mysql2";
import { MetricasDesempeno } from "../../domain/entities/consultaFiltros.entity";

// Función para calcular el tiempo de entrega en horas
function calcularTiempoEntrega(fechaRegistro: Date, fechaEntrega: Date): number {
  const milisegundos = fechaEntrega.getTime() - fechaRegistro.getTime();
  const horas = milisegundos / (1000 * 60 * 60);
  return Math.round(horas * 100) / 100; // Redondea a 2 decimales
}

export class FiltrosRepositoryMysql {
  // Método para obtener los envíos con filtros
  async obtenerEnviosConFiltros(
    fechaInicio?: Date,
    fechaFin?: Date,
    estado?: string,
    transportistaId?: number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Envio[]> {
    let query = "SELECT * FROM envios WHERE 1=1";
    const params: any[] = [];

    if (fechaInicio) {
      query += " AND fechaRegistro >= ?";
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += " AND fechaRegistro <= ?";
      params.push(fechaFin);
    }
    if (estado) {
      query += " AND estado = ?";
      params.push(estado);
    }
    if (transportistaId) {
      query += " AND transportistaId = ?";
      params.push(transportistaId);
    }

    query += " LIMIT ?, ?";
    params.push((page - 1) * pageSize);
    params.push(pageSize);

    const [rows] = await pool.execute(query, params);
    return rows as Envio[];
  }

  // Método para contar los envíos con filtros
  async contarEnviosConFiltros(
    fechaInicio?: Date,
    fechaFin?: Date,
    estado?: string,
    transportistaId?: number
  ): Promise<number> {
    let query = "SELECT COUNT(*) as total FROM envios WHERE 1=1";
    const params: any[] = [];

    if (fechaInicio) {
      query += " AND fechaRegistro >= ?";
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += " AND fechaRegistro <= ?";
      params.push(fechaFin);
    }
    if (estado) {
      query += " AND estado = ?";
      params.push(estado);
    }
    if (transportistaId) {
      query += " AND transportistaId = ?";
      params.push(transportistaId);
    }

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);
    return rows.length > 0 ? (rows[0] as any).total : 0;
  }

  // Método para obtener las métricas de desempeño
  async obtenerMetricasDesempeno(filtros: {
    fechaInicio?: Date;
    fechaFin?: Date;
  }): Promise<MetricasDesempeno> {
    const { fechaInicio, fechaFin } = filtros;

    let query = `
      SELECT 
        transportistaId,
        COUNT(*) AS totalEntregados,
        AVG(TIMESTAMPDIFF(HOUR, fechaRegistro, NOW())) AS promedioHoras
      FROM envios
      WHERE estado = 'Entregado'
    `;
    const params: any[] = [];

    if (fechaInicio) {
      query += " AND fechaRegistro >= ?";
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += " AND fechaRegistro <= ?";
      params.push(fechaFin);
    }

    query += " GROUP BY transportistaId";

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);

    // Mapeamos los resultados para obtener el tiempo promedio de entrega por transportista
    const tiempoPromedioEntregaPorTransportista = rows.map((row: any) => ({
      transportistaId: row.transportistaId,
      promedioHoras: row.promedioHoras,
    }));

    // Calculamos el total de entregados
    const totalEntregados = rows.reduce((acc: number, row: any) => acc + row.totalEntregados, 0);

    // Obtenemos los envíos con los filtros aplicados
    const envios = await this.obtenerEnviosConFiltros(fechaInicio, fechaFin);

    // Ahora agregamos el tiempo de entrega para cada envío
    envios.forEach((envio) => {
      if (envio.fechaEntrega) {
        envio.tiempoEntrega = calcularTiempoEntrega(envio.fechaRegistro, envio.fechaEntrega);
      } else {
        envio.tiempoEntrega = null; // Si no tiene fecha de entrega, dejamos como null
      }
    });

    return {
      tiempoPromedioEntregaPorTransportista,
      totalEntregados,
      envios,  // Añadimos los envíos a las métricas
    };
  }
}
