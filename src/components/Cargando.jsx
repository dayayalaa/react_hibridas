import React from 'react';
import '../App.css'

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="loader"></div> 
      <span className="sr-only "> Cargando ... </span>
    </div>
  );
};

export default Spinner;
