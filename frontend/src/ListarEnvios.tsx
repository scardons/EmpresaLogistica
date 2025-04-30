// src/pages/ListarEnvios.tsx
import React, { useEffect, useState } from 'react';
import { Envio, listarEnvios } from '../src/services/envioService';
import { useNavigate } from 'react-router-dom';

const ListarEnvios: React.FC = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        const data = await listarEnvios();
        setEnvios(data as Envio[]);
      } catch (error) {
        console.error('Error al listar envíos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvios();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">Cargando envíos...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Lista de Envíos</h1>
      <p className="text-gray-400 mb-6">Texto de prueba abajo del título</p>

      <button
        onClick={() => navigate('/dashboard')}
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold shadow mb-6 transition-colors"
      >
        Volver al Dashboard
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-yellow-500">
              <th className="border border-gray-700 p-3 text-left">ID</th>
              <th className="border border-gray-700 p-3 text-left">Destinatario</th>
              <th className="border border-gray-700 p-3 text-left">Dirección</th>
              <th className="border border-gray-700 p-3 text-left">Peso</th>
              <th className="border border-gray-700 p-3 text-left">Tipo Producto</th>
              <th className="border border-gray-700 p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio) => (
              <tr key={envio.id} className="hover:bg-gray-800 transition-colors">
                <td className="border border-gray-700 p-3">{envio.id}</td>
                <td className="border border-gray-700 p-3">{envio.destinatario}</td>
                <td className="border border-gray-700 p-3">{envio.direccion}</td>
                <td className="border border-gray-700 p-3">{envio.peso} kg</td>
                <td className="border border-gray-700 p-3">{envio.tipoProducto || '-'}</td>
                <td className="border border-gray-700 p-3">{envio.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarEnvios;
