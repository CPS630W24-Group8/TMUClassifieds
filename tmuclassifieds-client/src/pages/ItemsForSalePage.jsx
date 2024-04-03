import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemSaleCard from "../components/ItemSaleCard";
import SearchBarItems from "../components/SearchBarItems";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import AddItemSaleCard from "../components/AddItemSaleCard";
import Spinner from "../components/Spinner";

const ItemCardsForSalePage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState();
  const [tagList, setTagList] = useState([]);
  const [allItems, setAllItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    let result = await axios.get("https://tmuclassifieds.onrender.com/api/item-sale/get-item");
    result = result.data.data;
    const splitResult = splitListInto(result, 3);
    setAllItems(splitResult);
    setFilteredItems(splitResult);
    setIsLoading(false);
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

  // Handle filter
  const handleFilterChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      tagList.push(value);
    } else {
      tagList.splice(tagList.indexOf(value), 1);
    }

    let filtered = [];
    allItems.map(itemRow => {
      itemRow.map(item => {
        if (tagList.includes(item.tag) || tagList.length === 0) filtered.push(item);
      })
    });

    const splitFiltered = splitListInto(filtered, 3);
    setFilteredItems(splitFiltered);
  }

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
        <AddItemSaleCard modalTitle="Add a new item" buttonTitle="Add item" type="items for sale" user={getCookie("email")} />
        <SearchBarItems
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleFilterChance={handleFilterChange}
        />

        {isLoading
          ? <Spinner />
          : <>
            {filteredItems == null
              ? ""
              : filteredItems.map(itemRow =>
                <div className="row justify-content-center"> {itemRow.map(item =>
                  <div className="col-md-4">
                    <ItemSaleCard item={item} />
                  </div>
                )}</div>
              )}
          </>}
      </div>
      <Footer />
    </div>
  );
}

export default ItemCardsForSalePage;