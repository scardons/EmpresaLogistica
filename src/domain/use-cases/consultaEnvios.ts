// src/domain/use-cases/consultaEnvios.ts
import { FiltrosRepositoryMysql } from "../../infrastructure/repositories/filtros.repository.mysql";
import { ConsultaFiltros } from '../entities/consultaFiltros.entity'; // Importamos la nueva interfaz
import { redisClient } from "../../shared/redisClient";  // Cliente Redis

export class ConsultaEnvios {
  private envioRepository: FiltrosRepositoryMysql;

  constructor() {
    this.envioRepository = new FiltrosRepositoryMysql();
  }

  async ejecutar(filtros: ConsultaFiltros): Promise<{ envios: any[]; total: number }> {
    const { fechaInicio, fechaFin, estado, transportistaId, page, pageSize } = filtros;

    // Generamos el cacheKey único basado en los filtros
    const cacheKey = `envios:${fechaInicio}:${fechaFin}:${estado}:${transportistaId}:${page}:${pageSize}`;

    // Verificamos si la consulta ya está en caché
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // Si los datos están en caché, los devolvemos directamente
      console.log('Datos obtenidos desde el cache');
      return JSON.parse(cachedData);
    }

    // Si no están en caché, realizamos la consulta a la base de datos
    const envios = await this.envioRepository.obtenerEnviosConFiltros(
      fechaInicio,
      fechaFin,
      estado,
      transportistaId,  // Pasamos transportistaId de los filtros
      page,
      pageSize
    );

    const total = await this.envioRepository.contarEnviosConFiltros(
      fechaInicio,
      fechaFin,
      estado,
      transportistaId  // Pasamos transportistaId de los filtros
    );

    // Creamos el objeto de resultado
    const result = { envios, total };

    // Almacenamos los resultados en caché para futuras consultas
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });  // Cache por 1 hora

    console.log('Datos obtenidos desde la base de datos y guardados en cache');
    return result;
  }
}
