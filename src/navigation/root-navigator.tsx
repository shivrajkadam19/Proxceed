import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/screens/SplashScreen';
import OnboardingScreen from '../features/auth/screens/OnboardingScreen';
import AuthScreen from '../features/auth/screens/AuthScreen';
import OTPScreen from '../features/auth/screens/OTPScreen';
import InterestSelectionScreen from '../features/auth/screens/InterestSelectionScreen';
import CountrySelectionScreen from '../features/auth/screens/CountrySelectionScreen';
import GuestLoginScreen from '../features/auth/screens/GuestLoginScreen';
import RegistrationScreen from '../features/auth/screens/RegistrationScreen';
import DrawerNavigator from './DrawerNavigation';
import { useAuth } from '../app/redux/hooks/useAuth';
import { resetAndNavigate } from '../utils/NavigationUtil';
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { isAuthenticated,user } = useAuth();
    // console.log("Auth", isAuthenticated);
    // console.log("use", u);

    useEffect(() => {
        if (isAuthenticated) {
            resetAndNavigate('TabNavigation');
        } else {
            resetAndNavigate('SplashScreen');
        }
    }, [isAuthenticated]);
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal'
            }}
            initialRouteName='SplashScreen'
        >

            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='TabNavigation' component={DrawerNavigator} />
            <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
            <Stack.Screen name='AuthScreen' component={AuthScreen} />
            <Stack.Screen name='OTPScreen' component={OTPScreen} />
            <Stack.Screen name='InterestSelectionScreen' component={InterestSelectionScreen} />
            <Stack.Screen name='CountrySelectionScreen' component={CountrySelectionScreen} />
            <Stack.Screen name='GuestLoginScreen' component={GuestLoginScreen} />
            <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
