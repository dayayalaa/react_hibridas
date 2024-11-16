import React from 'react';
import { NavLink } from 'react-router-dom';

const VistaAdmin = () => {
  return (
    <div>
      <h2>Hola Admin</h2>
      <p>Bienvenido al panel de administrador.</p>
      <div>
        <ul>
        <li>
          <NavLink to="/admin/lugares" className="nav-link">
            Lugares
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/admin/hoteles" className="nav-link">
            Hoteles
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/admin/usuarios" className="nav-link">
            Usuarios
          </NavLink>
        </li>
      </ul>
      </div>
      
    </div>
  );
};

export default VistaAdmin;
