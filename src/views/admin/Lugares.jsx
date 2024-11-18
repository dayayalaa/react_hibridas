import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const VistaAdminLugares = () => {
  const [lugares, setLugares] = useState([]); 
  const [cargandoDestinos, setCargandoDestinos] = useState(true); 
  const [errorMensaje, setErrorMensaje] = useState(''); 

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
    try {
      const response = await fetch(`https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Eliminar el lugar de la lista en el frontend
        setLugares(lugares.filter(lugar => lugar.id !== id));
        alert('Lugar eliminado correctamente');
      } else {
        alert(data.msg || 'Error al eliminar el lugar');
      }
    } catch (error) {
      alert('Error de red al eliminar el lugar');
      console.error('Error al eliminar lugar:', error);
    }
  };
  


  useEffect(() => {
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
      <h2>Lugares</h2>
      {lugares.length === 0 ? (
        <p>No hay lugares disponibles.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
            <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {lugares.map((lugar, index) => (
  <tr key={lugar.id || index}> 
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
    <td className="cont_btn">
      <NavLink to={`/admin/editarLugar/${lugar.id}`} className="opciones-button">
        Editar
      </NavLink>
      <button className="eliminar-button" onClick={() => handleEliminar(lugar.id)}>
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
