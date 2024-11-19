import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"; 



const provinciasArgentinas = [
  'Buenos Aires',
  'Córdoba',
  'Chubut',
  'Neuquén',
  'Misiones',
  'Mendoza',
  'San Juan',
  'Salta',
  'San Luis',
  'Santa Cruz',
  'Chaco',
  'Santa Fe',
  'Río Negro',
  'Tucumán',
  'La Pampa',
  'La Rioja',
  'Santiago del Estero',
  'Formosa',
  'Corrientes',
  'Entre Ríos',
  'Catamarca',
  'Jujuy',
  'Tierra del Fuego',
];

const EditarLugar = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '', 
    categoria: '',
    imagen: '',
    video: '',
  });
  const [imagenPrevia, setImagenPrevia] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchLugar = async () => {
      try {
        const response = await fetch(
          `https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`
        );
        const data = await response.json();
  
        if (response.ok) {
          setFormData({
            nombre: data.nombre || '',
            descripcion: data.descripcion || '',
            ubicacion: data.ubicacion || '',  
            categoria: data.categoria || '',
            imagen: data.imagen || '',
            video: data.video || '',
          });
          setImagenPrevia(data.imagen || '');  
        } else {
          setMensaje("Error al cargar los datos del lugar.");
        }
      } catch (error) {
        console.error("Error al cargar el lugar:", error);
        setMensaje("Error de red al cargar los datos.");
      }
    };
  
    if (id) {
      fetchLugar();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPrevia(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lugarData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion, 
      categoria: formData.categoria,
      imagen: formData.imagen,
      video: formData.video,
    };

    try {
      const response = await fetch(
        `https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lugarData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("mensajeConfirmacion", "Lugar actualizado correctamente.");
        navigate("/admin/lugares"); 
      } else {
        setMensaje(result.msg || "Error al actualizar el lugar.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al actualizar el lugar.");
    }
  };

  return (
    <div className="formulario-container">
      <h2>Editar Lugar</h2>

      {mensaje && <p className="mensaje-error">{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
            <option value="">Seleccione una provincia</option>
            {provinciasArgentinas.map((provincia, index) => (
              <option key={`${provincia}-${index}`} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImagenChange}
          />
          {imagenPrevia && (
            <div>
              <img src={imagenPrevia} alt="Imagen Previa" />
            </div>
          )}
        </div>

        <button type="submit">Actualizar Lugar</button>
      </form>
    </div>
  );
};


export default EditarLugar;