"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignarRutaUseCase = void 0;
// src/domain/use-cases/asignarRuta.ts
class AsignarRutaUseCase {
    constructor(envioRepository) {
        this.envioRepository = envioRepository;
    } // usa la interfaz si ya la tienes
    async execute(envioId, rutaId, transportistaId) {
        // Aquí podrías agregar validaciones si quieres
        await this.envioRepository.asignarRuta(envioId, rutaId, transportistaId);
    }
}
exports.AsignarRutaUseCase = AsignarRutaUseCase;
