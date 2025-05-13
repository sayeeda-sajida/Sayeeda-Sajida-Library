import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import LibraryHomepage from './introPage';
import BooksList from './Booklist';
import NewBookForm from './newBookForm';
import BookDetails from './Bookdetails';


function App() {
  return (

      <Routes>
   
        <Route path="/" element={<LibraryHomepage />} />
        <Route path="/category/:categoryId" element={<BooksList />} />
       <Route path="/category/:categoryId/add" element={<NewBookForm />} />
        <Route path="/books/:bookId" element={<BookDetails />} />


      </Routes>
  
  );
}

export default App;
