"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const redisClient_1 = __importDefault(require("./utils/redisClient"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/usuarios', usuario_routes_1.default);
// Ruta para verificar conexión a MySQL
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query('SELECT 1+1 AS resultado');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error en la conexión BD' });
    }
}));
// Ruta de prueba para Redis
app.get('/cache-test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient_1.default.set('mensaje', 'Hola desde Redis');
        const valor = yield redisClient_1.default.get('mensaje');
        res.json({
            message: 'Prueba de Redis exitosa',
            valorGuardado: valor,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al conectar con Redis', error });
    }
}));
exports.default = app;
