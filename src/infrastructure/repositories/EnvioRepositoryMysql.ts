import { IEnvioRepository } from '../../domain/repositories/IEnvioRepository';
import { Envio } from '../../domain/entities/envio.entity';
import { pool } from '../../config/db'; // tu conexión mysql

export class EnvioRepositoryMysql implements IEnvioRepository {
  async listarEstados(): Promise<Envio[]> {
    const [rows] = await pool.query<any[]>(`
      SELECT 
        id, 
        destinatario, 
        direccion, 
        peso, 
        dimensiones, 
        tipoProducto, 
        fechaRegistro, 
        fechaEntrega, 
        estado, 
        rutaId, 
        transportistaId 
      FROM envios
    `);

    const envios: Envio[] = rows.map((row) => ({
      id: row.id,
      destinatario: row.destinatario,
      direccion: row.direccion,
      peso: row.peso,
      dimensiones: row.dimensiones,
      tipoProducto: row.tipoProducto,
      fechaRegistro: row.fechaRegistro,
      fechaEntrega: row.fechaEntrega,
      estado: row.estado,
      rutaId: row.rutaId,
      transportista: row.transportistaId 
        ? `Transportista ${row.transportistaId}`
        : 'Sin asignar',
    }));

    return envios;
  }
}
