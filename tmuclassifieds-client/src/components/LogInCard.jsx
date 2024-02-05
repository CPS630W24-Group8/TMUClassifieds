import React from "react";

const LogInCard = () => {
  const logIn = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    console.log(email);
    console.log(password);
  };

  return (
    <form onSubmit={logIn}>
      <div>
        <label htmlFor="inputEmail" className="form-label">Email address *</label>
        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
      </div>
      <br />
      <div>
        <label htmlFor="inputPassword" className="form-label">Password *</label>
        <input type="password" className="form-control" id="inputPassword" />
      </div>
      <br />
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
      </div>
      <br />
      <button type="submit" className="btn btn-primary">Log In</button>
    </form>
  );
};

export default LogInCard;