import React from "react";

const LogInCard = () => {
  const logIn = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    // TODO: Form validation
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <form onSubmit={logIn}>
        <div>
          <label htmlFor="loginEmail" className="form-label">Email address *</label>
          <input type="email" className="form-control" id="loginEmail" required />
        </div>
        <br />
        <div>
          <label htmlFor="loginPassword" className="form-label">Password *</label>
          <input type="password" className="form-control" id="loginPassword" required />
        </div>
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