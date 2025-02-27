import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS._F7F7F7
    },
    itemContainer: {
        width:'90%',
        alignSelf:'center',
        paddingHorizontal : '5%',
        paddingVertical: 8,
        ...commonStyles._rowContainer,
        borderWidth : 1,
        borderColor :COLORS._E0E0E0,
        borderRadius : 7,
        justifyContent :'space-between',
        backgroundColor : COLORS._FFFFFF
    },
    image: {
        width: hp(7),
        height: hp(7),
        borderRadius: hp(4),
        marginRight : 10
    },
    line :{
        width: '100%',
        height:1.5,
        backgroundColor : 'rgba(0, 0, 0, 0.12)',
        marginTop : hp(2),
        marginBottom: hp(2)
    }
})

export default styles