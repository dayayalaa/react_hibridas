import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"; 
import axios from 'axios';

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

  const [lugar, setLugar] = useState({
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
        const response = await axios.get(
          `https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`
        );

        if (response.status === 200) {
          const data = response.data;
          setLugar({
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

  const manejarCambio  = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setLugar((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setLugar((prev) => ({ ...prev, [name]: value }));
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

  const enviar = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`,
        lugar
      );

      if (response.status === 200) {
        sessionStorage.setItem("mensajeConfirmacion", "Lugar actualizado correctamente.");
        navigate("/admin/lugares");
      } else {
        setMensaje(response.data.msg || "Error al actualizar el lugar.");
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

      <form onSubmit={enviar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={lugar.nombre}
            onChange={manejarCambio }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={lugar.descripcion}
            onChange={manejarCambio }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación</label>
          <select
            id="ubicacion"
            name="ubicacion"
            value={lugar.ubicacion} 
            onChange={manejarCambio }
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
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={lugar.categoria}
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
            onChange={handleImagenChange}
          />
          {imagenPrevia && (
            <div>
              <img src={imagenPrevia} alt="Imagen Previa" />
            </div>
          )}
        </div>

        <div className="cont_boton">
          <button type="submit" className="save-button">Actualizar Lugar</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/admin/lugares')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarLugar;
