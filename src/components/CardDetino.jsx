import React from 'react';
import { Link } from "react-router-dom"; 


const TarjetaDestino = ({ destino }) => {
  const descripcionLimitada = destino.descripcion.length > 100 ? destino.descripcion.slice(0, 100) + "..." : destino.descripcion;

  return (
    <div className="card">
      <img className="card-image" src={destino.imagen} alt={destino.nombre} />
      <div className="card-content">
        <h3 className="card-title">{destino.nombre}</h3>
        <p className="card-description">{descripcionLimitada}</p>
        <Link to={`/detalles/${destino._id}`} className="card-button">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default TarjetaDestino;
