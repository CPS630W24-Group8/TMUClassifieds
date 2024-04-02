import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LogInCard from "../components/LogInCard";
import RegisterCard from "../components/RegisterCard";
import { getCookie } from "../cookieManager";

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);

  if (loggedIn) {
    return (
      <div>
        <Navbar />

        <div>
          <Header title="Welcome to TMU Classifieds" description="Find what you need or offer what you have within the TMU community." />
          <br />
          <div className="container">
            <p className="fs-5 text-center">This is a platform where TMU students can post and browse classified ads, contact the posters for the desired items and services.</p>
          </div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />

        <div>
          <Header title="Welcome to TMU Classifieds" description="Find what you need or offer what you have within the TMU community." />
          <br />
        </div>

        < div className="container">
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

        <Footer />
      </div >
    );
  }
}

export default LandingPage;