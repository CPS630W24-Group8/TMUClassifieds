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

const ItemCardsForSalePage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  // const [filteredItems, setFilteredItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState();
  const [allItem, setAllItem] = React.useState(null);

  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);

  useEffect(() => {getItems()},[]);

  // get all items for sale from the database
  const getItems = async() => {
    let result = await axios.get("http://localhost:3001/api/item/get-item-sale");
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
      itemName: 'Ergonomic Office Chair',
      image: 'imageIcon.png',
      description: 'Brand new ergonomic office chair, adjustable height, lumbar support, and breathable mesh back. Perfect for long study or work sessions.'
    },
    {
      id: 2,
      itemName: 'Graphing Calculator TI-84 Plus',
      image: 'imageIcon.png',
      description: 'Slightly used TI-84 Plus graphing calculator. Ideal for high school and college math, science, and engineering courses.'
    },
    {
      id: 3,
      itemName: 'Complete Harry Potter Book Set',
      image: 'imageIcon.png',
      description: 'All 7 books in the Harry Potter series by J.K. Rowling. Hardcover, excellent condition. Dive into the magical world again or for the first time.'
    },
    {
      id: 4,
      itemName: 'MacBook Pro 13-inch',
      image: 'imageIcon.png',
      description: '2019 MacBook Pro, 13-inch, 8GB RAM, 256GB SSD. In excellent condition, comes with original charger and box. Perfect for students and professionals alike.'
    },
    {
      id: 5,
      itemName: 'Yoga Mat',
      image: 'imageIcon.png',
      description: 'High-quality, non-slip yoga mat. Durable and eco-friendly material. Comes with a carrying strap. Enhance your yoga practice with comfort and stability.'
    },
  ];
  
  
  // Handle search
  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    const filtered = itemsData.filter(item => item.itemName.toLowerCase().includes(input.toLowerCase()));
    setFilteredItems(filtered);
  };

  // Do not render content if user is not logged in
  if (!loggedIn) {
    return (
      <div>
        <Navbar />
        <Header title="Items for sale" />
        <br />
        <UnauthDisplay />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Header title="Items for sale" />
      <AddItemCard modalTitle="Add a new item" buttonTitle="Add item" type="items for sale"/>

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

export default ItemCardsForSalePage;