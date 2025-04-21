import { Envio } from '../entities/envio.entity';
import { IEnvioRepository } from '../repositories/envio.repository';
import { IDireccionValidator } from '../../application/direccion.service';

export class RegistrarEnvio {
  constructor(
    private envioRepository: IEnvioRepository,
    private direccionValidator: IDireccionValidator
  ) {}

  async execute(envio: Omit<Envio, 'id' | 'fechaRegistro' | 'estado'>): Promise<Envio> {
    const esValida = await this.direccionValidator.esDireccionValida(envio.direccion);

    if (!esValida) {
      throw new Error('La dirección de destino no es válida');
    }

    const nuevoEnvio: Envio = {
      ...envio,
      estado: 'En espera', // ✅ Estado inicial automático
      fechaRegistro: new Date(),
    };

    return this.envioRepository.registrar(nuevoEnvio);
  }
}
