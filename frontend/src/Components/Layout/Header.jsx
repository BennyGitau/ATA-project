import React, { useEffect, useState } from 'react';

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
            <h1 className="text-3xl text-white">My Header</h1>
        </header>
    );
}

export default Header;
