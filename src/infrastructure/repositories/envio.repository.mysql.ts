import { pool } from "../../config/db";
import { IEnvioRepository } from "../../domain/repositories/envio.repository";
import { ResultSetHeader } from "mysql2";

export class EnvioRepositoryMysql implements IEnvioRepository {
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

  async getEnvioById(id: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM envios WHERE id = ?", [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
  }

  async getRutaById(id: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM rutas WHERE id = ?", [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
  }

  async getTransportistaById(id: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM transportistas WHERE id = ?", [id]);
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
  }

  async asignarRuta(envioId: number, rutaId: number, transportistaId: number): Promise<void> {
    const [result] = await pool.execute<ResultSetHeader>(
      "UPDATE envios SET rutaId = ?, transportistaId = ? WHERE id = ?",
      [rutaId, transportistaId, envioId]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No se pudo actualizar el envío con ID ${envioId}`);
    }
  }
}
