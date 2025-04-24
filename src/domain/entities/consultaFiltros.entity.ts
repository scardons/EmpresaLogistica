// src/domain/entities/consultaFiltros.entity.ts
import { Envio } from "./envio.entity";

export class ConsultaFiltros {
    fechaInicio?: Date;
    fechaFin?: Date;
    estado?: string;
    transportistaId?: number;
    page: number = 1;
    pageSize: number = 10;
  }
  export interface MetricasDesempeno {
    tiempoPromedioEntregaPorTransportista: {
      transportistaId: number;
      promedioHoras: number;
    }[];
    totalEntregados: number;
    envios: Envio[]
  }