import request from 'supertest';
import app from '../src/app'; // Asegúrate de exportar app desde app.ts
import { pool } from '../src/config/db';

describe('POST /envios/registrar', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('debería registrar un nuevo envío y devolverlo con ID y fecha', async () => {
    const envio = {
      destinatario: 'Carlos Pérez',
      direccion: 'Carrera 15 #20-50, Bogotá',
      peso: 2.5,
      dimensiones: '30x20x10',
      tipoProducto: 'Electrónica'
    };

    const res = await request(app)
      .post('/envios/registrar')
      .send(envio)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('fechaRegistro');
    expect(res.body.destinatario).toBe(envio.destinatario);
    expect(res.body.direccion).toBe(envio.direccion);
  });
});
