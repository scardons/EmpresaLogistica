import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white p-4 ">
      <nav className="flex justify-between items-center">
      <div className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-neon-pink text-2xl font-bold">
      <span>ServiFast</span>
        </div>
        <div className="space-x-6">
          <button onClick={() => navigate('/nosotros')} className="text-black font-bold hover:text-neon-pink transition relative z-10">Nosotros</button>
          <button onClick={() => navigate('/novedades')} className="text-black font-bold hover:text-neon-pink transition relative z-10">Novedades</button>
          <button onClick={() => navigate('/contactos')} className="text-black font-bold hover:text-neon-pink transition relative z-10">Contactos</button>
          <button onClick={() => navigate('/otros')} className="text-black font-bold hover:text-neon-pink transition relative z-10">Otros</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
