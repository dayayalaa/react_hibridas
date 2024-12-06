import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Cargando from '../components/Cargando'

const DetallesHotel = () => {
  const { id } = useParams(); 
  const [habitaciones, setHabitaciones] = useState([]); 
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await fetch(`https://back-tesis-lovat.vercel.app/arcana/hoteles/${id}/habitaciones`);
        
        if (!response.ok) {
          throw new Error('No se pudieron obtener las habitaciones');
        }
        
        const data = await response.json();
        setHabitaciones(data.habitaciones); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setCargando(false);
      }
    };

    fetchHabitaciones(); 
  }, [id]);

  if (cargando) {
    return <Cargando/>;
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (habitaciones.length === 0) {
    return <div>No hay habitaciones disponibles para este hotel</div>; 
  }

  return (
    <div>
      <h2>Habitaciones disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {habitaciones.map(habitacion => (
          <div key={habitacion._id} className='card'>
            <img
              src={habitacion.imgHabitacion || 'ruta-imagen-default.jpg'}
              alt={habitacion.tipo}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{habitacion.tipo}</h3>
            <p>{habitacion.descripcion}</p>
            <p>Capacidad: {habitacion.capacidad} persona(s)</p>
            <p>Precio por noche: ${habitacion.precioPorNoche}</p>
            <p>
              Disponibilidad: {new Date(habitacion.disponibilidad.desde).toLocaleDateString()} -{' '}
              {new Date(habitacion.disponibilidad.hasta).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetallesHotel;
