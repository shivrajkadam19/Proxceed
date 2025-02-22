import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'


interface IconProps {
    color?: string;
    size: number;
    name: string;
    iconFamily:
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Ionicons'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'Fontisto'
    | 'Foundation'
    | 'Octicons'
    | 'Zocial';
}

const Icon: FC<IconProps> = ({ color, size, name, iconFamily }) => {
    const iconSize = RFValue(size);

    switch (iconFamily) {
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={name} color={color} size={iconSize} />
        case 'MaterialIcons': return <MaterialIcons name={name} color={color} size={iconSize} />
        case 'Ionicons': return <Ionicons name={name} color={color} size={iconSize} />
        case 'FontAwesome': return <FontAwesome name={name} color={color} size={iconSize} />
        case 'Entypo': return <Entypo name={name} color={color} size={iconSize} />
        case 'EvilIcons': return <EvilIcons name={name} color={color} size={iconSize} />
        case 'Feather': return <Feather name={name} color={color} size={iconSize} />
        case 'Fontisto': return <Fontisto name={name} color={color} size={iconSize} />
        case 'Foundation': return <Foundation name={name} color={color} size={iconSize} />
        case 'Octicons': return <Octicons name={name} color={color} size={iconSize} />
        case 'FontAwesome5': return <FontAwesome5 name={name} color={color} size={iconSize} />
        case 'Zocial': return <Zocial name={name} color={color} size={iconSize} />
        default: return null;
    }
}

export default Icon;