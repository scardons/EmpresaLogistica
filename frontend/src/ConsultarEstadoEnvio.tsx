// src/pages/ConsultarEstadoEnvio.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultarEstadoEnvio } from '../src/services/envioEstadoService';

interface EstadoEnvio {
  envioId: string;
  estadoActual: string;
}

export default function ConsultarEstadoEnvio() {
  const [envios, setEnvios] = useState<EstadoEnvio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await consultarEstadoEnvio();
        setEnvios(data as EstadoEnvio[]);
        setError(null);
      } catch (err) {
        console.error('Error al consultar los estados:', err);
        setError('Error al cargar los estados de los envíos.');
      }
    };

    fetchEstados();
  }, []);

  const volverAlDashboard = () => {
    navigate('/dashboard'); // Ajusta la ruta si es distinta en tu app
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Lista de Estados de Envíos</h2>

      <div className="mb-6 text-center">
        <button
          onClick={volverAlDashboard}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Volver al Dashboard
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
          {error}
        </div>
      )}

      {envios.length === 0 && !error ? (
        <p className="text-gray-600 text-center">No hay estados registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 border-b text-left">ID de Envío</th>
                <th className="py-3 px-6 border-b text-left">Estado Actual</th>
              </tr>
            </thead>
            <tbody>
              {envios.map((envio) => (
                <tr key={envio.envioId} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b">{envio.envioId}</td>
                  <td className="py-3 px-6 border-b">{envio.estadoActual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
