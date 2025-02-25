import React, { useRef } from 'react';
import { View, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PinchGestureHandler, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

interface ZoomableImageProps {
  source: any;
  width: number;
  height: number;
  maxZoom?: number;
  doubleTapZoom?: number;
  containerWidth: number;
  containerHeight: number;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  source,
  width,
  height,
  maxZoom = 5,
  doubleTapZoom = 2,
  containerWidth,
  containerHeight,
}) => {
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const lastScale = useRef(1);

  // Handles pinch-to-zoom
  const pinchHandler = useAnimatedGestureHandler({
    onStart: () => {
      lastScale.current = scale.value;
    },
    onActive: (event) => {
      scale.value = Math.min(Math.max(lastScale.current * event.scale, 1), maxZoom);
    },
  });

  // Handles dragging (panning)
  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (scale.value > 1) {
        const boundX = (width * scale.value - containerWidth) / 2;
        const boundY = (height * scale.value - containerHeight) / 2;
        
        offsetX.value = Math.min(Math.max(event.translationX, -boundX), boundX);
        offsetY.value = Math.min(Math.max(event.translationY, -boundY), boundY);
      }
    },
  });

  // Handles double-tap to zoom
  const doubleTapHandler = (event: GestureResponderEvent) => {
    if (scale.value > 1) {
      scale.value = withTiming(1);
      offsetX.value = withTiming(0);
      offsetY.value = withTiming(0);
    } else {
      scale.value = withTiming(doubleTapZoom);
    }
  };

  // Apply transformations
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <TapGestureHandler numberOfTaps={2} onActivated={doubleTapHandler}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={[styles.container, { width: containerWidth, height: containerHeight }]}> 
            <Animated.Image source={source} style={[{ width, height }, animatedStyle]} resizeMode="contain" />
          </Animated.View>
        </PinchGestureHandler>
      </PanGestureHandler>
    </TapGestureHandler>
  );
};

export default ZoomableImage;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
