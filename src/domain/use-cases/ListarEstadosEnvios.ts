//src/domain/use-cases/ListarEstadosEnvios
import { IEnvioRepository } from '../../domain/repositories/IEnvioRepository';
import { Envio } from '../../domain/entities/envio.entity';

export class ListarEstadosEnvios {
    constructor(private envioRepository: IEnvioRepository) {}

    async execute(): Promise<Envio[]> {
    return this.envioRepository.listarEstados();  // Trae todos los campos ahora
}
}
