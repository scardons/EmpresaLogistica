import axios from 'axios';
import { config } from '../../config/env';

interface GeocodeResponse {
  status: string;
  results: any[]; // Puedes ser más específico aquí según los datos que esperes
}

export class DireccionValidator {
  async esDireccionValida(direccion: string): Promise<boolean> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${config.GOOGLE_API_KEY}`;
    console.log("URL generada:", url); // Aquí puedes ver la URL completa

    try {
      const response = await axios.get<GeocodeResponse>(url);

      // Loguea la respuesta completa para que puedas inspeccionarla
      console.log("Respuesta completa de Google Maps API:", response.data);

      // Verifica que la respuesta tenga estado 'OK' y que existan resultados
      return response.data.status === 'OK' && response.data.results.length > 0;
    } catch (error) {
      console.error("Error al llamar a la API de Google Maps:", error);
      return false;
    }
  }
}
