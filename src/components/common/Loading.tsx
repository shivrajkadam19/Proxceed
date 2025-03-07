import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { PADDING_HORIZONTAL } from '../../utils/Constants';

type LoadingAnimationProps = {
    size?: number;
    source?: any;
    loop?: boolean;
    autoPlay?: boolean;
};

const { width, height } = Dimensions.get('window');

const quotes = [
    "Loading... Stay patient!",
    "Great things take time...",
    "Good things come to those who wait!",
    "Almost there...",
    "Hang tight, we're working on it!",
    "Hold on, magic is happening behind the scenes...",
    "Patience is the key to greatness.",
    "Progress in motion... Stay with us!",
    "Quality takes time. Almost done!",
    "We appreciate your patience!",
    "Every great masterpiece takes time to create. While we prepare something amazing for you, take a deep breath and enjoy the moment!",
    "They say good things come to those who wait. We promise what’s on the other side of this loading screen will be worth it!",
    "Behind every loading screen is a team working hard to bring you the best experience possible. Thanks for sticking with us!",
    "While you wait, remember that even the fastest journeys start with a small pause. We’re getting there!",
    "Your patience is greatly appreciated! We’re fine-tuning every detail to make sure everything works perfectly for you!",
    "Loading... because perfection can't be rushed!",
    "Fetching awesome content just for you...",
    "Sit back, relax, and let us handle the hard part!",
    "Building something cool... Stay tuned!",
    "Good things take time, and this is going to be great!",
    "The wait is temporary, but the experience will be worth it!",
    "Almost done... We promise it’s worth the wait!",
    "Your request is being processed... Thanks for waiting!",
    "This isn't just loading; it's a masterpiece in progress!",
    "Preparing something amazing... Just a moment!",
    "We're making sure everything is perfect for you!",
    "Your patience is fueling our progress. Thanks for waiting!",
];

const Loading: React.FC<LoadingAnimationProps> = ({
    size = 150,
    source = require('../../assets/lotttie/loading.json'),
    loop = true,
    autoPlay = true,
}) => {
    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                style={{ width: size, height: size }}
                resizeMode="cover"
                autoPlay={autoPlay}
                loop={loop}
                source={source}
            />
            <Text style={styles.quote}>{quote}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    quote: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#666',
        paddingHorizontal: PADDING_HORIZONTAL * 2 ,
    },
});

export default Loading;
