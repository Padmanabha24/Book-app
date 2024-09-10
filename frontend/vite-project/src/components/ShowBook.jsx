import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useState } from 'react'
import { useParams } from 'react-router-dom'

function ShowBook() {
  const {id}=useParams();

  const [book,setbook]=useState("");

  

useEffect(()=>{
  axios.get(`http://localhost:5000/books/${id}`).then((response)=>{
    setbook(response.data);
  console.log("done")
})
},[])
  


  return (
    <>
<div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
  <div className="p-4">
    <p className="text-lg font-semibold text-gray-800">{book.title}</p>
    <p className="text-sm text-red-600 mt-1">Author: {book.author}</p>
    <p className="text-sm text-gray-600 mt-1">Published Year: {book.publisherYear}</p>
    <p className="text-sm text-gray-500 mt-1">Created At: {new Date(book.createdAt).toLocaleDateString()}</p>
  </div>
</div>

<div className="mx-auto bg-white shadow-lg mt-[2pc] h-[28pc] w-[40pc] rounded-lg overflow-hidden border border-gray-200">
  <h1 className="text-lg font-semibold">Content:</h1>
  <div className="h-[calc(100%-2.5rem)] overflow-y-auto p-2">
    <p className="text-sm text-gray-600">{book.content}</p>
  </div>
</div>

  </>
  )
}

export default ShowBook