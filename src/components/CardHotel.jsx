import React from 'react';
import '../app.css'; 

const CardHotel = ({ hotel }) => {
    return (
      <div className="card-hotel">
        <img src={hotel.imagen} alt={`Imagen de ${hotel.nombre}`} className="w-full h-40 object-cover rounded-lg" />
        <h4>{hotel.nombre}</h4>
        <p>{hotel.precio}</p>
      </div>
    );
  };
  
  export default CardHotel;
  