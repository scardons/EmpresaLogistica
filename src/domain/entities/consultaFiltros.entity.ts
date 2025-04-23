// src/domain/entities/consultaFiltros.entity.ts
export class ConsultaFiltros {
    fechaInicio?: Date;
    fechaFin?: Date;
    estado?: string;
    transportistaId?: number;
    page: number = 1;
    pageSize: number = 10;
  }
  