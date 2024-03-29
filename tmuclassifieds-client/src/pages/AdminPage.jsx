import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import Spinner from "../components/Spinner";
import ItemSaleCard from "../components/ItemSaleCard";
import ItemWantedCard from "../components/ItemWantedCard";
import ServiceCard from "../components/ServiceCard";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsSale, setItemsSale] = useState(null);
  const [itemsWanted, setItemsWanted] = useState(null);
  const [academicServices, setAcademicServices] = useState(null);
  const adminEmails = ["hello@test.com"];

  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
    setIsAdmin(adminEmails.includes(getCookie("email")));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getItemsSale();
    getItemsWanted();
    getAcademicServices();
    setIsLoading(false);
  }, []);

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

  // get all items for sale from the database
  const getItemsSale = async () => {
    let result = await axios.get("http://localhost:3001/api/item-sale/get-item");
    result = result.data.data;
    const splitResult = splitListInto(result, 3);
    setItemsSale(splitResult);
  }

  // get all items wanted from the database
  const getItemsWanted = async () => {
    let result = await axios.get("http://localhost:3001/api/item-wanted/get-item");
    result = result.data.data;
    const splitResult = splitListInto(result, 3);
    setItemsWanted(splitResult);
  }

  // get academic services from the database
  const getAcademicServices = async () => {
    let result = await axios.get("http://localhost:3001/api/service/get-service");
    result = result.data.data;
    const splitResult = splitListInto(result, 3);
    setAcademicServices(splitResult);
  }

  // Do not render content if user is not logged in
  if (!loggedIn) {
    return (
      <div>
        <Navbar />
        <Header title="Admin dashboard" />
        <br />
        <UnauthDisplay />
        <Footer />
      </div>
    );
  }

  // Do not render content if user is not admin
  if (!isAdmin) {
    return (
      <div>
        <p className="fs-5 text-center">Only administrators can view this page</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Header title="Admin dashboard" />

      <div className="container">
        {isLoading
          ? <Spinner />
          : <>
            < div className="container">

              <div className="accordion" id="adminAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#itemsSaleCollapse" aria-expanded="true" aria-controls="itemsSaleCollapse">
                      <strong>All items for sale</strong>
                    </button>
                  </h2>
                  <div id="itemsSaleCollapse" className="accordion-collapse collapse show" data-bs-parent="#adminAccordion">
                    <div className="accordion-body">
                      {itemsSale == null
                        ? ""
                        : itemsSale.map(itemRow =>
                          <div className="row justify-content-center"> {itemRow.map(item =>
                            <div className="col-md-4">
                              <ItemSaleCard item={item} isAdmin={true} />
                            </div>
                          )}</div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#itemsWantedCollapse" aria-expanded="false" aria-controls="itemsWantedCollapse">
                      <strong>All items wanted</strong>
                    </button>
                  </h2>
                  <div id="itemsWantedCollapse" className="accordion-collapse collapse" data-bs-parent="#adminAccordion">
                    <div className="accordion-body">
                      {itemsWanted == null
                        ? ""
                        : itemsWanted.map(itemRow =>
                          <div className="row justify-content-center"> {itemRow.map(item =>
                            <div className="col-md-4">
                              <ItemWantedCard item={item} isAdmin={true} />
                            </div>
                          )}</div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#servicesCollapse" aria-expanded="false" aria-controls="servicesCollapse">
                      <strong>All academic services</strong>
                    </button>
                  </h2>
                  <div id="servicesCollapse" className="accordion-collapse collapse" data-bs-parent="#adminAccordion">
                    <div className="accordion-body">
                      {academicServices == null
                        ? ""
                        : academicServices.map(serviceRow =>
                          <div className="row justify-content-center"> {serviceRow.map(service =>
                            <div className="col-md-4">
                              <ServiceCard service={service} isAdmin={true} />
                            </div>
                          )}</div>
                        )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </>}
      </div>

      <Footer />
    </div>
  )
}

export default AdminPage;