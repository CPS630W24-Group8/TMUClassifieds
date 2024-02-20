import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const DefaultPage = () => {
  return (
    <div>
      <Navbar />
      <Header title="Welcome to TMU Classifieds" description="Find what you need or offer what you have within the TMU community." />
      <br />
      <p className="fs-2 text-center">404 Page Not Found</p>
    </div>
  );
}

export default DefaultPage;