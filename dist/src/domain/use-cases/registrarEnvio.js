"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarEnvio = void 0;
class RegistrarEnvio {
    constructor(envioRepository, direccionValidator) {
        this.envioRepository = envioRepository;
        this.direccionValidator = direccionValidator;
    }
    async execute(envio) {
        const esValida = await this.direccionValidator.esDireccionValida(envio.direccion);
        if (!esValida) {
            throw new Error('La dirección de destino no es válida');
        }
        const nuevoEnvio = {
            ...envio,
            estado: 'En espera', // ✅ Estado inicial automático
            fechaRegistro: new Date(),
        };
        return this.envioRepository.registrar(nuevoEnvio);
    }
}
exports.RegistrarEnvio = RegistrarEnvio;
