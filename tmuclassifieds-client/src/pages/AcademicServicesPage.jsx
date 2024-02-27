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

const AcademicServicesPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  // const [filteredItems, setFilteredItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState();
  const [allService, setAllService] = useState(null);

  useEffect(() => {getServices()},[]);
  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);

  // get academic services from the database
  const getServices = async() => {
    let result = await axios.get("http://localhost:3001/api/service/get-service");
    result = result.data.data

    //splitting the list of services into sub arrays of 3s
    let serviceList = [];
    while (Math.floor(result.length/ 3) >= 1) {
      const anArray = result.splice(0, 3);
      serviceList.push(anArray);
    }
    if (result.length > 0) {
      serviceList.push(result);
    }
    console.log("serviceList: ", serviceList);
    setAllService(serviceList);
  }

  const itemsData = [
    {
      id: 1,
      itemName: 'Calculus Tutoring Sessions',
      image: 'imageIcon.png',
      description: 'Offering personalized tutoring sessions for calculus I and II. Improve your understanding, solve complex problems, and prepare for exams with a certified math tutor.'
    },
    {
      id: 2,
      itemName: 'Essay Writing Workshop',
      image: 'imageIcon.png',
      description: 'Join our online workshop on academic essay writing. Learn how to structure your essays, develop arguments, and cite sources properly. Ideal for undergraduate students.'
    },
    {
      id: 3,
      itemName: 'Study Group for Organic Chemistry',
      image: 'imageIcon.png',
      description: 'Join our weekly study group sessions for Organic Chemistry. Collaborate with peers, share notes, and tackle challenging topics together. Open to all levels.'
    },
    {
      id: 4,
      itemName: 'Online Course: Introduction to Programming',
      image: 'imageIcon.png',
      description: 'Enroll in our Introduction to Programming online course. Learn the basics of programming languages, coding principles, and software development. No prior experience required.'
    },
  ];

  // Handle search
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    const filtered = itemsData.filter(item => item.itemName.toLowerCase().includes(input.toLowerCase()));
    setFilteredItems(filtered);
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
      <AddServiceCard modalTitle="Add a new service" buttonTitle="Add service" />

      <div className="container">
        {allService == null 
          ? ""
          : allService.map(ServiceRow =>
            <div className="row justify-content-center"> {ServiceRow.map(service => 
              <div className="col-md">
                <ServiceCard serviceName={service.title} description={service.description} />
              </div>
            )}</div>
          )}

          
      </div>

      <Footer />
    </div>
  );
}

export default AcademicServicesPage;