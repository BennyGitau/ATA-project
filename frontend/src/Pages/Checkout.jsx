import React from 'react'

// function Checkout() {
//   return (
//     <div>Checkout</div>
//   )
// }

// export default Checkout

const Checkout = ({ flight, passengerInfo, selectedClass, extraServices }) => {
  const handlePayment = () => {
    // Handle payment process (e.g., integration with payment gateway)
    console.log('Payment Processed');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Flight: {flight.airline} - {selectedClass}</p>
      <p>Passenger: {passengerInfo.name}, {passengerInfo.email}</p>
      <p>Extra Services: {extraServices.baggage ? 'Baggage' : ''} {extraServices.seat ? 'Seat' : ''}</p>
      
      <button onClick={handlePayment}>Pay & Book</button>
    </div>
  );
};

export default Checkout;