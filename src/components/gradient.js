import { View, Text, ImageBackground, Dimensions, StatusBar , Platform} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';
import { COLORS } from '@utils/common';
const Gradient = ({
    style,
    children
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
        style={[{ flex: 1, }, style]}
        useAngle={true}
        angle={90}
        angleCenter={{ x: 0.5, y: 0.5 }}
    >
            {children}

    </LinearGradient>
</>
  )
}

export default Gradient
