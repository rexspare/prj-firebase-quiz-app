import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import {commonStyles} from '@styles/commonStyles'

const styles = StyleSheet.create({
    context: {
        alignItems: 'flex-start',
        paddingHorizontal: '5%',
        ...commonStyles._rowContainer,
        justifyContent: 'space-between',
        marginBottom : 15
    },
    CurveContainer: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingBottom :100
    },
    heading: {
        color: COLORS._333333,
        textAlign: 'left',
        marginVertical: 10,
        fontSize: hp(2.4)
    },
    line: {
        width: '100%',
        height: 1.5,
        boderRadius: 4,
        marginVertical: 15
    },
    absoluteBtn :{
        position:'absolute',
        bottom:0,
        height: hp(20),
        width : wp(100),
        ...commonStyles._center

    },
    dot :{
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: COLORS._333333
    },
    row :{
        flexDirection:'row',
    }
})

export default styles