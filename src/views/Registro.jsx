import { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', contrasenia: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    if (!formData.nombre || !formData.email || !formData.contrasenia) {
      setError('Por favor, completa todos los campos');
      setLoading(false);
      return;
    }
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido');
      setLoading(false);
      return;
    }
  
    if (formData.contrasenia.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }
  
    try {
      const endPoint = 'https://back-tesis-lovat.vercel.app/arcana/usuarios/';
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          contrasenia: formData.contrasenia,  
        }),
      };
  
      const response = await fetch(endPoint, config);
  
      if (!response.ok) {
        const errorMessage = (await response.json()).msg || 'Error al registrar usuario';
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log('Registro exitoso:', data);
  
      if (data.token) {
        localStorage.setItem('token', data.token); 
        alert('Registro exitoso. Por favor, inicia sesión.');
      }
  
      setFormData({ nombre: '', email: '', contrasenia: '' });
    } catch (error) {
      console.error('Error del servidor:', error.message);
      setError(error.message || 'Error del servidor');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">Registro</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="nombre" className="login-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          onChange={handleChange}
          value={formData.nombre}
          className="login-input"
          required
        />

        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="login-input"
          required
        />

        <label htmlFor="contrasenia" className="login-label">Contraseña</label>
        <input
          type="password"  
          name="contrasenia"
          onChange={handleChange}
          value={formData.contrasenia}
          className="login-input"
          required
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>
    </div>
  );
};

export default Registro;
