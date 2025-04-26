import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registrarTransportista } from '../src/services/transportistaService'; // Vamos a crear este service ahora

interface TransportistaFormData {
  nombre: string;
  placa: string;
  telefono: string;
  capacidad: number;
}

export default function RegisterTransportistaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransportistaFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: TransportistaFormData) => {
    try {
      await registrarTransportista(data);
      alert('Transportista registrado exitosamente');
      reset();
      navigate('/'); // o a la ruta que prefieras
    } catch (error) {
      alert('Hubo un error al registrar el transportista');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-4 animate__animated animate__fadeIn animate__faster"
    >
      <h2 className="text-center mb-4 text-gray-800 font-sans text-xl">Registrar Transportista</h2>

      <input
        {...register('nombre', { required: 'Nombre requerido' })}
        placeholder="Nombre"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

      <input
        {...register('placa', { required: 'Placa requerida' })}
        placeholder="Placa"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.placa && <p className="text-red-500 text-sm">{errors.placa.message}</p>}

      <input
        {...register('telefono', { required: 'Teléfono requerido' })}
        placeholder="Teléfono"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}

      <input
        type="number"
        {...register('capacidad', { 
          required: 'Capacidad requerida', 
          min: { value: 1, message: 'La capacidad debe ser mayor a 0' } 
        })}
        placeholder="Capacidad (kg)"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.capacidad && <p className="text-red-500 text-sm">{errors.capacidad.message}</p>}

      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-blue-700"
      >
        Registrar
      </button>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="p-3 bg-gray-300 text-gray-800 rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-gray-400"
      >
        Volver
      </button>
    </form>
  );
}
