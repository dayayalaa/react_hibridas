import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', contrasenia: '' });
  const [errors, setErrors] = useState({ email: '', contrasenia: '' });
  const [backendError, setBackendError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
    setBackendError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBackendError('');

    let valid = true;
    const newErrors = { email: '', contrasenia: '' }; 

    if (!formData.email) {
      newErrors.email = 'Por favor ingresa un correo electrónico';
      valid = false;
    }

    if (!formData.contrasenia) {
      newErrors.contrasenia = 'Por favor ingresa una contraseña';
      valid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors); 
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://back-tesis-lovat.vercel.app/arcana/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      console.log('Inicio de sesión exitoso:', data);
      localStorage.setItem('token', data.token); 
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.rols === 'admin') {
        navigate('/admin');
        window.location.reload();
      } else {
        navigate('/');
        window.location.reload();
      }
      
    } catch (error) {
      console.error('Error:', error.message);
      setBackendError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>
      {backendError && <p className="error-message">{backendError}</p>} 
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="login-input"
          autoComplete="email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>} 
        
        <label htmlFor="contrasenia" className="login-label">Contraseña</label>
        <input
          type="password"
          name="contrasenia"
          onChange={handleChange}
          value={formData.contrasenia}
          className="login-input"
          autoComplete="current-password"
        />
        {errors.contrasenia && <p className="error-message">{errors.contrasenia}</p>} 

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default Login;
