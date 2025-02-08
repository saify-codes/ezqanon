"use client";

import api from "@/app/services/api";
import { deleteCookie, getCookie, setCookie } from "@/utils";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  status: "loading",
  user: null,
  token: null,
  init: () => {},
  signup: () => {},
  signin: () => {},
  signout: () => {},
});

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("loading");

  const signup = (data) => {
    return api.post("/signup", data);
  };

  const signin = async (email, password, remember = false) => {
    try {
      const { data } = await api.post("/signin", { email, password, remember });
      setCookie('user', JSON.stringify(data.user), data.expiresAt);
      setCookie('auth_token', data.token, data.expiresAt);
      setStatus('authenticated');
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      throw error;
    }
  };

  const signout = () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    deleteCookie('user');
    deleteCookie('auth_token');
    setStatus('unauthenticated');
    setUser(null);
    api.post('/signout', null, config)
  };

  const init = () => {
    try {
      const user  = JSON.parse(getCookie("user"));
      const token = getCookie("auth_token");
      setStatus(user ? "authenticated" : "unauthenticated");
      setUser(user);
      setToken(token)
      console.log(user, token);
      
    } catch {
      setStatus("unauthenticated");
    }
  };

  // Initialize on component mount
  useEffect(() => {
    init();
  }, []);

  // Redirect to home page when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/');
    }
  }, [status, router]);

  const value = {
    status,
    user,
    token,
    init,
    signin,
    signup,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}