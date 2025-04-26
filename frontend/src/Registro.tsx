import { useForm } from 'react-hook-form';
import { registrarUsuario } from './services/authService';
import { useNavigate } from 'react-router-dom';

interface RegistroFormData {
  nombre: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistroFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegistroFormData) => {
    try {
      await registrarUsuario(data);
      alert('Usuario registrado exitosamente');
      reset();
      navigate('/login'); // Redirige si quieres después del registro
    } catch (error) {
      alert('Hubo un error al registrar el usuario');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-4 animate__animated animate__fadeIn animate__faster"
    >
      <h2 className="text-center mb-4 text-gray-800 font-sans text-xl">Registro</h2>

      <input
        {...register('nombre', { required: 'Nombre requerido' })}
        placeholder="Nombre"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

      <input
        {...register('email', { required: 'Email requerido' })}
        placeholder="Email"
        type="email"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        {...register('password', { required: 'Contraseña requerida' })}
        placeholder="Contraseña"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-blue-700"
      >
        Registrarse
      </button>

      {/* Botón Volver */}
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
