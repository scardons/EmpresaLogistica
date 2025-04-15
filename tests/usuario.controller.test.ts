import request from 'supertest';
import app from '../src/app';
import { pool } from '../src/config/db';

describe('POST /usuarios/login', () => {
  beforeAll(async () => {
    // Eliminar si ya existe para evitar duplicados
    await pool.query(`DELETE FROM usuarios WHERE email = 'santiago@example.com'`);

    // Crear el usuario necesario para las pruebas
    await request(app)
      .post('/usuarios/registrar')
      .send({ nombre: 'Santiago', email: 'santiago@example.com', password: '123456' });
  });

  it('debería retornar 400 si faltan email o contraseña', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ email: '', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email y contraseña son obligatorios');
  });

  it('debería retornar 400 si el usuario no existe', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ email: 'notfound@example.com', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuario no encontrado');
  });

  it('debería retornar 400 si la contraseña es incorrecta', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ email: 'santiago@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Contraseña incorrecta');
  });

  it('debería retornar 200 y un token si el login es exitoso', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ email: 'santiago@example.com', password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login exitoso');
    expect(response.body.token).toBeDefined();
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM usuarios WHERE email = 'santiago@example.com'`);
    await pool.end();
  });
});
