import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import logo from '../../assets/ATALogo.png';
import CharterImg from '../../assets/Home/charter.jpg';
import FlightImg from '../../assets/Home/flightQuote.jpg';
import TourImg from '../../assets/Home/tour.jpg';
import Aitbnbs from '../../assets/Home/hotels.jpg';
import CarImg from '../../assets/Home/cars.jpg';
// import CarImg from '../../assets/Home/cars.jpg';
function Services() {
  const [charter, setCharter] = useState(false);
  const [flight, setFlight] = useState(false);
  const [tour, setTour] = useState(false);
  const [car, setCar] = useState(false);
  const [hotel, setHotel] = useState(false);

  const handleClickCar = () => setCar(!car);
  const handleClickHotel = () => setHotel(!hotel);
  const handleClickCharter = () => setCharter(!charter);
  const handleFlightClick = () => setFlight(!flight);
  const handleTourClick = () => setTour(!tour);
  
  return (
    <div className='bg-black w-full'>
      <div className='pt-10 w-full lg:w-[80%] mx-auto flex flex-col space-y-4 lg:flex-row lg:space-x-8 font-garamond'>
        <img src={logo} alt="Banner" className='rounded-full h-48 w-48 lg:h-56 lg:w-56 mx-auto lg:mx-0' />
        <article className='w-full text-center  text-gray-100 my-auto px-6 md:px-4'>
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
      
      <h1 className='text-3xl sm:text-4xl bg-[#f9f9f9e8] text-center text-gold-primary p-6 sm:p-10 mt-8 sm:mt-16'>Air Travel Services</h1>
      
      <section className='flex flex-col w-[80%] md:flex-row justify-between gap-4 md:w-[80%]  mx-auto font-garamond text-md mt-5'>
        <ServiceItem title="Private Aircraft Charters" open={charter} onClick={handleClickCharter}>
              Escape to any corner of Kenya on your own terms. Our extensive network connects you with a multitude of reputable Private Charter Operators,
              each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
              Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
              the power to personalize your journey rests entirely with you.
              Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
        </ServiceItem>
        <ServiceItem title="First Class Flights" open={flight} onClick={handleFlightClick}>
            Escape to any corner of Kenya on your own terms. 
            Our extensive network connects you with a multitude of reputable Private Charter Operators,
            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
            the power to personalize your journey rests entirely with you.
            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
        </ServiceItem>
        <ServiceItem title="Flight Tours" open={tour} onClick={handleTourClick}>
            Escape to any corner of Kenya on your own terms. 
            Our extensive network connects you with a multitude of reputable Private Charter Operators,
            each boasting a diverse fleet and the ability to curate a bespoke travel experience tailored to your exact desires.
            Whether seeking a solo escape, a luxurious getaway with friends, or an efficient business trip with colleagues, 
            the power to personalize your journey rests entirely with you.
            Let us navigate the options and seamlessly connect you with the perfect charter for an unforgettable Kenyan adventure.
        </ServiceItem>
      </section>
      
      <section className='flex justify-center flex-col md:flex-row flex-1 gap-4 md:justify-between border-b border-gray-500  w-full md:w-[80%]  mx-auto mt-8'>
        <ServiceImage title="Get Charter Quotation" src={CharterImg} />
        <ServiceImage title="Get Flight Quotation" src={FlightImg} link="/search" />
        <ServiceImage title="Get Tour Quotation" src={TourImg} />
      </section>
      <section className='w-[80%] mx-auto mt-10 '>
        <EndToEndSection handleClickHotel={handleClickHotel} hotel={hotel} handleClickCar={handleClickCar} car={car} />
      </section>
      <section className='flex flex-wrap justify-center md:justify-between w-full md:w-[53%] mx-auto mt-8'>
        <EndToEndSectionImages title="Hotels & Airbnbs" src={Aitbnbs} />
        <EndToEndSectionImages title="Car Rentals" src={CarImg} />   
      </section>
      
      <section className='w-[80%] lg:w-[58%] mx-auto mt-10 border-b pb-8 border-gray-500'>
        <div className='w-full border border-gold-primary rounded-md text-gold-primary font-garamond'>
          <Link to="/">
            <button className='rounded-md w-full py-2'>Contact Us</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceItem({ title, open, onClick, children }) {
  return (
    <div className='w-full md:w-[350px]'>
      <div className='flex justify-between items-center border-b pb-2 border-gray-500'>
        <button onClick={onClick} className='text-xl font-semibold text-gold-primary bg-black rounded-md w-full text-left py-2'>
          {title}
        </button>
        <button onClick={onClick} className='outline-none'>
          {open ? <SlArrowUp className='text-white-primary' /> : <SlArrowDown className='text-white-primary' />}
        </button>
      </div>
      <span className='border-b w-full mt-4 border-gray-500 mb-3'></span>
      {open && <p className='text-gray-300  pt-4'>{children}</p>}
    </div>
  );
}

function ServiceImage({ title, src, link }) {
  return (
    <div className='w-[90%] md:w-[350px] flex flex-col items-center mb-8'>
      <img src={src} alt={title} className='md:h-[350px] md:w-[350px] h-[380px] w-[380px] object-cover rounded' />
      <Link to={link || "#"} className='md:w-[350px] w-[380px] mt-4'>
        <button className='bg-gold-secondary text-white-primary rounded-md w-full py-1.5 mt-4'>{title}</button>
      </Link>
    </div>
  );
}

function EndToEndSection({ handleClickHotel, hotel, handleClickCar, car }) {
  return (
    <section className='w-full md:w-[65%] mx-auto mt-10'>
      <h1 className=' text-3xl md:text-5xl text-center font-garamond font-bold text-white-secondary p-6'>End-to-end Experiences</h1>
      <div className='flex flex-col md:flex-row justify-between gap-4 text-md font-garamond'>
        <ServiceItem title="Hotels & Airbnbs" open={hotel} onClick={handleClickHotel}>
            Cultivating a seamless travel experience extends beyond simply reaching your destination. 
            ATA recognizes the importance of a well-appointed haven. We partner with a curated selection 
            of tastefully furnished hotels and AirBnBs, ensuring an accommodation that reflects your personal 
            preferences. Whether seeking the refined elegance of a top-notch hotel room or the intimate charm 
            of a meticulously designed Airbnb, we cater to your vision of a perfect retreat. Let us leverage our
            expertise to secure the ideal lodging for your Kenyan sojourn.  
            <br></br>
            <br></br>
            Contact us today and allow us to curate your entire travel experience. 
        </ServiceItem>
        <ServiceItem title="Car Rentals" open={car} onClick={handleClickCar}>
            Elevate your arrival with a touch of sophistication. 
            ATA caters to your discerning taste, offering a comprehensive fleet of luxury 
            vehicles to suit any preference. From the sleek power of a Mercedes or BMW to the 
            legendary capability of a Land Cruiser, we provide a curated selection to ensure a stylish entrance. 
            Perhaps a chauffeured limousine beckons? Our dedicated team can arrange every detail, ensuring a seamless 
            transition from the moment you land to your final destination.  
            <br></br>
            <br></br>
            Contact us today and let us orchestrate a grand arrival for your Kenyan adventure.
        </ServiceItem>
      </div>
    </section>
  );
}

function EndToEndSectionImages({ title, src, link }) {
  return (
    <div className='w-[90%] md:w-[350px] flex flex-col items-center mb-8'>
      <img src={src} alt={title} className='w-[350px] h-[350px] object-cover rounded-md' />
      <Link to={link || "#"} className='w-[350px] mt-4'>
        <button className='bg-gold-secondary text-white-primary rounded-md w-full py-1.5 mt-4'>{title}</button>
      </Link>
    </div>
  );
}

export default Services;
