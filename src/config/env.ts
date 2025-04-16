import { config as dotenvConfig } from 'dotenv';

// Cargar las variables de entorno
dotenvConfig();

export const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string, 
};
