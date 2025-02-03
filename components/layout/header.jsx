'use client'

import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Function to toggle menu
    const handleNavToggle = () => {
        setIsNavOpen(prevState => !prevState);
        document.querySelector("body").classList.toggle("mobile-nav-active");
    };

    // Function to close menu when an item is clicked
    const handleMenuItemClick = () => {
        setIsNavOpen(false);
        document.querySelector("body").classList.remove("mobile-nav-active");
    };

    return (
        <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center">

                {/* Logo */}
                <a href="index.html" className="logo d-flex align-items-center me-auto">
                    <h1 className="sitename">EzQanon</h1>
                </a>

                {/* Navigation */}
                <nav id="navmenu" className={`navmenu ${isNavOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="#hero" className="active" onClick={handleMenuItemClick}>Home</a></li>
                        <li><a href="#about" onClick={handleMenuItemClick}>About</a></li>
                        <li><a href="#services" onClick={handleMenuItemClick}>Services</a></li>
                        <li><a href="#portfolio" onClick={handleMenuItemClick}>Portfolio</a></li>
                        <li><a href="#team" onClick={handleMenuItemClick}>Team</a></li>
                        <li><a href="#contact" onClick={handleMenuItemClick}>Contact</a></li>
                    </ul>

                    {/* Mobile Navigation Toggle */}
                    <button className="btn mobile-nav-toggle d-xl-none " onClick={handleNavToggle}>
                        {isNavOpen ? (
                            <RiCloseLine/>
                        ) : (
                            <RiMenu3Line/>
                        )}
                    </button>
                </nav>

                {/* Get Started Button */}
                <a className="btn-getstarted" href="index.html#about">Get Started</a>

            </div>
        </header>
    );
}
