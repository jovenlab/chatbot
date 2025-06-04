'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Load tokens from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('access');
    setAccessToken(token);
  }, []);

  // Login saves tokens
  function login(access: string, refresh: string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setAccessToken(access);
  }

  // Logout clears tokens
  function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setAccessToken(null);
  }

  // Refresh access token using refresh token
  async function refreshToken() {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      logout();
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('access', data.access);
        setAccessToken(data.access);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }

  const value = {
    accessToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
