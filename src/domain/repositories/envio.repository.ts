import { Envio } from '../entities/envio.entity';

export interface IEnvioRepository {
  registrar(envio: Envio): Promise<Envio>;
  asignarRuta(envioId: number, rutaId: number, trasportistaId: number): Promise<void>
}
