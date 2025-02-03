"use client";

import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa"; // Ensure you have react-icons installed

export default function ScrollTop() {
  const scrollTopRef = useRef(null);

  // Toggle the "active" class based on the current scroll position
  const toggleScrollTop = () => {
    if (scrollTopRef.current) {
      if (window.scrollY > 100) {
        scrollTopRef.current.classList.add("active");
      } else {
        scrollTopRef.current.classList.remove("active");
      }
    }
  };

  // Attach event listeners on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrollTop);

    // Call it once to ensure the state is correct when the component mounts
    toggleScrollTop();

    return () => {
      window.removeEventListener("scroll", toggleScrollTop);
      window.removeEventListener("load", toggleScrollTop);
    };
  }, []);

  // Handle click event to scroll to the top smoothly
  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <a
      href="#"
      id="scroll-top"
      ref={scrollTopRef}
      onClick={handleClick}
      className="scroll-top d-flex align-items-center justify-content-center"
    >
      <FaArrowUp style={{ color: "#FFF" }} />
    </a>
  );
}
