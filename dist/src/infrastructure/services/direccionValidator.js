"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DireccionValidator = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
class DireccionValidator {
    async esDireccionValida(direccion) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${env_1.config.GOOGLE_API_KEY}`;
        console.log("URL generada:", url); // Aquí puedes ver la URL completa
        try {
            const response = await axios_1.default.get(url);
            // Loguea la respuesta completa para que puedas inspeccionarla
            console.log("Respuesta completa de Google Maps API:", response.data);
            // Verifica que la respuesta tenga estado 'OK' y que existan resultados
            return response.data.status === 'OK' && response.data.results.length > 0;
        }
        catch (error) {
            console.error("Error al llamar a la API de Google Maps:", error);
            return false;
        }
    }
}
exports.DireccionValidator = DireccionValidator;
