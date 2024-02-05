import React from "react";

const RegisterCard = () => {
  const register = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const passwordConfirm = event.target[2].value;

    console.log(email);
    console.log(password);
    console.log(passwordConfirm);
  };

  return (
    <form onSubmit={register}>
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
      <div>
        <label htmlFor="inputConfirmPassword" className="form-label">Confirm password *</label>
        <input type="password" className="form-control" id="inputConfirmPassword" />
      </div>
      <br />
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterCard;