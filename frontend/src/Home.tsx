import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()

  return(
    <div className="flex flex-col min-h-screen bg-background text-white">
      {/*Cabecera con enlaces de navegacion */}
      <header className="bg-black p-4">
        <nav className="flex justify-between items-center">
          <div className="text-neon-green text-2x1 font-bold">
            <span>ServiFast</span>
          </div>
          <div className="space-x-6">
            <button onClick={() => navigate('/nosotros')} className="text-neon-green hover:text-neon-pink transition">Nosotros</button>
            <button onClick={() => navigate('/novedades')} className="text-neon-green hover:text-neon-pink transition">Novedades</button>
            <button onClick={() => navigate('/contactos')} className="text-neon-green hover:text-neon-pink transition">Contactos</button>
            <button onClick={() => navigate('/otros')} className="text-neon-green hover:text-neon-pink transition">Otros</button>
          </div>
        </nav>
      </header>

      {/* Franja verde con enlaces adicionales */}
      <div className="bg-neon-green py-3 px-4">
        <div className="flex justify-center space-x-6 font-semibold text-black">
          <button onClick={() => navigate('/rastrear')} className="hover:underline">Rastrear</button>
          <button onClick={() => navigate('/cotizar')} className="hover:underline">Cotizar</button>
          <button onClick={() => navigate('/recoger')} className="hover:underline">Recoger</button>
          <button onClick={() => navigate('/soluciones')} className="hover:underline">Soluciones</button>
          <button onClick={() => navigate('/nuestra-red')} className="hover:underline">Nuestra red</button>

        </div>
      </div>

      {/*Imagen del camion*/}
      <div className="w-full">
        <img src="/camion.png" alt="Camion de entrega" className="w-full" style={{height: '380px'}} />
      </div>

      {/* Botones de sesión - ahora centrados abajo */}
      <div className="flex justify-center space-x-4 p-8">
        <button onClick={() => navigate('/login')}
          className="px-4 py-2 bg-neon-green font-bold text-black rounded hover:bg-neon-pink transition"
        >
          <i className="fas fa-truck mr-2"></i> Iniciar sesión
        </button>
        <button onClick={() => navigate('/register')}
          className="px-4 py-2 bg-neon-pink text-black font-bold rounded hover:bg-neon-green transition"
        >
          <i className="fas fa-truck mr-2"></i> Registrarse
        </button>
      </div>

      {/*contenido central*/}
      <div className="flex-grow flex items-center justify-center text-center">
        <div>
          <h1 className="font-bold mb-5 text-neon-green">¡Bienvenido a mi app!</h1>
          <p className="text-lg text-white ">Gestiona tus envíos y rutas con facilidad.</p>
        </div>
      </div>
    </div>
  )
}