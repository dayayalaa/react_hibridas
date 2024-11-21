import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cargando from '../../components/Cargando'
import '../../index.css';

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
    video: '',
  });
  const [imagenPrevia, setImagenPrevia] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imagen: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPrevia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      video: file ? file : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.ubicacion) {
      setMensaje('Nombre y ubicación son obligatorios');
      return;
    }

    console.log('Datos a enviar:', formData); 
    const nuevoLugar = new FormData();
    nuevoLugar.append('nombre', formData.nombre);
    nuevoLugar.append('descripcion', formData.descripcion);
    nuevoLugar.append('ubicacion', formData.ubicacion);
    nuevoLugar.append('categoria', formData.categoria);
    if (formData.imagen) nuevoLugar.append('imagen', formData.imagen);
    if (formData.video) nuevoLugar.append('video', formData.video);


    for (let [key, value] of nuevoLugar.entries()) {
      console.log(key, value);
    }

    try {
      setCargando(true);
      const response = await fetch('https://back-tesis-lovat.vercel.app/arcana/lugares', {
        method: 'POST',
        body: nuevoLugar,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMensaje('Lugar creado exitosamente');
        navigate('/admin/lugares');
      } else {
        setMensaje(data.msg || 'Error al crear el lugar');
      }
    } catch (error) {
      setMensaje('Error de red. No se pudo crear el lugar');
      console.error('Error al crear lugar:', error);
    } finally {
      setCargando(false);
    }
  };


  return (
    <div className="formulario-container">
      <h2>Agregar Lugar</h2>
      {mensaje && <p className="mensaje-error">{mensaje}</p>}
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
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            required
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
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImagenChange}
          />
          {imagenPrevia && <img src={imagenPrevia} alt="Previsualización" className="imagen-previa" />}
        </div>

        <div className="form-group">
          <label htmlFor="video">Video (opcional)</label>
          <input
            type="url"
            id="video"
            name="video"
            value={formData.video}
            onChange={handleVideoChange}
          />
        </div>

        <button type="submit" className="boton-submit" disabled={cargando}>
          {cargando ? <Cargando/> : 'Agregar Lugar'}
        </button>
      </form>
    </div>
  );
};

export default AgregarLugar;
