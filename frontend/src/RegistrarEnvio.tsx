import { useState } from 'react';
import { registrarEnvio, EnvioData } from './services/envioService';
import { useNavigate } from 'react-router-dom';

export default function RegistrarEnvio() {
  const [formData, setFormData] = useState<EnvioData>({
    destinatario: '',
    direccion: '',
    peso: 0,
    dimensiones: '',
    tipoProducto: '',
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'peso' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarEnvio(formData);
      alert('Envío registrado exitosamente');
      setError('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error desconocido';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
          Registrar Envío
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="destinatario"
            placeholder="Destinatario"
            value={formData.destinatario}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="peso"
            placeholder="Peso (kg)"
            value={formData.peso}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="dimensiones"
            placeholder="Dimensiones (LxAxH)"
            value={formData.dimensiones}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="tipoProducto"
            placeholder="Tipo de Producto"
            value={formData.tipoProducto}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Registrar Envío
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-1/2 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
