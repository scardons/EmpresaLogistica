// src/domain/repositories/envio.repository.ts
export interface IEnvioRepository {
  registrar(envio: any): Promise<any>;  // O un tipo específico como `Envio`
  getEnvioById(id: number): Promise<any>;
  getRutaById(id: number): Promise<any>;
  getTransportistaById(id: number): Promise<any>;
  asignarRuta(envioId: number, rutaId: number, transportistaId: number): Promise<void>;
}
