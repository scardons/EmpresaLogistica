import { useNavigate } from 'react-router-dom';

const GreenBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-500 py-3 px-4 shadow-md">
      <div className="flex justify-center space-x-6 font-semibold text-white">
        <button onClick={() => navigate('/rastrear')} className="hover:underline relative z-10">Rastrear</button>
        <button onClick={() => navigate('/cotizar')} className="hover:underline relative z-10">Cotizar</button>
        <button onClick={() => navigate('/recoger')} className="hover:underline relative z-10">Recoger</button>
        <button onClick={() => navigate('/soluciones')} className="hover:underline relative z-10">Soluciones</button>
        <button onClick={() => navigate('/nuestra-red')} className="hover:underline relative z-10">Nuestra red</button>
      </div>
    </div>
  );
};

export default GreenBar;
