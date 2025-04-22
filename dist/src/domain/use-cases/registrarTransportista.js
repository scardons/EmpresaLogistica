"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarTransportista = void 0;
const transportista_repository_mysql_1 = require("../../infrastructure/repositories/transportista.repository.mysql");
const repo = new transportista_repository_mysql_1.TransportistaRepositoryMysql();
const registrarTransportista = async (data) => {
    // Verificar si ya existe un transportista con la misma placa
    const transportistaExistente = await repo.obtenerTransportistaPorPlaca(data.placa);
    if (transportistaExistente) {
        throw new Error("Ya existe un transportista con esta placa.");
    }
    // Registrar el nuevo transportista en la base de datos
    return await repo.registrarTransportista(data);
};
exports.registrarTransportista = registrarTransportista;
