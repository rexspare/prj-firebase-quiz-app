import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp, FONTS } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS._F7F7F7
    },
    itemContainer: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: hp(2),
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    line :{
        width: '90%',
        height:1.5,
        backgroundColor : 'rgba(0, 0, 0, 0.12)',
        marginTop : hp(2),
        marginBottom: hp(2),
        alignSelf:'center'
    }

})

export default styles