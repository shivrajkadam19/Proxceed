import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';

const { width } = Dimensions.get('window');

const OTPScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const [isError, setIsError] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleVerifyOTP = () => {
        if (otp !== '123456') {
            setIsError(true);
            startShake();
        } else {
            console.log('OTP Verified');
        }
    };

    const startShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start(() => shakeAnimation.setValue(0));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{`Enter the 6-digit \nVerification code`}</Text>
                <Text style={styles.subtitle}>{`We have sent the verification code on \nPhone number +91 7776838833`}</Text>
                <Text style={styles.editNumber}>Edit Phone number</Text>
                <Animated.View style={[styles.otpContainer, { transform: [{ translateX: shakeAnimation }] }]}>
                    <OTPTextInput
                        inputCount={6}
                        keyboardType="numeric"
                        textInputStyle={
                            styles.otpInput
                        }
                        handleTextChange={(text) => {
                            setOtp(text);
                            if (isError) setIsError(false);
                        }}
                        autoFocus={true}
                        tintColor={isError ? '#ff0000' : '#07919C'}
                        offTintColor={isError ? '#ff0000' : '#07919C'}

                    />
                </Animated.View>
                {
                    isError && <Text style={{
                        color: 'red',
                        textAlign: 'justify'
                    }}>Incorrect code. Please try again</Text>
                }
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')} style={styles.resendButton}>
                    <Text style={styles.resendButtonText}>Resend Code</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        justifyContent: 'center',
        gap: width * 0.025,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'justify'
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    editNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    otpInput: {
        borderWidth: 1.5,
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        width: 45,
        height: 60,
    },
    verifyButton: {
        marginTop: 20,
        backgroundColor: '#07919C',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    verifyButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendButton: {
        marginTop: 15,
        borderColor: '#047179',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    resendButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OTPScreen;
