import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { commonStyles } from '@styles/commonStyles'
import { COLORS, hp, wp } from '@utils/common'
import Label from './label'
import GradientText from './gradientText'
import { Clock, Questions } from '@svg'
import { AuthButton } from './buttons'
import Feather from 'react-native-vector-icons/Feather'
import { AppContext } from '@contexts/appContext'

const ContinueQuiz = (props) => {
    const { item } = props
    const { deleteIncomepleteQuiz, refreshState } = useContext(AppContext)
    const [answered, setanswered] = useState(0)

    const getAnswersQeuestionSLenght = () => {
        let answered = 0
        item.answersArray?.forEach((answer) => {
            if (answer != 99) {
                answered = answered + 1
            }
        })
        setanswered(answered)
        return answered
    }

    useEffect(() => {
        getAnswersQeuestionSLenght()
    }, [refreshState])

    return (
        <View style={styles.main}>
            <Image
                source={{ uri: item?.quiz?.cover }}
                style={styles.image}
            />
            <View style={styles.context}>
                <GradientText
                    text={item.quiz.title}
                    fontSize={hp(2)}
                />
                {/* QUESTIONS */}
                <View style={commonStyles._rowContainer}>
                    <Questions width={hp(2.5)} height={hp(2.5)} />
                    <GradientText
                        text={answered}
                        fontSize={hp(1.6)}
                        style={{ marginLeft: 5 }}
                    />
                    <Label style={styles.text}>
                        {`/${item?.quiz?.questionsList?.length} Question`}
                    </Label>
                </View>

                {/* TIME */}
                <View style={commonStyles._rowContainer}>
                    <Clock width={hp(2.5)} height={hp(2.5)} />
                    <GradientText
                        text={`${item?.remainingTime} `}
                        fontSize={hp(1.6)}
                        style={{ marginLeft: 5 }}
                    />
                    <Label style={styles.text}>
                        min
                    </Label>
                </View>

                {/* BUTTON */}
                <AuthButton
                    title="Continue Quiz"
                    style={styles.btn}
                    textStyles={{ fontSize: hp(1.6) }}
                    onpress={() => props.onContinue(item)}
                />

                {/* ABSOLUTE BUTTON */}
                <View style={styles.absulyeBtn}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert("Progress will be lost", "are you sure want to delete this attempt",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => { },
                                },
                                {
                                    text: "Delete",
                                    onPress: () => { deleteIncomepleteQuiz(item.doc_id) },
                                },
                            ]
                        )
                    }}>
                        <Feather name='trash-2' size={hp(2.7)} color={COLORS._C2C2C2} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

ContinueQuiz.defaultProps = {
    onContinue: () => { }
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        ...commonStyles._rowContainer,
    },
    image: {
        height: hp(15),
        width: hp(15),
        borderRadius: 5
    },
    context: {
        width: wp(90) - hp(15),
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
        top: '15%',
        right: '10%'
    }
})

export default ContinueQuiz
