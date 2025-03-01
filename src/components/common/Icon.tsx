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
    style?: object;
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

const Icon: FC<IconProps> = ({ color, size, name, iconFamily, style, ...props }) => {
    const iconSize = RFValue(size);
    const commonProps = { name, color, size: iconSize, style, ...props };

    switch (iconFamily) {
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons {...commonProps} />
        case 'MaterialIcons': return <MaterialIcons {...commonProps} />
        case 'Ionicons': return <Ionicons {...commonProps} />
        case 'FontAwesome': return <FontAwesome {...commonProps} />
        case 'Entypo': return <Entypo {...commonProps} />
        case 'EvilIcons': return <EvilIcons {...commonProps} />
        case 'Feather': return <Feather {...commonProps} />
        case 'Fontisto': return <Fontisto {...commonProps} />
        case 'Foundation': return <Foundation {...commonProps} />
        case 'Octicons': return <Octicons {...commonProps} />
        case 'FontAwesome5': return <FontAwesome5 {...commonProps} />
        case 'Zocial': return <Zocial {...commonProps} />
        default: return null;
    }
}

export default Icon;
