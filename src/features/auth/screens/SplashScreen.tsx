import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { replace } from '../../../utils/NavigationUtil';
const { width, height } = Dimensions.get('window');

const SplashScreen = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            // console.log('succes')
            replace('OnboardingScreen');
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [replace]);

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#ffffff'
            }}
        >
            <View style={{
                flex: 1,
                paddingHorizontal: width * 0.05,
                justifyContent: 'center',
                alignItems: 'center',
                gap: width * 0.025,
            }}>
                <Image
                    source={require('../../../assets/images/logo.png')}
                    resizeMode='contain'
                />

                <Text style={{
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: 16.9,
                    textAlign: 'center',
                    color: '#000000',
                    fontFamily: 'IBM Plex Sans'
                }}>Empowering Professionals,{`\n`} Building Connections</Text>
            </View>
        </ScrollView>
    );
};

export default SplashScreen;
