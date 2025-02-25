import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/screens/SplashScreen';
import OnboardingScreen from '../features/auth/screens/OnboardingScreen';
import AuthScreen from '../features/auth/screens/AuthScreen';
import OTPScreen from '../features/auth/screens/OTPScreen';
import HomeScreen from '../features/HomeScreen/HomeScreen';
import TabNavigator from './auth-stack';
import CustomStatusBar from '../components/common/CustomStatusBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InterestSelectionScreen from '../features/auth/screens/InterestSelectionScreen';
import CountrySelectionScreen from '../features/auth/screens/CountrySelectionScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

    return (
        <SafeAreaProvider>
            <CustomStatusBar />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
                initialRouteName='SplashScreen'
            >
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
                <Stack.Screen name='AuthScreen' component={AuthScreen} />
                <Stack.Screen name='OTPScreen' component={OTPScreen} />
                <Stack.Screen name='InterestSelectionScreen' component={InterestSelectionScreen} />
                <Stack.Screen name='CountrySelectionScreen' component={CountrySelectionScreen} />
                <Stack.Screen name='TabNavigation' component={TabNavigator} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

export default RootNavigator;
