import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PassengerInfo from '../Components/PassengerInfo';
import Layout from '../Components/Layout/Layout';
import ocean from '../assets/Home/ocean.jpg';

function ConfirmBooking() {
    const location = useLocation();
    const flight = location.state?.flightOffer || JSON.parse(localStorage.getItem('flight'));

    const handleGoback = () => {
        window.history.back();
    }



    if (!flight) {
      return <div>Flight not found. Go back and select a flight.
        <button onClick={handleGoback} className='bg-gold-secondary text-white-primary rounded-md w-full py-1 mt-4'>Go Back</button>
      </div>;
    }
  return (
<Layout>
  <div className="w-full mx-auto min-h-screen bg-gray-200">
    {/* Header Section with Background Image */}
    <div
      className="p-6 mb-6 text-white text-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${ocean})`,
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    <div className='w-[70%] mx-auto flex flex-col items-center font-bold pb-2  mt-10 bg-black opacity-70 rounded-xl'>
        <div className='w-full flex justify-between px-4'>
            <p className="text-xl">
                From: <br></br> {flight.itineraries[0].segments[0].departure.iataCode} 
            </p>
            <p className="text-lg">Duration: <br></br>{flight.itineraries[0].duration}</p>
            <p className="text-xl">
                To: <br></br>{flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
            </p>

        </div>
      <p className="text-lg text-red-600 py-2 px-2 mt-2  bg-white w-fit rounded-lg">Total Cost: {flight.price.total}</p>
    </div>
    </div>

    {/* Main Content Section */}
    <div className="w-[80%] mx-auto shadow-md rounded-lg  mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        <div className="p-4 border rounded-lg shadow-sm ">
          <PassengerInfo flight={flight} selectedClass={flight.travelerPricings[0].fareDetailsBySegment[0].cabin} />
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <AddServices flight={flight} selectedClass={flight.travelerPricings[0].fareDetailsBySegment[0].cabin} />
        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end w-[90%] gap-10 pb-4">
        <p className='text-xl text-red-600 bg-white px-2 py-2 rounded-lg font-bold'>Total: {flight.price.total}</p>
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-200">
          Checkout
        </button>
      </div>
    </div>
  </div>
</Layout>

  )
}

export default ConfirmBooking

const AddServices = ({ flight, passengerInfo, selectedClass }) => {
  const [extraServices, setExtraServices] = useState({ baggage: false, seat: false });

  const handleToggle = (service) => {
    setExtraServices({
      ...extraServices,
      [service]: !extraServices[service]
    });
  };

  return (
    <div className='flex flex-col px-4'>
      <h2 className='text-2xl font-bold text-center mb-4'>Add Extra Services</h2>
      <label>
        <input type="checkbox" onChange={() => handleToggle('baggage')} /> Extra Baggage
      </label>
      <label>
        <input type="checkbox" onChange={() => handleToggle('seat')} /> Seat Selection
      </label>
      <label>
        <input type="checkbox" onChange={() => handleToggle('wifi')} /> WiFi
      </label>
      <label>
        <input type="checkbox" onChange={() => handleToggle('breakfast')} /> Breakfast
      </label>
      <label>
        <input type="checkbox" onChange={() => handleToggle('lunch')} /> Lunch
      </label>
      <label>
        <input type="checkbox" onChange={() => handleToggle('dinner')} /> Dinner
      </label>
      <label>
        <input type="checkbox" onChange={() => handleToggle('entertainment')} /> Entertainment
      </label>
    </div>
  );
};