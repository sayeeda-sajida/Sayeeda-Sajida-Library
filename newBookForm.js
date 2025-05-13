import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

// Category mapping (same as in your homepage)
const categories = [
  { id: 1, title: "Fiction" },
  { id: 2, title: "Non-Fiction" },
  { id: 3, title: "Academic & Reference" },
  { id: 4, title: "Children & Young Adult" },
  { id: 5, title: "Special Interest" },
  { id: 6, title: "Regional & Cultural" },
];

export default function NewBookForm() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Find category name based on the categoryId from params
  const categoryName = categories.find((cat) => cat.id === Number(categoryId))?.title || "Unknown Category";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/category/${categoryId}/add`, formData);
      alert("Book added successfully!");
      navigate(`/category/${categoryId}`); // Redirect to the Booklist page
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  return (
    <div className="container">
        <nav className="navbar">
               <div className="btn" onClick={() => navigate(`/category/${categoryId}`)}>
          Back to BookList
        </div>
     <h2>Add a New Book to : {categoryName}</h2>
    <div></div>
        </nav>
     
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Author:</td>
              <td>
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Genre:</td>
              <td>
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Publication Year:</td>
              <td>
                <input
                  type="number"
                  name="publication_year"
                  placeholder="Publication Year"
                  value={formData.publication_year}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="center"> <button className="btn1" type="submit">Add Book</button></td>
            </tr>
          </tbody>
        </table>
       
      </form>
    </div>
  );
}
