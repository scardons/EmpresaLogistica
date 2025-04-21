"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignarRutaHandler = exports.registrarEnvio = void 0;
const registrarEnvio_1 = require("../../domain/use-cases/registrarEnvio");
const envio_repository_mysql_1 = require("../../infrastructure/repositories/envio.repository.mysql");
const direccionValidator_1 = require("../../infrastructure/services/direccionValidator");
const asignarRutaEnvio_1 = require("../../domain/use-cases/asignarRutaEnvio");
const envioRepository = new envio_repository_mysql_1.EnvioRepositoryMysql();
const direccionValidator = new direccionValidator_1.DireccionValidator();
const registrarEnvioUseCase = new registrarEnvio_1.RegistrarEnvio(envioRepository, direccionValidator);
// 🔥 INSTANCIA DEL CASO DE USO PARA ASIGNAR RUTA
const asignarRutaUseCase = new asignarRutaEnvio_1.AsignarRutaUseCase(envioRepository);
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
// En envio.controller.ts
const asignarRutaHandler = async (req, res) => {
    const { envioId, rutaId, transportistaId } = req.body;
    try {
        await asignarRutaUseCase.execute(envioId, rutaId, transportistaId);
        return res.status(200).json({ mensaje: 'Ruta asignada correctamente' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al asignar ruta' });
    }
};
exports.asignarRutaHandler = asignarRutaHandler;
