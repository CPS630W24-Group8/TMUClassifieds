import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Item from "../components/Item";

const ItemsForSalePage = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <br />
        <p className="fs-3 text-center">Items For Sale</p>
        <div className="container overflow-hidden">
            <div class="row gy-5">
                <Item itemName="Math Textbook - Calculus 101" image="imageIcon.png" description="Description of the textbook, condition, and other details." />
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default ItemsForSalePage;