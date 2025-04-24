// src/domain/use-cases/consultaMetricaDesempeno.ts
import { FiltrosRepositoryMysql } from "../../infrastructure/repositories/filtros.repository.mysql";
import { MetricasDesempeno } from "../entities/consultaFiltros.entity";
import { redisClient } from "../../shared/redisClient";

// Función para calcular el tiempo de entrega en horas
function calcularTiempoEntrega(fechaRegistro: Date, fechaEntrega: Date): number {
  const milisegundos = fechaEntrega.getTime() - fechaRegistro.getTime();
  const horas = milisegundos / (1000 * 60 * 60);
  return Math.round(horas * 100) / 100; // redondea a 2 decimales
}

export class ConsultaMetricasDesempeno {
  private envioRepository: FiltrosRepositoryMysql;

  constructor() {
    this.envioRepository = new FiltrosRepositoryMysql();
  }

  async ejecutar(filtros: {
    fechaInicio?: Date;
    fechaFin?: Date;
  }): Promise<MetricasDesempeno> {
    const { fechaInicio, fechaFin } = filtros;
    const cacheKey = `metricas:${fechaInicio}:${fechaFin}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const metricas = await this.envioRepository.obtenerMetricasDesempeno({ fechaInicio, fechaFin });

    // Aquí calculamos el tiempo de entrega por cada envío
    metricas.envios = metricas.envios.map(envio => {
      if (envio.fechaEntrega) {
        envio.tiempoEntrega = calcularTiempoEntrega(envio.fechaRegistro, envio.fechaEntrega);
      } else {
        envio.tiempoEntrega = null; // O algún valor por defecto
      }
      return envio;
    });

    await redisClient.set(cacheKey, JSON.stringify(metricas), { EX: 3600 });

    return metricas;
  }
}
