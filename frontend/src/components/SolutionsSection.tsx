import { useNavigate } from 'react-router-dom';

const SolutionsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-10 px-6 text-white text-center">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-neon-pink mb-4">Otras soluciones que te pueden interesar</h2>
      <button
        onClick={() => navigate('/soluciones')}
        className="bg-gradient-to-r from-neon-orange to-neon-pink text-black font-bold px-6 py-3 rounded hover:bg-neon-green hover:text-black transition"
      >
        Ver más soluciones
      </button>
    </section>
  );
};

export default SolutionsSection;
