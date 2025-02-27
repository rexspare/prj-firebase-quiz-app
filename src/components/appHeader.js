import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React, { useContext } from 'react'
import { height, COLORS, hp , wp} from '@utils/common'
import Feather from 'react-native-vector-icons/Feather'
import { commonStyles } from '@styles/commonStyles'
import If from './if'
import Label from './label'
import Branding from './branding'
import { AuthContext } from '@contexts/authContext'

const AppHeader = (props) => {
    const { userData, defaultAvatar } = useContext(AuthContext)
    
    return (
        <View style={styles.main}>
            <TouchableOpacity style={[commonStyles._rowContainer]}
                activeOpacity={0.8}
                onPress={() => props.onLeftPress()}
            >
                <Feather name={props.showbranding ? 'menu' : 'arrow-left'} color={COLORS._FFFFFF} size={hp(3)} />
                <If condition={!props.showbranding}>
                    <Label font='h4' style={{ color: COLORS._FFFFFF, top: 1, left : 5 }} fontSize={hp(1.9)}>
                        {props.leftText}</Label>
                </If>
            </TouchableOpacity>

            <If condition={props.showbranding}>
                <View style={{left: wp(3.5)}}>
                    <Branding size={33} />
                </View>
            </If>

            <Image
                source={{ uri: userData?.profileImage || defaultAvatar }}
                style={styles.image}
            />

        </View>
    )
}

AppHeader.defaultProps = {
    showbranding: false,
    onLeftPress: () => { },
    leftText : "LEFT TEXT"
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: height * 0.09,
        minHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        marginTop: Platform.OS === 'ios' ? 30 : 0
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 30
    }
})

export default AppHeader

