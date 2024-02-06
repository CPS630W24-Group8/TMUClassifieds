import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";

const ItemsWantedPage = () => {
  return (
    <div>
      <Navbar />
      <Header title="Items wanted" />
      <br />

      <div className="container">

        <div className="row justify-content-center">
          <div className="col-md">
            <ItemCard itemName="Scientific calculator" image="imageIcon.png" description="The calculator must be unbroken and a scientific calculator." />
          </div>
          <div className="col-md">
            <ItemCard itemName="Computer Security (Art and Science), 2nd Edition" image="ComputerSecurity2ndEdition.jpg" description="The textbook by Mat Bishop and the print ISBN is 9780321712332. It needs to be brand new." />
          </div>
          <div className="col-md">
            <ItemCard itemName="Thinking as Computation: A First Course by Hector Levesque" image="imageIcon.png" description="Textbook can be online, brand new or used. Please contact ASAP." />
          </div>
        </div>

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

export default ItemsWantedPage;