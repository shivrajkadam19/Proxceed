import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabs from '../components/NavigationComponents/CustomTabs';
import HomeScreen from '../features/HomeScreen/HomeScreen';
import Icon from '../components/common/Icon';
import ShopScreen from '../features/HomeScreen/ShopScreen';
import EventScreen from '../features/EventScreen/EventScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabs {...props} />}
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
                component={EventScreen}
                options={{
                    tabBarLabel: "Network",
                    tabBarIcon: ({ color, size }) => (<Icon name="event-note" color={color} size={size} iconFamily={'MaterialIcons'} />),
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

export default TabNavigator;