import { IEnvioRepository } from "../repositories/envio.repository";// Asegúrate de tener esta interfaz

export class AsignarRutaUseCase {
  constructor(private envioRepository: IEnvioRepository) {}

  async execute(envioId: number, rutaId: number, transportistaId: number): Promise<void> {
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
