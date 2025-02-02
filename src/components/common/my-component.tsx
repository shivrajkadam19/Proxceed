import React from 'react';
import { Text, View, Button } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const MyComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.text }}>This is a theme test!</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={theme.button} />
    </View>
  );
};

export default MyComponent;
