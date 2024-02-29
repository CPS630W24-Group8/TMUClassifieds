import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemSaleCard from "../components/ItemSaleCard";
import SearchBar from "../components/SearchBar";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import AddItemSaleCard from "../components/AddItemSaleCard";

const ItemCardsForSalePage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState();
  const [allItems, setAllItems] = React.useState(null);

  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);
  useEffect(() => { getItems(); }, []);

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
  const getItems = async () => {
    let result = await axios.get("http://localhost:3001/api/item-sale/get-item");
    result = result.data.data;
    const splitResult = splitListInto(result, 3);
    setAllItems(splitResult);
    setFilteredItems(splitResult);
  }

  // Handle search
  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    let filtered = [];
    allItems.map(itemRow => {
      itemRow.map(item => {
        if (item.title.toLowerCase().includes(input.toLowerCase())) filtered.push(item);
      })
    });

    const splitFiltered = splitListInto(filtered, 3);
    setFilteredItems(splitFiltered);
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

      <div className="container">
        <AddItemSaleCard modalTitle="Add a new item" buttonTitle="Add item" type="items for sale" user={getCookie("email")}/>
        <SearchBar searchInput={searchInput} handleSearchChange={handleSearchChange} />

        {filteredItems == null
          ? ""
          : filteredItems.map(itemRow =>
            <div className="row justify-content-center"> {itemRow.map(item =>
              <div className="col-4">
                <ItemSaleCard itemName={item.title} image={item.image} description={item.description} price={item.price} user={item.user}/>
              </div>
            )}</div>
          )}
      </div>

      <Footer />
    </div>
  );
}

export default ItemCardsForSalePage;