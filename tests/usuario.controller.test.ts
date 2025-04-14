import request from 'supertest';
import app from '../src/app';  // Asegúrate de que esta importación apunte al archivo correcto

describe('POST /usuarios/login', () => {
  it('should return 400 if email or password is missing', async () => {
    const response = await request(app)
      .post('/usuarios/login')  // Usa /usuarios/login, no solo /login
      .send({ email: '', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email y contraseña son obligatorios');
  });

  it('should return 400 if user does not exist', async () => {
    const response = await request(app)
      .post('/usuarios/login')  // Usa /usuarios/login, no solo /login
      .send({ email: 'notfound@example.com', password: 'password' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuario no encontrado');
  });

  it('should return 400 if password is incorrect', async () => {
    const response = await request(app)
      .post('/usuarios/login')  // Usa /usuarios/login, no solo /login
      .send({ email: 'santiago@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Contraseña incorrecta');
  });

  it('should return 200 and token if login is successful', async () => {
    const response = await request(app)
      .post('/usuarios/login')  // Usa /usuarios/login, no solo /login
      .send({ email: 'santiago@example.com', password: 'correctpassword' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login exitoso');
    expect(response.body.token).toBeDefined();  // Asegurarse de que el token esté presente
  });
});
