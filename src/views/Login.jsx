import { useState } from "react";


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando Formulario');
    console.log(formData);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <button type="submit" className="login-button">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
