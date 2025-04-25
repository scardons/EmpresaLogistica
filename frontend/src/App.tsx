// frontend/src/App.tsx
import './index.css';
import './App.css';
import 'animate.css'
import LoginForm from './Login';
import RegisterForm from './Registro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
