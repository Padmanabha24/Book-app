import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisherYear, setPublishYear] = useState("");
  const [content, setContent] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    const data = {
      title,
      author,
      publisherYear,
      content,
    };
    axios
      .post("http://localhost:5000/books/", data)
      .then((response) => {
        enqueueSnackbar("Book created successfully", { variant: "success" });
        console.log(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Failed to create book", { variant: "error" });
        console.error("Error details:", error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Create New Book</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Publisher Year</label>
          <input
            type="text"
            value={publisherYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Enter content</label>
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-[5pc] bg-green-600 text-white py-2 px-4 rounded-md "
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateBook;
