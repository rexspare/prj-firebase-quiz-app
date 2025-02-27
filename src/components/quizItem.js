import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import GradientContainer from './gradientContainer'
import { commonStyles } from '@styles/commonStyles'

import { COLORS, hp, wp } from '@utils/common'
import Label from './label'
import GradientText from './gradientText'
import { Clock, Questions } from '@svg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const QuizItem = (props) => {
    const { data } = props
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.selectItem()}
            style={{ marginBottom: 15, }}
        >
            <GradientContainer style={[styles.gradient, { padding: props.selected ? 2 : 0 }]}>
                <View style={[styles.main, { elevation: !props.selected ? 1 : 0 }]}>
                    <Image
                        source={{ uri: data?.cover }}
                        style={styles.image}
                    />
                    <View style={styles.context}>
                        <GradientText
                            text={data?.title?.slice(0,32)}
                            fontSize={hp(2)}
                            style={{textAlign :'left'}}
                        />
                        {/* QUESTIONS */}
                        <View style={commonStyles._rowContainer}>
                            <Questions width={hp(2.5)} height={hp(2.5)} />
                            <Label style={styles.text}>
                                {`${data?.questionsList?.length} Question${data?.questionsList?.length > 1 ? 's' : ''}`}
                            </Label>
                        </View>

                        {/* TIME */}
                        <View style={commonStyles._rowContainer}>
                            <Clock width={hp(2.5)} height={hp(2.5)} />
                            <GradientText
                                text={data.time}
                                fontSize={hp(1.6)}
                                style={{ marginLeft: 5 }}
                            />
                            <Label style={styles.text}>
                                min
                            </Label>
                        </View>




                        {/* ABSOLUTE BUTTON */}
                        <View style={styles.absulyeBtn}>
                            <TouchableOpacity onPress={() => { }} style={{ ...commonStyles._rowContainer }}>
                                <FontAwesome name='star' size={hp(2.2)} color={COLORS._F2C94C} />
                                <GradientText
                                    text='4.8'
                                    fontSize={hp(2)}
                                    style={{ marginLeft: 5, marginTop: 4 }}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </GradientContainer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        borderRadius: 7,
    },
    main: {
        flex: 1,
        backgroundColor: COLORS._FFFFFF,
        borderRadius: 6,
        ...commonStyles._rowContainer,
        paddingHorizontal: wp(3),
        paddingVertical: wp(2),
    },
    image: {
        height: hp(10),
        width: hp(10),
        borderRadius: 5
    },
    context: {
        width: wp(60),
        alignItems: 'flex-start',
        paddingHorizontal: '3%',
    },
    text: {
        fontSize: hp(1.6),
        color: COLORS._999999
    },
    btn: {
        backgroundColor: COLORS._000000,
        width: '95%',
        marginTop: hp(1),
        height: hp(5)
    },
    absulyeBtn: {
        position: 'absolute',
        top: '20%',
        right: '5%'
    }

})

export default QuizItem

