"use client";

import Header from "@/components/layout/header";
import Preloader from "@/components/preloader";
import Footer from "@/components/layout/footer";
import ScrollTop from "@/components/scrollTop";

export default function ({ children }) {
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
