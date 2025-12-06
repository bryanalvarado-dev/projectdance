// src/components/LoginForm.jsx
import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // *** SIMULACIÓN DE INICIO DE SESIÓN ***
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword && storedEmail !== null) {
      onLogin(email); // Llama a la función de autenticación exitosa en App.jsx
    } else {
      alert('Error: Credenciales inválidas o no te has registrado.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default LoginForm;
