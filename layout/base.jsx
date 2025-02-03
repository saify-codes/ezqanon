"use client";

import Header from "@/components/layout/header";
import Preloader from "@/components/preloader";
import AOS from "aos";
import Footer from "@/components/layout/footer";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect } from "react";
import ScrollTop from "@/components/scrollTop";

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
      <Footer/>
      <ScrollTop/>
      <Preloader />
    </>
  );
}
