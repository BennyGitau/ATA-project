import React, { useState, useEffect } from 'react';
import elephat from '../../assets/Home/elephat.jpg';
import airballon from '../../assets/Home/airballon.jpg';
import girraffe from '../../assets/Home/girraffe.jpg';
import nairobi from '../../assets/Home/Nairobi.jpeg';
import ocean from '../../assets/Home/ocean.jpg';
import outdoor from '../../assets/Home/outdoor.jpg';
import zebra from '../../assets/Home/zebras.jpg';
import wildlife from '../../assets/Home/wildlife.jpg';
import plane from '../../assets/Home/plane.jpg';
import hotels from '../../assets/Home/hotels.jpg';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function Slider() {
  const images = [elephat, airballon, girraffe, nairobi,ocean, outdoor, zebra, wildlife, plane, hotels];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      goToNext();
    }, 5000); 

    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className='bg-black w-full py-8'>
      <h1 className='text-4xl text-center text-white mb-8'>Explore Beautiful Kenya</h1>
      
      <div className='relative w-[70%] md:w-[45%] mx-auto'>
        <img
          src={images[currentIndex]}
          alt="Slider"
          className='h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover rounded-md transition duration-500 ease-in-out'
        />

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full'
        >
          <SlArrowLeft />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full'
        >
          <SlArrowRight />
        </button>
      </div>

      {/* Slider Dots */}
      <div className='flex justify-center mt-6'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full mx-2 ${
              currentIndex === index ? 'bg-gold-primary' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Slider;
