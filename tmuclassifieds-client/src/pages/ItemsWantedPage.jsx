import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Item from "../components/Item";

const ItemsWantedPage = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <br />
        <p className="fs-3 text-center">Items Wanted</p>
        <div className="container overflow-hidden">
            <div class="row gy-5">
                <Item itemName="Scientific calculator" image="imageIcon.png" description="The calculator must be unbroken and a scientific calculator." />
                <Item itemName="Computer Security (Art and Science), 2nd Edition" image="ComputerSecurity2ndEdition.jpg" description="The textbook by Mat Bishop and the print ISBN is 9780321712332. It needs to be brand new." />
                <Item itemName="Thinking as Computation: A First Course by Hector Levesque" image="imageIcon.png" description="Textbook can be online, brand new or used. Please contact ASAP." />
                <Item itemName="Math Textbook - Calculus 101" image="imageIcon.png" description="Description of the textbook, condition, and other details." />
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default ItemsWantedPage;