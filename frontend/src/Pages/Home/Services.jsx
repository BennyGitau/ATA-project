import React, { useState } from 'react'
import BannerImage from '../../assets/Home/BannerImage.jpg'

function Services() {
    const {open, setOpen} = useState(false) 
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
                <section className='flex flex-row justify-between m-auto w-[80%] gap-4'>
                    <div className='w-1/3'>
                        <button onClick={handleClick} className='text-3xl text-yellow-600 bg-black p-2 rounded-md'>
                            Private Aircraft Charters 
                        </button>
                        <p className=' text-white w-full text-left'>
                            Escape to any corner of Kenya on your own terms. 
                            Our extensive network connects you with a multitude of reputable Private Charter Operators,
                            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
                            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
                            the power to personalize your journey rests entirely with you.
                            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
                        </p>
                    </div>
                    <div className='w-1/3'>
                        <button onClick={handleClick} className='text-3xl text-yellow-600 bg-black p-2 rounded-md'>
                            First Class Flights
                        </button>
                        <span className='border border-l-2 border-white'></span>
                        <p className='text-left text-white w-fit'>
                            Escape to any corner of Kenya on your own terms. 
                            Our extensive network connects you with a multitude of reputable Private Charter Operators,
                            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
                            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
                            the power to personalize your journey rests entirely with you.
                            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
                        </p>
                    </div>
                    <div className='w-1/3'>
                        <button onClick={handleClick} className='text-3xl text-yellow-600 bg-black p-2 rounded-md'>
                            Flight Tours
                        </button>
                        <p className='text-left text-white w-fit'>
                            Escape to any corner of Kenya on your own terms. 
                            Our extensive network connects you with a multitude of reputable Private Charter Operators,
                            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
                            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
                            the power to personalize your journey rests entirely with you.
                            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
                        </p>
                    </div>
                    

                </section>
            </div>
    </section>
  )
}

export default Services