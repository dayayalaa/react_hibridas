import './App.css'
import Home from './views/Home'
import Contact from './views/Contact'
import DetallesLugar from './views/DetallesLugar'
import DetallesHotel from './views/DetallesHotel'
import Login from './views/Login'
import Registro from './views/Registro'
import NotFound from './views/NotFound'
import VistaAdmin from './views/admin/VistaAdmin'
import Lugares from './views/admin/Lugares';
import Usuarios from './views/admin/Usuarios';
import EditarLugar from './views/admin/EditarLugar';
import AgregarLugar from './views/admin/AgregarLugar';

import { Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  return (
    <div>
      <header className="app">
        <h1>TP2 - Ayala - Monney</h1>
        <hr className="divisor" />
      </header>

      <nav>
        <ul>
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              {user?.rols !== 'admin' ? (
                <>
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
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/" className="nav-link">
                      Inicio
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin" className="nav-link">
                      Vista admin
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detalles/:id" element={<DetallesLugar />} />
          <Route path="/detallesHotel/:id" element={<DetallesHotel />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>

        {user?.rols === 'admin' && (
          <Routes>
            <Route path="/admin" element={<VistaAdmin />} />
            <Route path="/admin/lugares" element={<Lugares />} />
            <Route path="/admin/editarLugar/:id" element={<EditarLugar />} />
            <Route path="/admin/agregarLugar" element={<AgregarLugar />} />
            <Route path="/admin/usuarios" element={<Usuarios />} />
           
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App
