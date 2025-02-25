import React, { useEffect } from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native'
import LottieView, { LottieViewProps } from 'lottie-react-native';
import Loading from '../../components/common/Loading';
const { width, height } = Dimensions.get('window');

const ShopScreen = () => {

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Loading />

        </ScrollView>
    )
}

export default ShopScreen;