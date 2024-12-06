import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarUsuarios = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    rols: ''
  });
  
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        
        const token = localStorage.getItem('token'); 

        if (!token) {
          setMensaje('No estás autorizado para ver esta página.');
          return;
        }

        const response = await axios.get(`https://back-tesis-lovat.vercel.app/arcana/usuarios/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`  
          }
        });

 
        console.log("Respuesta de la API:", response.data); 

        if (response.status === 200) {
          setUsuario(response.data.data);
        } else {
          setMensaje('Error al cargar los datos del usuario.');
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        setMensaje('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false); 
      }
    };
  
    fetchUsuario();
  }, [id]);
  
  const cambiUsuario = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const enviar = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      if (!token) {
        setMensaje('No estás autorizado para actualizar este usuario.');
        return;
      }

    
      const response = await axios.put(`https://back-tesis-lovat.vercel.app/arcana/usuarios/${id}`, usuario, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.status === 200) {
        localStorage.setItem('mensajeConfirmacion', 'Usuario actualizado correctamente.');
        navigate('/admin/usuarios');
      } else {
        setMensaje(response.data.msg || 'Error al actualizar el usuario.');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setMensaje('Error al actualizar el usuario.');
    }
  };

  if (loading) {
    return <p>Cargando usuario...</p>;
  }

  if (!usuario) {
    return <p>No se pudo cargar el usuario.</p>;
  }

  return (
    <div className="formulario-container">
      <h3>Editar Usuario</h3>

      {mensaje && <p className="error-message">{mensaje}</p>}

      <form onSubmit={enviar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={cambiUsuario}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={usuario.email}
            onChange={cambiUsuario}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rols">Rol:</label>
          <select
            id="rols"
            name="rols"
            value={usuario.rols}  
            onChange={cambiUsuario}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="guia">Guía</option>
          </select>
        </div>

        <div className="cont_boton">
          <button type="submit" className="save-button">Guardar Cambios</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/admin/usuarios')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuarios;
