import axios from 'axios';
import { config } from '../../config/env';
import { redisClient, ensureRedisConnection } from '../../shared/redisClient';

interface GeocodeResponse {
  status: string;
  results: any[];
}

export class DireccionValidator {
  async esDireccionValida(direccion: string): Promise<boolean> {
    const cacheKey = `direccion:${direccion.toLowerCase()}`;

    try {
      await ensureRedisConnection(); // <--- asegúrate aquí también

      const cached = await redisClient.get(cacheKey);
      if (cached !== null) {
        return cached === 'true';
      }


      // 2. Consultar la API de Google si no está en caché
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${config.GOOGLE_API_KEY}`;

      const response = await axios.get<GeocodeResponse>(url);

      const esValida = response.data.status === 'OK' && response.data.results.length > 0;

      // 3. Guardar el resultado en Redis por 24h
      await redisClient.set(cacheKey, esValida.toString(), { EX: 86400 });

      return esValida;
    } catch (error) {
      console.error("❌ Error al validar la dirección:", error);
      return false;
    }
  }
}
