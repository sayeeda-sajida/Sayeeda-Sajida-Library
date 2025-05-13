import express from "express";
import db from "./db.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Route to get books by categoryId
app.get("/category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  const query = `
    SELECT b.id, b.title, b.author, b.genre, b.publication_year, b.created_at 
    FROM books b
    WHERE b.category_id = ?
  `;

  db.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error("Error fetching books: ", err);
      return res.status(500).json({ error: "Failed to fetch books" });
    }
    res.json(results); // Send the list of books as response
  });
});

// Route to add a book to a specific category
app.post('/category/:categoryId/add', (req, res) => {
  const { categoryId } = req.params;
  const { title, author, genre, publication_year } = req.body;

  if (!title || !author || !genre || !publication_year) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    INSERT INTO books (title, author, genre, publication_year, category_id) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [title, author, genre, publication_year, categoryId], (err, result) => {
    if (err) {
      console.error('Error adding book:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }

    const newBook = {
      id: result.insertId,
      title,
      author,
      genre,
      publication_year,
      category_id: categoryId
    };

    res.status(201).json({
      message: 'Book added successfully!',
      book: newBook // Return the added book details
    });
  });
});
// In your server.js or index.js
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);  // Convert to an integer
  console.log("Deleting book with ID:", bookId);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.error("Error deleting book: ", err.message);
      return res.status(500).json({ error: "Failed to delete book" });
    }
    res.json({ message: "Book deleted successfully" });
  });
});

app.get("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  try {
    const [rows] = await db.promise().query("SELECT * FROM books WHERE id = ?", [bookId]);
    if (rows.length > 0) {
      console.log("Book Found: ", rows[0]);
      res.json(rows[0]);
    } else {
      console.log("No book found with ID:", bookId);
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error("Database error: ", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.put("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const { title, author, genre, publication_year } = req.body;

  try {
    const [result] = await db.promise().query(
      "UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?",
      [title, author, genre, publication_year, bookId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Book details updated successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error("Error updating book details:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
