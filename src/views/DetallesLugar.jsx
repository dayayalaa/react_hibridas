import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const DetallesLugar = () => {
    const { id } = useParams();
    const [lugar, setLugar] = useState(null);
  
    useEffect(() => {
      const fetchLugar = async () => {
        try {
          const response = await fetch(`https://back-tesis-lovat.vercel.app/arcana/lugares/${id}`);
          const data = await response.json();
          setLugar(data.data);
        } catch (error) {
          console.error('Error al obtener los detalles:', error);
        }
      };
  
      fetchLugar();
    }, [id]);
  
    if (!lugar) {
      return <div>Cargando...</div>;
    }
  
    return (
      <div>
        <h2>Detalle del lugar</h2>
        <img className="card-image" src={lugar.imagen} alt={lugar.nombre} />
        <h3>{lugar.nombre}</h3>
        <p>{lugar.descripcion}</p>
        <p>Categoria: {lugar.categoria}</p>
      </div>
    );
  };
  
  export default DetallesLugar;
