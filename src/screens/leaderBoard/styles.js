import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS._F7F7F7
    },
    topThree: {
        backgroundColor: COLORS._E4F6F3,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end',
        paddingVertical:'2%',
        marginBottom: hp(1.5)
    },
    photoFrame :{
        width: wp(25),
        alignItems: 'center',
        marginBottom: hp(10),
        position: 'absolute',
        top: 8
    },
    imageCintainer : {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(15),
        borderWidth: 3,
        borderColor: COLORS._F3982F,
    },
    topFrame : {
        width: wp(37),
        height: wp(37),
        zIndex: 100,
        justifyContent:'center',
        alignItems:'center'
    },
    topImage : {
        width: wp(26),
        height: wp(26),
        borderRadius: wp(15),
        borderWidth: 3,
        borderColor: COLORS._F3982F,
        top: wp(2),
        zIndex:-100
    },
    headingConatiner : {
        flexDirection: 'row',
        backgroundColor: COLORS._78DED4,
        width: '90%',
        alignSelf:'center',
        borderRadius:6,
        paddingHorizontal:'3%',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth: 1,
        borderColor:COLORS._6AC3BB,
        paddingVertical:3
    },
    scorers :{
        backgroundColor: COLORS._FFFFFF,
        borderColor: 'rgba(0, 0, 0, 0.12)',
        paddingVertical: 4
    }

})

export default styles