// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/arcana';  

export const getVuelos = async () => {
  try {
    const response = await axios.get(`${API_URL}/vuelos`);
    return response.data;  // Devuelve los datos de los vuelos
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    throw error;
  }
};

export const getHoteles = async () => {
  try {
    const response = await axios.get(`${API_URL}/hoteles`);
    return response.data;  // Devuelve los datos de los hoteles
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    throw error;
  }
};
