import React, { useState } from "react";
import { setCookie } from "../cookieManager";
// import * as bootstrap from "bootstrap/dist/js/bootstrap.min";

const RegisterCard = ({ onRegistered }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!passwordConfirm.trim()) {
      setErrorMessage("Please confirm your password.");
      return false;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const register = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Proceed with register
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.status === 200) {
      setCookie("email", email);
      onRegistered();
    } else {
      setErrorMessage(`Error: ${response.status} ${response.statusText}`);
    }
  };

  return (
    <div>
      <form onSubmit={register}>
        <div>
          <label htmlFor="registerEmail" className="form-label">Email address *</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="registerPassword" className="form-label">Password *</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="registerConfirmPassword" className="form-label">Confirm password *</label>
          <input
            type="password"
            className="form-control"
            id="registerConfirmPassword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <br />
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <br />
        <button type="submit" className="btn btn-primary" id="registerButton">Register</button>
      </form>

      <div className="toast-container position-fixed bottom-0 end-0">
        <div id="passwordWarningToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Invalid input</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {errorMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
