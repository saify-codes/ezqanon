"use client";

import api from "@/services/api";
import { deleteCookie, getCookie, setCookie } from "@/utils";
import { createContext, useLayoutEffect, useState } from "react";

export const AuthContext = createContext({
  status: "loading",
  user: null,
  token: null,
  init: () => {},
  signup: () => {},
  signin: () => {},
  signout: () => {},
  updateUserSessionData: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("loading");

  const signup = (data) => {
    return api.post("/signup", data);
  };

  const signin = async (email, password, remember = false) => {
    try {
      const { data } = await api.post("/signin", { email, password, remember });
      // setCookie('user', JSON.stringify(data.user), data.expiresAt);
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

    // deleteCookie('user');
    deleteCookie('auth_token');
    setStatus('unauthenticated');
    setUser(null);
    api.post('/signout', null, config)
  };

  const updateUserSessionData = (updatedFields) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedFields };
    }); 

  };

  const init = async () => {
    const token = getCookie("auth_token");
    
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {

        const {data} = await api.get('/profile', config)
        setUser(data.data);
        setToken(token)
        setStatus("authenticated");        
        
      } catch (error) {

        const { status } = error.response;
        if (status === 401) { // delete token because its invalid
          deleteCookie('auth_token')
        }
        setStatus("unauthenticated");
        alert('something went wrong')
      }
    }
    
  };

  // Initialize on component mount
  useLayoutEffect(() => {
    init();
  }, []);

  const value = {
    status,
    user,
    token,
    init,
    signin,
    signup,
    signout,
    updateUserSessionData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}