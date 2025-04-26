// src/Home.tsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Botones arriba a la derecha */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <i className="fas fa-truck mr-2"></i> Iniciar sesión
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Registrarse
        </button>
      </div>

      {/* Contenido central sin h-screen */}
      <div className="flex-grow flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">¡Bienvenido a mi app!</h1>
          <p className="text-lg text-gray-600">Gestiona tus envíos y rutas con facilidad.</p>
        </div>
      </div>
    </div>
  );
}
