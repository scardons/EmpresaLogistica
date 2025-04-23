import request from 'supertest';
import app from '../src/app'; 
import { pool } from '../src/config/db';


describe('PUT /envio/:id/estado', () => {
  it('debe actualizar el estado del envío correctamente', async () => {
    const envioId = 1; // Asegúrate de que este ID exista en la base de datos
    const nuevoEstado = { nuevoEstado: 'En tránsito' };

    const response = await request(app)
      .put(`/envio/${envioId}/estado`)
      .send(nuevoEstado);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensaje');
    expect(response.body.mensaje).toMatch(/actualizado/i);
  });

  it('debe retornar error si el estado no es válido', async () => {
    const envioId = 1;
    const estadoInvalido = { nuevoEstado: 'Desconocido' };

    const response = await request(app)
      .put(`/envio/${envioId}/estado`)
      .send(estadoInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/inválido/i);
  });

  it('debe retornar error si el envío no existe', async () => {
    const envioIdInexistente = 99999;
    const nuevoEstado = { nuevoEstado: 'Entregado' };

    const response = await request(app)
      .put(`/envio/${envioIdInexistente}/estado`)
      .send(nuevoEstado);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/no encontrado/i);
  });

    afterAll(async () => {
      await pool.end(); // Cierra la conexión a la base de datos
    });

});
