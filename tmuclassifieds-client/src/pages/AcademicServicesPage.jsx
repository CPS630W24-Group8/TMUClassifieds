import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";

const AcademicServicesPage = () => {
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
      <Header title="Academic services" />
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

export default AcademicServicesPage;