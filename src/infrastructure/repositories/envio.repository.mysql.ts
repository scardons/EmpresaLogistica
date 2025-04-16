import { IEnvioRepository } from "../../domain/repositories/envio.repository";
import { Envio } from "../../domain/entities/envio.entity";
import { pool } from "../../config/db";

export class EnvioRepositoryMysql implements IEnvioRepository {
    async registrar(envio: Envio): Promise<Envio> {
      const [result]: any = await pool.query(
        `INSERT INTO envios (destinatario, direccion, peso, dimensiones, tipoProducto, fechaRegistro)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          envio.destinatario,
          envio.direccion,
          envio.peso,
          envio.dimensiones,
          envio.tipoProducto,
          envio.fechaRegistro,
        ]
      );
  
      return {
        ...envio,
        id: result.insertId,
      };
    }
  }