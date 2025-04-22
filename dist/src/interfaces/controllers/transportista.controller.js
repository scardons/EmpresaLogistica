"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTransportista = void 0;
const registrarTransportista_1 = require("../../domain/use-cases/registrarTransportista");
const crearTransportista = async (req, res) => {
    try {
        const { nombre, placa, telefono, capacidad } = req.body;
        //validacion de entrada
        if (!nombre || !placa || !telefono || !capacidad) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        if (isNaN(capacidad) || capacidad <= 0) {
            return res.status(400).json({ message: "La capacidad debe ser mayor a 0" });
        }
        //verificamos que la capacidad sea un numero positivo
        if (capacidad <= 0) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        //registramos al transportista
        const transportista = await (0, registrarTransportista_1.registrarTransportista)({ nombre, placa, telefono, capacidad });
        res.status(201).json(transportista);
    }
    catch (error) {
        console.error("Error al registrar transportista:", error); // 🔍 VER QUÉ PASA
        res.status(500).json({
            message: "Error al registrar transportista",
            error: error instanceof Error ? error.message : error
        });
    }
};
exports.crearTransportista = crearTransportista;
