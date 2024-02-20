import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LogInCard from "../components/LogInCard";
import RegisterCard from "../components/RegisterCard";
import { getCookie } from "../cookieManager";

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);

  // If user is already logged in
  useEffect(() => {
    setLoggedIn(getCookie("email") != "");
  });

  return (
    <div>
      <Navbar />

      {loggedIn
        ?
        <div>
          <Header title="Welcome to TMU Classifieds" description="Find what you need or offer what you have within the TMU community." />
          <br />
          <div className="container">
            <p className="fs-5 text-center">Some text here to describe the web site</p>
          </div>
        </div>
        :
        < div className="container">
          <br />
          <div className="accordion" id="authenticationAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#logInCollapse" aria-expanded="true" aria-controls="logInCollapse">
                  <strong>Log In</strong>
                </button>
              </h2>
              <div id="logInCollapse" className="accordion-collapse collapse show" data-bs-parent="#authenticationAccordion">
                <div className="accordion-body">
                  <LogInCard onLoggedIn={() => setLoggedIn(true)} />
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
                  <RegisterCard onRegistered={() => setLoggedIn(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }



      <Footer />

    </div >
  )
}

export default LandingPage;