import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'
import Label from './label'
import Feather from 'react-native-vector-icons/Feather'
import { width } from '../utils/common'

const MenuItem = (props) => {
    const { item } = props
    return (
        <TouchableOpacity style={[styles.main, props.style]}
            onPress={() => props.onpress()}
            disabled={props.touchDisable}
        >
            <View style={commonStyles._rowContainer}>
                <Image
                    source={item.image}
                    style={styles.image}
                />
                <View>
                    <Label font='h5' style={{ color: COLORS._000000, textAlign: 'left' }} fontSize={hp(1.8)}>
                        {item.title}</Label>
                    <Label style={{ color: COLORS._ABABAB, textAlign: 'left', width: width*0.6 }} fontSize={hp(1.3)}>
                        {item.subtle}</Label>
                </View>
            </View>
            <View>
                {props.Icon}
            </View>
        </TouchableOpacity>
    )
}

MenuItem.defaultProps = {
    Icon: <Feather name='chevron-right' size={hp(2.8)} color={COLORS._C2C2C2} />,
    onpress: () => { },
    touchDisable: false
}

export default MenuItem

const styles = StyleSheet.create({
    main: {
        width: '100%',
        ...commonStyles._rowContainer,
        justifyContent: 'space-between'
    },
    image: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(4),
        marginRight: 10
    }
})