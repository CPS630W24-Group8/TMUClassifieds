import React from "react";
import Navbar from "../components/Navbar";

const DefaultPage = () => {
  return (
    <div>
      <Navbar />
      <br />
      <p className="fs-2 text-center">404 Page Not Found</p>
    </div>
  );
}

export default DefaultPage;