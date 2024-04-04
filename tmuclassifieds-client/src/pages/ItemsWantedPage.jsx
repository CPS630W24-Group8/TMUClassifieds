import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemWantedCard from "../components/ItemWantedCard";
import SearchBarItems from "../components/SearchBarItems";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import AddItemWantedCard from "../components/AddItemWantedCard";
import Spinner from "../components/Spinner";

const ItemsWantedPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState();
  const [tagList, setTagList] = useState([]);
  const [allItems, setAllItems] = useState([]);
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

  // get all items wanted from the database
  const getItems = async () => {
    setIsLoading(true);
    let result = await axios.get("http://localhost:3001/api/item-wanted/get-item");
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
    allItems.forEach(itemRow => {
      itemRow.forEach(item => {
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

      <div className="container">
        <AddItemWantedCard modalTitle="Add a new item" buttonTitle="Add item" type="items wanted" user={getCookie("email")} />
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
                    <ItemWantedCard item={item} />
                  </div>
                )}</div>
              )}
          </>}
      </div>
      <Footer />
    </div>
  );
}

export default ItemsWantedPage;
