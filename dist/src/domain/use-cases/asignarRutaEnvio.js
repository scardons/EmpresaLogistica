"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignarRutaUseCase = void 0;
class AsignarRutaUseCase {
    constructor(envioRepository) {
        this.envioRepository = envioRepository;
    }
    async execute(envioId, rutaId, transportistaId) {
        // Validar que los datos existan en la base de datos
        const envioExistente = await this.envioRepository.getEnvioById(envioId);
        const rutaExistente = await this.envioRepository.getRutaById(rutaId);
        const transportistaExistente = await this.envioRepository.getTransportistaById(transportistaId);
        if (!envioExistente) {
            throw new Error(`El envío con ID ${envioId} no existe.`);
        }
        if (!rutaExistente) {
            throw new Error(`La ruta con ID ${rutaId} no existe.`);
        }
        if (!transportistaExistente) {
            throw new Error(`El transportista con ID ${transportistaId} no existe.`);
        }
        // Llamada al repositorio para realizar la asignación de la ruta
        await this.envioRepository.asignarRuta(envioId, rutaId, transportistaId);
    }
}
exports.AsignarRutaUseCase = AsignarRutaUseCase;
