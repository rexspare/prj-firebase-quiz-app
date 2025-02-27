import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

const CurveContainer = ({
    children,
    style,
    height = hp(60)
}) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    return (
        <View style={[styles.main, {
            height: height,
        }, style]}>
            {/* LINE */}
            <View style={styles.lineConatiner}>
                <LinearGradient
                    colors={[...theme.appGradient]}
                    style={{
                        width: wp(15),
                        height: 5,
                        borderRadius: 5,
                        backgroundColor: theme.appColor,
                    }}
                    useAngle={true}
                    angle={90}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                ></LinearGradient>
            </View>
            {/* END */}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: COLORS._FFFFFF,
        width: wp(100),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    lineConatiner: {
        width: wp(100),
        height: hp(5),
        ...commonStyles._center
    }

})

export default CurveContainer

