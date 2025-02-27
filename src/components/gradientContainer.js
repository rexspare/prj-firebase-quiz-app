import { View, Text, ImageBackground, Dimensions, StatusBar , Platform} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';
import { COLORS } from '@utils/common';
const GradientContainer = ({
    style,
    children,
    angle = 150
}) => {
    const theme = useSelector((state) => state.themeReducer.theme)
  return (
    <>
    <StatusBar
        backgroundColor={COLORS._FFFFFF}
        barStyle="dark-content"
    />
    <LinearGradient
        colors={[...theme.appGradient]}
        style={[{  }, style]}
        useAngle={true}
        angle={angle}
        angleCenter={{ x: 0.5, y: 0.5 }}
    >
            {children}

    </LinearGradient>
</>
  )
}

export default GradientContainer
