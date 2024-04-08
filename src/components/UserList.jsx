import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { setSearchResults,clearSearchResults } from '../redux/slices/userSlice';
import "./UserList.css";
import axios from 'axios';
import { selectSearchResults } from '../redux/slices/userSlice';
import Filters from "./Filters";
import { Link } from 'react-router-dom';

function UserList() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const users = useSelector((state) => state.users);
  const searchResult = useSelector((state) => state.searchResults);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const searchResults = useSelector(selectSearchResults);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    if(searchTerm===''){
      dispatch(fetchUsers());
      dispatch(clearSearchResults());
    }
  }, [dispatch,searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  console.log('=> search result users =>',searchResult);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://server-test-1-5edc.onrender.com/api/posts/search`,{params: {
        string: searchTerm
      }});
      // const data = await response.data.json();
      dispatch(setSearchResults(response.data)); 
    } catch (error) {
      console.error('Error searching:', error);
    }
  };


  const nextPage = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <Filters />
      <div className="h-30">
      <form className="mt-2 max-w-md mx-auto" onSubmit={handleSearch}>
        <label
          for="default-search"
          className="mb-2 text-sm text-center font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Users..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <Link
             to={'/team'}
              class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Teams Page
            </Link>
      </div>

      <h2 className="flex justify-center my-3 text-2xl font-bold">User List</h2>
      <div className="md:grid md:grid-cols-4 md:gap-3 md:mx-5">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3 mx-3 md:m-0"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={user.avatar}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.first_name} {user.last_name}
              </h5>
              <span className="px-5 text-center text-sm text-gray-500 dark:text-gray-400 text-wrap">{`${user.email} || ${user.gender} || ${user.domain} || ${user.available}`}</span>
            </div>
          </div>
        ))}
      </div>
     
     
      <div className="flex justify-center mt-6 mb-5">
        <button
          onClick={prevPage}
          className={`px-3 py-1 rounded-full mx-1 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className={`px-3 py-1 rounded-full mx-1 ${
            indexOfLastUser >= users.length
              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={indexOfLastUser >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;
