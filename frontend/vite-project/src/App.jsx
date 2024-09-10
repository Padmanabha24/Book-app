// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import ShowBook from "./components/ShowBook";
import DeleteBook from "./components/DeleteBook";
import Home from './components/Home';
import './index.css';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
    </>
  );
}

export default App;
