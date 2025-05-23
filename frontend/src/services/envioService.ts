// src/services/envioService.ts
import axios from 'axios';

export interface EnvioData {
  destinatario: string;
  direccion: string;
  peso: number;
  dimensiones: string;
  tipoProducto: string;
}

export interface Envio {
  id: number;
  destinatario: string;
  direccion: string;
  peso: number;
  dimensiones: string;
  tipoProducto: string;
  fechaRegistro: string;
  fechaEntrega: string | null;
  estado: string;
  rutaId: number;
  transportistaId: number;
}

export const registrarEnvio = async (data: EnvioData) => {
  const response = await axios.post('http://localhost:3000/envios/registrar', data);
  return response.data;
};

export const listarEnvios = async () => {
  const response = await axios.get('http://localhost:3000/envios/todos')
  return response.data
}