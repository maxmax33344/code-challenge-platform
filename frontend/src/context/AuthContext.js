import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from "../axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.log("Invalid token");
        logout();
      }
    };
    const token = localStorage.getItem("token");

    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }
  }, []);
  
  

  const login = (userData,token) => {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
