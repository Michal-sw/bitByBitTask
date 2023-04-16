import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BooksProvider } from './core/providers/BooksContext';
import Navbar from './components/navbar/Navbar';
import BookList from './components/books/BooksList';
import BookDetails from './components/books/BookDetails';
import Header from './components/commons/Header';
import AddBook from './components/books/AddBook';

function App() {

  return (
    <div className="App">
      <BooksProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element=
          {
            <Header>Home</Header>
          }/>
          <Route path='/books' element=
            {
              <BookList/>
            }/>
          <Route path='/books/:id' element=
            {
              <BookDetails/>
            }/>
          <Route path="/books/add" element=
            {
              <AddBook/>
            }/>
        </Routes>
      </BrowserRouter>
      </BooksProvider>
    </div>
  );
}

export default App;
