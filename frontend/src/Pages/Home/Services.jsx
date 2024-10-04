import React, { useState } from 'react'
import BannerImage from '../../assets/Home/BannerImage.jpg'
import { Link } from 'react-router-dom'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import logo from '../../assets/ATALogo.png'
import CharterImg from '../../assets/Home/charter.jpg'
import FlightImg from '../../assets/Home/flightQuote.jpg'
import TourImg from '../../assets/Home/tour.jpg'

function Services() {
    const [open, setOpen] = useState(false)
    const [charter, setCharter] = useState(false)
    const [flight, setFlight] = useState(false)
    const [tour, setTour] = useState(false)

    function handleClickCharter() {
        setCharter(!charter)
    }
    function handleFlightClick() {
        setFlight(!flight)
    }
    function handleTourClick() {
        setTour(!tour)
    }

    function handleClick() {
        setOpen(!open)   
    }
  return (
    <section className='bg-black w-full'>
            <div className='pt-10 w-[60%] mx-auto flex flex-row space-x-8 font-garamond'>
                <img src={logo} alt="Banner" className='rounded-full h-56 w-56' />
                <article className='w-fit text-center text-gray-300 my-auto flex-col font-medium '>
                    <p className='text-left mb-4'>
                        ATA offers personalized air travel assistance ensuring you travel
                        effortlessly in utter comfort and luxury. Whether you want to get to your next meeting in style,
                        enjoy scenic views from the best vantage in the sky, or experience your best accommodation and 
                        commute service yet, ATA has you covered. 
                    </p>
                    <p className='text-left'>
                        Time is your greatest asset, let us save it for you! Travel in style with ATA, 
                        your comprehensive travel companion. We primarily serve air travelers flying from, 
                        to, or within Kenya - a beautiful East African country where so much adventure awaits. 
                        Contact us to tailor your next travel experience.
                    </p>
                </article>
            </div>
            <div className='w-full font-serif font-bold'>
                <h1 className='text-4xl bg-[#f9f9f9e8] text-center text-gold-primary p-10 mt-16'>Air Travel Services</h1>
                <section className='flex flex-row justify-between m-auto w-[58%] gap-4 mt-5'>
                    <div className='w-[350px]'>
                        <div className='flex flex-col items-start'>
                            <div className='flex flex-row justify-between w-full'>
                                <button onClick={handleClickCharter} className='text-md text-gold-primary outline-none bg-black rounded-md'>
                                    Private Aircraft Charters    
                                </button>
                                <button onClick={handleClickCharter} className='outline-none hover:text-gold-primary'>
                                {charter? <SlArrowUp className='text-white-primary' /> : <SlArrowDown className='text-white-primary' />}
                                </button>
                            </div>
                            <span className='border-b w-full mt-4 border-gray-500 mb-3'></span>
                        </div>
                    {charter && (
                        <p className=' text-white w-full text-left'>
                            Escape to any corner of Kenya on your own terms. 
                            Our extensive network connects you with a multitude of reputable Private Charter Operators,
                            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
                            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
                            the power to personalize your journey rests entirely with you.
                            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
                        </p>
                    )}
                    </div>
                    <div className='w-[350px]'>
                        <div className='flex flex-col w-full items-start'>
                            <div className='flex flex-row justify-between w-full'>
                                <button onClick={handleFlightClick} className='text-md text-gold-primary bg-black rounded-md outline-none'>
                                    First Class Flights
                                </button>
                                <button onClick={handleFlightClick} className='outline-none hover:text-gold-primary'>
                                {flight? <SlArrowUp className='text-white-primary' /> : <SlArrowDown className='text-white-primary' />}
                                </button>

                            </div>
                            <span className='border-b w-full mt-4 border-gray-500 mb-3'></span>
                        </div>
                        { flight && (
                        <p className='text-left text-white w-fit'>
                            Escape to any corner of Kenya on your own terms. 
                            Our extensive network connects you with a multitude of reputable Private Charter Operators,
                            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
                            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
                            the power to personalize your journey rests entirely with you.
                            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
                        </p>                            
                        )}
                    </div>
                    
                    <div className='w-[350px]'>
                        <div className='flex flex-col w-full items-start'>
                            <div className='flex flex-row justify-between w-full'>
                                <button onClick={handleTourClick} className='text-md text-gold-primary bg-black rounded-md outline-none'>
                                    Flight tours
                                </button>
                                <button onClick={handleTourClick} className='outline-none hover:text-gold-primary'>
                                {tour? <SlArrowUp className='text-white-primary' /> : <SlArrowDown className='text-white-primary' />}
                                </button>
                            </div>
                            <span className='border-b w-full mt-4 border-gray-500 mb-3'></span>
                        </div>
                    {tour && ( 
                        <p className='text-left text-white w-fit'>
                            Escape to any corner of Kenya on your own terms. 
                            Our extensive network connects you with a multitude of reputable Private Charter Operators,
                            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
                            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
                            the power to personalize your journey rests entirely with you.
                            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
                        </p>
                        )}
                    </div>
                </section>
            </div>
            <div className='flex flex-row justify-between border-b w-[58%] gap-8 text-white text-sm m-auto mt-10 font-poppins'>
                <div className=' flex flex-col gap-14 mb-8'>
                    <img src={CharterImg} alt="Private Charter Operators" className='w-[350px] h-[350px] m-auto'/>
                    <button className='bg-gold-primary rounded-md w-full py-2 mt-15'>Get Charter Quotation</button>
                </div>
                <div className='flex flex-col gap-14 mb-8'>
                    <img src={FlightImg} alt="Private Charter Operators" className='w-[350px] h-[350px] m-auto'/>
                    {/* <Link to='/flightbooking' className='bg-yellow-600 rounded-md w-full py-2 mt-15'>Get Flight Quotation</Link> */}
                    <Link to='/flightbooking'>
                        <button className='bg-gold-primary rounded-md w-full py-2 mt-15'>Get Flight Quotation</button>
                    </Link>
                </div>
                <div className='flex flex-col gap-14 mb-8'>
                    <img src={TourImg} alt="Private Charter Operators" className='w-[350px] h-[350px] m-auto'/>
                    <button className='bg-gold-primary rounded-md w-full py-2 mt-15'>Get Tour Quotation</button>
                </div>
            </div>
            <span className='border border-b-2 w-full mt-4 border-gray-500'></span>
            <div>
                <section className='w-[58%] m-auto mt-10'>
                    <div className='flex flex-row justify-between'>
                        <h1 className='text-2xl text-white'>Why choose us?</h1>
                    </div>
                </section>        
            </div>
    </section>
  )
}
export default Services