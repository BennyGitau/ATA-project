import React from 'react'
import Assistant from '../../Components/Assistant'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import Services from './Services'
import Partners from './Partners'
import Slider from './Slider'

function Home() {
  return (
    <div className='w-full'>
        <Banner />
        <Services />
        <Partners />
        <Slider />
    </div>
    // <div className='w-full'>
    //     <h1 className='w-full text-center m-8 text-4xl'>WELCOME TO ATA</h1>
    //     <section className='flex flex-row justify-between m-auto w-[60%]'>
    //         <div className='text-center'>
    //             <h1 className='text-2xl mb-3'>Air Travel Services</h1>
    //             <Link to='/flightbooking' className='text-blue-500 bg-black p-3 rounded-md'>
    //             Search
    //             </Link>

    //         </div>
    //         <div className='text-center'>
    //             <h1 className='text-2xl text-yellow-500 mb-3'>Chat with an Assistant</h1>
    //             <Assistant />
    //         </div>
    //     </section>
    // </div>
  )
}

export default Home