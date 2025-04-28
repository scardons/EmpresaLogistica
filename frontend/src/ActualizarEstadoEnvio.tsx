// src/pages/ActualizarEstadoEnvio.tsx
import { useState } from 'react';
import { actualizarEstadoEnvio } from '../src/services/envioEstadoService';

const ActualizarEstadoEnvio = () => {
  const [envioId, setEnvioId] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleActualizar = async () => {
    try {
      const data = await actualizarEstadoEnvio(envioId, nuevoEstado);
      setMensaje(data.mensaje);
      setError('');
    } catch (err) {
      setMensaje('');
      setError('Error al actualizar el estado del envío.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Actualizar Estado de Envío</h2>
      <input
        type="text"
        value={envioId}
        onChange={(e) => setEnvioId(e.target.value)}
        placeholder="Ingrese ID del envío"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={nuevoEstado}
        onChange={(e) => setNuevoEstado(e.target.value)}
        placeholder="Ingrese el nuevo estado"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleActualizar}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Actualizar
      </button>

      {mensaje && (
        <p className="mt-4 text-green-600">{mensaje}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ActualizarEstadoEnvio;
