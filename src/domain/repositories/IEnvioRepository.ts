// src/domain/repositories/IEnvioRepository.ts

import { Envio } from '../entities/envio.entity';

export interface IEnvioRepository {
  listarEstados(): Promise<Envio[]>;  // Método que obtiene todos los envíos
}
