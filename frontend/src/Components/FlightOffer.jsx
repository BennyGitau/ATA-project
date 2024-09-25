import React from 'react';

const FlightList = ({ flights }) => {
console.log(flights)

  return (
    <div className="max-w-4xl mx-auto">
      {flights.map((flight, index) => (
        <FlightOffer key={index} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;

const FlightOffer = ({ flight }) => {
  const { itineraries, price, numberOfBookableSeats, validatingAirlineCodes, lastTicketingDate } = flight;
  const { segments, duration } = itineraries[0]; // Assuming there's only one itinerary
  const departure = segments[0].departure;
  const arrival = segments[segments.length - 1].arrival;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Flight Offer</h2>
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
    </div>
  );
};




