import React from 'react'
import FlightBooking from '../Components/FlightBooking'
import { userAuth } from '../Context/Auth'
import FlightList from '../Components/FlightOffer'
import Layout from '../Components/Layout/Layout'
import ocean from '../assets/Home/ocean.jpg'


function Bookings() {
    const { flights } = userAuth();


  return (
    <Layout>
        <div className='w-full bg-gray-200'>
            <div className="w-full object-cover shadow-md" style={{ backgroundImage: `url(${ocean})` , backgroundSize: 'cover', backgroundPosition: 'center', height: 'auto'}}>
                <FlightBooking />
            </div>
            <FlightList flights={flights} />
        </div>
    </Layout>
  )
}

export default Bookings