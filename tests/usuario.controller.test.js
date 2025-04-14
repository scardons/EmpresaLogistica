"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // Asegúrate de que esta importación apunte al archivo correcto
describe('POST /usuarios/login', () => {
    it('should return 400 if email or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login') // Usa /usuarios/login, no solo /login
            .send({ email: '', password: '' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email y contraseña son obligatorios');
    }));
    it('should return 400 if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login') // Usa /usuarios/login, no solo /login
            .send({ email: 'notfound@example.com', password: 'password' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Usuario no encontrado');
    }));
    it('should return 400 if password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login') // Usa /usuarios/login, no solo /login
            .send({ email: 'santiago@example.com', password: 'wrongpassword' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Contraseña incorrecta');
    }));
    it('should return 200 and token if login is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/usuarios/login') // Usa /usuarios/login, no solo /login
            .send({ email: 'santiago@example.com', password: 'correctpassword' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login exitoso');
        expect(response.body.token).toBeDefined(); // Asegurarse de que el token esté presente
    }));
});
