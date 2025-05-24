"use client";

import Link from "next/link";
import UserMenu from "../userMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useAuth } from "@/hooks/useAuth";
import { BsWhatsapp } from "react-icons/bs";

export default function Navbar() {
  const auth = useAuth();
  const path = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const toggleScrolled = () => {
    const header = document.querySelector("#header");
    if (!header?.classList.contains("sticky-top")) return;
    document.body.classList.toggle("scrolled", window.scrollY > 100);
  };

  // Handle Scroll Effects
  useEffect(() => {
    window.addEventListener("scroll", toggleScrolled);

    return () => {
      window.removeEventListener("scroll", toggleScrolled);
      document.body.classList.remove("mobile-nav-active");
    };
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid d-flex align-items-center gap-2 px-xl-5">
        {/* Logo */}
        <Link href="/" className="logo d-flex align-items-center gap-2 me-auto">
          <img src="/assets/img/logo.png" alt="" width="50" />
          <h4 className="fw-bold m-0">{process.env.NEXT_PUBLIC_APP_NAME}</h4>
        </Link>

        {/* Navigation */}
        <nav id="navmenu" className={`navmenu ${isNavOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link
                href="/lawyers"
                onClick={handleMenuItemClick}
                className={path.startsWith("/lawyers") ? "active" : ""}
              >
                
                View Lawyers
              </Link>
            </li>
            <li>
              <Link
                href="/firms"
                onClick={handleMenuItemClick}
                className={path.startsWith("/firms") ? "active" : ""}
              >
                
                View Law Firm
              </Link>
            </li>
            <li>
              <Link
                href="/comingsoon"
                onClick={handleMenuItemClick}
                className={path === "/comingsoon" ? "active" : ""}
              >
                Overseas pakistan
              </Link>
            </li>
            <li>
              <Link
                href="/comingsoon"
                onClick={handleMenuItemClick}
                className={path === "/comingsoon" ? "active" : ""}
              >
                Legal GPT
              </Link>
            </li>
            <li>
              <Link
                href="/comingsoon"
                onClick={handleMenuItemClick}
                className={path === "/comingsoon" ? "active" : ""}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/comingsoon"
                onClick={handleMenuItemClick}
                className={path === "/comingsoon" ? "active" : ""}
              >
                About
              </Link>
            </li>
            <li className="d-xl-none">
              <Link href="https://app.ezqanoon.com/" target="_blank">
                Join as lawyer
              </Link>
            </li>
            {!auth.user && (
              <li className="d-xl-none">
                <Link href="/signin">Login</Link>
              </li>
            )}
            <li className="d-xl-none">
              <Link
                target="_blank"
                className="justify-content-start gap-2"
                href="https://api.whatsapp.com/send?phone=+923360055664&text=Hello%20there!"
              >
                <BsWhatsapp /> 03360055664
              </Link>
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

        <Link
          href="http://ez.thebotss.com/"
          target="_blank"
          className="btn-getstarted d-none d-xl-block"
        >
          Join as lawyer
        </Link>

        {auth.user ? (
          <>
            <Link
              target="_blank"
              href="https://api.whatsapp.com/send?phone=+923360055664&text=Hello%20there!"
              className="btn-getstarted d-none d-xl-block"
              style={{ background: "var(--primary)" }}
            >
              <BsWhatsapp color="#FFF" />
            </Link>
            <UserMenu />
          </>
        ) : (
          <>
            <Link href="/signin" className="btn-getstarted d-none d-xl-block">
              Login
            </Link>
            <Link
              target="_blank"
              href="https://api.whatsapp.com/send?phone=+923360055664&text=Hello%20there!"
              className="btn-getstarted d-none d-xl-block"
              style={{ background: "var(--primary)" }}
            >
              <BsWhatsapp color="#FFF" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
