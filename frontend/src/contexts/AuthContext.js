import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Backend API URL
const API_URL = process.env.REACT_APP_API_URL || "https://service-hvuc.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Set Authorization header automatically
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  }, [token]);

  // Signup
  const signup = async (email, password) => {
    try {
      const res = await api.post("/signup", { email, password });
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Signup failed" };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });

      const accessToken = res.data.access_token;

      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setUser(res.data.user);

      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}