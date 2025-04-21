// src/infrastructure/repositories/envio.repository.mysql.ts
import { pool } from "../../config/db"; // Importa el pool de conexiones
import { IEnvioRepository } from "../../domain/repositories/envio.repository";
import { ResultSetHeader } from 'mysql2'; // Asegúrate de importar este tipo


export class EnvioRepositoryMysql implements IEnvioRepository {
  // Implementación del método registrar
  async registrar(envio: any): Promise<any> {
    const [result] = await pool.execute('INSERT INTO envios SET ?', [envio]);
    return result; // Devuelve el resultado de la inserción (por ejemplo, el ID insertado)
  }

  // Implementación de getEnvioById
  async getEnvioById(id: number): Promise<any> {
    const [rows] = await pool.execute('SELECT * FROM envios WHERE id = ?', [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null; // Asegúrate de tratar `rows` como un array
  }

  // Implementación de getRutaById
  async getRutaById(id: number): Promise<any> {
    const [rows] = await pool.execute('SELECT * FROM rutas WHERE id = ?', [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null; // Asegúrate de tratar `rows` como un array
  }

  // Implementación de getTransportistaById
  async getTransportistaById(id: number): Promise<any> {
    const [rows] = await pool.execute('SELECT * FROM transportistas WHERE id = ?', [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null; // Asegúrate de tratar `rows` como un array
  }

  async asignarRuta(envioId: number, rutaId: number, transportistaId: number): Promise<void> {
    const [result] = await pool.execute<ResultSetHeader>('UPDATE envios SET rutaId = ?, transportistaId = ? WHERE id = ?', [rutaId, transportistaId, envioId]);
  
    if (result.affectedRows === 0) {
      throw new Error(`No se pudo actualizar el envío con ID ${envioId}`);
    }
  }
}
