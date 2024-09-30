import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-transparent'} z-50 p-4`}>
            <Link to='/'>
                <h1 className="text-3xl text-white">ATA</h1>
            </Link>
        </header>
    );
}

export default Header;
