import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

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
          <Route path='/users' element=
            {
              <h1>User List</h1>
            }/>
          <Route path='/users/:id' element=
            {
              <p>User detail</p>
            }/>
          <Route path="/users/add" element=
            {
              <h1>Add user</h1>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
