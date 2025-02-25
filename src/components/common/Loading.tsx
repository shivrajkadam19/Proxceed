import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

type LoadingAnimationProps = {
    size?: number;
    source?: any;
    loop?: boolean;
    autoPlay?: boolean;
};

const { width, height } = Dimensions.get('window');

const Loading: React.FC<LoadingAnimationProps> = ({
    size = 200,
    source = require('../../assets/lotttie/loading.json'),
    loop = true,
    autoPlay = true,
}) => {
    return (
        <View style={styles.container}>
            <LottieView
                style={{ width: size, height: size }}
                resizeMode='cover'
                autoPlay={autoPlay}
                loop={loop}
                source={source}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export default Loading;
