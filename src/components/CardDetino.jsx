import React from 'react';
import '../app.css';

const TarjetaDestino = ({ destino }) => {
  return (
    <div className="card-Destino">
      <img className="card-image" src={destino.imagen} alt={destino.nombre} />
      <div className="card-content">
        <h3 className="card-title">{destino.nombre}</h3>
        <p className="card-description">{destino.descripcion}</p>
        <button className="card-button">Ver más</button>
      </div>
    </div>
  );
};

export default TarjetaDestino;
