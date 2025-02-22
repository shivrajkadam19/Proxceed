import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, Image, Dimensions, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { replace } from '../../../utils/NavigationUtil';

const { width } = Dimensions.get('window');

const AuthScreen: FC = ({ route }) => {
    const navigation = useNavigation();

    const initialTab = route.params?.tab || 0;
    const toggleValue = useSharedValue(initialTab);
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab === 0 ? 'login' : 'signup');

    useEffect(() => {
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
                    <View style={styles.toggleWrapper}>
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

                {/* Form Fields */}
                {activeTab === 'login' ? (
                    <>
                        <View style={{ marginBottom: 20 }}>
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
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Select Country*</Text>
                            <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor={'black'} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Password*</Text>
                            <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry placeholderTextColor={'black'} />
                        </View>
                    </>
                )}

                {/* Continue Button */}
                <TouchableOpacity onPress={() => replace('OTPScreen')} style={styles.submitButton}>
                    <Text style={styles.submitText}>{activeTab === 'login' ? 'Login' : 'Send OTP'}</Text>
                </TouchableOpacity>

                {/* Separator */}
                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <Text style={styles.separatorText}>or</Text>
                    <View style={styles.separator} />
                </View>

                {/* Social Login Buttons */}
                <TouchableOpacity style={styles.socialButton}>
                    {/* <FontAwesome name="google" size={20} color="#000000" style={styles.icon} /> */}
                    <Image source={require('../../../assets/images/google.png')} style={[styles.icon, {
                        height: 20,
                        width: 20,
                        resizeMode: 'contain'
                    }]} />
                    <Text style={styles.socialText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="apple" size={20} color="#000000" style={styles.icon} />
                    <Text style={styles.socialText}>Continue with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialButton, styles.guestButton]}>
                    <Text style={[styles.socialText, { color: '#07919C' }]}>Guest Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AuthScreen;

// Styles
const styles = StyleSheet.create({
    toggleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
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
        color: '#ffffff',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#636363',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#07919C',
        borderRadius: 25,
        height: 50,
        marginVertical: 5,
    },
    guestButton: {
        backgroundColor: 'transparent',
    },
    socialText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#07919C',
    },
    icon: {
        marginRight: 10,
    },
});
