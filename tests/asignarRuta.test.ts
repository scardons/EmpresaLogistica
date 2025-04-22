import request from 'supertest';
import app from '../src/app';
import { pool } from '../src/config/db';

describe('POST /envios/asignar-ruta', () => {
  beforeEach(async () => {
    // Insertar un transportista antes de cada prueba
    await pool.query(`
      INSERT INTO transportistas (nombre, placa, telefono, fecha_registro)
      VALUES ('Juan Pérez', 'ABC234', '1234567890', NOW());
    `);

    // Reiniciar el valor de AUTO_INCREMENT a 1
    await pool.query(`ALTER TABLE transportistas AUTO_INCREMENT = 1;`);
  });



  it('debería asignar una ruta correctamente', async () => {
    const response = await request(app)
      .post('/envios/asignar-ruta')
      .send({
        envioId: 1,
        rutaId: 1,
        transportistaId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensaje', 'Ruta asignada correctamente');
  });

  it('debería fallar si la ruta no existe', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn(); // silencia console.error durante este test

    const response = await request(app)
      .post('/envios/asignar-ruta')
      .send({
        envioId: 1,
        rutaId: 999, // Ruta inexistente
        transportistaId: 1,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Error al asignar ruta');
    expect(response.body).toHaveProperty('details');

    console.error = originalConsoleError; // restaurar el console.error original
  });

  afterAll(async () => {
    await pool.end(); // Cierra la conexión a la base de datos
  });
});
