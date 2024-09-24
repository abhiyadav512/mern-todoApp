import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password, username };
      await axios.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      onRegister();
    } catch (err) {
      setError(err.response.data);
      console.error("Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="login-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
      />
      <button type="submit" className="login-button">Register</button>
    </form>
  );
};

export default RegisterForm;
