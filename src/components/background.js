import { View, Text, ImageBackground, Dimensions, StatusBar , Platform} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';
import { COLORS } from '@utils/common';

const { width, height } = Dimensions.get("screen")

const Background = ({
    children,
    style,
    source
}) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    return (
        <>
            <StatusBar
                backgroundColor={COLORS._FFFFFF}
                barStyle="dark-content"
            />
            <LinearGradient
                colors={[...theme.gradient]}
                style={[{ flex: 1, }, style]}
            >
                <ImageBackground
                    source={source}
                    style={{ width: width, height: Platform.OS === 'ios' ? height : height}}
                // resizeMode="center"
                >
                    {children}
                </ImageBackground>

            </LinearGradient>
        </>
    )
}

export default Background