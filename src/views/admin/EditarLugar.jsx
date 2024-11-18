import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormularioEditarLugar = () => {
  const { id } = useParams(); // Obtiene el id de la URL

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ubicacionLat: "",
    ubicacionLng: "",
    categoria: "",
    imagen: "",
    video: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    console.log("ID recibido:", id); // Verifica el valor del id
    const fetchLugar = async () => {
      if (!id) {
        setMensaje("ID no válido");
        return;
      }

      try {
        const response = await fetch(
          `https://back-tesis-lovat.vercel.app/arcana/lugares/editar/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setFormData({
            nombre: data.nombre || "",
            descripcion: data.descripcion || "",
            ubicacionLat: data.ubicacion?.coordinates[1] || "",
            ubicacionLng: data.ubicacion?.coordinates[0] || "",
            categoria: data.categoria || "",
            imagen: data.imagen || "",
            video: data.video || "",
          });
        } else {
          setMensaje("Error al cargar los datos del lugar");
        }
      } catch (error) {
        console.error("Error:", error);
        setMensaje("Error al cargar los datos del lugar");
      }
    };

    fetchLugar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            ubicacion: {
              type: "Point",
              coordinates: [
                parseFloat(formData.ubicacionLng),
                parseFloat(formData.ubicacionLat),
              ],
            },
            categoria: formData.categoria,
            imagen: formData.imagen,
            video: formData.video,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMensaje("Lugar actualizado correctamente");
      } else {
        setMensaje(result.msg || "Error al actualizar el lugar");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al actualizar el lugar");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Editar Lugar</h2>
      {mensaje && <p className="form-message">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Latitud:</label>
          <input
            type="text"
            name="ubicacionLat"
            value={formData.ubicacionLat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Longitud:</label>
          <input
            type="text"
            name="ubicacionLng"
            value={formData.ubicacionLng}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="arcana">Arcana</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <div className="form-group">
          <label>Imagen URL:</label>
          <input
            type="url"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Video URL:</label>
          <input
            type="url"
            name="video"
            value={formData.video}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default FormularioEditarLugar;
