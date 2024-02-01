import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import LandingPage from "./pages/LandingPage";
import DefaultPage from "./pages/DefaultPage";

const App = () => {
  // React routing reference: https://www.w3schools.com/react/react_router.asp
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="*" Component={DefaultPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
