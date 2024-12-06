import React from 'react';
import { Link } from 'react-router-dom'; 


const CardHotel = ({ hotel }) => {

  const descripcionLimitada = hotel.descripcion.length > 100 ? hotel.descripcion.slice(0, 100) + "..." : hotel.descripcion;

  return (
    <div className="card">
      <img 
        src={hotel.habitaciones?.[0]?.imgHabitacion || 'ruta-imagen-default.jpg'} 
        alt={`Imagen de la habitación de ${hotel.nombre || 'hotel'}`}
        className="card-image"
      />
      <h4>{hotel.nombre || 'Nombre del Hotel'}</h4>
      <p>{descripcionLimitada || 'Descripción no disponible'}</p> {/* Aquí se usa descripcionLimitada */}
      <Link to={`/detallesHotel/${hotel._id}`} className="card-button">
        Ver más
      </Link>
    </div>
  );
};

export default CardHotel;
