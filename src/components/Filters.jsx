import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFilters,
  fetchUsers,
  addSelectedGender,
  removeSelectedGender,
  clearSelectedGender,
  addSelectedDomain,
  removeSelectedDomain,
  clearSelectedDomains,
  setSearchResults,
  selectSelectedDomains,
  selectSelectedGender,
  addSelectedAvailability,
  removeSelectedAvailability,
  clearSelectedAvailabilities,
  selectSelectedAvailability
} from "../redux/slices/userSlice";
import axios from "axios";

function Filters() {
  const dispatch = useDispatch();
  const selectedDomains = useSelector(selectSelectedDomains);
  const selectedGenders = useSelector(selectSelectedGender);
  const selectedAvailabilities = useSelector(selectSelectedAvailability);
  const users = useSelector((state) => state.users);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const toggleDropdown = (dropdown) => {
    if (dropdown === 1) {
      setIsDropdownOpen1(!isDropdownOpen1);
      setIsDropdownOpen2(false);
      setIsDropdownOpen3(false);
    } else if (dropdown === 2) {
      setIsDropdownOpen2(!isDropdownOpen2);
      setIsDropdownOpen1(false);
      setIsDropdownOpen3(false);
    }else{
      setIsDropdownOpen3(!isDropdownOpen3);
      setIsDropdownOpen1(false);
      setIsDropdownOpen2(false);
    }
  };

 

  const handleChange = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      dispatch(addSelectedDomain(value));
    } else {
      dispatch(removeSelectedDomain(value));
    }
  };

  const handleChange1 = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      dispatch(addSelectedGender(value));
    } else {
      dispatch(removeSelectedGender(value));
    }
  };

  const handleChange2 = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      dispatch(addSelectedAvailability(value));
    } else {
      dispatch(removeSelectedAvailability(value));
    }
  };

  const getDomainFilters = async () => {
    dispatch(fetchFilters(selectedDomains));
  };

  const clearDomainFilters = async () => {
    dispatch(fetchUsers());
    dispatch(clearSelectedDomains());
  };

  const getFilters1 = async () => {
    if (selectedGenders.length > 1) {
      setTimeout(() => {
        const filteredUsers = users.filter((user) =>
          selectedGenders.includes(user.gender)
        );
        dispatch(setSearchResults(filteredUsers));
      }, 4000);
    }else{
      const filteredUsers = users.filter((user) =>
          selectedGenders.includes(user.gender)
        );
        console.log(filteredUsers);
        dispatch(setSearchResults(filteredUsers));
    }
  };

  const clearFilters1 = async () => {
    if (selectedDomains.length < 0) {
      dispatch(fetchUsers());
    }
    dispatch(clearSelectedGender());
  };


  return (
    <div className="w-full flex relative ml-5">
      <div className="flex flex-col items-center justify-center p-4 relative">
        <button
          id="dropdownDefault"
          onClick={() => toggleDropdown(1)}
          className="text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Domain
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isDropdownOpen1 && (
          <div
            id="dropdown"
            className="z-10 w-56 p-3 ml-12 bg-indigo-200 rounded-lg shadow dark:bg-gray-700 absolute top-12"
          >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </h6>
            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
              {["Sales", "Marketing", "Finance", "UI Designing"].map((category) => (
                <li key={category} className="flex items-center">
                  <input
                    id={category}
                    type="checkbox"
                    onChange={handleChange}
                    value={category}
                    checked={selectedDomains.includes(category)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={category}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
              <div>
            <button
              type="button"
              onClick={getDomainFilters}
              class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Apply
            </button>
             <button
              type="button"
              onClick={clearDomainFilters}
              class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Clear
            </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center p-4 relative">
        <button
          id="dropdownDefault"
          onClick={() => toggleDropdown(2)}
          className="text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Gender
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isDropdownOpen2 && (
          <div
            id="dropdown"
            className="z-10 w-56 p-3 bg-indigo-200 rounded-lg shadow dark:bg-gray-700 absolute top-12"
          >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </h6>
            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
              {["Male", "Female", "Bigender"].map((category) => (
                <li key={category} className="flex items-center">
                  <input
                    id={category}
                    type="checkbox"
                    onChange={handleChange1}
                    value={category}
                    checked={selectedGenders.includes(category)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={category}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
              <div>
            <button
              type="button"
              onClick={getFilters1}
              class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Apply
            </button>
             <button
              type="button"
              onClick={clearFilters1}
              class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Clear
            </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Filters;
