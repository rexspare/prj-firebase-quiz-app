import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { hp, FONTS, COLORS, wp } from "@utils/common"
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { commonStyles } from '@styles/commonStyles';

const GradientButton = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    return (
        <TouchableOpacity
            style={[styles.main, props.style]}
            activeOpacity={0.9}
            onPress={() => props.onpress()}
        >
            <LinearGradient
                colors={[...theme.buttonGradient]}
                style={[styles.main, { width: '100%' }, props.style]}
                useAngle={theme.mode != 'dark'}
                angle={170}
                angleCenter={{ x: 0.5, y: 0.5 }}
            >
                {props.isLoading ? (
                    <ActivityIndicator size={30} color={COLORS.primary_Light} />
                ) : (
                    <View style={styles.context}>
                        <Text style={[styles.btnText, props.textStyles]}>{props.title}</Text>
                        {
                            props.icon &&
                            icon
                        }
                    </View>
                )}
            </LinearGradient>

        </TouchableOpacity>
    )
}

GradientButton.defaultProps = {
    onpress: () => { },
    title: "Gradient Button"
}

export default GradientButton

const styles = StyleSheet.create({
    main: {
        width: wp(90),
        height: hp(6.5),
        borderRadius: 5,
        maxHeight: 65,
        minHeight: 50,
        ...commonStyles._center,
        elevation: 1
    },
    btnText: {
        fontFamily: FONTS.Poppins_400,
        color: COLORS._333333,
        fontSize: hp(2)
    },
    context : {
        flex:1,
        width :'100%',
        flexDirection :'row',
        justifyContent:'space-around',
        alignItems:'center',
    }
})