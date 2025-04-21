"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignarRutaHandler = exports.registrarEnvio = void 0;
const envio_repository_mysql_1 = require("../../infrastructure/repositories/envio.repository.mysql");
const registrarEnvio_1 = require("../../domain/use-cases/registrarEnvio");
const asignarRutaEnvio_1 = require("../../domain/use-cases/asignarRutaEnvio");
const direccionValidator_1 = require("../../infrastructure/services/direccionValidator");
const envioRepository = new envio_repository_mysql_1.EnvioRepositoryMysql();
const direccionValidator = new direccionValidator_1.DireccionValidator();
// Casos de uso
const registrarEnvioUseCase = new registrarEnvio_1.RegistrarEnvio(envioRepository, direccionValidator);
const asignarRutaUseCase = new asignarRutaEnvio_1.AsignarRutaUseCase(envioRepository);
// Controlador para registrar envío
const registrarEnvio = async (req, res) => {
    try {
        const { destinatario, direccion, peso, dimensiones, tipoProducto } = req.body;
        const envio = await registrarEnvioUseCase.execute({
            destinatario,
            direccion,
            peso,
            dimensiones,
            tipoProducto,
        });
        res.status(201).json(envio);
    }
    catch (error) {
        res.status(400).json({ message: error.message || 'Error al registrar envío' });
    }
};
exports.registrarEnvio = registrarEnvio;
// Controlador para asignar ruta
const asignarRutaHandler = async (req, res) => {
    const { envioId, rutaId, transportistaId } = req.body;
    try {
        await asignarRutaUseCase.execute(envioId, rutaId, transportistaId);
        return res.status(200).json({ mensaje: 'Ruta asignada correctamente' });
    }
    catch (error) {
        console.error("Error al asignar ruta:", error);
        return res.status(500).json({
            error: 'Error al asignar ruta',
            details: error.message || 'Error desconocido'
        });
    }
};
exports.asignarRutaHandler = asignarRutaHandler;
