'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeName = 'dark' | 'light' | 'dark-green' | 'dark-blue';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeName | null;
    if (saved && ['dark', 'light', 'dark-green', 'dark-blue'].includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
