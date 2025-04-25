// src/components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { loginUsuario } from '../src/services/authService';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register,
     handleSubmit,
      formState: { errors }
     } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUsuario(data);
      localStorage.setItem('token', res.token);
      alert('Login exitoso');
    } catch (err) {
      alert('Error al iniciar sesión');
      console.error(err);
    }
  };

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    style={{
      background: 'white',
    }}
    >
      <input {...register("email", { required: "Email requerido" })} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password", { required: "Contraseña requerida" })} placeholder="Contraseña" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
