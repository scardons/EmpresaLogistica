import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center space-x-4 p-8 bg-white">
      <button
        onClick={() => navigate('/login')}
        className="px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-pink text-black font-bold rounded transition relative z-10 hover:bg-gradient-to-r hover:from-neon-yellow hover:to-neon-blue"
        >
        <i className="fas fa-truck mr-2"></i> Iniciar sesión
      </button>
      <button
        onClick={() => navigate('/register')}
        className="px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-pink text-black font-bold rounded transition relative z-10 hover:bg-gradient-to-r hover:from-neon-yellow hover:to-neon-blue"
        >
        <i className="fas fa-truck mr-2"></i> Registrarse
      </button>
    </div>
  );
};

export default AuthButtons;
