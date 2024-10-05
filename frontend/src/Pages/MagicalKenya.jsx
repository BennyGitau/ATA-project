// import React from 'react'

// function MagicalKenya() {
//   return (
//     <div>MagicalKenya</div>
//   )
// }

// export default MagicalKenya

import React, { useState } from 'react';
import Outdoor from '../assets/Home/outdoor.jpg';
import Girrafe from '../assets/Home/girraffe.jpg';

const categories = [
  {
    id: 'hidden-gems',
    title: 'Hidden Gems',
    images: [
      { label: 'Diani Beach', url: Outdoor },
      { label: 'Lamu Island', url: Outdoor },
      { label: 'Lake Turkana', url: Outdoor },
      { label: 'Diani Beach', url: Outdoor },
      { label: 'Lamu Island', url: Outdoor },
      { label: 'Lake Turkana', url: Outdoor },
    ],
  },
  {
    id: 'luxury-accommodation',
    title: 'Luxury Accommodation',
    images: [
      { label: 'Hemingways Nairobi', url: Outdoor },
      { label: 'Fairmont The Norfolk', url: Outdoor },
      { label: 'Giraffe Manor', url: Outdoor },
      { label: 'Hemingways Nairobi', url: Outdoor },
      { label: 'Fairmont The Norfolk', url: Outdoor },
      { label: 'Giraffe Manor', url: Outdoor },
    ],
  },
  {
    id: 'scenic-kenyan-destinations',
    title: 'Scenic Kenyan Destinations',
    images: [
      { label: 'Mount Kenya', url: Outdoor},
      { label: 'Maasai Mara', url: Outdoor },
      { label: 'Amboseli', url: Outdoor},
      { label: 'Mount Kenya', url: Outdoor},
      { label: 'Maasai Mara', url: Outdoor },
      { label: 'Amboseli', url: Outdoor},
    ],
  },
  {
    id: 'best-trips',
    title: 'Best Trips',
    images: [
      { label: 'Safari Adventure', url: Outdoor },
      { label: 'Nairobi City Tour', url: Outdoor },
      { label: 'Coastal Getaway', url: Outdoor },
      { label: 'Safari Adventure', url: Outdoor },
      { label: 'Nairobi City Tour', url: Outdoor },
      { label: 'Coastal Getaway', url: Outdoor },
    ],
  },
];

const MagicalKenya = () => {
  const [viewMore, setViewMore] = useState({});

  const toggleViewMore = (categoryId) => {
    setViewMore((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Table of Contents */}
      <div className="h-96 shadow-md py-6 bg-cover bg-center relative" style={{ backgroundImage: `url(${Girrafe})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center flex-col">
          <h1 className="text-white text-4xl font-bold relative z-50">
            Magical Kenya
            {/* Shadow effect for "Gallery" */}
            <span className="absolute left-0 w-full  text-center text-gold-primary text-9xl font-semibold opacity-50 z-0">
              Gallery
            </span>
          </h1>
        </div>
      </div>
      <div className='w-[90%] mx-auto my-6 text-center text-xl font-poppins text-gray-700 '>
        <p className=' mb-3'>
          Immerse yourself in the captivating spirit of Kenya, an East African jewel where over 40 vibrant ethnic groups weave a rich tapestry of cultures. 
          Embark on a personalized adventure, be it luxurious relaxation, seamless corporate travel, 
          or an unforgettable leisure experience. Kenya offers state-of-the-art facilities and breathtaking landscapes, promising memories that linger long afterward.
        </p>
        <p className='mb-3'>
          This country isn't just a destination; it's an immersive encounter with welcoming people, untamed beauty and a vibrant blend of traditions, all awaiting your exploration.
        </p>
      </div>

        <div className="flex text-left bg-gold-primary w-[90%] mx-auto flex-col pt-4 space-y-3 text-lg pb-2">
          <p className="pl-2">Go To:</p>
          {categories.map((category) => (
            <a href={`#${category.id}`} key={category.id} className=" border-b w-fit border-gray-500 ml-2 hover:text-blue-800">
              {category.title}
            </a>
          ))}
        </div>

      {/* Gallery Sections */}
      <div className="container mx-auto mt-10 px-4">
        {categories.map((category) => (
          <div id={category.id} key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.slice(0, viewMore[category.id] ? category.images.length : 3).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={image.label}
                    className="h-48 w-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center p-2 rounded-b-lg">
                    {image.label}
                  </div>
                </div>
              ))}
            </div>
            {/* View More/Hide Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => toggleViewMore(category.id)}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition-colors"
              >
                {viewMore[category.id] ? 'Hide' : 'View More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicalKenya;
