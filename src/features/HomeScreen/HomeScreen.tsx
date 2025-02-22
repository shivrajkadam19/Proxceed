import React, { useEffect } from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native'
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import notifee, { AndroidStyle } from '@notifee/react-native';
const HomeScreen = () => {
    const navigation = useNavigation();

    const displayNotifications = async () => {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Here is an image notification.',
            android: {
                channelId,
                style: {
                    type: AndroidStyle.MESSAGING,
                    person: {
                        name: 'John Doe',
                        icon: 'https://my-cdn.com/avatars/123.png',
                    },
                    messages: [
                        {
                            text: 'Hey, how are you?',
                            timestamp: Date.now() - 600000, // 10 minutes ago
                        },
                        {
                            text: 'Great thanks, food later?',
                            timestamp: Date.now(), // Now
                            person: {
                                name: 'Sarah Lane',
                                icon: 'https://my-cdn.com/avatars/567.png',
                            },
                        },
                    ],
                },
            },
        });

    }

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'red'
            }}
        >
            <View>
                <TouchableOpacity style={{
                    width: 100,
                    backgroundColor: 'green',
                    alignSelf: 'center'
                }} onPress={() => displayNotifications()} >

                    <Text>Disply notification</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default HomeScreen;