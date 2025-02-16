import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/screens/SplashScreen';
import OnboardingScreen from '../features/auth/screens/OnboardingScreen';
import AuthScreen from '../features/auth/screens/AuthScreen';
import OTPScreen from '../features/auth/screens/OTPScreen';
// import TabNavigator from './auth-stack';
import TabNavigation from './TabNavigation';
import HomeScreen from '../features/auth/HomeScreen';
import TabNavigator from './auth-stack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

    const screens = [
        { name: 'Home', component: HomeScreen, icon: require('../assets/lotttie/home.icon.json') },
        { name: 'Upload', component: HomeScreen, icon: require('../assets/lotttie/upload.icon.json') },
        { name: 'Chat', component: HomeScreen, icon: require('../assets/lotttie/chat.icon.json') },
        { name: 'Settings', component: HomeScreen, icon: require('../assets/lotttie/settings.icon.json') },
    ];

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName='SplashScreen'
            >
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
                <Stack.Screen name='AuthScreen' component={AuthScreen} />
                <Stack.Screen name='OTPScreen' component={OTPScreen} />
                <Stack.Screen name='TabNavigation' component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
