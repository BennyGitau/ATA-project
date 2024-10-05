import React from 'react'
import logo from '../../assets/ATALogo.png'

function Footer() {
  return (
    <footer className='bg-gold-primary w-full'>
      <section className='flex flex-row justify-between items-center mx-24'>
        <div className='py-6 w-1/3'>
          <img src={logo} alt="logo" className='w-52 h-52' />
        </div>
        <div className='w-1/3 flex flex-col gap-10'>
          <h1 className='text-white-primary text-center md:text-5xl font-poppins'>TEMBEA kENYA!</h1>
          <p className='text-white-primary text-center'>Copyright &copy; 2024 ATA. All rights reserved.</p>
        </div>
        <div className='w-1/3 text-right flex flex-col gap-4'>
          <h1 className='text-white-primary md:text-xl'>ATA-Air Travel Assistance,</h1>
          <p className='text-white-primary'>Kenya, East Africa.</p>
          <a href="mailto:ata.airtravelassistance@gmail.com?subject=Enquiry.com"><p className=''>ata.airtravelassistance@gmail.com</p></a>
          <p className='text-white-primary'>Contact Us: +254 769 893 626</p>
        </div>
      </section>
    </footer>
  )
}

export default Footer