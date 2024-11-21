import React, { useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======
import { useNavigate } from 'react-router-dom';
import Cargando from '../../components/Cargando'
import '../../index.css';
>>>>>>> 85cd082ab6ba22e4f030030ce9c9e60d44bb91ea

const provinciasArgentinas = [
  'Buenos Aires', 'Córdoba', 'Chubut', 'Neuquén', 'Misiones', 'Mendoza',
  'San Juan', 'Salta', 'San Luis', 'Santa Cruz', 'Chaco', 'Santa Fe',
  'Río Negro', 'Tucumán', 'La Pampa', 'La Rioja', 'Santiago del Estero',
  'Formosa', 'Corrientes', 'Entre Ríos', 'Catamarca', 'Jujuy', 'Tierra del Fuego'
];

const AgregarLugar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    categoria: '',
    imagen: null,
    video: null
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],  // Actualizamos el archivo (imagen o video)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,  // Actualizamos el valor de texto
      });
    }
  };

  // Función para manejar el envío del formulario (Crear un nuevo lugar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    setMensaje('');
  
    if (!formData.nombre || !formData.ubicacion) {
      setMensaje('Faltan parámetros obligatorios: nombre y ubicación');
      setCargando(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('ubicacion', formData.ubicacion);
      formDataToSend.append('categoria', formData.categoria);
      
      // Solo añadimos los archivos si están presentes
      if (formData.imagen) formDataToSend.append('imagen', formData.imagen);
      if (formData.video) formDataToSend.append('video', formData.video);
  
      const response = await fetch('https://back-tesis-lovat.vercel.app/arcana/lugares', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.msg || 'Error al crear el lugar');
        throw new Error(errorResponse.msg || 'Error al crear el lugar');
      }
  
      // Si todo sale bien
      setFormData({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        categoria: '',
        imagen: null,
        video: null
      });
      setMensaje('Lugar creado con éxito');
    } catch (error) {
      setError(error.message || 'Error del servidor');
    } finally {
      setCargando(false);
    }
  };
  

  return (
    <div className="formulario-container">
      <h2>Agregar Lugar</h2>
      {mensaje && <p className="mensaje-error">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}

      <form onSubmit={handleSubmit} className="formulario">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación</label>
          <select
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccionar provincia</option>
            {provinciasArgentinas.map((provincia) => (
              <option key={provincia} value={provincia}>{provincia}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="" disabled>Seleccionar categoría</option>
            <option value="Arcana">Arcana</option>
            <option value="Popular">Popular</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="video">Video (opcional)</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="boton-submit" disabled={cargando}>
<<<<<<< HEAD
          {cargando ? 'Cargando...' : 'Crear Lugar'}
=======
          {cargando ? <Cargando/> : 'Agregar Lugar'}
>>>>>>> 85cd082ab6ba22e4f030030ce9c9e60d44bb91ea
        </button>
      </form>
    </div>
  );
};

export default AgregarLugar;
