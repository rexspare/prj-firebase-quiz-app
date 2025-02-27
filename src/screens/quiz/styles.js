import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'

const styles = StyleSheet.create({
    context: {
        alignItems: 'flex-start',
        paddingHorizontal: '5%',
        ...commonStyles._rowContainer,
        justifyContent: 'space-between',
        marginBottom: 15
    },
    CurveContainer: {
        flex: 1,
        paddingHorizontal: '5%'
    },
    countDownContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: hp(3)
    },
    answerItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: hp(1)
    },
    circle: {
        width: hp(5.5),
        height: hp(5.5),
        borderRadius: hp(5),
        ...commonStyles._center,
        marginRight : wp(2)
    },
    absoluteBtn :{
        position:'absolute',
        bottom:0,
        height: hp(20),
        width : wp(100),
        ...commonStyles._center

    },
})

export default styles