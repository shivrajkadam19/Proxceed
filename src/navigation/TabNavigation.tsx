import React, { useEffect, useReducer, useRef } from 'react'
import {
    Pressable,
    StyleSheet,
    View,
    Text,
    LayoutChangeEvent,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'

const Tab = createBottomTabNavigator()
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const TabNavigation = ({ screens }) => {
    return (
            <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
                {screens.map((screen, index) => (
                    <Tab.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={{
                            tabBarIcon: () => (
                                <LottieView autoPlay loop={false} source={screen.icon} style={styles.icon} />
                            ),
                        }}
                    />
                ))}
            </Tab.Navigator>
    )
}

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }: BottomTabBarProps) => {
    const { bottom } = useSafeAreaInsets()
    const reducer = (state, action) => [...state, { x: action.x, index: action.index }]
    const [layout, dispatch] = useReducer(reducer, [])

    const handleLayout = (event: LayoutChangeEvent, index: number) => {
        dispatch({ x: event.nativeEvent.layout.x, index })
    }

    const xOffset = useDerivedValue(() => {
        if (layout.length !== routes.length) return 0;
        return [...layout].find(({ index }) => index === activeIndex)?.x - 25 || 0;
    }, [activeIndex, layout])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    }))

    return (
        <View style={[styles.tabBar, { paddingBottom: bottom }]}>
            <AnimatedSvg width={110} height={60} viewBox="0 0 110 60" style={[styles.activeBackground, animatedStyles]}>
                <Path fill="#604AE6" d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z" />
            </AnimatedSvg>

            <View style={styles.tabBarContainer}>
                {routes.map((route, index) => (
                    <TabBarComponent
                        key={route.key}
                        active={index === activeIndex}
                        options={descriptors[route.key].options}
                        onLayout={(e) => handleLayout(e, index)}
                        onPress={() => navigation.navigate(route.name)}
                    />
                ))}
            </View>
        </View>
    )
}

const TabBarComponent = ({ active, options, onLayout, onPress }) => {
    const animatedComponentCircleStyles = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(active ? 1 : 0, { duration: 250 }) }],
    }))

    const animatedIconContainerStyles = useAnimatedStyle(() => ({
        opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    }))

    return (
        <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
            <Animated.View style={[styles.componentCircle, animatedComponentCircleStyles]} />
            <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
                {options.tabBarIcon ? options.tabBarIcon() : <Text>?</Text>}
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tabBar: { backgroundColor: 'white' },
    activeBackground: { position: 'absolute' },
    tabBarContainer: { flexDirection: 'row', justifyContent: 'space-evenly' },
    component: { height: 60, width: 60, marginTop: -5 },
    componentCircle: { flex: 1, borderRadius: 30, backgroundColor: 'white' },
    iconContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
    icon: { height: 36, width: 36 },
})

export default TabNavigation;
