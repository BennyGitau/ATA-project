import React from 'react'
import { Link } from 'react-router-dom'

function Partners() {
  return (
    <section className='bg-black w-full pb-4 mx-auto'>
      <h1 className='text-4xl text-center font-bold font-garamond text-gold-primary p-10 md:p-16'>Our Partners</h1>
      <div className='w-[80%] lg:w-[60%] mx-auto'>
        <p className='text-white text-center text-lg font-garamond px-5'>
          These trusted companies share our commitment to excellence and provide a variety of services that enhance every aspect of your journey. 
          From world-class flights, accommodations and luxury car rentals to exhilarating aerial tours, our partners ensure you have access to the very best in the market.
        </p>
        <div className='w-full md:flex-row flex flex-col items-center gap-5 p-8 font-garamond text-lg'>
          <Link to="#" className='w-full mt-4'>
            <button className='bg-gold-secondary text-white-primary rounded-md w-full py-1 mt-4'>Partner with ATA</button>
          </Link>
          <Link to="#" className='w-full mt-4'>
            <button className='bg-gold-secondary text-white-primary rounded-md w-full py-1 mt-4'>Invest in ATA</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Partners