import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";

const AcademicServicesPage = () => {
  return (
    <div>
      <Navbar />
      <Header title="Academic services" />
      <br />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md">
            <ItemCard itemName="Math Textbook - Calculus 101" image="imageIcon.png" description="Description of the textbook, condition, and other details." />
          </div>
          <div className="col-md"></div>
          <div className="col-md"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AcademicServicesPage;