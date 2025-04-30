// frontend/src/App.tsx
import './index.css';
import './App.css';
import 'animate.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';
import RegisterForm from './Registro';
import Dashboard from './Dashboard';
import Home from './Home';
import RegisterTransportistaForm from './RegisterTransportistaForm';
import RegistrarEnvio from './RegistrarEnvio';
import AsignarRuta from './AsignarRuta';
import VerEstadoEnvio from './ConsultarEstadoEnvio';
import ActualizarEstadoEnvio from './ActualizarEstadoEnvio';
import ListarEnvios from './ListarEnvios';

function App() {
  return (
    <Router basename="/EmpresaLogistica"> {/* Añadir basename aquí */}
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/registrar-transportista" element={<RegisterTransportistaForm />} />
        <Route path="/registrar-envio" element={<RegistrarEnvio />} />
        <Route path="/asignar-ruta" element={<AsignarRuta />} />
        <Route path="/ver-estado" element={<VerEstadoEnvio />} />
        <Route path="/actualizar-estado" element={<ActualizarEstadoEnvio />} />
        <Route path="/envios" element={<ListarEnvios />} />
      </Routes>
    </Router>
  );
}

export default App;
