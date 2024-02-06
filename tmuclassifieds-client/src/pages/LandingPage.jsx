import React from "react";
import Navbar from "../components/Navbar";
import LogInCard from "../components/LogInCard";
import RegisterCard from "../components/RegisterCard";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <div>
        <br />
        <h1 className="text-center">Welcome to TMU Classifieds</h1>
        <p className="text-center text-secondary">Find what you need or offer what you have within the TMU community</p>
      </div>

      <hr />

      {/* User login/register */}
      <div className="container">
        <div className="row">
          <div className="col">
            {/* https://getbootstrap.com/docs/5.3/components/accordion/ */}
            <div className="accordion" id="authenticationAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#logInCollapse" aria-expanded="true" aria-controls="logInCollapse">
                    <strong>Log In</strong>
                  </button>
                </h2>
                <div id="logInCollapse" className="accordion-collapse collapse show" data-bs-parent="#authenticationAccordion">
                  <div className="accordion-body">
                    <LogInCard />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#registerCollapse" aria-expanded="false" aria-controls="registerCollapse">
                    <strong>Register</strong>
                  </button>
                </h2>
                <div id="registerCollapse" className="accordion-collapse collapse" data-bs-parent="#authenticationAccordion">
                  <div className="accordion-body">
                    <RegisterCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LandingPage;