import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../assets/Home/BannerImage.jpg';
import Anitah from '../assets/Home/Anitah.jpg';
import waitlist from '../assets/Home/waitlist.jpg';
import monthly from '../assets/Home/monthly.jpg';
import Triweekly from '../assets/Home/Tri-weekly.jpg';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaShare } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { FaEllipsisV } from 'react-icons/fa';
import Layout from '../Components/Layout/Layout';

function AboutUs() {
  const [open, setOpen] = useState(false);

  function onClick() {
    setOpen(!open);
  }

  return (
    <Layout>
    <div className="font-garamond">
      {/* banner */}
      <section
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${BannerImg})`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-0"></div>
        <h1 className="absolute text-center text-4xl md:text-7xl font-bold text-white z-10">
          About Us
        </h1>
      </section>

      {/* content */}
      <section className="w-[90%] lg:w-[80%] mx-auto py-10 text-xl text-center text-gray-800 font-garamond">
        <p className="mb-4">
          Seeking a luxurious Kenyan adventure? ATA curates unforgettable air travel experiences, for business or pleasure, throughout Kenya.
        </p>
        <p className="mb-4">
          ATA is a digitally advanced travel agency focusing on luxurious Private Charter and First Class Flights. We help our clients find the best comfort and convenience for their air travel to or from Kenya.
        </p>
        <p className="mb-4">
          They get to bypass the limitations of traditional travel and embrace a new era of personalized air travel. ATA empowers them to fly on their terms with comprehensive AI-powered virtual assistance regarding crucial matters such as travel documentation, health factors, accommodation, and commute.
        </p>
        <p className="mb-4">
          We handle all logistics, so you can simply relax and enjoy breathtaking landscapes. Bespoke accommodations and seamless onward journeys await!
        </p>
        <p>Contact ATA today and let us whisk you away in style.</p>
      </section>

      {/* contact */}
      <section className="w-[85%] mx-auto">
        <div className="w-full border border-gold-primary rounded-md text-gold-primary font-garamond mb-8">
          <Link to="/engage">
            <button className="rounded-md w-full py-2">Contact Us</button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <img src={Anitah} alt="Anitah" className="w-[250px] md:w-[350px] h-[250px] md:h-[350px] object-cover " />
          <div className="w-full mt-8">
            <div className="flex justify-between items-start border-b pb-2 border-gray-500">
              <button onClick={onClick} className="text-lg md:text-xlrounded-md w-full text-left py-2">
                <h1 className='text-3xl text-gold-primary font-semibold'>Ms. Anitah Favour,</h1>
                <h3 className='text-xl text-gold-primary'>Chief Strategy Officer</h3>
                <p>Anitah is a strategic business management professional with a unique blend of expertise...</p>
              </button>
              <button onClick={onClick} className="text-center text-xl mt-8 outline-none">
                {open ? <SlArrowUp className="text-black" /> : <SlArrowDown className="text-black" />}
              </button>
            </div>
            {open && (
              <p className="pt-4">
                Her Bachelor's Degree in Civil Aviation Management paired with a Certificate in Financial 
                Modeling and Valuation Analysis equips her to navigate the complexities of the aviation industry.  
                <br></br>
                <br></br>
                Anitah's multifaceted background extends beyond traditional aviation.  
                She possesses a wealth of experience in driving strategic business development across diverse entrepreneurial ventures. 
                Notably, her keen interest in Artificial Intelligence and its potential to revolutionize the aviation sector reflects a forward-thinking approach.
                <br></br>
                <br></br>
                As a distinguished 2022 The ROOM Fellow and an apprentice of the prestigious African Leadership Accelerator (ALX) Ventures program, 
                Anitah is demonstrably committed to excellence and fostering positive change.  Her unwavering determination positions her as a transformative 
                leader with a passion for continuous growth. Anitah's sights are firmly set on a fulfilling career at the forefront of the civil aviation industry.
              </p>
            )}
          </div>
        </div>
      </section>
      {/* newsletters */}
      <section className="w-[85%] flex-col flex md:flex-row mx-auto mt-10 border-b gap-6 pb-8 border-gray-500">
        <div className="mb-8 w-1/3">
          <img src={waitlist} alt="e-magazine" className="w-full h-[350px] object-cover mb-4" />
          <Link to="/">
            <button className="rounded-md bg-gold-primary w-full text-white px-4 py-2">Join Waitlist for Monthly e-Magazine</button>
          </Link>
          <p className="mt-2">Be the first to know when our next release launches and enjoy the exclusive offers therein while they last!</p>
        </div>
        <div className="mb-8 w-1/3">
          <img src={monthly} alt="monthly" className="w-full h-[350px] object-cover mb-4" />
          <Link to="/">
            <button className="rounded-md bg-gold-primary w-full text-white px-4 py-2">Subscribe to our Monthly Newsletter</button>
          </Link>
          <p className="mt-2">Get caught up in minutes with a recap of the past week's air travel news and highlights of the upcoming one.</p>
        </div>
        <div className="mb-8 w-1/3">
          <img src={Triweekly} alt="Triweekly" className="w-full h-[350px] object-cover mb-4" />
          <Link to="/">
            <button className="rounded-md bg-gold-primary w-full text-white px-4 py-2">Subscribe to our Tri-weekly Blog</button>
          </Link>
          <p className="mt-2">Read our insightful 5-minute-read articles unraveling air travel complexities, making you a more informed and confident flyer.</p>
        </div>
      </section>

      {/* socials */}
      <section className="w-[90%] flex flex-col mx-auto pb-6 mt-10 font-garamond">
        <div className="flex justify-between px-10">
          <div className='flex items-center flex-col'>
              <h1 className='text-3xl font-semibold mb-4'>Actions</h1>
              <div className='flex gap-4'>
                <button className='border-2 border-black rounded-full p-2'>
                  <BiLike className='text-5xl'/>
                </button>
                <button className=' '>
                  <FaMessage className='text-6xl border-2 border-black rounded-full p-2' />
                </button>
                <button className=''>
                  <IoIosShareAlt className='text-6xl border-2 border-black rounded-full p-2' />
                </button>
                <button className=''>
                  <FaEllipsisV className='text-6xl border-2 border-black rounded-full p-2' />
                </button>
              </div>
          </div>
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-bold mb-4">Follow Us on Social Media</h1>
            <div className="flex space-x-4">
              <FaFacebook className="text-[#4267B2] w-14 h-14" />
              <FaTwitter className="text-[#1DA1F2] w-14 h-14" />
              <FaInstagram className="text-[#E1306C] w-14 h-14" />
              <FaYoutube className="text-[#FF0000] w-14 h-14" />
            </div>
          </div>
        </div>
        <div className="w-full border border-gold-primary rounded-md mt-6 text-gold-primary font-garamond">
          <Link to="/engage">
            <button className="rounded-md w-full py-2">Contact Us</button>
          </Link>
        </div>
      </section>
    </div>
    </Layout>
  );
}

export default AboutUs;
