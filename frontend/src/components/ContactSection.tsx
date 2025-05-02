import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const navigate = useNavigate();

  return (
<section className="bg-white text-black py-10 px-6 text-center">
<h2 className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-neon-pink text-2xl font-bold mb-4">¿Quieres saber más?</h2>
      <p className="mb-6">Envíanos tus datos y pronto un asesor se comunicará contigo.</p>
      <button
        onClick={() => navigate('/contactos')}
        className="bg-gradient-to-r from-neon-orange to-neon-pink text-black font-bold px-6 py-3 rounded hover:bg-neon-pink hover:text-black transition relative z-10"
      >
        Contacta a un asesor
      </button>
    </section>
  );
};

export default ContactSection;
