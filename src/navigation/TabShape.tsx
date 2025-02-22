import React from 'react';
import { Dimensions } from 'react-native';
import { curveBasis, line } from 'd3-shape';
import Svg, { Path } from 'react-native-svg';

const TAB_HEIGHT = 80; // This fixed height can be as you wish.

const { width } = Dimensions.get('window');

const lineGenerator = line();

const rect = lineGenerator([
    [0, 0],
    [width / 2, 0],
    [width, 0],
    [width, TAB_HEIGHT],
    [0, TAB_HEIGHT],
    [0, 0],
]);

const center = lineGenerator.curve(curveBasis)([
    [(width / 5) * 2, 0],
    [(width / 5) * 2 + 20, TAB_HEIGHT * 0.5],
    [(width / 5) * 3 - 20, TAB_HEIGHT * 0.5],
    [(width / 5) * 3, 0],
]);

const d = `${center} ${rect}`;

export default function TabShape() {
    return (
        <Svg width={width} height={TAB_HEIGHT}>
            <Path fill="white" {...{ d }} />
        </Svg>
    );
}