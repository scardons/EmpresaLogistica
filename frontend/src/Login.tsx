import { useForm } from 'react-hook-form';
import { loginUsuario } from './services/authService'; // Asegúrate de que la ruta sea correcta
// Si usas react-router-dom para redirección, puedes descomentar lo siguiente:
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

  // const navigate = useNavigate(); // Descomenta si usas react-router-dom


  // dentro del componente LoginForm
  const navigate = useNavigate();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUsuario(data);
      localStorage.setItem('token', response.token);
      alert('Login exitoso');
      reset();
      navigate('/dashboard'); // redirección al dashboard
    } catch (err) {
      alert('Hubo un error al intentar iniciar sesión');
      console.error('Error en el login:', err);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-4 animate__animated animate__fadeIn animate__faster"
    >
      <h2 className="text-center mb-4 text-gray-800 font-sans text-xl font-bold">Iniciar sesión</h2>

      {/* Campo de Email */}
      <input
        {...register('email', { required: 'Email requerido' })}
        placeholder="Email"
        type="email"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      {/* Campo de Contraseña */}
      <input
        type="password"
        {...register('password', { required: 'Contraseña requerida' })}
        placeholder="Contraseña"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}


      {/* Botón de Enviar */}
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-blue-700"
      >
        Iniciar sesión
      </button>

      <button
        type="button"
        onClick={() => navigate('/')}
        className='p-3 bg-gray-300 text-gray-800 rounded-lg font-semibold transition duration-300 hover:bg-gray-400'
      >
        Volver
      </button>

    </form>
  );
}
