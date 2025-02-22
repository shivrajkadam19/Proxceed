import React, { useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";
import debounce from "lodash/debounce"; // Import debounce

const { width, height } = Dimensions.get("window");

const FloatingActionButton = () => {
    const buttons = [
        { icon: "plus", x: -0.15, y: -0.05 },
        { icon: "camera", x: 0, y: -0.1 },
        { icon: "heart", x: 0.15, y: -0.05 },
    ];

    const [expanded, setExpanded] = useState(false);
    const mode = useSharedValue(0);

    // Debounced function to prevent rapid clicks
    const toggleMenu = useCallback(
        debounce(() => {
            setExpanded((prev) => {
                const newVal = !prev;
                mode.value = withTiming(newVal ? 1 : 0, { duration: 300 });
                return newVal;
            });
        }, 200), // 200ms delay to match animation duration
        [mode]
    );

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${-mode.value * 45}deg` }]
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
                        <Pressable style={styles.button}>
                            <Icon name={button.icon} size={20} color="#FFF" />
                        </Pressable>
                    </Animated.View>
                );
            })}

            <Pressable onPress={toggleMenu} style={[styles.mainButton, { backgroundColor: expanded ? "#ffffff" : "#07919C" }]}>
                <Animated.View style={animatedButtonStyle}>
                    <Icon name="plus" size={26} color={expanded ? '#000000' : '#ffffff'} />
                </Animated.View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: "center",
        bottom: 40,
    },
    mainButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 62,
        height: 62,
        borderRadius: 36,
        backgroundColor: "#07919C",
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#07919C",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#07919C",
    },
});

export default FloatingActionButton;
