"use client";

import AOS from "aos";
import { createContext, useEffect } from "react";

const AosContext = createContext();

export function AosProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return <AosContext.Provider>{children}</AosContext.Provider>;
}
