import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaEllipsisV, FaUserCircle } from 'react-icons/fa'; // For hamburger and dropdown icons
import logo from '../../assets/ATALogo.png';
import { userAuth } from '../../Context/Auth';
import {   
    BiLock,
    BiLockOpenAlt,
    BiLogIn,
    BiLogOut,
    BiSearch,
    BiSolidDashboard,
    BiUser,
    BiUserCircle, } from 'react-icons/bi';



function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    const { isLoggedIn, user, handleLogout } = userAuth();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const onLogout = () => {
        handleLogout();
        setAccountDropdownOpen(!accountDropdownOpen);
    }
    const toggleAccountDropdown = () => {
        setAccountDropdownOpen(!accountDropdownOpen);
    }
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Determine how many links to display based on window width
    const visibleLinks = windowWidth >= 1024 ? 6 : windowWidth >= 768 ? 3 : 0;

    const links = [
        { name: 'Home', to: '/' },
        { name: 'About Us', to: '/about' },
        { name: 'Engage Us', to: '/engage' },
        { name: 'Our Blog', to: '/blog' },
        { name: 'Magical Kenya', to: '/magical-kenya' },
        { name: 'Travel Accessories', to: '/accessories' }
    ];

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-transparent'} z-50 p-4`}>
            <section className="flex justify-between items-center">
                {/* Logo and Hamburger Menu (Visible on small screens) */}
                <div className='flex items-center gap-2 ml-4'>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                    <Link to='/'>
                        <img src={logo} className="w-10 h-10" alt="logo" />
                    </Link>
                    <Link to='/'>
                        <h1 className="text-3xl text-white">ATA ~ Air Travel Assistance</h1>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex items-center flex-row gap-2">
                    <nav className="hidden md:flex lg:flex gap-4">
                        {links.slice(0, visibleLinks).map((link, index) => (
                            <Link key={index} to={link.to} className="text-white w-fit h-fit">
                                {link.name}
                            </Link>
                        ))}
                        {/* More dropdown for smaller screens */}
                        {visibleLinks < links.length && (
                            <div className="relative hidden md:flex">
                                <button onClick={toggleDropdown} className="text-white focus:outline-none">
                                    More
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-7 bg-black text-white rounded-md shadow-lg w-48">
                                        {links.slice(visibleLinks).map((link, index) => (
                                            <Link
                                                key={index}
                                                to={link.to}
                                                className="block px-4 py-2 hover:bg-gray-700"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                    {isLoggedIn ? (
                        <div className="relative">
                            <button onClick={toggleAccountDropdown} className="text-white focus:outline-none">
                                <FaUserCircle size={24} />
                            </button>
                            
                            {accountDropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-black text-white rounded-md shadow-lg w-48">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-700"
                                        onClick={() => setAccountDropdownOpen(false)}
                                    >
                                        My Account
                                    </Link>
                                    <button
                                        onClick={onLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="text-white bg-gray-500 rounded-md px-4 py-2 hover:bg-gold-primary">
                            login                        
                        </Link>
                    )}  
                </div>
            </section>
            <SidebarLinks menuOpen={menuOpen} toggleMenu={toggleMenu} links={links} />
        </header>

    );
}

function SidebarLinks({menuOpen, toggleMenu, links}) {
    
    return (
        <div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-0 left-0 w-1/2 min-h-screen bg-black text-white flex flex-col items-left px-5 py-4 space-y-5 md:hidden">
                    <button onClick={toggleMenu} className="text-white font-normal text-2xl  text-left w-full">
                        <FaTimes />
                    </button>
                    {links.map((link, index) => (
                        <Link key={index} to={link.to} onClick={toggleMenu} className="text-white">
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Header;
