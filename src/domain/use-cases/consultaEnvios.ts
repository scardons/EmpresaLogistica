import { FiltrosRepositoryMysql } from "../../infrastructure/repositories/filtros.repository.mysql";
import { ConsultaFiltros } from "../entities/consultaFiltros.entity";
import { redisClient } from "../../shared/redisClient";

export class ConsultaEnvios {
  private envioRepository: FiltrosRepositoryMysql;

  constructor() {
    this.envioRepository = new FiltrosRepositoryMysql();
  }

  async ejecutar(filtros: ConsultaFiltros): Promise<{
    envios: any[];
    total: number;
  }> {
    const { fechaInicio, fechaFin, estado, transportistaId, page, pageSize } = filtros;

    const cacheKey = `envios:${fechaInicio}:${fechaFin}:${estado}:${transportistaId}:${page}:${pageSize}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const envios = await this.envioRepository.obtenerEnviosConFiltros(
      fechaInicio,
      fechaFin,
      estado,
      transportistaId,
      page,
      pageSize
    );

    const total = await this.envioRepository.contarEnviosConFiltros(
      fechaInicio,
      fechaFin,
      estado,
      transportistaId
    );

    const result = { envios, total };

    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });

    return result;
  }
}
