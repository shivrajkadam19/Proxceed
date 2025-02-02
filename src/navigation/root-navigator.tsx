import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext'; // Your custom theme hook

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const { theme } = useTheme(); // Access current theme to dynamically update styles

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.button,
          background: theme.background,
          card: theme.background,
          text: theme.text,
          border: theme.text,
          notification: theme.button,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home" // Default initial screen
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
