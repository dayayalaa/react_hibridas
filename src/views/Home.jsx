import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import CardHotel from '../components/CardHotel';  
import CardDestino from '../components/CardDetino'; 
import Session from '../components/session';
import '../App.css'; 

const Home = () => {
  const [destinosPopulares, setDestinosPopulares] = useState([]);
  const [destinosArcana, setDestinosArcana] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [cargandoDestinos, setCargandoDestinos] = useState(true);
  const [cargandoHoteles, setCargandoHoteles] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [categorias, setCategorias] = useState([]); 

  const getDestinos = async () => {
    try {
      const resp = await fetch('https://back-tesis-lovat.vercel.app/arcana/lugares');
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
  
  // Obtener los hoteles disponibles
  const getHoteles = async () => {
    try {
      const resp = await fetch('https://back-tesis-lovat.vercel.app/arcana/hoteles');
      const data = await resp.json();
      setHoteles(data);
    } catch (error) {
      setErrorMensaje('Error al obtener los hoteles. Intenta nuevamente.');
      console.error('Error al obtener hoteles:', error);
    } finally {
      setCargandoHoteles(false);
    }
  };

  const getCategorias = async () => {
    try {
      const resp = await fetch('https://back-tesis-lovat.vercel.app/arcana/lugares/cat/categoria');
      const data = await resp.json();
      setCategorias(data.data); 
    } catch (error) {
      setErrorMensaje('Error al obtener las categorías.');
      console.error('Error al obtener categorías:', error);
    }
  };

  const getCategoria = async (categoria) => {
    if (!categoria) return; 
    try {
      const resp = await fetch(`https://back-tesis-lovat.vercel.app/arcana/lugares/categoria/${categoria}`);
      const data = await resp.json();
      if (categoria === 'popular') {
        setDestinosPopulares(data.data || []); 
      } else if (categoria === 'arcana') {
        setDestinosArcana(data.data || []); 
      }
    } catch (error) {
      setErrorMensaje('Error al obtener destinos por categoría.');
      console.error('Error al obtener destinos por categoría:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser)); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUsuario(null);  
    window.location.reload();
  };

  //  Obtener lugares
  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    getCategoria(e.target.value); 
  };

  useEffect(() => {
    getDestinos();
    getHoteles();
    getCategorias();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenido a Arcana</h2>
      <p className="home-description">Explora destinos, vuelos y hoteles con la API de Arcana.</p>
      <Session usuario={usuario} handleLogout={handleLogout} />
      <hr className="home-divider"/>

      <section className='cont_categoria'>
        <h2>Seleccionar categoria</h2>
      <select value={categoriaSeleccionada} onChange={handleCategoriaChange} className='select'>
        <option value="">Seleccionar categoría</option>
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>{categoria}</option>
        ))}
      </select>
      </section>

      <hr className="home-divider" />

      {(categoriaSeleccionada === '' || categoriaSeleccionada === 'popular') && destinosPopulares.length > 0 && (
  <section className="section">
    <h3 className="section-title">Destinos Populares</h3>
    {cargandoDestinos ? (
      <div className="loading-indicator">Cargando destinos...</div>
    ) : errorMensaje ? (
      <p className="error-message">{errorMensaje}</p>
    ) : (
      <div className="cont_card">
        {destinosPopulares.map((destino, index) => (
          <CardDestino key={index} destino={destino} />
        ))}
      </div>
    )}
  </section>
)}

{(categoriaSeleccionada === '' || categoriaSeleccionada === 'arcana') && destinosArcana.length > 0 && (
  <section className="section">
    <h3 className="section-title">Destinos Arcana</h3>
    {cargandoDestinos ? (
      <div className="loading-indicator">Cargando destinos...</div>
    ) : errorMensaje ? (
      <p className="error-message">{errorMensaje}</p>
    ) : (
      <div className="cont_card">
        {destinosArcana.map((destino, index) => (
          <CardDestino key={index} destino={destino} />
        ))}
      </div>
    )}
  </section>
)}
 <hr className="home-divider" />

      <section className="section">
        <h3 className="section-title">Hoteles Disponibles</h3>
        {cargandoHoteles ? (
          <div className="loading-indicator">Cargando hoteles...</div>
        ) : errorMensaje ? (
          <p className="error-message">{errorMensaje}</p>
        ) : hoteles.length > 0 ? (
          <div className="cont_card">
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
