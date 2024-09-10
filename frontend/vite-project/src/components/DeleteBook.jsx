import React from 'react'
// import { Book } from '../../../../backend/models/booksRecord'
import axios from 'axios'
import {useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useSnackbar } from 'notistack';


function DeleteBook() {
  const {id}=useParams();
  const [book,setbook]=useState("");
  const { enqueueSnackbar } = useSnackbar();
useEffect(()=>{
  axios.get(`http://localhost:5000/books/${id}`).then((response)=>{
    setbook(response.data);
  })
},[])

  const handelDelete=()=>{
  axios.delete(`http://localhost:5000/books/${id}`).then(()=>{
    enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
  })
}

  return (
    <div className='border border-black rounded w-[15pc] h-[10pc] ml-[30pc]'>
      <p className='bg-gray-500 w-[12pc] ml-[20px] mt-[10px] text-white'>{book.title}</p>
            <p className='bg-gray-500 w-[12pc] ml-[20px] mt-[10px] text-white'>Author: {book.author}</p>
            <p className='bg-gray-500 w-[12pc] ml-[20px] mt-[10px] text-white'>Published Year: {book.publisherYear}</p>
            <p className='bg-gray-500 w-[12pc] ml-[20px] mt-[10px] text-white'>Posted: {new Date(book.createdAt).toLocaleDateString()}</p>
      <button className="bg-red-500 mt-[10px] border rounded w-[7pc] text-white bold" onClick={handelDelete}>Delete</button>
    </div>
  )
}

export default DeleteBook