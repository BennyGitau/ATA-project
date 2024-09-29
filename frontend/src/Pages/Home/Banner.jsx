import React, { useEffect, useState } from 'react';
import BannerImage from '../../assets/Home/BannerImage.jpg';

function Banner() {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const bannerStyle = {
        height: scrollY < 400 ? `${950 - scrollY}px` : `100px`,
    };

    const contentStyle = {
        transform: `translateY(${scrollY > 400 ? 0 : 400 - scrollY}px)`,
    };

    return (
        <section className="bg-black w-full relative overflow-hidden">
            <div className="w-full bg-cover bg-no-repeat bg-center transition-all duration-500"
                style={{
                    backgroundImage: `url(${BannerImage})`,
                    ...bannerStyle,
                }}
            >
                <div className="absolute bottom-32 left-0 right-0 text-center h-fit w-full p-10 z-10 text-white font-garamond">
                    <h1 className="text-2xl md:text-4xl font-semibold ">
                        Indulge in luxurious comfort & convenience with premium
                    </h1>
                    <h2 className="text-3xl font-bold md:text-4xl mt-4">
                        personalized air travel assistance from ATA!
                    </h2>
                    <p className="text-lg md:text-xl mt-4">
                        Quote within 24hrs <span className="text-2xl">🕕</span>
                    </p>
                </div>
            </div>

        </section>
    );
}

export default Banner;