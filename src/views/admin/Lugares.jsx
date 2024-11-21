import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cargando from '../../components/Cargando';

const VistaAdminLugares = () => {
  const [lugares, setLugares] = useState([]);
  const [cargandoDestinos, setCargandoDestinos] = useState(true);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  const getDestinos = async () => {
    try {
      const resp = await fetch('https://back-tesis-lovat.vercel.app/arcana/lugares');
      const responseData = await resp.json();

      if (Array.isArray(responseData.data)) {
        setLugares(responseData.data);
      } else {
        throw new Error('La respuesta no contiene un array en la propiedad "data"');
      }
    } catch (error) {
      setErrorMensaje('Error al obtener los destinos. Intenta nuevamente.');
      console.error('Error al obtener destinos:', error);
    } finally {
      setCargandoDestinos(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!id) {
      alert('ID inválido');
      return;
    }

    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este lugar?');
    if (!confirmacion) return;

    try {
      const response = await fetch(`https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setLugares((prevLugares) => prevLugares.filter((lugar) => lugar._id !== id));
        setMensajeConfirmacion('Lugar eliminado correctamente');
      } else {
        setMensajeConfirmacion(data.msg || 'Error al eliminar el lugar');
      }
    } catch (error) {
      setMensajeConfirmacion('Error de red al eliminar el lugar');
      console.error('Error al eliminar lugar:', error);
    } finally {
      setTimeout(() => {
        setMensajeConfirmacion('');
      }, 4000);
    }
  };

  useEffect(() => {
    const mensajeAgregar = sessionStorage.getItem('mensajeConfirmacionAgregar');
    const mensajeEditar = sessionStorage.getItem('mensajeConfirmacionEditar');
  
    if (mensajeAgregar) {
      setMensajeConfirmacion(mensajeAgregar);
      sessionStorage.removeItem('mensajeConfirmacionAgregar');
    } else if (mensajeEditar) {
      setMensajeConfirmacion(mensajeEditar);
      sessionStorage.removeItem('mensajeConfirmacionEditar');
    }
  
    getDestinos();
  }, []);

  if (cargandoDestinos) {
    return <Cargando className="loading"/>  
  }

  if (errorMensaje) {
    return <div className="error-message">{errorMensaje}</div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Lugares</h2>
        <NavLink to="/admin/agregarLugar" className="add-button">
          Agregar Lugar
        </NavLink>
      </header>
  
      {mensajeConfirmacion && <p className="confirmation-message">{mensajeConfirmacion}</p>}
  
      {lugares.length === 0 ? (
        <p className="empty-message">No hay lugares disponibles.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th className='tdImagen'>Imagen</th>
              <th className='tdNombre'>Nombre</th>
              <th className='tdDescripcion'>Descripción</th>
              <th>Ubicación</th>
              <th>Categoría</th>
              <th className='tdAcciones'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lugares.map((lugar) => (
              <tr key={lugar._id}>
                <td>
                  <img
                    className="place-image"
                    src={lugar.imagen || 'ruta-a-imagen-predeterminada.jpg'}
                    alt={lugar.nombre}
                  />
                </td>
                <td className='tdNombre'>{lugar.nombre}</td>
                <td className='tdDescripcion'>{lugar.descripcion}</td>
                <td>{lugar.ubicacion}</td>
                <td>{lugar.categoria}</td>
                <td className="action-buttons">
                  <NavLink to={`/admin/editarLugar/${lugar._id}`} className="edit-button">
                    Editar
                  </NavLink>
                  <button className="delete-button" onClick={() => handleEliminar(lugar._id)}>
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
}

export default VistaAdminLugares;
