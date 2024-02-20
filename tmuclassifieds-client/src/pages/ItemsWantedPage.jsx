import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";

const ItemsWantedPage = () => {
  const itemsData = [
    { id: 1, itemName: 'Scientific calculator', image: 'imageIcon.png', description: 'The calculator must be unbroken and a scientific calculator.' },
    { id: 2, itemName: 'Computer Security (Art and Science), 2nd Edition', image: 'ComputerSecurity2ndEdition.jpg', description: 'The textbook by Mat Bishop and the print ISBN is 9780321712332. It needs to be brand new.' },
    { id: 3, itemName: 'Thinking as Computation: A First Course by Hector Levesque', image: 'imageIcon.png', description: 'Textbook can be online, brand new or used. Please contact ASAP.' },
    { id: 4, itemName: 'Math Textbook - Calculus 101', image: 'imageIcon.png', description: 'Description of the textbook, condition, and other details.' },
  ];

  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState(itemsData);

  // Handle search
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    const filtered = itemsData.filter(item => item.itemName.toLowerCase().includes(input.toLowerCase()));
    setFilteredItems(filtered);
  };

  return (
    <div>
      <Navbar />
      <Header title="Items wanted" />
      <br />

      <div className="search-bar-container">
        <SearchBar searchInput={searchInput} handleSearchChange={handleSearchChange} />
      </div>

      <div className="container">
        {filteredItems.length > 0 ? (
          <div className="row justify-content-center">
            {filteredItems.map(item => (
              <div className="col-sm-3" key={item.id}>
                <ItemCard itemName={item.itemName} image={item.image} description={item.description} />
              </div>
            ))}
          </div>
        ) : (
          <p>No items match your search.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ItemsWantedPage;
