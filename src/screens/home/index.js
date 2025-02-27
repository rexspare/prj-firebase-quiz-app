import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { Gradient, AppHeader, CustomInput, CurveContainer, TopicSelector, Label, ContinueQuiz, GradientContainer, GradientButton, QuizItem } from '@components'
import styles from './styles'
import { COLORS, hp, wp, FONTS } from '@utils/common'
import { showFlash } from '@utils/myUtils'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import { Swap, SwapDark } from '@svg'
import LinearGradient from 'react-native-linear-gradient'
import { SCREENS } from '@navigation/routes'
import { AuthContext } from '@contexts/authContext'
import { AppContext } from '@contexts/appContext'
import { useIsFocused } from '@react-navigation/native'

const DATA = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },

]

const Home = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const { userData } = useContext(AuthContext)
    const { allQuizes,
        seletctedQuiz, setseletctedQuiz,
        selectedTopic, allIncompleteQuizes,
        continueAttemp, getAllIncompleteQuizes } = useContext(AppContext)
    const [filteredQuizes, setfilteredQuizes] = useState(allQuizes)
    const [searchText, setsearchText] = useState('')
    const [searcResults, setsearcResults] = useState([])
    const [incompleteQuizes, setincompleteQuizes] = useState([])
    const { navigation } = props
    const focus  = useIsFocused()
    /**
     * Filter Quizes according to topic
     * */

    useEffect(() => {
        if (selectedTopic == 'Popular') {
            setfilteredQuizes(allQuizes)
        } else {
            let mData = allQuizes.filter((quiz) => quiz.topic == selectedTopic)
            setfilteredQuizes(mData)
        }
    }, [selectedTopic, allQuizes])

    /**
    * Filter Quizes according to topic
    * */

    const searchFilter = (text) => {
        if (text) {
            const newData = allQuizes.filter((quiz) => quiz?.title?.toUpperCase()?.includes(text.toUpperCase()))
            setsearcResults(newData)
        } else {
            setsearcResults([])
        }
        setsearchText(text)
    }

    /**
    * Continue Quiz 
    * */

    const continueQuiz = (quiz) => {
        continueAttemp(quiz);
        setseletctedQuiz({ ...quiz.quiz, time: quiz.remainingTime })
        props.navigation.navigate(SCREENS.QUIZ)
    }

    /**
    * Get Incomplete Quizes
    * */

    useEffect(() => {
       const subscribe = navigation.addListener('focus', () => {
            getAllIncompleteQuizes()
        })

        return subscribe
    }, [navigation])

    // let list = useMemo(() => getAllIncompleteQuizes(), [focus])

    useEffect(() => {
        if(allIncompleteQuizes.length != 0){
            setincompleteQuizes(allIncompleteQuizes)
        }
    }, [allIncompleteQuizes])
    

    return (
        <Gradient>
            <AppHeader
                showbranding={true}
                onLeftPress={() => props.navigation.navigate(SCREENS.PROFILE)}
            />

            <View style={styles.context}>
                <Label font='h4' style={{ color: COLORS._FFFFFF, fontSize: hp(2) }}>
                    {`Hello ${userData?.name || 'user'}`}
                </Label>

                <Label font='h5' style={{ color: COLORS._FFFFFF, fontSize: hp(2.3), marginVertical: hp(0.5) }}>
                    Let's test your knowledge
                </Label>

                {/* INPUT FIELD */}
                <View style={{ height: hp(7) }}>
                    <CustomInput
                        Icon={<Feather name={'search'} color={theme.appColor} size={hp(3)} />}
                        RightIcon={
                            theme.mode != 'dark' ?
                                <Swap width={hp(2.5)} height={hp(2.5)} />
                                :
                                <SwapDark width={hp(2.5)} height={hp(2.5)} />
                        }
                        placeholder='Search'
                        onChange={(txt) => searchFilter(txt)}
                        styles={{
                            width: wp(94),
                            height: hp(4.5),
                            marginTop: 7,
                            height: 10
                        }}
                        textStyles={{
                            fontSize: hp(2),
                            height: hp(5.5)
                        }}
                        containerstyle={{
                            height: hp(4.5),
                        }}
                    />
                </View>
            </View>
            {/* BODY */}
            <CurveContainer style={{ flex: 1 }} >
                <View style={styles.CurveContainer}>

                    <TopicSelector />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            allIncompleteQuizes?.length ? <Label font='h5' style={styles.heading}>Continue Quiz</Label>: null
                        }

                        {/* CONTINUE TOPIC */}

                        {
                            allIncompleteQuizes.map((item, index) => (
                                <View key={index} style={{ marginVertical: 10 }}>
                                    <ContinueQuiz
                                        item={item}
                                        onContinue={(quiz) => continueQuiz(quiz)}
                                    />
                                </View>
                            ))
                        }

                        <GradientContainer style={styles.line}></GradientContainer>

                        <View style={{ paddingBottom: hp(20) }}>
                            {
                                searchText ?
                                    searcResults.map((quiz, index) => (
                                        <QuizItem
                                            key={index}
                                            selected={seletctedQuiz.doc_id == quiz.doc_id}
                                            selectItem={() => setseletctedQuiz(quiz)}
                                            data={quiz}
                                        />
                                    ))
                                    :
                                    filteredQuizes.map((quiz, index) => (
                                        <QuizItem
                                            key={index}
                                            selected={seletctedQuiz.doc_id == quiz.doc_id}
                                            selectItem={() => setseletctedQuiz(quiz)}
                                            data={quiz}
                                        />
                                    ))
                            }
                        </View>

                    </ScrollView>

                </View>
                {/* BUTTON */}
                <LinearGradient
                    colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
                    style={styles.absoluteBtn}
                >
                    <GradientButton
                        style={{ borderRadius: 100, width: wp(70) }}
                        textStyles={{ color: COLORS._FFFFFF, fontFamily: FONTS.Poppins_500 }}
                        title="Start Quiz"
                        onpress={() => {
                            if (seletctedQuiz?.doc_id) {
                                props.navigation.navigate(SCREENS.DETAIL)
                            } else {
                                showFlash("Select a quiz to continue", 'warning')
                            }
                        }}
                    />
                </LinearGradient>

            </CurveContainer>

        </Gradient>
    )
}

export default Home