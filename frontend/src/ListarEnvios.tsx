// src/pages/ListarEnvios.tsx
import React, { useEffect, useState } from 'react';
import { listarEnvios } from '../src/services/envioService';

interface Envio {
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

const ListarEnvios: React.FC = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        const data = await listarEnvios();
        setEnvios(data);
      } catch (error) {
        console.error('Error al listar envíos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvios();
  }, []);

  if (loading) return <div>Cargando envíos...</div>;

  return (
<div className="p-8">
  <h1 className="bg-yellow-400 text-black text-4xl font-bold">
    Lista de Envíos
  </h1>

  <p className="mt-2 text-gray-600">Texto de prueba abajo del título</p>

  <div className="overflow-x-auto mt-4">
    <table className="min-w-[800px] w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Destinatario</th>
          <th className="border p-2">Dirección</th>
          <th className="border p-2">Peso</th>
          <th className="border p-2">Tipo Producto</th>
          <th className="border p-2">Estado</th>
        </tr>
      </thead>
      <tbody>
        {envios.map((envio) => (
          <tr key={envio.id}>
            <td className="border p-2">{envio.id}</td>
            <td className="border p-2">{envio.destinatario}</td>
            <td className="border p-2">{envio.direccion}</td>
            <td className="border p-2">{envio.peso} kg</td>
            <td className="border p-2">{envio.tipoProducto || '-'}</td>
            <td className="border p-2">{envio.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ListarEnvios;
