import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

const FloatingActionButton = () => {
    const buttons = [
        { icon: "thermometer", x: -0.15, y: -0.05, onPress: () => console.log("Thermometer clicked") },
        { icon: "clock", x: 0, y: -0.1, onPress: () => console.log("Clock clicked") },
        { icon: "heartbeat", x: 0.15, y: -0.05, onPress: () => console.log("Pulse clicked") },
    ];

    const [expanded, setExpanded] = useState(false);
    const mode = useSharedValue(0);

    const toggleMenu = () => {
        setExpanded(!expanded);
        mode.value = withTiming(expanded ? 0 : 1, { duration: 300 });
    };

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${-mode.value * 45}deg` }],
    }));

    return (
        <View style={styles.container}>
            {buttons.map((button, index) => {
                const animatedStyle = useAnimatedStyle(() => ({
                    transform: [
                        { translateX: withTiming(mode.value * (button.x * width), { duration: 300 }) },
                        { translateY: withTiming(mode.value * (button.y * height), { duration: 300 }) }
                    ],
                }));

                return (
                    <Animated.View key={index} style={[styles.secondaryButton, animatedStyle]}>
                        <Pressable onPress={button.onPress} style={styles.button}>
                            <Icon name={button.icon} size={24} color="#FFF" />
                        </Pressable>
                    </Animated.View>
                );
            })}

            <Pressable onPress={toggleMenu} style={styles.mainButton}>
                <Animated.View style={animatedButtonStyle}>
                    <Icon name="plus" size={24} color="#FFF" />
                </Animated.View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        alignSelf:'center',
        justifyContent: "center",
        bottom:-30,
    },
    mainButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#28A745", // Green color
        shadowColor: "#28A745",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#28A745",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#28A745",
    },
});

export default FloatingActionButton;
