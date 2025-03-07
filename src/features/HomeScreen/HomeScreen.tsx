import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import notifee, { AndroidStyle } from '@notifee/react-native';
import Header from '../../components/ui/Header';
import { useAuth } from '../../app/redux/hooks/useAuth';
import { resetAndNavigate } from '../../utils/NavigationUtil';
import Loading from '../../components/common/Loading';
const HomeScreen = () => {
    const { user, signOut } = useAuth();

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

    if (user === undefined) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                // justifyContent: 'center',
                // backgroundColor: 'green'
            }}
        >
            <Header />
            {/* <View>
                <TouchableOpacity style={{
                    width: 100,
                    backgroundColor: 'green',
                    alignSelf: 'center'
                }} onPress={() => displayNotifications()} >

                    <Text>Disply notification</Text>
                </TouchableOpacity>
            </View> */}
            {/* <View style={{
                flex: 1,
                backgroundColor: 'red'
            }}>
                <Text style={{ textAlign: 'center', flex: 1, color: '#000000' }}>
                    {user?.userName ? user?.data?.userName : "Lavdya chya bala"}
                </Text>
                <Text style={{ textAlign: 'center', flex: 1, color: '#000000' }}>
                    {user?.anonymousId}
                </Text>
                <Text style={{ textAlign: 'center', flex: 1, color: '#000000' }}>
                    {user?.email}
                </Text>
                <Image source={{ uri: user?.profileImage }} />
            </View> */}

            <View style={{
                flex: 1,
                marginTop: 100
            }}>
                <TouchableOpacity style={{
                    width: 100,
                    backgroundColor: 'green',
                    alignSelf: 'center'
                }} onPress={() => signOut(resetAndNavigate)} >

                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flex: 1,
                backgroundColor: 'green'
            }}>
                <Text style={{ color: 'black' }}> {user}</Text>
            </View>

        </ScrollView>
    )
}

export default HomeScreen;