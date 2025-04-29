# 📦 API REST - Gestión de Envíos y Rutas Logísticas

Este es un proyecto backend desarrollado en **TypeScript** con **Express**, que permite gestionar envíos, optimizar rutas y realizar seguimiento en tiempo real. Incluye autenticación con JWT, caché con Redis, pruebas unitarias/integración, y arquitectura limpia (Clean Architecture).

## 🚀 Características

- Registro e inicio de sesión de usuarios con autenticación JWT
- Registro y gestión de envíos
- Optimización de rutas logísticas
- Actualización y seguimiento de estados de envío
- Filtros avanzados y reportes de desempeño
- API documentada con Swagger
- Pruebas con Jest
- Redis para caché de respuestas
- MySQL como base de datos principal
- Arquitectura escalable y mantenible (Clean Architecture)

## 🧱 Tecnologías

- Node.js + Express
- TypeScript
- MySQL
- Redis
- JWT
- Jest
- Swagger
- Docker (opcional)
- Clean Architecture

- **Frontend**:
  - React
  - TypeScript
  - TailwindCSS
  - React Router
  - Axios

## 📁 Estructura del proyecto

src/ ├── config/ ├── controllers/ ├── middlewares/ ├── models/ ├── routes/ ├── utils/ ├── domain/ │ ├── entities/ │ ├── repositories/ │ └── use-cases/ ├── infrastructure/ │ └── repositories/ ├── app.ts ├── index.ts tests/

bash
Copiar
Editar

## 📦 Instalación

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd backend-logind-ts
npm install
Variables de entorno
Crea un archivo .env con los siguientes valores:

ini
Copiar
Editar
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=envios_db
JWT_SECRET=clave_secreta
REDIS_HOST=localhost
REDIS_PORT=6379

🧱 Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run dev

🧪 Pruebas
bash
Copiar
Editar
npm run test
🐳 Docker
Puedes correr Redis con Docker:

bash
Copiar
Editar
docker run --name redis-app -p 6379:6379 -d redis
📄 Documentación de la API
Disponible en http://localhost:3000/api-docs (Swagger).

✨ Autor
Desarrollado por [ Santiago Cardona]
