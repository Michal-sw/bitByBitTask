import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element=
          {
            <h1>Home</h1>
          }/>
          <Route path='/books' element=
            {
              <h1>Book List</h1>
            }/>
          <Route path='/books/:id' element=
            {
              <p>Book detail</p>
            }/>
          <Route path="/books/add" element=
            {
              <h1>Add book</h1>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
