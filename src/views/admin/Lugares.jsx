import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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
      alert("ID inválido");
      return;
    }
  
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este lugar?");
    if (!confirmacion) return;
  
    try {
      const response = await fetch(`https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setLugares((prevLugares) => prevLugares.filter((lugar) => lugar._id !== id));
        const successMessage = "Lugar eliminado correctamente";
        setMensajeConfirmacion(successMessage);
        sessionStorage.setItem("mensajeConfirmacion", successMessage);
        
      } else {
        const errorMessage = data.msg || "Error al eliminar el lugar"; 
        setMensajeConfirmacion(errorMessage); 
        setMensajeConfirmacion(errorMessage); 
      setTimeout(() => {
        setMensajeConfirmacion('');
      }, 4000); 
      }
    } catch (error) {
      const errorMessage = "Error de red al eliminar el lugar"; 
      setMensajeConfirmacion(errorMessage); 
      console.error("Error al eliminar lugar:", error);
      setMensajeConfirmacion(errorMessage); 
      setTimeout(() => {
        setMensajeConfirmacion('');
      }, 4000); 
    }
  };

  useEffect(() => {
    const storedMessage = sessionStorage.getItem("mensajeConfirmacion");
    if (storedMessage) {
      setMensajeConfirmacion(storedMessage);
      sessionStorage.removeItem("mensajeConfirmacion");

      setTimeout(() => {
        setMensajeConfirmacion('');
      }, 4000);
    }
    getDestinos();
  }, []); 

  if (cargandoDestinos) {
    return <div>Cargando...</div>;
  }

  if (errorMensaje) {
    return <div>{errorMensaje}</div>;
  }

  return (
    <div>
     
      <div>
        <h2>Lugares</h2>

  <NavLink to="/admin/agregarLugar" className="nav-link">
            Agregar
          </NavLink>
</div>

      {mensajeConfirmacion && <p>{mensajeConfirmacion}</p>}

      {lugares.length === 0 ? (
        <p>No hay lugares disponibles.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lugares.map((lugar) => (
              <tr key={lugar._id}>
                <td>
                  <img
                    className="card-image"
                    src={lugar.imagen || 'ruta-a-imagen-predeterminada.jpg'}
                    alt={lugar.nombre}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </td>
                <td>{lugar.nombre}</td>
                <td>{lugar.descripcion}</td>
                <td>{lugar.ubicacion}</td>
                <td className="cont_btn">
                  <NavLink to={`/admin/editarLugar/${lugar._id}`} className="opciones-button">
                    Editar
                  </NavLink>
                  <button className="eliminar-button" onClick={() => handleEliminar(lugar._id)}>
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

export default VistaAdminLugares;
