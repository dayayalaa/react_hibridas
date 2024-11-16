import { NavLink } from 'react-router-dom';

const Session = ({ usuario, handleLogout }) => {
  return (
    <div className="session_usuario">
      {usuario ? (
        <div>
          <p>Hola, {usuario.nombre}</p>
          <button className="nav-link" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Session;
