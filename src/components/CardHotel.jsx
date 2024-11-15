import React from 'react';
import '../app.css'; 

const CardHotel = ({ hotel }) => {
    return (
      <div className="card-Destino">
        <img 
          src={hotel.habitaciones?.[0]?.imgHabitacion || 'ruta-imagen-default.jpg'} 
          alt="Imagen del hotel" 
          className="w-full h-40 object-cover rounded-md mb-4" 
        />
        <h4>{hotel.nombre || 'Nombre del Hotel'}</h4>
        <p>{hotel.descripcion || 'Descripción no disponible'}</p>
        <p>{hotel.precio ? `$${hotel.precio}` : 'Precio no disponible'}</p>
      </div>
    );
};

export default CardHotel;
