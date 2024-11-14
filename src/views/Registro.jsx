import { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando Formulario');
      console.log(formData);
      const endPoint = 'http://127.0.0.1:3000/api/users/';
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      };
      const response = await fetch(endPoint, config);

      if (!response.ok) {
        console.error(response);
      }

      const data = await response.json();
      console.log(data);
      setFormData({
        name: '',
        email: '',
        password: ''
      });

    } catch (error) {
      console.log(error);
      alert('Error del Servidor');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Registro</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="name" className="login-label">Nombre</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          className="login-input"
        />

        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="login-input"
        />

        <label htmlFor="password" className="login-label">Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="login-input"
        />

        <button type="submit" className="login-button">Registrarme</button>
      </form>
    </div>
  );
};

export default Registro;
