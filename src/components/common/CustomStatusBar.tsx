// CustomStatusBar.tsx
import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomStatusBarProps {
    backgroundColor?: string;
    barStyle?: 'default' | 'light-content' | 'dark-content';
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
    backgroundColor = '#ffffff',
    barStyle = 'dark-content',
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.statusBar, { backgroundColor, height: insets.top }]}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                barStyle={barStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    statusBar: {
        width: '100%',
    },
});

export default CustomStatusBar;
