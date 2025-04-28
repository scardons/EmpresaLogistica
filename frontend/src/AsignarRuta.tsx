// src/pages/AsignarRuta.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { asignarRuta } from '../src/services/asignarRutaServices'


export default function AsignarRuta() {
  const [formData, setFormData] = useState({
    envioId: '',
    rutaId: '',
    transportistaId: '',
  });

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await asignarRuta({
        envioId: parseInt(formData.envioId),
        rutaId: parseInt(formData.rutaId),
        transportistaId: parseInt(formData.transportistaId),
      });

      alert('Ruta asignada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al asignar ruta');
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Asignar Ruta</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="envioId"
          placeholder="ID del Envío"
          value={formData.envioId}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="number"
          name="rutaId"
          placeholder="ID de la Ruta"
          value={formData.rutaId}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="number"
          name="transportistaId"
          placeholder="ID del Transportista"
          value={formData.transportistaId}
          onChange={handleChange}
          className="border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          Asignar Ruta
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
