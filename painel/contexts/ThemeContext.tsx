"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isLightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isLightMode: false, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Quando o site abre, ele olha no "caderninho" do navegador
    const savedTheme = localStorage.getItem("sis-ma-theme");
    if (savedTheme === "light") {
      setIsLightMode(true);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    // Salva a escolha instantaneamente
    localStorage.setItem("sis-ma-theme", newTheme ? "light" : "dark");
  };

  // Segura a renderização por 1 milissegundo para a tela não piscar branco/preto
  if (!mounted) return null; 

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);