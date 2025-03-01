import React from "react";
import Svg, { Path } from "react-native-svg";

interface CurvedBottomBarProps {
    width: number;
    height: number;
    curveDepth?: number;
    curveWidth?: number;
    cornerRadius?: number;
}

const CurvedBottomBar: React.FC<CurvedBottomBarProps> = ({ width, height, curveDepth = 40, curveWidth = 40, cornerRadius = 20 }) => {
    return (
        <Svg width={width} height={height}>
            <Path
                fill="white"
                d={`M${cornerRadius},0  
            Q0,0 0,${cornerRadius} 
            V${height - cornerRadius}  
            Q0,${height} ${cornerRadius},${height}  
            H${width - cornerRadius}  
            Q${width},${height} ${width},${height - cornerRadius}  
            V${cornerRadius}  
            Q${width},0 ${width - cornerRadius},0  
            H${width / 2 + curveWidth}  
            C${width / 2 + curveWidth / 2},${curveDepth} ${width / 2 - curveWidth / 2},${curveDepth} ${width / 2 - curveWidth},0  
            H${cornerRadius}  
            Z`}
            />
        </Svg>
    );
};

export default CurvedBottomBar;
