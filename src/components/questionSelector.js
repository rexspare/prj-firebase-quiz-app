import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import Label from './label'
import { hp, COLORS } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'
import { height, wp } from '@utils/common'
import { AppContext } from '@contexts/appContext'

const QuestionSelector = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const {selectedQuestion, setselectedQuestion} = useContext(AppContext)
    const Questions = props.questions
    const {currentSlideIndex, setCurrentSlideIndex} = props
    return (
        <View style={[styles.main, props.style]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    Questions.map((question, index) => (
                        <View
                            key={index}
                            style={[styles.item, {
                                borderColor: currentSlideIndex == index ? COLORS._78DED4 : COLORS._D4D4D4
                            }]}
                            activeOpacity={0.8}
                            onPress={() => {}}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {setselectedQuestion(question.doc_id); props.goToQuestion(index)}}
                                style={[styles.circle, {
                                    backgroundColor: currentSlideIndex == index  ? COLORS._78DED4 : COLORS._D4D4D4
                                }]}
                                >
                                <Label font='h4' fontSize={hp(2.1)}
                                    style={{ color: currentSlideIndex == index  ? COLORS._FFFFFF : COLORS._000000, bottom : -1 }}>
                                    {index + 1}
                                </Label>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10
    },
    item: {
        ...commonStyles._center,
        width: wp(12.85),
        height: wp(16.85),
        borderBottomWidth: 2.5,
        paddingBottom : 5
    },
    circle :{
        width : wp(10),
        height :wp(10),
        borderRadius: wp(8),
        ...commonStyles._center,
    },
    line: {
        width: 20,
        height: 1.5,
        borderRadius: 2
    }
})

export default QuestionSelector