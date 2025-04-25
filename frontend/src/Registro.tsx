import { useForm } from 'react-hook-form';
import { registrarUsuario } from './services/authService';

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

  const onSubmit = async (data: RegistroFormData) => {
    await registrarUsuario(data);
    alert('Usuario registrado exitosamente');
    reset();
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-4 animate__animated animate__fadeIn animate__faster"
    >
      <h2 className="text-center mb-4 text-gray-800 font-sans text-xl">Registro</h2>

      {/* Campo de Nombre */}
      <input
        {...register('nombre', { required: 'Nombre requerido' })}
        placeholder="Nombre"
        className="p-3 rounded-lg border border-gray-300 text-lg"
      />
      {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

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
        Registrarse
      </button>
    </form>
  );
}
