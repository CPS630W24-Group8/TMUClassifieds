import React from "react";
import * as bootstrap from "bootstrap/dist/js/bootstrap.min";

const RegisterCard = () => {
  const register = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const passwordConfirm = event.target[2].value;

    // TODO: Form validation
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);

    if (password !== passwordConfirm) {
      bootstrap.Toast.getOrCreateInstance(document.getElementById("passwordWarningToast")).show();
      return;
    }
  };

  return (
    <div>
      <form onSubmit={register}>
        <div>
          <label htmlFor="registerEmail" className="form-label">Email address *</label>
          <input type="email" className="form-control" id="registerEmail" required/>
        </div>
        <br />
        <div>
          <label htmlFor="registerPassword" className="form-label">Password *</label>
          <input type="password" className="form-control" id="registerPassword" required/>
        </div>
        <br />
        <div>
          <label htmlFor="registerConfirmPassword" className="form-label">Confirm password *</label>
          <input type="password" className="form-control" id="registerConfirmPassword" required/>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      {/* https://getbootstrap.com/docs/5.3/components/toasts/ */}
      <div className="toast-container position-fixed bottom-0 end-0">
        <div id="passwordWarningToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Invalid passwords</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
              Please make sure the passswords match.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;