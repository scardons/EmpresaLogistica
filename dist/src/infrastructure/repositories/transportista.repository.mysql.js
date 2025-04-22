"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportistaRepositoryMysql = void 0;
const db_1 = require("../../config/db");
class TransportistaRepositoryMysql {
    async registrarTransportista(transportista) {
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
        const [result] = await db_1.pool.execute(query, values);
        return {
            id: result.insertId,
            ...transportista,
            fecha_registro: fechaRegistro,
        };
    }
    // Añadir al repositorio TransportistaRepositoryMysql
    async verificarDisponibilidadTransportista(transportistaId) {
        const query = `SELECT * FROM envios WHERE transportistaId = ? AND estado != 'Completado'`;
        // Ejecutar la consulta
        const [rows] = await db_1.pool.execute(query, [transportistaId]);
        // Si no hay envíos activos, el transportista está disponible
        return rows.length === 0;
    }
    async verificarCapacidadVehiculo(transportistaId, pesoEnvio) {
        const query = `SELECT capacidad FROM transportista WHERE id = ?`;
        //ejecutar la consulta
        const [rows] = await db_1.pool.execute(query, [transportistaId]);
        //obtenemos la capacidad del vehiculo
        const capacidadVehiculo = rows[0]?.capacidad;
        //comprobar la capacidad del vehiculo es suficiente
        return capacidadVehiculo >= pesoEnvio;
    }
    async obtenerTransportistaPorPlaca(placa) {
        const query = `SELECT * FROM transportistas WHERE placa = ?`;
        const [rows] = await db_1.pool.execute(query, [placa]);
        //si tiene un elemento devuelvalo primero si no devuelva null
        return rows.length > 0 ? rows[0] : null;
    }
}
exports.TransportistaRepositoryMysql = TransportistaRepositoryMysql;
