"use client";

import { createContext, useLayoutEffect } from "react";
import AOS from "aos";

const AosContext = createContext(null);

export function AosProvider({ children }) {
  useLayoutEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    console.log("=======>");
  }, []);

  return <AosContext.Provider value={null}>{children}</AosContext.Provider>;
}
