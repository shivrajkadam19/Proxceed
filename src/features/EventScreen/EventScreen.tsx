import React, { useEffect } from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native'
import Icon from '../../components/common/Icon'
import { PADDING_HORIZONTAL, PADDING_TOP } from '../../utils/Constants'
const Header = () => {
    return (
        <View style={{
            // flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: PADDING_HORIZONTAL,
            paddingTop: PADDING_TOP
        }}>
            <Icon iconFamily={"Feather"} name={"menu"} size={40} color={"#ffffff"} />
            <View>
                <Text>Current Location</Text>
                <Text>Dubai</Text>
            </View>
            <TouchableOpacity style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: 'red'
            }}>
                <Icon iconFamily={"Feather"} name={"bell"} size={20} color={"#ffffff"} />
            </TouchableOpacity>

        </View>
    )
}
const EventScreen = () => {


    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
            }}
        >
            <View style={{
                height: 250,
                backgroundColor: '#07919C',
                borderBottomEndRadius: 40,
                borderBottomStartRadius: 40,
            }}>
                <Header />

            </View>
        </ScrollView>
    )
}

export default EventScreen;