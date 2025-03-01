import React from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get('window');
import { replace } from '../../../utils/NavigationUtil';
import { toggleTheme } from "../../../app/redux/slices/themeSlice"; // Import toggle action
import { useTheme } from "../../../app/redux/hooks/useTheme";
import { useDispatch } from "react-redux";
import Icon from '../../../components/common/Icon';
const OnboardingScreen = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: theme.background
            }}
        >
            <TouchableOpacity
                style={{ position: "absolute", right: 20, top: 20 }}
                onPress={() => dispatch(toggleTheme())}
            >
                <Icon
                    iconFamily={"Octicons"}
                    name={theme.mode === "light" ? "moon" : "sun"}
                    size={24}
                    color={theme.primary}
                />
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
                    color: theme.textPrimary,
                    fontFamily: 'IBM Plex Sans'
                }}>Connect with a Social{`\n`}Community of{`\n`}Professionals</Text>
                <View style={{
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 700,
                        lineHeight: 23.24,
                        textAlign: 'center',
                        color: theme.textPrimary,
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
                        onPress={() => replace('GuestLoginScreen')}
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
                            color: theme.textSecondary,
                            fontFamily: 'IBM Plex Sans'
                        }}>Already have account ?  </Text>
                        <Text
                            onPress={() => replace('InterestSelectionScreen', {
                                tab: 0
                            })}
                            style={{
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 20.8,
                                textAlign: 'center',
                                color: theme.textPrimary,
                                fontFamily: 'IBM Plex Sans'
                            }}>Log in</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default OnboardingScreen;