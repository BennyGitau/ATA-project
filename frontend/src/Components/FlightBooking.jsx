import React, { useState } from 'react';
import axios from 'axios';
import FlightList from './FlightOffer';
import Layout from './Layout/Layout';
import { userAuth } from '../Context/Auth';

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departure_date: '',
    return_date: '',
    travel_class: '',
    tripPurpose: '',
    duration: '',
    flight_type: '',
    return_flight: '',
    airlines: '',
    price: ''
  });

  const { flights, searchFlights } = userAuth();
  console.log(flights);
  const [responseMessage, setResponseMessage] = useState('');
  const [isDropdownOpenCabin, setIsDropdownOpenCabin] = useState(false);
  const [isDropdownOpenTravelers, setIsDropdownOpenTravelers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState("Economy");
  const [selectedCabin, setSelectedCabin] = useState("Economy");

  const handleCabinSelect = (cabin) => {
    setSelectedCabin(cabin);
    setCabinClass(cabin);
  };


  const toggleDropdownCabin= () => {
    setIsDropdownOpenCabin(!isDropdownOpenCabin);
  };
   const toggleDropdownTravellers = () => {
    setIsDropdownOpenTravelers(!isDropdownOpenTravelers);
  };

  const handleIncrement = (type) => {
    if (type === "adults") setAdults(adults + 1);
    if (type === "children") setChildren(children + 1);
  };

  const handleDecrement = (type) => {
    if (type === "adults" && adults > 1) setAdults(adults - 1);
    if (type === "children" && children > 0) setChildren(children - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    searchFlights(formData);
  };

  return (
    <div className="w-full mx-auto pt-20 shadow-md">
      <div className='mt-10 rounded-md w-[70%] bg-[#031940a4] opacity-90 pb-3 mx-auto'>
      <h2 className="text-2xl  text-center pt-1 text-white font-bold ">Flight Search</h2>
      <form className="mx-auto h-fit  p-4 flex flex-col space-y-2 " onSubmit={handleSubmit}>
      {/* Flight Type Selection */}
      <div className="flex items-center justify-between">
        <div className="flex ml-10 space-x-6">
          <label className="text-white">
            <input type="radio" name="flight_type" value="roundTrip" className="mr-2" />
            Return
          </label>
          <label className="text-white">
            <input type="radio" name="flight_type" value="oneWay" className="mr-2" />
            One way
          </label>
          <label className="text-white">
            <input type="radio" name="flight_type" value="multiCity" className="mr-2" />
            Multi-city
          </label>
        </div>
      </div>

      {/* Flight details */}
      <div className="flex flex-row gap-4">
        {/* Origin */}
        <div className="col-span-1 bg-white  h-fit rounded-lg">
          <label className="block text-gray-600 text-sm font-medium pl-2">From</label>
          <input
            type="text"
            name="origin"
            placeholder="Nairobi"
            value={formData.origin}
            onChange={handleChange}
            className="p-2 w-full outline-none"
            required
          />
        </div>
        <div className="col-span-1 bg-white h-fit rounded-lg">
          <label className="block text-gray-600 text-sm font-medium pl-2">To</label>
          <input
            type="text"
            name="destination"
            placeholder="Mombasa"
            value={formData.destination}
            onChange={handleChange}
            className="p-2 w-full outline-none"
            required
          />
        </div>
        {/* Departure Date */}
        <div className="col-span-1 bg-white h-fit rounded-lg">
          <label className="block text-gray-600 w-full text-sm pl-3 mx-auto font-medium">Depart</label>
          <input
            type="date"
            name="departure_date"
            value={formData.departure_date}
            onChange={handleChange}
            className="p-2 w-full outline-none"
            required
          />
        </div>
        {/* Return Date */}
        <div className="col-span-1 bg-white h-fit rounded-lg">
          <label className="block text-gray-600 text-sm  pl-3 font-medium">Return</label>
          <input
            type="date"
            name="return_date"
            value={formData.return_date}
            onChange={handleChange}
            className="p-2 w-full outline-none"
          />
        </div>
      </div>
      {/* Travellers and Cabin Class */}
      <div className="grid grid-cols-5 gap-4">
            {/* Travellers */}
        <div className="relative col-span-2">
          <label className="block text-white font-medium">Travellers</label>
          <button
            type="button"
            className="mt-1 p-2 w-full border text-gray-200 border-gray-300 rounded-md text-left"
            onClick={toggleDropdownTravellers}
          >
            {adults} adult{adults > 1 ? "s" : ""}, {children} child{children > 1 ? "ren" : ""}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpenTravelers && (
            <div className="absolute z-10 bg-white shadow-lg p-4 w-full mt-2 rounded-md">
              {/* Adults */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Adults</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleDecrement("adults")}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                  >
                    -
                  </button>
                  <span className="mx-4">{adults}</span>
                  <button
                    type="button"
                    onClick={() => handleIncrement("adults")}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Children</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleDecrement("children")}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                  >
                    -
                  </button>
                  <span className="mx-4">{children}</span>
                  <button
                    type="button"
                    onClick={() => handleIncrement("children")}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={toggleDropdownTravellers}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        <div className="relative col-span-2 mb-4">
            <label className="block text-white font-medium">Cabin Class</label>
            <button
              type="button"
              className="mt-1 p-2 w-full border text-gray-200 border-gray-300 rounded-md text-left"
              onClick={toggleDropdownCabin}
            >
              {cabinClass}
            </button>

            {/* Cabin Class Dropdown */}
            {isDropdownOpenCabin && (
              <div className="absolute z-10 bg-white shadow-lg p-4 w-full mt-2 rounded-md">
                <div
                  onClick={() => handleCabinSelect("Economy")}
                  className={`flex justify-between items-center mb-2 p-2 border rounded-md cursor-pointer ${
                    selectedCabin === "Economy" ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <span>Economy</span>
                  {selectedCabin === "Economy" && <span>&#10003;</span>} {/* Tick mark */}
                </div>

                <div
                  onClick={() => handleCabinSelect("Business")}
                  className={`flex justify-between items-center mb-2 p-2 border rounded-md cursor-pointer ${
                    selectedCabin === "Business" ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <span>Business</span>
                  {selectedCabin === "Business" && <span>&#10003;</span>} {/* Tick mark */}
                </div>
                <div
                  onClick={() => handleCabinSelect("First Class")}
                  className={`flex justify-between items-center mb-2 p-2 border rounded-md cursor-pointer ${
                    selectedCabin === "First Class" ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <span>First Class</span>
                  {selectedCabin === "First Class" && <span>&#10003;</span>} {/* Tick mark */}
                </div>

                <button
                  type="button"
                  onClick={toggleDropdownCabin}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
      {/* Search Button */}
      <div className="flex justify-end items-center">
        <button
          type="submit"
          className="bg-blue-500 text-white p-1 h-14 rounded-md hover:bg-blue-700 w-32"
        >
          Search
        </button>
      </div>
      </div>
    </form>
    </div>
    </div>
  );
};

export default FlightBooking;



