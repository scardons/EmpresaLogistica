"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/config/db");
describe('POST /usuarios/login', () => {
    beforeAll(async () => {
        // Eliminar si ya existe para evitar duplicados
        await db_1.pool.query(`DELETE FROM usuarios WHERE email = 'santiago@example.com'`);
        // Crear el usuario necesario para las pruebas
        await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/registrar')
            .send({ nombre: 'Santiago', email: 'santiago@example.com', password: '123456' });
    });
    it('debería retornar 400 si faltan email o contraseña', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login')
            .send({ email: '', password: '' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email y contraseña son obligatorios');
    });
    it('debería retornar 400 si el usuario no existe', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login')
            .send({ email: 'notfound@example.com', password: '123456' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Usuario no encontrado');
    });
    it('debería retornar 400 si la contraseña es incorrecta', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login')
            .send({ email: 'santiago@example.com', password: 'wrongpassword' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Contraseña incorrecta');
    });
    it('debería retornar 200 y un token si el login es exitoso', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login')
            .send({ email: 'santiago@example.com', password: '123456' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login exitoso');
        expect(response.body.token).toBeDefined();
    });
    afterAll(async () => {
        await db_1.pool.query(`DELETE FROM usuarios WHERE email = 'santiago@example.com'`);
        await db_1.pool.end();
    });
});
