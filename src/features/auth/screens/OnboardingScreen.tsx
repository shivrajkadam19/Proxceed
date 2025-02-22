import React from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get('window');
import Octicons from 'react-native-vector-icons/Octicons';
import { replace } from '../../../utils/NavigationUtil';
const OnboardingScreen = () => {
    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#ffffff'
            }}
        >
            <TouchableOpacity style={{
                position: 'absolute',
                right: 20,
                top: 20
            }}

            >
                <Octicons name='moon' size={24} color={'#047179'} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                paddingHorizontal: width * 0.05,
                // paddingVertical:height *0.15,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30

            }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 36.4,
                    textAlign: 'center',
                    color: '#000000',
                    fontFamily: 'IBM Plex Sans'
                }}>Connect with a Social{`\n`}Community of{`\n`}Professionals</Text>
                <View style={{
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 700,
                        lineHeight: 23.24,
                        textAlign: 'center',
                        color: '#000000',
                        fontFamily: 'IBM Plex Sans'
                    }}>Connect with a Social{`\n`} Community of Professionals</Text>
                    <Image
                        source={require('../../../assets/images/image.png')}
                        resizeMode='contain'
                    />

                </View>
                <View style={{
                    gap: 20
                }}>
                    <Pressable style={{
                        backgroundColor: '#07919C',
                        paddingHorizontal: width * 0.1,
                        paddingVertical: 8,
                        borderRadius: 25,
                    }}
                        onPress={() => replace('AuthScreen', {
                            tab: 1
                        })}
                    >

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 500,
                            lineHeight: 26,
                            textAlign: 'center',
                            color: '#ffffff',
                            fontFamily: 'IBM Plex Sans'
                        }}>Join Proxceed</Text>
                    </Pressable>
                    <Pressable style={{
                        backgroundColor: '#07919C',
                        paddingHorizontal: width * 0.1,
                        paddingVertical: 8,
                        borderRadius: 25,
                    }}
                        onPress={() => replace('AuthScreen', {
                            tab: 1
                        })}
                    >

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 500,
                            lineHeight: 26,
                            textAlign: 'center',
                            color: '#ffffff',
                            fontFamily: 'IBM Plex Sans'
                        }}>Guest Login</Text>
                    </Pressable>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: 20.8,
                            textAlign: 'center',
                            color: '#636363',
                            fontFamily: 'IBM Plex Sans'
                        }}>Already have account ?  </Text>
                        <Text
                            onPress={() => replace('AuthScreen', {
                                tab: 0
                            })}
                            style={{
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 20.8,
                                textAlign: 'center',
                                color: '#282C3E',
                                fontFamily: 'IBM Plex Sans'
                            }}>Log in</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default OnboardingScreen;