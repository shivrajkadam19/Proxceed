import React, { useEffect, useRef, useState } from "react";
import {
    StatusBar,
    View,
    Animated,
    useColorScheme,
    StyleSheet,
} from "react-native";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";

const AnimatedStatusBar = () => {
    const scheme = useColorScheme(); // Detect light/dark mode
    const [hidden, setHidden] = useState(false);
    const opacity = useRef(new Animated.Value(1)).current; // Animated opacity

    // Animate status bar appearance
    const toggleStatusBar = (show) => {
        Animated.timing(opacity, {
            toValue: show ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setHidden(!show));
    };

    // Gesture Handling - Swipe Up to Hide, Swipe Down to Show
    const onGestureEvent = ({ nativeEvent }) => {
        if (nativeEvent.translationY < -50) toggleStatusBar(false); // Swipe up to hide
        else if (nativeEvent.translationY > 50) toggleStatusBar(true); // Swipe down to show
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.statusBarContainer, { opacity }]}>
                    <StatusBar
                        animated={true}
                        translucent={true}
                        backgroundColor={scheme === "dark" ? "#222" : "#fff"}
                        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
                        hidden={hidden}
                    />
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    statusBarContainer: {
        height: StatusBar.currentHeight || 24, // Default status bar height
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
});

export default AnimatedStatusBar;
