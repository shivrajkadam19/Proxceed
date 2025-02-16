import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, Image, Dimensions, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const AuthScreen: FC = ({ route }) => {
    const navigation = useNavigation();

    // Read initial tab from route params and set appropriate values
    const initialTab = route.params?.tab;

    const toggleValue = useSharedValue(initialTab); // 0 for login, 1 for signup
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab === 0 ? 'login' : 'signup');

    useEffect(() => {
        // Whenever route.params changes, update state and animation
        setActiveTab(initialTab === 0 ? 'login' : 'signup');
        toggleValue.value = withTiming(initialTab, { duration: 200 });
    }, [route.params?.tab]);

    const handleTabPress = (tab: 'login' | 'signup') => {
        toggleValue.value = withTiming(tab === 'login' ? 0 : 1, { duration: 200 });
        setActiveTab(tab);
    };

    // Animated background color for toggle indicator
    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(toggleValue.value * (width * 0.25), { duration: 200 }) }],
    }));

    // Animated text color for login & signup
    const loginTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(toggleValue.value, [0, 1], ['#ffffff', '#626262']),
    }));
    const signupTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(toggleValue.value, [0, 1], ['#626262', '#ffffff']),
    }));

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
            <View style={{ flex: 1, paddingHorizontal: width * 0.05, justifyContent: 'center' }}>
                {/* Logo */}
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                        resizeMode="contain"
                        style={{ width: width * 0.3 }}
                    />
                </View>

                {/* Toggle Bar */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: '#E6E6E6',
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                    }}>
                        <View style={styles.toggleContainer}>
                            <Animated.View style={[styles.indicator, indicatorStyle]} />
                            <TouchableOpacity style={styles.toggleButton} onPress={() => handleTabPress('login')}>
                                <Animated.Text style={[styles.toggleText, loginTextStyle]}>Log In</Animated.Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.toggleButton} onPress={() => handleTabPress('signup')}>
                                <Animated.Text style={[styles.toggleText, signupTextStyle]}>Sign Up</Animated.Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



                {activeTab === 'login' ? (
                    <>

                        < View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Email ID*</Text>
                            <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor={'black'} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Password*</Text>
                            <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry placeholderTextColor={'black'} />
                        </View>
                    </>
                ) : (
                    <>

                        < View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Select Country*</Text>
                            <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor={'black'} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Password*</Text>
                            <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry placeholderTextColor={'black'} />
                        </View>
                    </>
                )}


                {activeTab === 'login' ? (
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitText}>Log In</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('OTPScreen')} style={styles.submitButton}>
                        <Text style={styles.submitText}>Send OTP</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView >
    );
};

export default AuthScreen;

// Styles
const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#E1E1E1',
        width: width * 0.5,
        height: 40,
        overflow: 'hidden',
        position: 'relative',
    },
    indicator: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: '#07919C',
        borderRadius: 20,
        overflow: 'hidden',
    },
    toggleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    toggleText: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 16.9,
        textAlign: 'center',
        fontFamily: 'IBM Plex Sans',
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#F1F1F1',
        borderRadius: 25,
        paddingHorizontal: width * 0.05,
        height: 50,
    },
    submitButton: {
        backgroundColor: '#07919C',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginTop: 20,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'IBM Plex Sans',
    },
});
