import React from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get('window');
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import FloatingActionButton from '../../components/common/FloatingActionButton';
const HomeScreen = () => {
    const navigation = useNavigation();
    const actionButtons = [
        { icon: "thermometer", x: -0.15, y: -0.05, onPress: () => console.log("Thermometer clicked") },
        { icon: "clock", x: 0, y: -0.1, onPress: () => console.log("Clock clicked") },
        { icon: "heartbeat", x: 0.15, y: -0.05, onPress: () => console.log("Pulse clicked") },
    ];

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                // backgroundColor: 'red'
            }}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center'
            }}>
                Home
            </View>

            {/* <FloatingActionButton buttons={actionButtons} /> */}
        </ScrollView>
    )
}

export default HomeScreen;