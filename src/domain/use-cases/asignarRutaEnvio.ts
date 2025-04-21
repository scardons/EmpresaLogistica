// src/domain/use-cases/asignarRuta.ts
export class AsignarRutaUseCase {
    constructor(private envioRepository: any) {} // usa la interfaz si ya la tienes
  
    async execute(envioId: number, rutaId: number, transportistaId: number): Promise<void> {
      // Aquí podrías agregar validaciones si quieres
      await this.envioRepository.asignarRuta(envioId, rutaId, transportistaId);
    }
  }
  