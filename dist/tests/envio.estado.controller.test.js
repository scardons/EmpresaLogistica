"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const redisClient_1 = require("../src/shared/redisClient");
const envio_repository_mysql_1 = require("../src/infrastructure/repositories/envio.repository.mysql");
jest.mock('../src/shared/redisClient');
jest.mock('../src/infrastructure/repositories/envio.repository.mysql');
describe('GET /envio/:id/estado', () => {
    afterAll(async () => {
        if (redisClient_1.redisClient.isOpen) {
            await redisClient_1.redisClient.quit();
        }
    });
    it('debería consultar la base de datos si el estado no está en caché y retornar el estado', async () => {
        const envioId = 2;
        const estadoDB = 'Entregado';
        // Mock de Redis para simular que no está en caché
        const mockRedisGet = jest.fn().mockResolvedValue(null);
        redisClient_1.redisClient.get = mockRedisGet;
        // Mock del repositorio para devolver el estado desde la base de datos
        const mockGetEstadoEnvio = jest.fn().mockResolvedValue(estadoDB);
        envio_repository_mysql_1.EnvioRepositoryMysql.prototype.getEstadoEnvio = mockGetEstadoEnvio;
        const res = await (0, supertest_1.default)(app_1.default).get(`/envio/${envioId}/estado`);
        expect(res.status).toBe(200);
        expect(res.text).toBe(estadoDB); // Verifica que el valor retornado sea directamente "Entregado"
        expect(mockRedisGet).toHaveBeenCalledWith(`envio:${envioId}:estado`); // Verifica que se llamó a Redis
        expect(mockGetEstadoEnvio).toHaveBeenCalledWith(envioId); // Verifica que se llamó al repositorio
    });
    it('debería retornar un error 404 si no se encuentra el envío en la base de datos', async () => {
        const envioId = 3;
        // Mock de Redis para simular que no está en caché
        const mockRedisGet = jest.fn().mockResolvedValue(null);
        redisClient_1.redisClient.get = mockRedisGet;
        // Mock del repositorio para simular la respuesta vacía de la base de datos
        const mockGetEstadoEnvio = jest.fn().mockResolvedValue(null);
        envio_repository_mysql_1.EnvioRepositoryMysql.prototype.getEstadoEnvio = mockGetEstadoEnvio;
        const res = await (0, supertest_1.default)(app_1.default).get(`/envio/${envioId}/estado`);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Envío no encontrado');
    });
    it('debería retornar un error 500 si ocurre un problema en la consulta', async () => {
        const envioId = 4;
        // Mock de Redis para simular que no está en caché
        const mockRedisGet = jest.fn().mockResolvedValue(null);
        redisClient_1.redisClient.get = mockRedisGet;
        // Mock del repositorio para simular un error en la base de datos
        const mockGetEstadoEnvio = jest.fn().mockRejectedValue(new Error('Error en la base de datos'));
        envio_repository_mysql_1.EnvioRepositoryMysql.prototype.getEstadoEnvio = mockGetEstadoEnvio;
        const res = await (0, supertest_1.default)(app_1.default).get(`/envio/${envioId}/estado`);
        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Error al obtener el estado del envío');
    });
});
