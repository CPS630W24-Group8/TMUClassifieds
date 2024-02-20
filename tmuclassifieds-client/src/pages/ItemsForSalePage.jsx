import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";

const ItemCardsForSalePage = () => {
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
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState(itemsData);

  // Handle search
  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    const filtered = itemsData.filter(item => item.itemName.toLowerCase().includes(input.toLowerCase()));
    setFilteredItems(filtered);
  };
  return (
    <div>
      <Navbar />
      <Header title="Items for sale" />
      <br />

      <div className="container">
        <div className="col">
          <SearchBar searchInput={searchInput} handleSearchChange={handleSearchChange} />
        </div>

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

export default ItemCardsForSalePage;