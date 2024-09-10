import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Fetch books data from API
    axios.get("http://localhost:5000/books").then((response) => {
      setBooks(response.data);
      setFilteredBooks(response.data); // Initially, show all books
    });
  }, []);

  // Function to handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter books based on search query (title, author, or publisherYear)
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publisherYear.toString().includes(query)
    );

    setFilteredBooks(filtered); // Update filtered books state
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Books List</h1>

      {/* Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title, author, or year..."
          className="w-full max-w-md p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Display filtered books as cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-700 mt-2">Author: {book.author}</p>
            <p className="text-gray-700 mt-2">Published Year: {book.publisherYear}</p>
            <p className="text-gray-500 mt-2">Posted: {new Date(book.createdAt).toLocaleDateString()}</p>
            <div className="mt-4 space-x-4">
              <Link
                to={`/books/details/${book._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Read
              </Link>
              <Link
                to={`/books/edit/${book._id}`}
                className="text-green-500 hover:text-green-700"
              >
                Edit
              </Link>
              <Link
                to={`/books/delete/${book._id}`}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/books/create"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Add New Book
        </Link>
      </div>
    </div>
  );
}

export default Home;
