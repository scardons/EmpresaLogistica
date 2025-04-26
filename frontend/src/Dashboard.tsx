import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard</h1>
      <p className="text-lg mb-6">Aquí podrás ver tu información general.</p>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
