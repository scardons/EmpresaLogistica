// src/services/authServices.ts
import { API } from './api';
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

export const registrarUsuario = async (data: UsuarioRegistro) => {
    const response = await axios.post('http://localhost:3000/usuarios/registrar', data);
    return response.data;  // Si la solicitud es exitosa, se retorna la respuesta
};

export const loginUsuario = async (credenciales: UsuarioCredenciales): Promise<LoginResponse> => {
  const res = await API.post<LoginResponse>('/login', credenciales);
  return res.data;
};

export const obtenerPerfil = async (token: string): Promise<PerfilResponse> => {
  const res = await API.get<PerfilResponse>('/perfil', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
