import React, { useState } from "react";

const LogInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    
    setErrorMessage("");
    return true;
  };

  const logIn = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Proceed with login
      console.log("Logging in...");
      console.log("Email:", email);
      console.log("Password:", password);
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <br />
        {/* Display error message if present */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <br />
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="rememberCheck" />
          <label className="form-check-label" htmlFor="rememberCheck">Remember me</label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
};

export default LogInCard;
