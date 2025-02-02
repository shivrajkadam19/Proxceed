import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface Theme {
  background: string;
  text: string;
  button: string;
  // Add more as needed for dark and light themes
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultLightTheme: Theme = {
  background: '#FFFFFF',
  text: '#000000',
  button: '#007BFF', // light theme button color
};

const defaultDarkTheme: Theme = {
  background: '#121212',
  text: '#FFFFFF',
  button: '#BB86FC', // dark theme button color
};

// Create the ThemeContext with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC = ({ children }) => {
  const systemTheme = useColorScheme(); // Auto detects system theme: 'light' or 'dark'
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? defaultDarkTheme : defaultLightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === defaultLightTheme ? defaultDarkTheme : defaultLightTheme
    );
  };

  useEffect(() => {
    if (systemTheme) {
      setTheme(systemTheme === 'dark' ? defaultDarkTheme : defaultLightTheme);
    }
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
