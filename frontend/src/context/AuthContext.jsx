import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const BASE = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: restore user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    const res  = await fetch(`${BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    localStorage.setItem("user", JSON.stringify(json.data));
    setUser(json.data);
    return json.data;
  };

  const login = async (email, password) => {
    const res  = await fetch(`${BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    localStorage.setItem("user", JSON.stringify(json.data));
    setUser(json.data);
    return json.data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}