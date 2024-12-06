import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const provinciasArgentinas = [
  'Buenos Aires', 'Córdoba', 'Chubut', 'Neuquén', 'Misiones', 'Mendoza',
  'San Juan', 'Salta', 'San Luis', 'Santa Cruz', 'Chaco', 'Santa Fe',
  'Río Negro', 'Tucumán', 'La Pampa', 'La Rioja', 'Santiago del Estero',
  'Formosa', 'Corrientes', 'Entre Ríos', 'Catamarca', 'Jujuy', 'Tierra del Fuego'
];

const AgregarLugar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    categoria: '',
    imagen: [], 
    video: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const manejarCambio  = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      console.log('Imagen seleccionada:', files[0]); 
        setFormData({
            ...formData,
            [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,  
      });
    }
  };

  const enviar = async (e) => {
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
      const dataToSend = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        ubicacion: formData.ubicacion,
        categoria: formData.categoria,
        imagen: formData.imagen.length > 0 ? formData.imagen : [],
        video: formData.video || ''
      };
  
      const response = await axios.post('https://back-tesis-lovat.vercel.app/arcana/lugares', dataToSend, {
        headers: {
          'Content-Type': 'application/json',  
        },
      });
  
      setFormData({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        categoria: '',
        imagen: [],
        video: ''
      });
      setMensaje('Lugar creado con éxito');
      localStorage.setItem('mensajeConfirmacion', 'Lugar creado correctamente.');
      navigate('/admin/lugares');
    } catch (error) {
      setError(error.response?.data?.msg || 'Error al crear el lugar');
      
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="formulario-container">
      <h2>Agregar Lugar</h2>
      {mensaje && <p className="mensaje-error">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}

      <form onSubmit={enviar} className="formulario">
        <div>
          <label htmlFor="nombre">nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={manejarCambio }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={manejarCambio }
          />
        </div>

        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación</label>
          <select
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={manejarCambio }
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
            onChange={manejarCambio }
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
            onChange={manejarCambio }
          />
        </div>

        <button type="submit" className="boton-submit" disabled={cargando}>
          {cargando ? 'Cargando...' : 'Crear Lugar'}
        </button>
      </form>
    </div>
  );
};

export default AgregarLugar;
