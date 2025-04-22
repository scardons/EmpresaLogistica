import { TransportistaRepositoryMysql } from "../../infrastructure/repositories/transportista.repository.mysql";

const repo = new TransportistaRepositoryMysql();

export const registrarTransportista = async (data: {
  nombre: string;
  placa: string;
  telefono: string;
  capacidad: number; // Nueva propiedad de capacidad del vehículo
}) => {
  // Verificar si ya existe un transportista con la misma placa
  const transportistaExistente = await repo.obtenerTransportistaPorPlaca(data.placa);
  if (transportistaExistente) {
    throw new Error("Ya existe un transportista con esta placa.");
  }

  // Registrar el nuevo transportista en la base de datos
  return await repo.registrarTransportista(data);
};
