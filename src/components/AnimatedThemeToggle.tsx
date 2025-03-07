import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Dimensions, GestureResponderEvent } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../app/redux/slices/themeSlice";
import { useTheme } from "../app/redux/hooks/useTheme";
import Svg, { Circle } from "react-native-svg";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedProps,
    Easing,
    runOnJS,
} from "react-native-reanimated";
import Icon from "./common/Icon";

const { width, height } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedThemeToggle: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const animationInProgress = useRef(false);
    const circleRadius = useSharedValue(0);
    const centerX = useSharedValue(width / 2);
    const centerY = useSharedValue(height / 2);

    const animatedCircleProps = useAnimatedProps(() => ({
        r: circleRadius.value,
    }));

    const handleThemeToggle = (event: GestureResponderEvent) => {
        if (animationInProgress.current) return;
        animationInProgress.current = true;

        centerX.value = event.nativeEvent.pageX;
        centerY.value = event.nativeEvent.pageY;

        circleRadius.value = withTiming(Math.hypot(width, height), {
            duration: 500,
            easing: Easing.ease,
        }, () => {
            runOnJS(dispatch)(toggleTheme()); // Ensure dispatch runs on JS thread
            runOnJS(() => { animationInProgress.current = false; })();
            circleRadius.value = 0;
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Svg style={{ position: "absolute", width, height }}>
                <AnimatedCircle
                    cx={centerX}
                    cy={centerY}
                    r={animatedCircleProps.r}
                    fill={theme.mode === "light" ? "black" : "white"}
                />
            </Svg>

            <TouchableOpacity
                style={{ position: "absolute", right: 20, top: 20 }}
                onPress={handleThemeToggle}
            >
                <Icon
                    iconFamily={"Octicons"}
                    name={theme.mode === "light" ? "moon" : "sun"}
                    size={24}
                    color={theme.primary}
                />
            </TouchableOpacity>
        </View>
    );
};

export default AnimatedThemeToggle;
