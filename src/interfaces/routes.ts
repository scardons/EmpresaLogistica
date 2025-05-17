// setupRoutes.ts
import { Express } from 'express';
import usuarioRoutes from './routes/usuario.routes';
import envioRoutes from './routes/envio.routes';
import transportistaRoutes from './routes/transportista.routes';
import envioEstadoRoutes from './routes/envioEstado.routes';
import filtrosRoutes from './routes/filtros.routes';

export const setupRoutes = (app: Express) => {
  app.use('/usuarios', usuarioRoutes);
  app.use('/envios', envioRoutes);
  app.use('/transportistas', transportistaRoutes);
  app.use('/envios/estado', envioEstadoRoutes);
  app.use('/envios/filtros', filtrosRoutes);
};
