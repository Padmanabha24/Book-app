import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { useFetcher, useParams } from 'react-router-dom';
import { useSnackbar } from "notistack"; 



function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [content, setContent] = useState('');
  const { enqueueSnackbar } = useSnackbar(); 

  const {id} = useParams();
  useEffect(() => {
    console.log(id); // Check if this logs the correct id
    axios.get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setContent(response.data.content);
      })
     
  }, []);
  

  const handelEdit=()=>{

  const edited_data={
    title,
    author,
    publishYear,
    content,
  }
  axios.put(`http://localhost:5000/books/${id}`,edited_data).then((response)=>{
    enqueueSnackbar("Book edited successfully", { variant: "success" });

    console.log("done")
  })
}
  return (
    <>
     <div className='border rounded border-black flex flex-col w-[20pc] ml-[25pc]'>
      <div className='border border-black  bg-gray-500 flex flex-col ml-[5pc] mt-[5px] w-[10pc]'>
     <input type="text" value={title} placeholder='title' onChange={
          (e)=>{setTitle(e.target.value)} 
        }/>
        </div>
  
    {/**/}

        <div className='border border-black flex flex-col ml-[5pc] mt-[5px] w-[10pc]'>
          <input type="text" value={author} placeholder='author' onChange={
          (e)=>{setAuthor(e.target.value)}
        }/>
        </div>

    {/**/}
        <div className='border border-black flex flex-col ml-[5pc] mt-[5px] w-[10pc]'>
        <input type="text" value={publishYear} placeholder='publishYear' onChange={
          (e)=>{setPublishYear(e.target.value)}
        }/>
        </div>
          {/**/}

       

        <button className="bg-red-500 w-[5pc] ml-[7pc] border rounded mt-[5px]" onClick={handelEdit}>edit </button>
      </div>
      <div>
  <textarea
    className="resize-none bg-white pb-[25pc] shadow-lg mt-[2pc] h-[28pc] w-[40pc] rounded-lg overflow-hidden border border-gray-200 p-2 text-left"
    type="text"
    value={content}
    placeholder="publishYear"
    onChange={(e) => setContent(e.target.value)}
  />
</div>

      </>
   
      
  )
}

export default EditBook