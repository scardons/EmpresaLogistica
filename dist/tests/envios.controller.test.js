"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/config/db");
const redisClient_1 = require("../src/shared/redisClient");
describe('POST /envios/registrar', () => {
    afterAll(async () => {
        // Cerrar la conexión de Redis si está abierta
        if (redisClient_1.redisClient.isOpen) {
            await redisClient_1.redisClient.quit();
        }
        // Cerrar la conexión de MySQL
        await db_1.pool.end();
    });
    it('debería registrar un nuevo envío y devolverlo con ID y fecha', async () => {
        const envio = {
            destinatario: 'Carlos Pérez',
            direccion: 'Carrera 15 #20-50, Bogotá',
            peso: 2.5,
            dimensiones: '30x20x10',
            tipoProducto: 'Electrónica'
        };
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/envios/registrar')
            .send(envio)
            .expect(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('fechaRegistro');
        expect(res.body.destinatario).toBe(envio.destinatario);
        expect(res.body.direccion).toBe(envio.direccion);
    });
});
