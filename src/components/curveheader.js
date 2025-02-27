import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React, {useContext} from 'react'
import { height, COLORS, hp, wp } from '@utils/common'
import Feather from 'react-native-vector-icons/Feather'
import { commonStyles } from '@styles/commonStyles'
import If from './if'
import Label from './label'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';
import { AuthContext } from '@contexts/authContext'

const CurveHeader = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const { userData, defaultAvatar } = useContext(AuthContext)

    return (
        <LinearGradient
            colors={[...theme.appGradient]}
            style={[styles.main, props.style]}
            useAngle={true}
            angle={90}
            angleCenter={{ x: 0.5, y: 0.5 }}
        >
            <TouchableOpacity style={[commonStyles._rowContainer]}
                activeOpacity={0.8}
                onPress={() => props.onLeftPress()}
            >
                <Feather name={props.menu ? 'menu' : 'arrow-left'} color={COLORS._FFFFFF} size={hp(3)} />
                <If condition={props.leftText}>
                    <Label font='h4' style={{ color: COLORS._FFFFFF, top: 1, left: 5 }} fontSize={hp(1.9)}>
                        {props.leftText}</Label>
                </If>
            </TouchableOpacity>

            <If condition={props.title}>
                <View style={{  }}>
                    <Label font='h5' style={{ color: COLORS._FFFFFF, top: 1, left : 15}} fontSize={hp(2.8)}>
                        {props.title}</Label>
                </View>
            </If>


            {
                props.showImage ?
                    <Image
                        source={{ uri: userData?.profileImage || defaultAvatar}}
                        style={styles.image}
                    />
                    :
                    <View style={styles.image}></View>
            }


        </LinearGradient>

    )
}
CurveHeader.defaultProps = {
    onLeftPress: () => { },
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: height * 0.11,
        minHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        paddingBottom:'2%',
        paddingTop: Platform.OS === 'ios' ? 30 : 0
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 30
    }
})

export default CurveHeader

