import React, { useState, useEffect } from 'react';
import Cargando from '../../components/Cargando';

const VistaAdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://back-tesis-lovat.vercel.app/arcana/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener usuarios');

        setUsuarios(data.data || []); // Ajusta según la estructura de la respuesta
      } catch (error) {
        setErrorMensaje(error.message || 'Error al obtener usuarios.');
        console.error('Error:', error.message);
      } finally {
        setCargandoUsuarios(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      {cargandoUsuarios ? (
        <Cargando/>
      ) : errorMensaje ? (
        <p>{errorMensaje}</p>
      ) : usuarios.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <table className="table table-spaced">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rols}</td>
                <td className="cont_btn">
                  <button className="opciones-button">Editar</button>
                  <button className="eliminar-button">Eliminar</button>
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
