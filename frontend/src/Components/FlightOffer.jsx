import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FlightList = ({ flights }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to control dropdown visibility

  const handleSelectFlight = (flight) => {
    if (selectedFlight && selectedFlight.id === flight.id) {
      // If the selected flight is already open, toggle the details
      setShowDetails(!showDetails);
    } else {
      // Otherwise, set the new selected flight and show its details
      setSelectedFlight(flight);
      setShowDetails(true);
    }
  };

  return (
    <div className="flex flex-col w-[80%] mx-auto min-h-screen bg-gray-200">
      <h2 className="text-xl font-semibold text-center pt-3 text-gold-secondary mb-4">Available Flight Offers</h2>
      <div className='flex-grow'>
        {flights && flights.map((flight) => (
          <div key={flight.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-row justify-between items-center">
              <div>
                <p>
                  {flight.itineraries[0].segments[0].departure.at} - {flight.itineraries[0].duration} - {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at}
                </p>
                <p>
                  {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
                </p>
                <p>
                  Terminal {flight.itineraries[0].segments[0].departure.terminal} - Terminal {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].departure.terminal || 'N/A'}
                </p>
                <p>Operated by {flight.itineraries[0].segments[0].carrierCode}</p>
              </div>
              <div>
                <p>Duration: {flight.itineraries[0].duration}</p>
                <p>View your itinerary details</p>
                
              </div>
              <div>
                <button onClick={() => handleSelectFlight(flight)} className='bg-blue-500 text-white-primary rounded-md w-full px-2 py-1 hover:bg-blue-600'>
                  {selectedFlight && selectedFlight.id === flight.id && showDetails ? 'Hide Details' : 'Select'}
                </button>
              </div>
            </div>
            {/* Flight details shown below */}
            {selectedFlight && selectedFlight.id === flight.id && showDetails && (
              <div className="mt-4">
                <FlightOffer flight={selectedFlight} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;

const FlightOffer = ({ flight }) => {
  const { itineraries, price, numberOfBookableSeats, validatingAirlineCodes, lastTicketingDate, id, travelerPricings } = flight;
  const { segments, duration } = itineraries[0]; // Assuming there's only one itinerary
  const departure = segments[0].departure;
  const arrival = segments[segments.length - 1].arrival;
  const navigate = useNavigate();
  const handleSelectFlightOffer = (flightOffer) => {
    navigate(`/booking`, { state: {flightOffer}});
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
  }
  console.log(flight)

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <p>
          <span className="font-semibold">From:</span> {departure.iataCode} at{' '}
          {new Date(departure.at).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">To:</span> {arrival.iataCode} at{' '}
          {new Date(arrival.at).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Duration:</span> {duration}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {price.currency} {price.total}
        </p>
        <p>
          <span className="font-semibold">Available Seats:</span> {numberOfBookableSeats}
        </p>
        <p>
          <span className="font-semibold">Airline:</span> {validatingAirlineCodes.join(', ')}
        </p>
        <p>
          <span className="font-semibold">Last Ticketing Date:</span> {lastTicketingDate}
        </p>
      </div>
      <div className='w-full flex justify-end'>
        <button onClick={()=>handleSelectFlightOffer(flight)} className="bg-blue-500 text-white-primary items-end rounded-md px-3 py-1.5 mt-4">Book</button>
      </div>
    </div>
  );
};


