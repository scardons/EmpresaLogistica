import { useForm } from 'react-hook-form';
import { loginUsuario } from './services/authService';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUsuario(data);
      localStorage.setItem('token', response.token);
      reset();
      navigate('/dashboard');
    } catch (err) {
      alert('Hubo un error al intentar iniciar sesión');
      console.error('Error en el login:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      <div className="flex flex-col justify-center items-center p-10 gap-6">
        <h2 className="text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-neon-pink font-sans text-2xl font-bold">
          Iniciar sesión
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-r from-neon-orange to-neon-pink p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4 animate__animated animate__fadeIn animate__faster"
        >
          {/* Campo de Email */}
          <input
            {...register('email', { required: 'Email requerido' })}
            type="email"
            placeholder="Correo electrónico"
            className="p-3 rounded-lg border border-gray-300 text-lg text-black placeholder-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Campo de Contraseña */}
          <input
            type="password"
            {...register('password', { required: 'Contraseña requerida' })}
            placeholder="Contraseña"
            className="p-3 rounded-lg border border-gray-300 text-lg text-black placeholder-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Botón de Enviar */}
          <button
            type="submit"
            className="p-3 bg-neon-blue text-black rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-neon-pink"
          >
            Iniciar sesión
          </button>

          {/* Botón Volver */}
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
