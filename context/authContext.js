"use client";

import api from "@/services/api";
import { deleteCookie, getCookie, setCookie } from "@/utils";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const AuthContext = createContext({
  status: "loading",
  user: null,
  token: null,
  init: () => {},
  authenticated: () => {},
  signup: (formData) => {},
  signin: (email, password, remember = false) => {},
  signout: () => {},
  forgot: (email) => {},
  reset: (formData) => {},
  verify: (token) => {},
  sendVerificationLink: (email) => {},
  updateUserSessionData: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("loading");

  const signup = (formData) => {
    return api.post("/signup", formData);
  };

  const signin = async (email, password, remember = false) => {
    const { data } = await api.post("/signin", { email, password, remember });
    // setCookie('user', JSON.stringify(data.user), data.expiresAt);
    setCookie("auth_token", data.token, data.expiresAt);
    setStatus("authenticated");
    setUser(data.user);
    setToken(data.token);
  };

  const signout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // deleteCookie('user');
    deleteCookie("auth_token");
    setStatus("unauthenticated");
    setUser(null);
    api.post("/signout", null, config);
  };

  const forgot = async (email) => {
    const { data } = await api.post("/forgot", { email });
    return data.message;
  };

  const reset = async (formData) => {
    const { data } = await api.post("/reset", formData);
    return data.message;
  };
  
  const verify = async (token) => {
    const { data } = await api.post("/verify", {token});
    return data.message;
  };
  
  const sendVerificationLink = async (email) => {
    const { data } = await api.post("/resend", {email});
    return data.message;
  };

  const updateUserSessionData = (updatedFields) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedFields };
    });
  };

  const authenticated = () => {
    return status === 'authenticated'
  };

  const init = async () => {
    const token = getCookie("auth_token");
    if (!token) return setStatus("unauthenticated");
  
    try {
      const { data } = await api.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.data);
      setToken(token);
      setStatus("authenticated");
    } catch (error) {
      if (error.response.status === 401) deleteCookie("auth_token");
      setStatus("unauthenticated");
    }
  };
  
  useLayoutEffect(() => {
    init();
  }, []);

  const value = {
    status,
    user,
    token,
    init,
    authenticated,
    signin,
    signup,
    signout,
    forgot,
    reset,
    verify,
    sendVerificationLink,
    updateUserSessionData,
  };
  
  // wait for session to load
  if (status === 'loading') {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
