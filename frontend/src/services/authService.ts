import axios from 'axios';

interface UsuarioRegistro {
  nombre: string;
  email: string;
  password: string;
}

interface UsuarioCredenciales {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface PerfilResponse {
  id: number;
  nombre: string;
  email: string;
}

// Función para registrar un nuevo usuario
export const registrarUsuario = async (data: UsuarioRegistro) => {
  const response = await axios.post('http://localhost:3000/usuarios/registrar', data);
  return response.data;  // Si la solicitud es exitosa, se retorna la respuesta
};

// Función para hacer login y obtener el token
export const loginUsuario = async (data: UsuarioCredenciales): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('http://localhost:3000/usuarios/login', data);
    return response.data;
  } catch (error) {
    // Usamos axios.isAxiosError para verificar si es un error de Axios
    if (axios.isAxiosError(error)) {
      // Si la respuesta existe, manejamos el mensaje
      const mensaje = error.response?.data?.message || 'Error al iniciar sesión';
      throw new Error(mensaje);
    } else {
      // Si no es un error de Axios, lanzamos un error genérico
      throw new Error('Error inesperado al iniciar sesión');
    }
  }
};

// Función para obtener el perfil del usuario
export const obtenerPerfil = async (token: string): Promise<PerfilResponse> => {
  const res = await axios.get<PerfilResponse>('/perfil', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
