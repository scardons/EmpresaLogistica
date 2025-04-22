import request from 'supertest';
import app from '../src/app'; 
import { pool } from '../src/config/db';
import { redisClient } from '../src/shared/redisClient';

describe('POST /envios/registrar', () => {
  afterAll(async () => {
    // Cerrar la conexión de Redis si está abierta
    if (redisClient.isOpen) {
      await redisClient.quit();
    }

    // Cerrar la conexión de MySQL
    await pool.end();
  });

  it('debería registrar un nuevo envío y devolverlo con ID y fecha', async () => {
    const envio = {
      destinatario: 'Carlos Pérez',
      direccion: 'Carrera 15 #20-50, Bogotá',
      peso: 2.5,
      dimensiones: {
        alto: 30,
        ancho: 20,
        largo: 10
      },
      tipoProducto: 'Electrónica'
    };

    const res = await request(app)
      .post('/envios/registrar')
      .send(envio);

    // ✅ MOSTRAR EL CUERPO DE LA RESPUESTA

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('fechaRegistro');
    expect(res.body.destinatario).toBe(envio.destinatario);
    expect(res.body.direccion).toBe(envio.direccion);
    expect(res.body.peso).toBe(envio.peso);
    expect(res.body.dimensiones).toBe(JSON.stringify(envio.dimensiones)); // Verifica que las dimensiones sean serializadas correctamente
    expect(res.body.tipoProducto).toBe(envio.tipoProducto);
  });  
});
