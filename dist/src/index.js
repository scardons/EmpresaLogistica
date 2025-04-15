"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisClient_1 = __importDefault(require("./shared/redisClient"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await redisClient_1.default.connect();
        console.log('✅ Conectado a Redis');
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Error al conectar con Redis:', error);
    }
}
startServer();
