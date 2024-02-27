import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import AddItemCard from "../components/AddItemCard";

const ItemsWantedPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  // const [filteredItems, setFilteredItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState();
  const [allItem, setAllItem] = React.useState(null);

  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);
  useEffect(() => {getItems()},[]);
  
  // get all items wanted from the database
  const getItems = async() => {
    let result = await axios.get("http://localhost:3001/api/item/get-item-wanted");
    result = result.data.data

    //splitting the list of items into sub arrays of 3s
    let itemList = [];
    while (Math.floor(result.length/ 3) >= 1) {
      const anArray = result.splice(0, 3);
      itemList.push(anArray);
    }
    if (result.length > 0) {
      itemList.push(result);
    }
    console.log("itemList: ", itemList);
    setAllItem(itemList);
  }

  const itemsData = [
    {
      id: 1,
      itemName: 'Scientific calculator',
      image: 'imageIcon.png',
      description: 'The calculator must be unbroken and a scientific calculator.'
    },
    {
      id: 2,
      itemName: 'Computer Security (Art and Science), 2nd Edition',
      image: 'ComputerSecurity2ndEdition.jpg',
      description: 'The textbook by Mat Bishop and the print ISBN is 9780321712332. It needs to be brand new.'
    },
    {
      id: 3,
      itemName: 'Thinking as Computation: A First Course by Hector Levesque',
      image: 'imageIcon.png',
      description: 'Textbook can be online, brand new or used. Please contact ASAP.'
    },
    {
      id: 4,
      itemName: 'Math Textbook - Calculus 101',
      image: 'imageIcon.png',
      description: 'Description of the textbook, condition, and other details.'
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
        <Header title="Items wanted" />
        <br />
        <UnauthDisplay />
        <Footer />
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <Header title="Items wanted" />
      <AddItemCard modalTitle="Add a new item" buttonTitle="Add item" type="items wanted" />

      <div className="container">
        {allItem == null 
          ? ""
          : allItem.map(itemRow =>
            <div className="row justify-content-center"> {itemRow.map(item => 
              <div className="col-md">
                <ItemCard itemName={item.title} image={item.image} description={item.description} />
              </div>
            )}</div>
          )}
      </div>
      <Footer />
    </div>
  );
}

export default ItemsWantedPage;
