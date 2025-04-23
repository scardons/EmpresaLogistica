import request from 'supertest';
import app from '../src/app';
import { redisClient } from '../src/shared/redisClient';

describe('GET /api/envios/filtros - Consulta avanzada de envíos', () => {
  it('debe devolver envíos filtrados por rango de fechas, estado y transportistaId', async () => {
    const response = await request(app).get('/api/envios/filtros')
      .query({
        fechaInicio: '2023-01-01',
        fechaFin: '2024-01-01',
        estado: 'Entregado',
        transportistaId: 1
      });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.envios)).toBe(true);
  });

  it('debe devolver 200 y un arreglo vacío si no hay coincidencias', async () => {
    const response = await request(app).get('/api/envios/filtros')
      .query({
        fechaInicio: '1999-01-01',
        fechaFin: '1999-01-02',
        estado: 'Inexistente',
        transportistaId: 999
      });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.envios)).toBe(true);
    expect(response.body.envios.length).toBe(0);
  });

  it('debe manejar errores si los parámetros son inválidos', async () => {
    const response = await request(app).get('/api/envios/filtros')
      .query({
        fechaInicio: 'fecha-mala'  // Parámetro inválido
      });

    expect(response.status).toBeGreaterThanOrEqual(400);  // Asegura que el status sea >= 400
    expect(response.body).toHaveProperty('error');  // Asegura que haya un mensaje de error
    expect(response.body.error).toBe('Parámetro "fechaInicio" inválido');  // Verifica el mensaje de error
  });

  afterAll(async () => {
    // Cierra la conexión de Redis
    await redisClient.quit();
  });
});
