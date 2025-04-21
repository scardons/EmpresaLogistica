"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DireccionValidator = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const redisClient_1 = require("../../shared/redisClient");
class DireccionValidator {
    async esDireccionValida(direccion) {
        const cacheKey = `direccion:${direccion.toLowerCase()}`;
        try {
            await (0, redisClient_1.ensureRedisConnection)(); // <--- asegúrate aquí también
            const cached = await redisClient_1.redisClient.get(cacheKey);
            if (cached !== null) {
                return cached === 'true';
            }
            // 2. Consultar la API de Google si no está en caché
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${env_1.config.GOOGLE_API_KEY}`;
            const response = await axios_1.default.get(url);
            const esValida = response.data.status === 'OK' && response.data.results.length > 0;
            // 3. Guardar el resultado en Redis por 24h
            await redisClient_1.redisClient.set(cacheKey, esValida.toString(), { EX: 86400 });
            return esValida;
        }
        catch (error) {
            console.error("❌ Error al validar la dirección:", error);
            return false;
        }
    }
}
exports.DireccionValidator = DireccionValidator;
