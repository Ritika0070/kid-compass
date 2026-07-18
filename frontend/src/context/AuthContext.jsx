import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we've checked localStorage once

  // On first load, restore a session if one was saved from a previous visit
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    if (newUser) localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser ?? null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}