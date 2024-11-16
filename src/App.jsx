import './App.css'

// Importo las vistas
import Home from './views/Home'
import Contact from './views/Contact'
import DetallesLugar from './views/DetallesLugar'
import DetallesHotel from './views/DetallesHotel'
import Login from './views/Login'
import Registro from './views/Registro'
import NotFound from './views/NotFound'
import VistaAdmin from './views/VistaAdmin'
// import Lugares from './views/Lugares';
// import Hoteles from './views/Hoteles';
// import Usuarios from './views/Usuarios';

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
          <Route path="*" element={<NotFound />} />
        </Routes>

        {user?.rols === 'admin' && (
          <Routes>
            <Route path="/admin" element={<VistaAdmin />} />
            {/* <Route path="/admin/lugares" element={<Lugares />} />
            <Route path="/admin/hoteles" element={<Hoteles />} />
            <Route path="/admin/usuarios" element={<Usuarios />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App
