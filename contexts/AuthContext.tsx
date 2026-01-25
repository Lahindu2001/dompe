"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxLw3rIQ6HIdg6dw_QwSmF9FKjKIaiJN0AQHaPrIKe06hkM3DG76ng7g2u_-iW5A7U3g/exec";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    // 1. Get identifiers from storage
    const savedEmail = localStorage.getItem("userEmail");
    const cachedData = localStorage.getItem("userData");

    // If no email, they are definitely logged out
    if (!savedEmail) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // 2. If we have cached data, set it immediately to prevent ProtectedRoute from redirecting
    if (cachedData && !user) {
      setUser(JSON.parse(cachedData));
    }

    try {
      // 3. Fetch fresh data from Google Sheets
      const response = await fetch(`${APPS_SCRIPT_URL}?action=getUser&email=${savedEmail}`);
      const data = await response.json();

      if (data.status === "success" && data.user) {
        setUser(data.user);
        localStorage.setItem("userData", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Auth sync error:", error);
      // We do NOT set user to null here. If it fails, we keep the cached user 
      // to prevent the auto-logout loop.
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    setUser(null);
    window.location.href = "/login";
  };

  const login = (userData: User) => {
    // Save user data to local storage
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
    
    // Redirect based on role
    if (userData.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else if (userData.role === "shop_owner") {
      window.location.href = "/shops";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, checkAuth, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
};