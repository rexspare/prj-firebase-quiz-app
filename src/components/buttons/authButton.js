import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { wp, hp, COLORS } from '@utils/common'
import Label from '../label'
import { commonStyles } from '@styles/commonStyles'

const AuthButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.main, props.style]}
            activeOpacity={0.8}
            onPress={() => props.onpress()}
            disabled={props.disabled ? props.disabled : false}
        >
            {
                props.isLoading ?
                    <ActivityIndicator size={hp(3)} color={COLORS._FFFFFF }/>
                    :
                    <Label
                        style={[{ color: COLORS._FFFFFF }, props.textStyles]}
                        fontSize={hp(2.3)}>{props.title}</Label>
            }
        </TouchableOpacity>
    )
}

AuthButton.defaultProps = {
    title: 'title',
    onpress: () => { }
}

export default AuthButton

const styles = StyleSheet.create({
    main: {
        width: wp(57.7),
        height: hp(6.5),
        backgroundColor: COLORS._F3982F,
        alignSelf: 'center',
        marginTop: hp(3),
        ...commonStyles._center,
        borderRadius: hp(4)
    }
})