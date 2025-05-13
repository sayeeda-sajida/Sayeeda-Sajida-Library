import React, { useEffect, useState } from "react";
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

export default function BooksList() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  
  // Find category name based on the categoryId from params
  const categoryName = categories.find((cat) => cat.id === Number(categoryId))?.title || "Unknown Category";

  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/category/${categoryId}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  // Fetch books when the component is mounted or categoryId changes
  useEffect(() => {
    fetchBooks();
  }, [categoryId]);
const handleDelete = async (bookId) => {
  console.log("Attempting to delete book with ID:", bookId); // Log the bookId before request
  if (window.confirm("Are you sure you want to delete this book?")) {
    try {
      await axios.delete(`http://localhost:5000/books/${bookId}`);
      alert("Book deleted successfully!");
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  }
};

  return (
    <div className="container">
      <nav className="navbar">
        <div className="btn" onClick={() => navigate("/")}>
          Back to Library
        </div>
        <h1>Books in Category: {categoryName}</h1>
        <div className="btn" onClick={() => navigate(`/category/${categoryId}/add`)}>
          Add Books here
        </div>
      </nav>

      <div className="categories">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
               <p> publication-year: {book. publication_year}</p>
             
              <div style={{ display: "flex", paddingLeft: "10px", gap: "100px" }}>
             <button className="btn1" onClick={() => {handleDelete(book.id)}}>Delete</button>

              <button className="btn1" onClick={() => navigate(`/books/${book.id}`)}>View</button>

              </div>
            </div>
          ))
        ) : (
          <p>No books found in this category.</p>
        )}
      </div>
    </div>
  );
}
