import { pool } from "../../config/db";
import { ResultSetHeader } from "mysql2";

export class TransportistaRepositoryMysql {
  async registrarTransportista(transportista: {
    nombre: string;
    placa: string;
    telefono: string;
  }): Promise<any> {
    const fechaRegistro = new Date().toISOString();

    const query = `
      INSERT INTO transportistas (nombre, placa, telefono, fecha_registro)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      transportista.nombre,
      transportista.placa,
      transportista.telefono,
      fechaRegistro,
    ];

    const [result] = await pool.execute<ResultSetHeader>(query, values);

    return {
      id: result.insertId,
      ...transportista,
      fecha_registro: fechaRegistro,
    };
  }

  // Añadir al repositorio TransportistaRepositoryMysql
async verificarDisponibilidadTransportista(transportistaId: number): Promise<boolean> {
    const query = `SELECT * FROM envios WHERE transportistaId = ? AND estado != 'Completado'`;
    
    // Ejecutar la consulta
    const [rows] = await pool.execute(query, [transportistaId]);
  
    // Si no hay envíos activos, el transportista está disponible
    return (rows as any[]).length === 0;
  }

  async verificarCapacidadVehiculo(transportistaId: number, pesoEnvio: number): Promise<boolean>{
    const query = `SELECT capacidad FROM transportista WHERE id = ?`
    //ejecutar la consulta
    const [rows] = await pool.execute(query, [transportistaId])
    //obtenemos la capacidad del vehiculo
    const capacidadVehiculo = (rows as any[])[0]?.capacidad
    //comprobar la capacidad del vehiculo es suficiente
    return capacidadVehiculo >= pesoEnvio
  }

  async obtenerTransportistaPorPlaca(placa: string): Promise<any>{
    const query = `SELECT * FROM transportistas WHERE placa = ?`
    const [rows] = await pool.execute(query, [placa])
    //si tiene un elemento devuelvalo primero si no devuelva null
    return (rows as any[]).length > 0 ? (rows as any[])[0] : null
  }
  
}

