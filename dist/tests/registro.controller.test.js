"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/config/db");
describe('POST /usuarios/registrar', () => {
    // Limpieza de base de datos antes de cada test
    beforeEach(async () => {
        await db_1.pool.query(`DELETE FROM usuarios WHERE email = 'nuevo@example.com'`);
    });
    it('debería retornar 400 si faltan campos requeridos', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/registrar')
            .send({ nombre: '', email: '', password: '' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Todos los campos son obligatorios');
    });
    it('debería registrar un nuevo usuario correctamente', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/registrar')
            .send({ nombre: 'Nuevo', email: 'nuevo@example.com', password: '123456' });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Usuario registrado correctamente');
    });
    it('debería retornar 500 si el email ya existe', async () => {
        // Primer registro
        await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/registrar')
            .send({ nombre: 'Nuevo', email: 'nuevo@example.com', password: '123456' });
        // Segundo intento con el mismo email
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/usuarios/registrar')
            .send({ nombre: 'Nuevo', email: 'nuevo@example.com', password: '123456' });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error al registrar el usuario');
        expect(res.body.error).toBeDefined();
    });
    afterAll(async () => {
        await db_1.pool.end();
    });
});
