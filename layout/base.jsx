"use client";

import Header from "@/components/layout/header";
import Preloader from "@/components/preloader";
import AOS from "aos";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect } from "react";

export default function ({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <Header />

      <main className="main">{children}</main>
      

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <FaArrowUp style={{ color: "#FFF" }} />
      </a>

      <Preloader />
    </>
  );
}
