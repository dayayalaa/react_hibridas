import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import CardHotel from '../components/CardHotel';  
import CardDestino from '../components/CardDetino'; 
import ProductsContainer from "../components/ProductsContainer";
import '../App.css'; 

const Home = () => {
  const [destinosPopulares, setDestinosPopulares] = useState([]);
  const [destinosArcana, setDestinosArcana] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [cargandoDestinos, setCargandoDestinos] = useState(true);
  const [cargandoHoteles, setCargandoHoteles] = useState(true);

  const getDestinos = async () => {
    try {
      const resp = await fetch('http://localhost:3000/arcana/lugares');
      const responseData = await resp.json(); 
      if (Array.isArray(responseData.data)) {
        setDestinosPopulares(responseData.data.filter(destino => destino.categoria === 'popular'));
        setDestinosArcana(responseData.data.filter(destino => destino.categoria === 'arcana'));
      } else {
        throw new Error('La respuesta no contiene un array en la propiedad "data"');
      }
    } catch (error) {
      setErrorMensaje('Error al obtener los destinos. Intenta nuevamente.');
      console.error('Error al obtener destinos:', error);
    } finally {
      setCargandoDestinos(false);
    }
  };
  
  const getHoteles = async () => {
    try {
      const resp = await fetch('http://localhost:3000/arcana/hoteles');
      const data = await resp.json();
      setHoteles(data);
    } catch (error) {
      setErrorMensaje('Error al obtener los hoteles. Intenta nuevamente.');
      console.error('Error al obtener hoteles:', error);
    } finally {
      setCargandoHoteles(false);
    }
  };

  useEffect(() => {
    getDestinos();
    getHoteles();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenido a Arcana</h2>
      <p className="home-description">Explora destinos, vuelos y hoteles con la API de Arcana.</p>
      <NavLink to='/login' className="home-login-link">Inicia sesión</NavLink>
      <hr className="home-divider" />

      <section className="section">
        <h3 className="section-title">Destinos Populares</h3>
        {cargandoDestinos ? (
          <div className="loading-indicator">Cargando destinos...</div>
        ) : errorMensaje ? (
          <p className="error-message">{errorMensaje}</p>
        ) : destinosPopulares.length > 0 ? (
          <div className="destinos-container">
            {destinosPopulares.map((destino, index) => (
              <CardDestino key={index} destino={destino} />
            ))}
          </div>
        ) : (
          <p className="no-data">No hay destinos populares disponibles</p>
        )}
      </section>

      <section className="section">
        <h3 className="section-title">Destinos Arcana</h3>
        {cargandoDestinos ? (
          <div className="loading-indicator">Cargando destinos...</div>
        ) : errorMensaje ? (
          <p className="error-message">{errorMensaje}</p>
        ) : destinosArcana.length > 0 ? (
          <div className="destinos-container">
            {destinosArcana.map((destino, index) => (
              <CardDestino key={index} destino={destino} />
            ))}
          </div>
        ) : (
          <p className="no-data">No hay destinos Arcana disponibles</p>
        )}
      </section>

      <section className="section">
        <h3 className="section-title">Hoteles Disponibles</h3>
        {cargandoHoteles ? (
          <div className="loading-indicator">Cargando hoteles...</div>
        ) : errorMensaje ? (
          <p className="error-message">{errorMensaje}</p>
        ) : hoteles.length > 0 ? (
          <div className="hoteles-container">
            {hoteles.map((hotel, index) => (
              <CardHotel key={index} hotel={hotel} />
            ))}
          </div>
        ) : (
          <p className="no-data">No hay hoteles disponibles</p>
        )}
      </section>
    </div>
  );
};

export default Home;
