"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioRepositoryMysql = void 0;
const db_1 = require("../../config/db");
const redisClient_1 = require("../../shared/redisClient");
class EnvioRepositoryMysql {
    // Método para registrar un envío
    async registrar(envio) {
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
        const [result] = await db_1.pool.execute(query, values);
        const envioInsertado = {
            id: result.insertId,
            ...envio,
        };
        return envioInsertado;
    }
    // Método para obtener un envío por ID
    async getEnvioById(id) {
        const [rows] = await db_1.pool.execute("SELECT * FROM envios WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    // Método para obtener el estado de un envío, con cache en Redis
    async getEstadoEnvio(envioId) {
        // Primero, intentamos obtener el estado desde Redis
        const estadoCache = await redisClient_1.redisClient.get(`envio:${envioId}:estado`);
        if (estadoCache) {
            console.log('Estado encontrado en caché:', estadoCache);
            return estadoCache;
        }
        // Si no está en caché, obtenemos el estado desde la base de datos
        const result = await db_1.pool.query('SELECT estado FROM envios WHERE id = ?', [envioId]);
        const rows = result[0]; // o como tipo específico si tienes uno
        console.log('Resultado de la consulta:', rows);
        if (rows && rows.length > 0) {
            const estado = rows[0].estado;
            return estado;
        }
        return null; // Si no se encuentra el envío
    }
    // Método para obtener ruta por ID
    async getRutaById(id) {
        const [rows] = await db_1.pool.execute("SELECT * FROM rutas WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    // Método para obtener transportista por ID
    async getTransportistaById(id) {
        const [rows] = await db_1.pool.execute("SELECT * FROM transportistas WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    // Método para asignar una ruta a un envío
    async asignarRuta(envioId, rutaId, transportistaId) {
        const [result] = await db_1.pool.execute("UPDATE envios SET rutaId = ?, transportistaId = ? WHERE id = ?", [rutaId, transportistaId, envioId]);
        if (result.affectedRows === 0) {
            throw new Error(`No se pudo actualizar el envío con ID ${envioId}`);
        }
    }
    // Método para obtener un envío por ID
    async obtenerEnvioPorId(envioId) {
        const [rows] = await db_1.pool.execute("SELECT * FROM envios WHERE id = ?", [envioId]);
        // Verifica si no se encuentra el resultado
        if (rows.length === 0) {
            return undefined; // Si no existe el envío, retornamos 'undefined'
        }
        return rows[0]; // Retorna el primer resultado, que es un envío
    }
    // Método para actualizar el estado de un envío
    async actualizarEstadoEnvio(envioId, nuevoEstado) {
        const [result] = await db_1.pool.execute("UPDATE envios SET estado = ? WHERE id = ?", [nuevoEstado, envioId]);
        if (result.affectedRows === 0) {
            throw new Error(`No se pudo actualizar el estado del envío con ID ${envioId}`);
        }
    }
}
exports.EnvioRepositoryMysql = EnvioRepositoryMysql;
