import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import SearchBar from "../components/SearchBar";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import AddServiceCard from "../components/AddServiceCard";
import Spinner from "../components/Spinner";

const AcademicServicesPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [filteredServices, setFilteredServices] = useState();
  const [allServices, setAllServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);
  useEffect(() => { getServices(); }, []);

  // splitting the list of items into sub arrays of size
  const splitListInto = (list, size) => {
    let newList = [];
    while (Math.floor(list.length / size) >= 1) {
      const anArray = list.splice(0, size);
      newList.push(anArray);
    }
    if (list.length > 0) {
      newList.push(list);
    }
    return newList;
  }

  // get academic services from the database
  const getServices = async () => {
    setIsLoading(true);
    let result = await axios.get("http://localhost:3001/api/service/get-service");
    result = result.data.data;
    const splitResult = splitListInto(result, 3);
    setAllServices(splitResult);
    setFilteredServices(splitResult);
    setIsLoading(false);
  }

  // Handle search
  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    let filtered = [];
    allServices.map(serviceRow => {
      serviceRow.map(service => {
        if (service.title.toLowerCase().includes(input.toLowerCase())) filtered.push(service);
      })
    });

    const splitFiltered = splitListInto(filtered, 3);
    setFilteredServices(splitFiltered);
  };

  // Do not render content if user is not logged in
  if (!loggedIn) {
    return (
      <div>
        <Navbar />
        <Header title="Academic services" />
        <br />
        <UnauthDisplay />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Header title="Academic services" />

      <div className="container">
        <AddServiceCard modalTitle="Add a new service" buttonTitle="Add service" user={getCookie("email")} />
        <SearchBar searchInput={searchInput} handleSearchChange={handleSearchChange} />

        {isLoading 
          ? <Spinner />
          : <>
            {filteredServices == null
              ? ""
              : filteredServices.map(serviceRow =>
                <div className="row justify-content-center"> {serviceRow.map(service =>
                  <div className="col-4">
                    <ServiceCard serviceName={service.title} description={service.description} user={service.user} service={service} />
                  </div>
                )}</div>
              )}
            </>}
      </div>

      <Footer />
    </div>
  );
}

export default AcademicServicesPage;