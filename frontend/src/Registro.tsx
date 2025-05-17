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
      navigate('/login');
    } catch (error) {
      alert('Hubo un error al registrar el usuario');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      <div className="flex flex-col justify-center items-center p-10 gap-6">
        <h2 className="text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 font-sans text-2xl font-bold">
          Registro de usuario
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-r from-blue-800 to-blue-500 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4 animate__animated animate__fadeIn animate__faster"
        >
          {/* Campo de nombre */}
          <input
            {...register('nombre', { required: 'Nombre requerido' })}
            placeholder="Nombre completo"
            className="p-3 rounded-lg border border-gray-300 text-lg text-black placeholder-gray-500"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}

          {/* Campo de email */}
          <input
            {...register('email', { required: 'Email requerido' })}
            placeholder="Correo electrónico"
            className="p-3 rounded-lg border border-gray-300 text-lg text-black placeholder-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Campo de contraseña */}
          <input
            type="password"
            {...register('password', { required: 'Contraseña requerida' })}
            placeholder="Contraseña"
            className="p-3 rounded-lg border border-gray-300 text-lg text-black placeholder-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Botón de registro */}
          <button
            type="submit"
            className="p-3 bg-neon-blue text-black rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-neon-pink"
          >
            Registrarse
          </button>

          {/* Botón de volver */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="p-3 bg-gray-300 text-gray-800 rounded-lg font-semibold transition duration-300 hover:bg-gray-400"
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
}
