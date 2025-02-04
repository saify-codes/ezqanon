"use client";

import Preloader from "@/components/preloader";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  status: "loading",
  user: null,
  init: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist login state
    setStatus("authenticated");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setStatus("unauthenticated");
  };

  const init = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setStatus(storedUser ? "authenticated" : "unauthenticated");
      if (storedUser) {
        setUser(storedUser);
      }
    } catch {
      setStatus("unauthenticated");
    }
  };

  // Initialize on component mount
  useEffect(() => {
    // init();
  }, []);

  // Render a loading indicator while checking auth status
  if (status === "loading") {
    // return <h1>loading...</h1>;
  }

  const value = {
    status,
    user,
    init,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
