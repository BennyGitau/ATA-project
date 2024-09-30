import React, { useState } from 'react'
import BannerImage from '../../assets/Home/BannerImage.jpg'
import { Link } from 'react-router-dom'

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
                <img src={BannerImage} alt="Banner" className='rounded-full h-56 w-56' />
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
                <h1 className='text-4xl bg-white text-center text-yellow-600 p-6 mt-16'>Air Travel Services</h1>
                <section className='flex flex-row justify-between m-auto w-[80%] gap-4 mt-5'>
                    <div className='w-1/3'>
                        <div className='flex flex-col w-full items-start'>
                            <button onClick={handleClickCharter} className='text-3xl text-yellow-600 bg-black rounded-md'>
                                Private Aircraft Charters 
                            </button>
                            <span className='border border-b w-80 border-gray-400 mb-4'></span>
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
                    <div className='w-1/3'>
                        <div className='flex flex-col w-full items-start'>
                            <button onClick={handleFlightClick} className='text-3xl text-yellow-600 bg-black rounded-md'>
                                First Class Flights
                            </button>
                            <span className='border border-b w-60 mb-4 border-gray-400'></span>
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
                    <div className='w-1/3'>
                        <div className='flex flex-col w-full items-start'>
                            <button onClick={handleTourClick} className='text-3xl text-yellow-600 bg-black rounded-md'>
                                Flight Tours
                            </button>
                            <span className='border border-b w-40 mb-4 border-gray-400'></span>
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
            <div className='flex flex-row justify-between w-[80%] text-white text-sm m-auto mt-8 font-poppins'>
                <div className='w-80 flex flex-col gap-14'>
                    <img src={BannerImage} alt="Private Charter Operators" className='w-80 h-80 m-auto'/>
                    <button className='bg-yellow-600 rounded-md w-full py-2 mt-15'>Get Charter Quotation</button>
                </div>
                <div className='w-80 flex flex-col gap-14'>
                    <img src={BannerImage} alt="Private Charter Operators" className='w-80 h-80 m-auto'/>
                    {/* <Link to='/flightbooking' className='bg-yellow-600 rounded-md w-full py-2 mt-15'>Get Flight Quotation</Link> */}
                    <Link to='/flightbooking'>
                        <button className='bg-yellow-600 rounded-md w-full py-2 mt-15'>Get Flight Quotation</button>
                    </Link>
                </div>
                <div className='w-80 flex flex-col gap-14'>
                    <img src={BannerImage} alt="Private Charter Operators" className='w-80 h-80 m-auto'/>
                    <button className='bg-yellow-600 rounded-md w-full py-2 mt-15'>Get Tour Quotation</button>
                </div>
            </div>
    </section>
  )
}
export default Services