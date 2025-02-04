"use client";

import Link from "next/link";
import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Define your navigation links in an array
  const navLinks = [
    { label: "Home", href: "/#hero", active: true },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Lawyers", href: "/lawyers" },
    { label: "Contact", href: "#contact" },
    // { label: "Portfolio", href: "#portfolio" },
  ];

  // Function to toggle the mobile menu
  const handleNavToggle = () => {
    setIsNavOpen((prevState) => !prevState);
    document.querySelector("body").classList.toggle("mobile-nav-active");
  };

  // Function to close the menu when a link is clicked
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
        <nav id="navmenu" className={`navmenu ${isNavOpen ? "open" : ""}`}>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={handleMenuItemClick}
                  className={link.active ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation Toggle */}
          <button
            className="btn mobile-nav-toggle d-xl-none"
            onClick={handleNavToggle}
          >
            {isNavOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </nav>

        {/* Get Started Button */}
        <a className="btn-getstarted" href="index.html#about">
          Login
        </a>

      </div>
    </header>
  );
}
