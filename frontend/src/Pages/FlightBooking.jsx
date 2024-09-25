import React, { useState } from 'react';
import axios from 'axios';
import FlightList from '../Components/FlightOffer';

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departure_date: '',
    return_date: '',
    travel_class: '',
    tripPurpose: '',
    duration: '',
    one_way: false,
    return_flight: '',
    airlines: '',
    price: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/flights/', formData);
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="w-full mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Flight Search</h2>
      <form className="w-[60%] mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Departure Date</label>
          <input
            type="date"
            name="departure_date"
            value={formData.departure_date}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Return Date</label>
          <input
            type="date"
            name="return_date"
            value={formData.return_date}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Travel Class</label>
          <input
            type="text"
            name="travel_class"
            value={formData.travel_class}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Trip Purpose</label>
          <input
            type="text"
            name="tripPurpose"
            value={formData.tripPurpose}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">One Way</label>
          <input
            type="checkbox"
            name="one_way"
            checked={formData.one_way}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Return Flight</label>
          <input
            type="text"
            name="return_flight"
            value={formData.return_flight}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Airlines</label>
          <input
            type="text"
            name="airlines"
            value={formData.airlines}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Search Flights
        </button>
      </form>

      {responseMessage && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow">
            <div className="bg-gray-100 min-h-screen py-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Flight Search Results</h1>
            <FlightList flights={responseMessage} />
            </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;



