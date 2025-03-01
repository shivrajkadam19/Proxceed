import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { navigate } from '../../../utils/NavigationUtil';
import Icon from '../../../components/common/Icon';
import FastImage from 'react-native-fast-image';
import { PADDING_HORIZONTAL } from '../../../utils/Constants';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const GuestLoginScreen: FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const animation = useSharedValue(0);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
    };


    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
            animation.value = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) });
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
            animation.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) });
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [animation]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: animation.value === 0 ? '90%' : 50,
        borderRadius: animation.value === 0 ? 25 : 50,
        alignSelf: animation.value === 0 ? 'center' : 'flex-end',
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Guest Login</Text>
            <Text style={styles.subtitle}>
                No login, no identity—just your question. Use guest mode to ask anything without revealing who you are. Your curiosity, your privacy!
            </Text>

            <View style={{ marginBottom: 20 }}>
                <Text style={styles.label}>Select Country*</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigate('CountrySelectionScreen', {
                            onCountrySelect: handleCountrySelect,
                        })
                    }
                    style={
                        [
                            {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            },
                            styles.inputContainer
                        ]
                    }
                >
                    {selectedCountry ? (
                        <View style={styles.inputContainer}>
                            <FastImage
                                source={{
                                    uri: selectedCountry.flag,
                                    priority: FastImage.priority.high,
                                }}
                                style={{
                                    width: 30,
                                    height: 20,
                                    marginRight: 10,
                                    borderRadius: 4,
                                    marginLeft: -(PADDING_HORIZONTAL)
                                }} />


                            <View style={styles.verticalSeparator} />
                            <Text style={styles.countryCode}>+{selectedCountry?.callingCodes[0]}</Text>
                        </View>
                    ) : (
                        <View style={styles.inputContainer}>
                            <Text>Country</Text>
                        </View>

                    )}
                    <Icon name='angle-right' size={20} color="#000000" iconFamily={"FontAwesome"} />

                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.label}>Phone Number*</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.countryCode}>+{selectedCountry?.callingCodes[0] ?? "   "}</Text>
                    <View style={styles.verticalSeparator} />
                    <TextInput
                        onChangeText={(text) => setPhoneNumber(text)}
                        style={styles.input}
                        placeholder="000000 000000"
                        placeholderTextColor={'#A0A0A0'}
                        keyboardType="phone-pad"
                        autoFocus={true}
                    />
                </View>
            </View>

            <Animated.View style={[animatedStyle]}>
                <TouchableOpacity style={styles.submitButton} onPress={()=>navigate('RegistrationScreen')}>
                    {keyboardVisible ? (
                        <Icon iconFamily={'Ionicons'} name="arrow-forward" size={24} color="#fff" />
                    ) : (
                        <Text style={styles.submitText}>Continue</Text>
                    )}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default GuestLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: PADDING_HORIZONTAL,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#005f66',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 30,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        borderRadius: 25,
        height: 50,
        paddingHorizontal: PADDING_HORIZONTAL,
    },
    input: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 25,
        paddingHorizontal: PADDING_HORIZONTAL,
        height: 50,
        fontSize: 13,
        fontWeight: 400
    },
    countryCode: {
        fontSize: 13,
        color: '#000',
        marginRight: 10,
        fontWeight: 400,
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
    verticalSeparator: {
        width: 1,
        height: '50%',
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
    },
});

