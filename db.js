import mysql from 'mysql2';

const db = mysql.createConnection({
  host: "localhost",
  user: "root",  
  password: "root123",  
  database: "library"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

export default db;
