import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { AppNavigator } from '../navigation/root-navigator'; // Or whatever your navigation setup is

export const AppProvider: React.FC = () => {
  return (
    <ThemeProvider>
      {/* <AppNavigator /> */}
    </ThemeProvider>
  );
};
