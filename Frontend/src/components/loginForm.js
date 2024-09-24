import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.stringify({ email, password });

      const response = await axios.post("/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json", 
        },
      });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token
      onLogin(); // Call onLogin prop to update app state
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); 
      } else {
        setError("An unexpected error occurred."); 
      }
      console.error("Login error:", err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
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
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
