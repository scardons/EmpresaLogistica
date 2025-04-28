import axios from 'axios';

// Obtener el estado de un envío
export const consultarEstadoEnvio = async () => {
  const response = await axios.get(`http://localhost:3000/envios/estado`);
  return response.data;
};

// Actualizar el estado de un envío
export const actualizarEstadoEnvio = async (envioId: string, nuevoEstado: string) => {
  const response = await axios.put(`http://localhost:3000/envios/${envioId}/estado`, { nuevoEstado });
  return response.data;
};
