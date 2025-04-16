"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("./interfaces/routes/usuario.routes"));
const redisClient_1 = __importDefault(require("./shared/redisClient"));
const db_1 = require("./config/db");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const envio_routes_1 = __importDefault(require("./interfaces/routes/envio.routes"));
const app = (0, express_1.default)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use(express_1.default.json());
app.use('/usuarios', usuario_routes_1.default);
app.use('/envios', envio_routes_1.default);
// Ruta para verificar conexión a MySQL
app.get('/', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT 1+1 AS resultado');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error en la conexión BD' });
    }
});
// Ruta de prueba para Redis
app.get('/cache-test', async (req, res) => {
    try {
        await redisClient_1.default.set('mensaje', 'Hola desde Redis');
        const valor = await redisClient_1.default.get('mensaje');
        res.json({
            message: 'Prueba de Redis exitosa',
            valorGuardado: valor,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al conectar con Redis', error });
    }
});
exports.default = app;
