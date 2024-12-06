import { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', contrasenia: '' });
  const [errors, setErrors] = useState({ nombre: '', email: '', contrasenia: '' });
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(''); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
    setBackendError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ nombre: '', email: '', contrasenia: '' });
    setBackendError(''); 

    let formIsValid = true;
    const newErrors = { nombre: '', email: '', contrasenia: '' };

    if (!formData.nombre) {
      newErrors.nombre = 'Por favor, ingresa tu nombre';
      formIsValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Por favor, ingresa tu correo electrónico';
      formIsValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Por favor ingresa un correo electrónico válido';
        formIsValid = false;
      }
    }

    if (!formData.contrasenia) {
      newErrors.contrasenia = 'Por favor, ingresa una contraseña';
      formIsValid = false;
    } else if (formData.contrasenia.length < 6) {
      newErrors.contrasenia = 'La contraseña debe tener al menos 6 caracteres';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const endPoint = 'https://back-tesis-lovat.vercel.app/arcana/usuarios/';
      const config = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(formData),
      };

      const response = await fetch(endPoint, config);

      const data = await response.json();
      if (!response.ok) {
        setBackendError(data.msg || 'Error desconocido al registrar el usuario');
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Registro exitoso. Por favor, inicia sesión.');
        setFormData({ nombre: '', email: '', contrasenia: '' });
      }
    } catch (error) {
      console.error('Error del servidor:', error.message);
      setBackendError('Error al conectarse al servidor. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Registro</h2>
      
      {backendError && <p className="error-message">{backendError}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="nombre" className="login-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          onChange={handleChange}
          value={formData.nombre}
          className="login-input"
        />
        {errors.nombre && <p className="error-message">{errors.nombre}</p>}

        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="login-input"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label htmlFor="contrasenia" className="login-label">Contraseña</label>
        <input
          type="password"
          name="contrasenia"
          onChange={handleChange}
          value={formData.contrasenia}
          className="login-input"
        />
        {errors.contrasenia && <p className="error-message">{errors.contrasenia}</p>} 

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>
    </div>
  );
};

export default Registro;
