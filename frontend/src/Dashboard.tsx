import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const irARegistrarTransportista = () => {
    navigate('/registrar-transportista');
  };

  const irARegistrarEnvio = () => {
    navigate('/registrar-envio')
  }

  const irAsignarRuta = () => {
    navigate('/asignar-ruta')
  }

  return (
    <div className="p-8 text-center flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Bienvenido al Dashboard</h1>
      <p className="text-lg mb-6 text-white">Aquí podrás ver tu información general.</p>

      {/* Botón para registrar transportista */}
      <button
        onClick={irARegistrarTransportista}
        className="w-full max-w-md p-6 bg-blue-500 text-white rounded-lg text-2xl font-bold hover:bg-blue-600 transition duration-300"
      >
        Registrar Transportista
      </button>


      {/* Botón para registrar envio */}
      <button
        onClick={irARegistrarEnvio}
        className="w-full max-w-md p-6 bg-blue-500 text-white rounded-lg text-2xl font-bold hover:bg-blue-600 transition duration-300"
      >
        Registrar envio
      </button>

            {/* Botón para asignar ruta */}
            <button
        onClick={irAsignarRuta}
        className="w-full max-w-md p-6 bg-blue-500 text-white rounded-lg text-2xl font-bold hover:bg-blue-600 transition duration-300"
      >
        Asignar ruta
      </button>

      {/* Botón para cerrar sesión */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md text-base font-semibold hover:bg-red-600 transition duration-300 mt-4"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
