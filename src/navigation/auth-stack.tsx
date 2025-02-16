import React from 'react';
import { View, StyleSheet, Pressable, Dimensions, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/auth/HomeScreen';
import FloatingActionButton from '../components/common/FloatingActionButton';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Animated Floating Button
const CustomTabButton = ({ children, onPress }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View style={[styles.centerButtonContainer, animatedStyle]}>
            <Pressable
                onPressIn={() => { scale.value = withSpring(1.2); }}
                onPressOut={() => { scale.value = withSpring(1); }}
                onPress={onPress}
                style={styles.centerButton}
            >
                {children}
            </Pressable>
        </Animated.View>
    );
};

// Custom Curved Bottom Tab
const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    return (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const iconName = route.name === 'Home1' ? "home"
                        : route.name === 'Home2' ? "search"
                            : route.name === 'Home4' ? "bell"
                                : "user";

                    const isFocused = state.index === index;
                    const color = isFocused ? "#28A745" : "#aaa";

                    if (route.name === 'AnimatedButton') {
                        return (
                            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                                <Svg width={110} height={60} viewBox="0 0 110 60" >
                                    <Path fill="red" d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z" />
                                </Svg>
                                <CustomTabButton onPress={() => navigation.navigate(route.name)}>
                                    <FloatingActionButton />
                                </CustomTabButton>
                            </View>
                        );
                    }

                    return (
                        <Pressable
                            key={index}
                            onPress={() => navigation.navigate(route.name)}
                            style={styles.tabItem}
                        >
                            <Icon name={iconName} size={24} color={color} />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="Home1"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
                    // tabBarLabel: () => <Text>Home</Text>
                }}
            />
            <Tab.Screen
                name="Home2"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
                    // tabBarLabel: () => <Text >Home</Text>
                }}
            />
            <Tab.Screen name="AnimatedButton" component={HomeScreen} />
            <Tab.Screen
                name="Home3"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
                    // tabBarLabel: () => <Text >Home</Text>
                }}
            />
            <Tab.Screen
                name="Home4"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
                    // tabBarLabel: () => <Text >Home</Text>
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3, // Adjust height for upward shadow
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6, // Android shadow
    },
    tabBar: {
        flexDirection: 'row',
        // position: 'absolute',
        width: '100%',
        height: 70,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10,
    },
    tabItem: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    centerButtonContainer: {
        position: 'absolute',
        top: -70,
    },
    centerButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#28A745",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    }
});

export default TabNavigator;
