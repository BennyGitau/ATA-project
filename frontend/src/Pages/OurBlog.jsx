import React from 'react';
import BannerImg from '../assets/Home/BannerImage.jpg';

function OurBlog() {
  const blogPosts = [
    {
      title: 'Discover the Beauty of Private Charters',
      date: 'September 25, 2024',
      excerpt: 'Explore the luxurious world of private air travel and the convenience it offers for personalized journeys.',
      image: BannerImg,
    },
    {
      title: 'Why First-Class Flights Are Worth It',
      date: 'October 1, 2024',
      excerpt: 'First-class flights provide unparalleled comfort and exclusive perks that elevate your travel experience.',
      image: BannerImg,
    },
    {
      title: 'Top Destinations for Air Travel Enthusiasts',
      date: 'October 5, 2024',
      excerpt: 'From bustling cities to serene retreats, here are the top destinations you should explore by air.',
      image: BannerImg,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="bg-cover bg-center h-80 relative" style={{ backgroundImage: `url(${BannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold">Our Blog</h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.date}</p>
                <p className="mt-3 text-gray-700">{post.excerpt}</p>
                <button className="mt-4 text-blue-600 hover:underline">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
