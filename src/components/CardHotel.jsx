import React from 'react';
import { Link } from 'react-router-dom'; 
import '../app.css'; 

const CardHotel = ({ hotel }) => {
    return (
      <div className="card">
        <img 
          src={hotel.habitaciones?.[0]?.imgHabitacion || 'ruta-imagen-default.jpg'} 
          alt={`Imagen de la habitación de ${hotel.nombre || 'hotel'}`}
          className="card-image"
        />
        <h4>{hotel.nombre || 'Nombre del Hotel'}</h4>
        <p>{hotel.descripcion || 'Descripción no disponible'}</p>
        <Link to={`/detallesHotel/${hotel._id}`} className="card-button">
            Ver más
        </Link>
      </div>
    );
};

export default CardHotel;
