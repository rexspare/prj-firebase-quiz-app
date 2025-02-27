import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, hp } from '@utils/common';
import { LinearGradientText } from 'react-native-linear-gradient-text';
import { useSelector } from 'react-redux';

const GradientText = ({ fontSize = hp(2.6), style, font = "h4" , text}) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const getFontFamily = () => {
        switch (font) {
            case 'h1':
                return FONTS.Poppins_100
            case 'h2':
                return FONTS.Poppins_200
            case 'h3':
                return FONTS.Poppins_300
            case 'h4':
                return FONTS.Poppins_400
            case 'h5':
                return FONTS.Poppins_500
            case 'h6':
                return FONTS.Poppins_600
            case 'h7':
                return FONTS.Poppins_700
            case 'h8':
                return FONTS.Poppins_800
            case 'h9':
                return FONTS.Poppins_900
            default:
                return FONTS.Poppins_400
        }
    }
    return (
         <LinearGradientText
         colors={[...theme.textGradient]}
         text={text}
         start={{ x: 0.5, y: 0 }}
         end={{ x: 1, y: 1 }}
         textStyle={[{
            fontSize,
            fontFamily: getFontFamily(font),
        }, _style.textStyle, style]}
       />
    )
}

const _style = StyleSheet.create({
    textStyle: {
        color: COLORS._063861,
        textAlign: "center"
    },
});

export default GradientText

