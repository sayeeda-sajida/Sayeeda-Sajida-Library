import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const categories = [
  { id: 1, title: "Fiction", image: require("./images/fiction.png") },
  { id: 2, title: "Non-Fiction", image: require("./images/nonFiction.png") },
  { id: 3, title: "Academic & Reference", image: require("./images/Academic.png") },
  { id: 4, title: "Children & Young Adult", image: require("./images/children.png") },
  { id: 5, title: "Special Interest", image: require("./images/special.png") },
  { id: 6, title: "Regional & Cultural", image: require("./images/regional.png") }
];

export default function LibraryHomepage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <img src="./../library_logo.png" height={50} width={50} alt="logo" />
        <h1>Welcome to the Library!</h1>
        <img src="./../library_logo.png" height={50} width={50} alt="logo" />
      </nav>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className="card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.image} className="category-image" alt={category.title} />
            <h2>{category.title}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}
