import React, { useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay,
    runOnJS
} from "react-native-reanimated";
import Icon from "./Icon";
import debounce from "lodash/debounce";

const { width, height } = Dimensions.get("window");

const FloatingActionButton = () => {
    const buttons = [
        { icon: "add-to-photos", x: -0.15, y: -0.05, delay: 50, iconFamily: "MaterialIcons" as const, title: "Post" },
        { icon: "camera", x: 0, y: -0.1, delay: 100, iconFamily: "Feather" as const, title: "Camera" },
        { icon: "ticket", x: 0.15, y: -0.05, delay: 150, iconFamily: "Fontisto" as const, title: "Event" },
    ];

    const [expanded, setExpanded] = useState(false);
    const mode = useSharedValue(0);
    const isAnimating = useSharedValue(false); // Prevents concurrent touches

    const toggleMenu = useCallback(
        debounce(() => {
            if (isAnimating.value) return; // Prevent multiple taps

            const newValue = mode.value === 0 ? 1 : 0;
            isAnimating.value = true; // Disable touch until animation completes

            mode.value = withSpring(newValue, { damping: 8, stiffness: 100 });

            runOnJS(setExpanded)(newValue === 1);

            // Reset `isAnimating` after animation completion (approx. 400ms)
            runOnJS(setTimeout)(() => {
                isAnimating.value = false;
            }, 400);
        }, 200),
        [mode, isAnimating]
    );

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${-mode.value * 45}deg` }]
    }));

    return (
        <View style={styles.container}>
            {buttons.map((button, index) => {
                const animatedStyle = useAnimatedStyle(() => ({
                    transform: [
                        { translateX: withDelay(button.delay, withSpring(mode.value * (button.x * width), { damping: 8, stiffness: 150 })) },
                        { translateY: withDelay(button.delay, withSpring(mode.value * (button.y * height), { damping: 8, stiffness: 150 })) }
                    ],
                    opacity: withDelay(button.delay, withTiming(mode.value, { duration: 200 })),
                }));

                return (
                    <Animated.View key={index} style={[styles.secondaryButton, animatedStyle]}>
                        <Pressable style={styles.button} onPress={runOnJS(() => console.log(button.title))}>
                            <Icon name={button.icon} size={20} color="#FFF" iconFamily={button.iconFamily} />
                            <Text style={styles.buttonText}>{button.title}</Text>
                        </Pressable>
                    </Animated.View>
                );
            })}

            <Pressable
                disabled={isAnimating.value} // Prevent touches while animating
                onPress={runOnJS(toggleMenu)}
                style={[styles.mainButton, { backgroundColor: expanded ? "#ffffff" : "#07919C" }]}>
                <Animated.View style={animatedButtonStyle}>
                    <Icon name="plus" size={26} color={expanded ? '#000000' : '#ffffff'} iconFamily={"Feather"} />
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
        width: 50,
        height: 50,
        borderRadius: 29,
        backgroundColor: "#07919C",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 29,
        backgroundColor: "#07919C",
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: "300",
        color: '#ffffff'
    }
});

export default FloatingActionButton;
