import React, { useState } from "react";
import { setCookie } from "../cookieManager";

const LogInCard = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [remember, setRemember] = useState(false);

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const logIn = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Proceed with login
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.status === 200) {
      // Login is valid for 1 month if the checkbox is checked
      setCookie("email", email, remember ? 2628000 : "");
      onLoggedIn();
      window.location.reload();
    } else {
      setErrorMessage(`Error: ${response.status} ${response.statusText}`);
    }
  };

  return (
    <div>
      <form onSubmit={logIn}>
        <div>
          <label htmlFor="loginEmail" className="form-label">Email address *</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="loginPassword" className="form-label">Password *</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <br />
        {/* Display error message if present */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberCheck"
            value={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="rememberCheck">Remember me</label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary" id="loginButton">Log In</button>
      </form>
    </div>
  );
};

export default LogInCard;
