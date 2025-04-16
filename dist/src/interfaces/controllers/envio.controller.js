"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarEnvio = void 0;
const registrarEnvio_1 = require("../../domain/use-cases/registrarEnvio");
const envio_repository_mysql_1 = require("../../infrastructure/repositories/envio.repository.mysql");
const direccionValidator_1 = require("../../infrastructure/services/direccionValidator");
const envioRepository = new envio_repository_mysql_1.EnvioRepositoryMysql();
const direccionValidator = new direccionValidator_1.DireccionValidator();
const registrarEnvioUseCase = new registrarEnvio_1.RegistrarEnvio(envioRepository, direccionValidator);
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
    catch (error) { // Especificamos que el error puede ser de cualquier tipo
        res.status(400).json({ message: error.message || 'Error al registrar envío' });
    }
};
exports.registrarEnvio = registrarEnvio;
