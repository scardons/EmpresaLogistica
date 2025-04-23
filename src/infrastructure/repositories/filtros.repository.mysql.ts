// src/infrastructure/repositories/filtros.repository.mysql.ts
import { pool } from "../../config/db";
import { Envio } from '../../domain/entities/envio.entity';
import { RowDataPacket } from 'mysql2';

export class FiltrosRepositoryMysql {
  // Método para obtener envíos con filtros avanzados
  async obtenerEnviosConFiltros(
    fechaInicio?: Date,
    fechaFin?: Date,
    estado?: string,
    transportistaId?: number,  // Cambié transportista por transportistaId
    page: number = 1,
    pageSize: number = 10
  ): Promise<Envio[]> {
    let query = 'SELECT * FROM envios WHERE 1=1';
    const params: any[] = [];

    if (fechaInicio) {
      query += ' AND fechaRegistro >= ?';
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += ' AND fechaRegistro <= ?';
      params.push(fechaFin);
    }
    if (estado) {
      query += ' AND estado = ?';
      params.push(estado);
    }
    if (transportistaId) {
      query += ' AND transportistaId = ?';  // Cambié transportista por transportistaId
      params.push(transportistaId);  // Cambié transportista por transportistaId
    }

    query += ' LIMIT ?, ?';
    params.push((page - 1) * pageSize);
    params.push(pageSize);

    const [rows] = await pool.execute(query, params);
    return rows as Envio[];
  }

  // Método para obtener la cantidad de envíos según los filtros
  async contarEnviosConFiltros(
    fechaInicio?: Date,
    fechaFin?: Date,
    estado?: string,
    transportistaId?: number  // Cambié transportista por transportistaId
  ): Promise<number> {
    let query = 'SELECT COUNT(*) as total FROM envios WHERE 1=1';
    const params: any[] = [];

    if (fechaInicio) {
      query += ' AND fechaRegistro >= ?';
      params.push(fechaInicio);
    }
    if (fechaFin) {
      query += ' AND fechaRegistro <= ?';
      params.push(fechaFin);
    }
    if (estado) {
      query += ' AND estado = ?';
      params.push(estado);
    }
    if (transportistaId) {
      query += ' AND transportistaId = ?';  // Cambié transportista por transportistaId
      params.push(transportistaId);  // Cambié transportista por transportistaId
    }

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);
    return rows.length > 0 ? (rows[0] as any).total : 0;
  }
  
}
