import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const provinciasArgentinas = [
  'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'CABA', 'Corrientes', 'Entre Ríos',
  'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
  'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego',
  'Tucumán'
];

const AgregarLugar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    categoria: '',
    imagen: null,
    video: null,
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
    setFormData((prevData) => ({
      ...prevData,
      imagen: file,
    }));
    if (file) {
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
      video: file,
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
    <div>
      <h2>Agregar Lugar</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
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

        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="ubicacion">Ubicación</label>
          <select
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una provincia</option>
            {provinciasArgentinas.map((provincia, index) => (
              <option key={index} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="arcana">Arcana</option>
            <option value="historia">Historia</option>
            <option value="naturaleza">Naturaleza</option>
          </select>
        </div>

        <div>
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImagenChange}
          />
          {imagenPrevia && <img src={imagenPrevia} alt="Vista previa" />}
        </div>

        <div>
          <label htmlFor="video">Video</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Cargando...' : 'Agregar Lugar'}
        </button>
      </form>
    </div>
  );
};

export default AgregarLugar;
