import { View, Text, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import { Gradient, AppHeader, CustomInput, CurveContainer, TopicSelector, Label, ContinueQuiz, GradientContainer, GradientButton, QuizItem } from '@components'
import styles from './styles'
import { COLORS, hp, wp, FONTS } from '@utils/common'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import { Swap, SwapDark } from '@svg'
import LinearGradient from 'react-native-linear-gradient'
import { commonStyles } from '@styles/commonStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { explainationData, instructionsData } from '../../data/dummies'
import { SCREENS } from '@navigation/routes'
import { AppContext } from '@contexts/appContext'
import { getQuizTime } from '@utils/myUtils'

const Detail = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const { seletctedQuiz, attemptQuiz, isLoading } = useContext(AppContext)
    return (
        <Gradient>
            <AppHeader
                leftText="Details"
                showbranding={true}
                onLeftPress={() => props.navigation.goBack()}
            />

            <View style={styles.context}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Label style={{ color: COLORS._FFFFFF, fontSize: hp(2) }}>
                        {seletctedQuiz?.title}
                    </Label>

                    <Label style={{ color: COLORS._FFFFFF, fontSize: hp(1.6), marginVertical: hp(0.5) }}>
                        {`GET ${seletctedQuiz?.questionsList?.length * 10} Points`}
                    </Label>
                </View>

                <View onPress={() => { }} style={{ ...commonStyles._rowContainer, marginRight: 10 }}>
                    <FontAwesome name='star' size={hp(2.4)} color={COLORS._F2C94C} />
                    <Label font='h4' style={{ color: COLORS._FFFFFF, fontSize: hp(2), marginTop: 2, marginLeft: 5 }}>
                        4.2
                    </Label>
                </View>

            </View>

            {/* BODY */}
            <CurveContainer style={{ flex: 1 }} >
                <View style={{height: '80%',}}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                        <View style={styles.CurveContainer}>


                            <Label style={{ color: COLORS._333333, fontSize: hp(2.1), textAlign: 'left', marginVertical: hp(1) }}>
                                Brief explanation about this quiz
                            </Label>

                            {
                                explainationData.map((explain, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                        {explain.Icon}
                                        <View style={{ marginLeft: wp(4) }}>
                                            <Label style={{ color: COLORS._333333, fontSize: hp(2.1), textAlign: 'left', top: 2 }}>
                                                {
                                                    index == 0 ?
                                                        `${seletctedQuiz?.questionsList?.length} Question` :
                                                        index == 1 ? `${getQuizTime(seletctedQuiz?.time)}` : explain.title}
                                            </Label>
                                            <Label style={{ color: COLORS._999999, fontSize: hp(1.7), textAlign: 'left', top: -2 }}>
                                                {explain.subtle}</Label>
                                        </View>

                                    </View>
                                ))
                            }
                            <Label style={{ color: COLORS._333333, fontSize: hp(2.1), textAlign: 'left', marginTop: hp(2.5), marginBottom: hp(1) }}>
                                {`Please read the text below carefully so\nyou can understand it`}
                            </Label>

                            {
                                instructionsData.map((instruction, index) => (
                                    <View key={index} style={{ flexDirection: 'row', marginVertical: 5 }}>
                                        <Label style={{ color: COLORS._333333, fontSize: hp(1.8), textAlign: 'left', marginRight: 10 }}>
                                            {`●`}
                                        </Label>
                                        <Label style={{ color: COLORS._333333, fontSize: hp(1.8), textAlign: 'left' }}>
                                            {`${instruction.text}`}
                                        </Label>
                                    </View>
                                ))
                            }

                            {/* </ScrollView> */}

                        </View>
                    </ScrollView>
                </View>

                <LinearGradient
                    colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
                    style={styles.absoluteBtn}
                >
                    <GradientButton
                        style={{ borderRadius: 100, width: wp(70) }}
                        textStyles={{ color: COLORS._FFFFFF, fontFamily: FONTS.Poppins_500 }}
                        title="Start Quiz"
                        onpress={() => attemptQuiz(() => props.navigation.navigate(SCREENS.QUIZ))}
                        isLoading={isLoading}
                    />
                </LinearGradient>



            </CurveContainer>
        </Gradient>
    )
}

export default Detail