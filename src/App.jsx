import './App.css'

// Importo las vistas
import Home from './views/Home';
import Contact from './views/Contact';
import Details from './views/Details';
import Login from './views/Login';
import Registro from './views/Registro';
import NotFound from './views/NotFound';

import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div >
      <header className="app">
        <h1>Aplicaciones Híbridas</h1>
        <hr className="divisor" />
      </header>
      
      <nav>
        <ul >
          <li>
            <NavLink to="/" className="nav-link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              Contactos
            </NavLink>
          </li>
          <li>
            <NavLink to="/registro" className="nav-link">
              Registro
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      
      {/* Área donde se mostrarán los componentes (Vistas) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
