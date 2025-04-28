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

  const navigate = useNavigate()

  const [error, setError] = useState<string>(''); // Estado para manejar el error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'peso' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registrarEnvio(formData);
      alert('Envío registrado exitosamente');
      setError(''); // Limpiar el error si la solicitud fue exitosa
    } catch (error: any) { // Usamos "any" para que podamos trabajar con el tipo de error completo
      console.error(error);
      
      // Verificar si el error tiene la estructura esperada (response -> data -> message)
      const errorMessage = error.response?.data?.message || 'Error desconocido'; // Obtener el mensaje de error
      setError(errorMessage); // Mostrar el mensaje de error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registrar Envío</h2>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Mostrar error aquí */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="destinatario"
          placeholder="Destinatario"
          value={formData.destinatario}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="number"
          name="peso"
          placeholder="Peso (kg)"
          value={formData.peso}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="dimensiones"
          placeholder="Dimensiones (LxAxH)"
          value={formData.dimensiones}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="tipoProducto"
          placeholder="Tipo de Producto"
          value={formData.tipoProducto}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Registrar Envío
        </button>

        <button
        type="button"
        onClick={() => navigate('/Dashboard')}
        className="p-3 bg-gray-300 text-gray-800 rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-gray-400"
      >
        Volver
      </button>

      </form>
    </div>
  );
}
