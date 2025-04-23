import { pool } from "../../config/db";
import { IEnvioRepository } from "../../domain/repositories/envio.repository";
import { ResultSetHeader } from "mysql2";
import { redisClient } from '../../shared/redisClient'; 
import { Envio } from "../../domain/entities/envio.entity";

export class EnvioRepositoryMysql implements IEnvioRepository {
  // Método para registrar un envío
  async registrar(envio: any): Promise<any> {
    if (envio.dimensiones && typeof envio.dimensiones === "object") {
      envio.dimensiones = JSON.stringify(envio.dimensiones);
    }

    if (!envio.fechaRegistro) {
      envio.fechaRegistro = new Date().toISOString();
    }

    if (!envio.destinatario || !envio.direccion) {
      throw new Error("Faltan datos requeridos: destinatario o direccion");
    }

    const query = `
      INSERT INTO envios 
      (destinatario, direccion, dimensiones, fechaRegistro, estado, peso, rutaId, transportistaId, tipoProducto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      envio.destinatario,
      envio.direccion,
      envio.dimensiones,
      envio.fechaRegistro,
      envio.estado || "En espera",
      envio.peso || 0,
      envio.rutaId || null,
      envio.transportistaId || null,
      envio.tipoProducto || null,
    ];

    const [result] = await pool.execute<ResultSetHeader>(query, values);

    const envioInsertado = {
      id: result.insertId,
      ...envio,
    };

    return envioInsertado;
  }

  // Método para obtener un envío por ID
  async getEnvioById(id: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM envios WHERE id = ?", [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
  }

  // Método para obtener el estado de un envío, con cache en Redis
  async getEstadoEnvio(envioId: number): Promise<string | null> {
    // Primero, intentamos obtener el estado desde Redis
    const estadoCache = await redisClient.get(`envio:${envioId}:estado`);
    if (estadoCache) {
      console.log('Estado encontrado en caché:', estadoCache);
      return estadoCache;
    }

    // Si no está en caché, obtenemos el estado desde la base de datos
    const result = await pool.query('SELECT estado FROM envios WHERE id = ?', [envioId]);
    const rows = result[0] as any[]; // o como tipo específico si tienes uno
        console.log('Resultado de la consulta:', rows);

    if (rows && rows.length > 0) {
      const estado = rows[0].estado;
      return estado;
    }
    return null; // Si no se encuentra el envío
  }

  // Método para obtener ruta por ID
  async getRutaById(id: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM rutas WHERE id = ?", [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
  }

  // Método para obtener transportista por ID
  async getTransportistaById(id: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM transportistas WHERE id = ?", [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
  }

  // Método para asignar una ruta a un envío
  async asignarRuta(envioId: number, rutaId: number, transportistaId: number): Promise<void> {
    const [result] = await pool.execute<ResultSetHeader>(
      "UPDATE envios SET rutaId = ?, transportistaId = ? WHERE id = ?",
      [rutaId, transportistaId, envioId]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No se pudo actualizar el envío con ID ${envioId}`);
    }
  }


  // Método para obtener un envío por ID
  async obtenerEnvioPorId(envioId: number): Promise<Envio | undefined> {
    const [rows] = await pool.execute<any[]>("SELECT * FROM envios WHERE id = ?", [envioId]);

    // Verifica si no se encuentra el resultado
    if (rows.length === 0) {
      return undefined;  // Si no existe el envío, retornamos 'undefined'
    }

    return rows[0]; // Retorna el primer resultado, que es un envío
  }

  
  // Método para actualizar el estado de un envío
  async actualizarEstadoEnvio(envioId: number, nuevoEstado: string): Promise<any> {
    const [result] = await pool.execute<ResultSetHeader>(
      "UPDATE envios SET estado = ? WHERE id = ?",
      [nuevoEstado, envioId]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No se pudo actualizar el estado del envío con ID ${envioId}`);
    }
  }

}
