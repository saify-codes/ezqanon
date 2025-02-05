"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export default function Navbar() {
  const path = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Lawyers", href: "/lawyers" },
  ];

  // Toggle Mobile Menu
  const handleNavToggle = useCallback(() => {
    setIsNavOpen((prev) => !prev);
    document.body.classList.toggle("mobile-nav-active");
  }, []);

  // Close Menu on Link Click
  const handleMenuItemClick = useCallback(() => {
    setIsNavOpen(false);
    document.body.classList.remove("mobile-nav-active");
  }, []);

  // Handle Scroll Effects
  useEffect(() => {
    const toggleScrolled = () => {
      const header = document.querySelector("#header");
      if (!header?.classList.contains("sticky-top")) return;
      document.body.classList.toggle("scrolled", window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleScrolled);
    return () => window.removeEventListener("scroll", toggleScrolled);
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl d-flex align-items-center">
        {/* Logo */}
        <Link href="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">EzQanon</h1>
        </Link>

        {/* Navigation */}
        <nav id="navmenu" className={`navmenu ${isNavOpen ? "open" : ""}`}>
          <ul>
            {navLinks.map(({ label, href }, index) => (
              <li key={index}>
                <Link
                  href={href}
                  onClick={handleMenuItemClick}
                  className={path === href ? "active" : ""}
                >
                  {label}
                </Link>
              </li>
            ))}
            {/* Mobile Login Link */}
            <li className="d-xl-none">
              <Link href="/signin">Login</Link>
            </li>
          </ul>

          {/* Mobile Navigation Toggle */}
          <button
            className="btn mobile-nav-toggle d-xl-none"
            onClick={handleNavToggle}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </nav>

        {/* Desktop Login Button */}
        <Link href="/signin" className="btn-getstarted d-none d-xl-block">
          Login
        </Link>
      </div>
    </header>
  );
}
