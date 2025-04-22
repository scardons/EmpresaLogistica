"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // Ajusta la ruta si es necesario
const db_1 = require("../src/config/db"); // conexión a la base de datos
describe("POST /api/transportistas", () => {
    it("debería registrar un nuevo transportista con éxito", async () => {
        // Usamos Date.now() para hacer que la placa sea única
        const uniquePlaca = `ABC234-${Date.now()}`;
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/transportistas")
            .send({
            nombre: "Juan Pérez",
            placa: uniquePlaca,
            telefono: "1234567890",
            capacidad: 10000, // Capacidad añadida
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nombre).toBe("Juan Pérez");
        expect(response.body.placa).toBe(uniquePlaca); // Verificamos que la placa es única
        expect(response.body.telefono).toBe("1234567890");
        expect(response.body.capacidad).toBe(10000);
        expect(response.body.fecha_registro).toBeDefined();
    });
    it("debería devolver un error si faltan campos obligatorios", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/transportistas")
            .send({
            nombre: "Juan Pérez",
            placa: "ABC333",
            telefono: "1234567890",
            // Faltando capacidad
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Faltan campos obligatorios");
    });
    it("debería devolver un error si la capacidad es inválida", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/transportistas")
            .send({
            nombre: "Juan Pérez",
            placa: "ABC163",
            telefono: "1234567890",
            capacidad: -100, // Capacidad negativa
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("La capacidad debe ser mayor a 0");
    });
    afterAll(async () => {
        await db_1.pool.end(); // Cierra la conexión a la base de datos
    });
});
