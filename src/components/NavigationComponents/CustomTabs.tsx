import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FloatingActionButton from '../common/FloatingActionButton';
import CurvedBottomBar from './CurvedBottomBar';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const TAB_HEIGHT = 80;
const { width } = Dimensions.get('window');

const TabShape = () => (
    <CurvedBottomBar width={width} height={80} curveDepth={50} curveWidth={45} cornerRadius={0} />
);

const CustomTabs: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            opacity.value = withTiming(0, { duration: 0, easing: Easing.out(Easing.ease) });
            translateY.value = withTiming(50, { duration: 0, easing: Easing.out(Easing.ease) });
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
            translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <TabShape />
            <View style={StyleSheet.absoluteFill}>
                <View style={styles.tabContainer}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;
                        const tabBarLabel = options.tabBarLabel as string;
                        const iconComponent = options.tabBarIcon as ((props: { color: string; size: number }) => JSX.Element) | undefined;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const iconScale = useSharedValue(isFocused ? 1.2 : 1);

                        useEffect(() => {
                            iconScale.value = withTiming(isFocused ? 1.2 : 1, { duration: 200, easing: Easing.out(Easing.ease) });
                        }, [isFocused]);

                        const animatedIconStyle = useAnimatedStyle(() => ({
                            transform: [{ scale: iconScale.value }],
                        }));

                        if (route.name === "AnimatedButton") {
                            return (
                                <View key={index} style={styles.fabContainer}>
                                    <FloatingActionButton />
                                </View>
                            );
                        }

                        return (
                            <TouchableOpacity key={index} onPress={onPress} style={styles.tabItem}>
                                <Animated.View style={animatedIconStyle}>
                                    {iconComponent ? iconComponent({ color: isFocused ? "#000000" : "#888", size: 26 }) : null}
                                </Animated.View>
                                <Text style={[styles.label, isFocused ? styles.activeLabel : styles.inactiveLabel]}>
                                    {tabBarLabel}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: TAB_HEIGHT,
        width,
        bottom: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        alignItems: 'center',
        padding: 10,
    },
    label: {
        fontSize: 12,
        marginTop: 4,
    },
    activeLabel: {
        color: "#000000",
        fontWeight: 'bold',
    },
    inactiveLabel: {
        color: "#888",
    },
    fabContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
        elevation: 10,
    },
});

export default CustomTabs;
