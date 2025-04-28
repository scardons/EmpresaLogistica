// src/pages/ConsultarEstadoEnvio.tsx
import { useEffect, useState } from 'react';
import { consultarEstadoEnvio } from '../src/services/envioEstadoService';

interface EstadoEnvio {
  envioId: string;
  estadoActual: string;
}

const ConsultarEstadoEnvio = () => {
  const [envios, setEnvios] = useState<EstadoEnvio[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await consultarEstadoEnvio();
        setEnvios(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Error al cargar los estados de los envíos.');
      }
    };

    fetchEstados();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Estados de Envíos</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID de Envío</th>
            <th className="py-2 px-4 border-b">Estado Actual</th>
          </tr>
        </thead>
        <tbody>
          {envios.map((envio) => (
            <tr key={envio.envioId}>
              <td className="py-2 px-4 border-b">{envio.envioId}</td>
              <td className="py-2 px-4 border-b">{envio.estadoActual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultarEstadoEnvio;
