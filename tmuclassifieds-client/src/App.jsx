import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import LandingPage from "./pages/LandingPage";
import DefaultPage from "./pages/DefaultPage";
import ItemsWantedPage from "./pages/ItemsWantedPage";
import ItemsForSalePage from "./pages/ItemsForSalePage";
import AcademicServicesPage from "./pages/AcademicServicesPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  // React routing reference: https://www.w3schools.com/react/react_router.asp
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="*" Component={DefaultPage}/>
        <Route path="/items-wanted" Component={ItemsWantedPage} />
        <Route path="/items-for-sale" Component={ItemsForSalePage} />
        <Route path="/academic-services" Component={AcademicServicesPage} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/admin" Component={AdminPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
