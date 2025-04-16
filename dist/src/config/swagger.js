"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
// src/config/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Usuarios - Login y Registro',
        version: '1.0.0',
        description: 'Documentación de la API para registro y login de usuarios',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/interfaces/routes/*.ts'], // Asegúrate que la ruta sea correcta
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
