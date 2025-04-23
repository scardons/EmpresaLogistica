//src/domain/entities/envio.entity.ts
export interface Envio {
    id?: number;
    destinatario: string;
    direccion: string;
    peso: number;
    dimensiones: string;
    tipoProducto: string;
    fechaRegistro: Date;     
    estado: string;
    transportista: string
    fechaEntrega: Date         
  }
  