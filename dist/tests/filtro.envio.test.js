"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('GET /api/envios/filtros - Consulta avanzada de envíos', () => {
    it('debe devolver envíos filtrados por rango de fechas, estado y transportistaId', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api/envios/filtros')
            .query({
            fechaInicio: '2023-01-01',
            fechaFin: '2024-01-01',
            estado: 'Entregado',
            transportistaId: 1
        });
        console.log('🧪 Respuesta test 1:', response.status, response.body);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.envios)).toBe(true);
    });
    it('debe devolver 200 y un arreglo vacío si no hay coincidencias', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api/envios/filtros')
            .query({
            fechaInicio: '1999-01-01',
            fechaFin: '1999-01-02',
            estado: 'Inexistente',
            transportistaId: 999
        });
        console.log('🧪 Respuesta test 2:', response.status, response.body);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.envios)).toBe(true);
        expect(response.body.envios.length).toBe(0);
    });
    it('debe manejar errores si los parámetros son inválidos', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api/envios/filtros')
            .query({
            fechaInicio: 'fecha-mala'
        });
        console.log('🧪 Respuesta test 3:', response.status, response.body);
        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.body).toHaveProperty('error');
    });
});
