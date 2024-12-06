import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cargando from '../../components/Cargando';

const VistaAdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsuarios = async () => {
      setCargandoUsuarios(true);
      setErrorMensaje('');

      try {
        const token = localStorage.getItem('token'); 
        if (!token) throw new Error('No se pasó el JWT'); 

        const response = await fetch('https://back-tesis-lovat.vercel.app/arcana/usuarios', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });
      

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener usuarios');

        setUsuarios(data.data || []);
      } catch (error) {
        setErrorMensaje(error.message || 'Error al obtener usuarios.');
        console.error('Error:', error.message);
        if (error.message === 'No se pasó el JWT') {
          navigate('/login'); 
        }
      } finally {
        setCargandoUsuarios(false);
      }
    };

    fetchUsuarios();
  }, [navigate]);

  const handleEliminar = async (id) => {
    if (!id) {
      alert('ID inválido');
      return;
    }

    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmacion) return;

    try {
      const response = await fetch(`https://back-tesis-lovat.vercel.app/arcana/usuarios/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
        setMensajeConfirmacion('Usuario eliminado correctamente');
      } else {
        setMensajeConfirmacion(data.message || 'Error al eliminar el usuario');
      }
    } catch (error) {
      setMensajeConfirmacion('Error de red al eliminar el usuario');
      console.error('Error al eliminar usuario:', error);
    } finally {
      setTimeout(() => {
        setMensajeConfirmacion('');
      }, 4000);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Usuarios</h2>
      </header>
      {mensajeConfirmacion && <p className="confirmation-message">{mensajeConfirmacion}</p>}

      {cargandoUsuarios ? (
        <Cargando className="loading" />
      ) : errorMensaje ? (
        <div className="error-message">{errorMensaje}</div>
      ) : usuarios.length === 0 ? (
        <p className="empty-message">No hay usuarios disponibles.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th className="tdNombre">Nombre</th>
              <th className="tdEmail">Email</th>
              <th>Rol</th>
              <th className="tdAcciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td className="tdNombre">{usuario.nombre}</td>
                <td className="tdEmail">{usuario.email}</td>
                <td>{usuario.rols}</td>
                <td className="action-buttons">
                  <NavLink to={`/admin/editarUsuario/${usuario._id}`} className="edit-button">
                    Editar
                  </NavLink>
                  <button
                    className="delete-button"
                    onClick={() => handleEliminar(usuario._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VistaAdminUsuarios;
