import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultPage = () => {
  return (
    <div>
      <Navbar />
      <Header title="Error 404" description="Page not found" />
      <Footer />
    </div>
  );
}

export default DefaultPage;