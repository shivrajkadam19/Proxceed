import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './MyTabBar';
import HomeScreen from '../features/HomeScreen/HomeScreen';
import Icon from '../components/common/Icon';
import ShopScreen from '../features/HomeScreen/ShopScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{ headerShown: false }}

        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (<Icon color={color} size={size} name='home' iconFamily={'Ionicons'} />),
                }}
            />
            <Tab.Screen
                name="My Network"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Network",
                    tabBarIcon: ({ color, size }) => (<Icon name="people" color={color} size={size} iconFamily={'Ionicons'} />),
                }}
            />
            <Tab.Screen
                name="AnimatedButton"
                component={HomeScreen}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Tab.Screen
                name="Shop"
                component={ShopScreen}
                options={{
                    tabBarLabel: "Shop",
                    tabBarIcon: ({ color, size }) => (<Icon color={color} size={size} name='shopping-bag' iconFamily={'FontAwesome5'} />),
                }}
            />
            <Tab.Screen
                name="Jobs"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Jobs",
                    tabBarIcon: ({ color, size }) => (<Icon color={color} size={size} name='briefcase' iconFamily={'FontAwesome5'} />),
                }}
            />
        </Tab.Navigator>
    );
}
