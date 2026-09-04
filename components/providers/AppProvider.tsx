'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserProfile = {
  fullName: string;
  mobile: string;
  city: string;
  aadhaar: string;
  email?: string;
  role: 'farmer' | 'buyer' | null;
  walletBalance: number;
};

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('agrimelan_lang');
    if (storedLang) setLanguageState(storedLang);

    const storedUser = localStorage.getItem('agrimelan_user');
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('agrimelan_lang', lang);
  };

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('agrimelan_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('agrimelan_user');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, user, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
