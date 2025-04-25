// src/infrastructure/services/api.ts
import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3000/usuarios', // Ajusta si tu backend corre en otro puerto o ruta base
  headers: {
    'Content-Type': 'application/json',
  },
});
