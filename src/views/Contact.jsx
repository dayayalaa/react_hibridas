import React from 'react';
import '../index.css'


const Contact = () => {
    return (
      <div className="contact-container">
        <h2>Contacto</h2>
        
        <div className="contact-info">
          <div className="info-item">
            <h3>Teléfono</h3>
            <p>+54 9 11 1234-5678</p>
          </div>
  
          <div className="info-item">
            <h3>Dirección</h3>
            <p>Av. Siempre Viva 742, Ciudad Autónoma de Buenos Aires, Argentina</p>
          </div>
  
          <div className="info-item">
            <h3>Redes Sociales</h3>
            <ul className="social-links">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>
  
        <div className="map-container">
          <h3>Ubicación</h3>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.992844158378!2d-58.39858048927207!3d-34.604342457417395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaea670d4e67%3A0x2198c954311ad6d9!2sDa%20Vinci%20%7C%20Primera%20Escuela%20de%20Arte%20Multimedial!5e0!3m2!1ses!2sar!4v1731628111743!5m2!1ses!2sar" 
            width="600" 
            height="450" 
            style={{border: 0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    );
  };
  
  export default Contact;
  