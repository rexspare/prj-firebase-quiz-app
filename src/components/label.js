import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, hp } from '@utils/common';

const Label = ({ children, fontSize = hp(2.6), style, font = "h4", singleLine=false, color }) => {

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

    const _myStyle = _style({color})

    return (
        <Text style={[{
            fontSize,
            fontFamily: getFontFamily(font),
        }, _myStyle.textStyle, style]}
        numberOfLines={singleLine ? 1 : 100}
        >
            {children}
        </Text>
    );
};

const _style =({color}) =>  StyleSheet.create({
    textStyle: {
        color: color ? color : COLORS._063861,
        textAlign: "center"
    },
});

export default Label